import React, { useState, useContext } from "react";
import { View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
// import Ionicons from "@expo/vector-icons/Ionicons";
import { LogBox } from "react-native";
import axios from "axios";
import {
  VStack,
  FormControl,
  Button,
  Center,
  Box,
  Card,
  NativeBaseProvider,
  Input,
} from "native-base";
import { AuthContext } from "../context/AuthContext";
// import SampleForm from "./SampleForm";
// LogBox.ignoreAllLogs();


const Edit = ({ navigation }) => {
  const { serverUrl, serverPort } = useContext(AuthContext);
  const baseUrl = serverUrl + serverPort;

  const { userInfo, setUserInfo } = useContext(AuthContext);

  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);

  const downloadImage = async (imageUrl) => {
    // console.log("Image Url is: ", imageUrl);
    const fileName = imageUrl.split("/").pop();
    const newPath = `${FileSystem.documentDirectory}${fileName}`;

    try {
      await FileSystem.downloadAsync(imageUrl, newPath);
      return newPath;
    } catch (error) {
      console.error(error);
    }
  };

  const validate = () => {
    if (formData.OldPassword === undefined) {
      setErrors({ ...errors, OldPassword: "Previous Password is required" });
      return false;
    }
    if (formData.NewPassword === undefined) {
      setErrors({ ...errors, NewPassword: "New Password is required" });
      return false;
    }

    if (image === undefined) {
      setErrors({ ...errors, image: "Image is required" });
      return false;
    }

    // if (formData.lastName === undefined) {
    //   setErrors({ ...errors, lastName: "Last Name is required" });
    //   return false;
    // } else if (formData.lastName.length < 3) {
    //   setErrors({ ...errors, name: "Last Name is too short" });
    //   return false;
    // }

    return true;
  };

  const onSubmit = async () => {
    validate() ? console.log("Submitted") : console.log("Validation Failed");
    var UserData = new FormData();
    
    UserData.append("OldPassword", formData.OldPassword);
    UserData.append("NewPassword", formData.NewPassword);
    console.log("old password", formData.OldPassword)

    // UserData.append('lastName',formData.lastName);
    // UserData.append('email',formData.email);

    UserData.append("UserImage", {
      name: userInfo.user._id + "_profile" + ".jpeg",
      uri: image,
      type: "image/jpg",
    });

    console.log(UserData);

    console.log(
      "Going to edit the profile of: " +
        userInfo.user._id +
        " , " +
        userInfo.user.firstName
    );

    const res = await axios.post(
      `${baseUrl}/api/${userInfo.user._id}/edit`,
      UserData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          // authorization: `JWT ${token}`,
        },
      }
    );

    if (res.data) {
      console.log("Updated Picture (response): ", res.data.profilePicture);

      await setUserInfo((userInfo) => ({
        ...userInfo,
        user: {
          ...userInfo.user,
          profilePicture: res.data.profilePicture,
        },
      }));

      console.log("Updated Picture: ", userInfo.user.profilePicture);
      await downloadImage(baseUrl + "/api/Image/" + res.data.profilePicture);
      console.log("Updated");
      navigation.navigate("Profile");
    }

    // axios.post(`${baseUrl}/api/${userInfo.user._id}/edit`, UserData)
    //     .then(response => console.log({ response }))
    //     .catch(error => {
    //         console.log({ errorMessage: error });
    //         console.error('There was an error!', error);
    //     });
  };

  const handlePhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      noData: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
    }
  };

  return (
    <NativeBaseProvider>
      <Box style={{ backgroundColor: "#2d596b", flex: 1 }}>
        <Center flex={1}>
          <Card
            backgroundColor={"white"}
            height={"80%"}
            width={"85%"}
            borderRadius={20}
          >
            <VStack width="90%" mx="3" maxW="300px">
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 100,
                    marginLeft: 60,
                    marginBottom: 20,
                    borderColor: "#3F778E",
                    borderWidth: 2,
                  }}
                />
              )}

              <FormControl isRequired isInvalid={"image" in errors}>
                <Button
                  marginBottom={10}
                  // leftIcon={<Ionicons name="cloud-upload-outline" size="sm" />}
                  onPress={handlePhoto}
                >
                  Upload Photo
                </Button>

                {"image" in errors ? (
                  <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
                ) : (
                  <FormControl.HelperText></FormControl.HelperText>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={"OldPassword" in errors}>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                >
                  Old Password
                </FormControl.Label>
                <Input
                  placeholder="********"
                  onChangeText={(value) =>
                    setData({ ...formData, OldPassword: value })
                  }
                />
                {"OldPassword" in errors ? (
                  <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
                ) : (
                  <FormControl.HelperText>
                    This field cannot be empty
                  </FormControl.HelperText>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={"NewPassword" in errors}>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                >
                  New Password
                </FormControl.Label>
                <Input
                  placeholder="********"
                  onChangeText={(value) =>
                    setData({ ...formData, NewPassword: value })
                  }
                />
                {"NewPassword" in errors ? (
                  <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
                ) : (
                  <FormControl.HelperText>
                    This field cannot be empty
                  </FormControl.HelperText>
                )}
              </FormControl>

              <Button onPress={onSubmit} mt="5" colorScheme="cyan">
                Submit
              </Button>
            </VStack>
          </Card>
        </Center>
      </Box>
    </NativeBaseProvider>
  );
};

export default Edit;