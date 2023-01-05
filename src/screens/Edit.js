import React, { useState , useContext} from "react";
import { View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
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
LogBox.ignoreAllLogs();
const Edit = () => {
  const baseUrl = "http://192.168.42.232:3000";

  const {userInfo} = useContext(AuthContext);

  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);

  const validate = () => {
    if (formData.name === undefined) {
      setErrors({ ...errors, name: "Name is required" });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, name: "Name is too short" });
      return false;
    }

    if (image === undefined) {
      setErrors({ ...errors, image: "Image is required" });
      return false;
    }

    if (formData.lastName === undefined) {
      setErrors({ ...errors, lastName: "Last Name is required" });
      return false;
    } else if (formData.lastName.length < 3) {
      setErrors({ ...errors, name: "Last Name is too short" });
      return false;
    }

    if (formData.email === undefined) {
      setErrors({ ...errors, email: "Email is required" });
      return false;
    } else if (formData.email.length < 3) {
      setErrors({ ...errors, email: "Email is too short" });
      return false;
    }

    return true;
  };

  const onSubmit = async() => {
    validate() ? console.log("Submitted") : console.log("Validation Failed");
    var UserData = new FormData();
    UserData.append('firstName',formData.name);
    UserData.append('lastName',formData.lastName);
    UserData.append('email',formData.email);
    
    UserData.append('UserImage', {
      name: userInfo.user._id +'_profile'+'.jpeg',
      uri: image,
      type: 'image/jpg',
    });

    console.log(UserData);
    // PUT request using axios with error handling
    // const axios_body = { 
      
    //   "firstName": req.body.firstName,
    //   "lastName": req.body.lastName,
    //   "email": req.body.email,
    // };
    // console.log("Axios body is: ", axios_body);
    console.log("Going to edit the profile of: "+userInfo.user._id +" , "+ userInfo.user.firstName);


    const res = await axios.post(`${baseUrl}/api/${userInfo.user._id}/edit`, UserData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        // authorization: `JWT ${token}`,
      },
    });

    if (res.data) {
      console.log("Updated");
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
      <Box style={{ backgroundColor: "#E79E4F", flex: 1 }}>
        <Center flex={1}>
          <Card
            backgroundColor={"white"}
            height={"95%"}
            width={"95%"}
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

              <FormControl isRequired isInvalid={"name" in errors}>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                >
                  Name
                </FormControl.Label>
                <Input
                  placeholder="John"
                  onChangeText={(value) =>
                    setData({ ...formData, name: value })
                  }
                />
                {"name" in errors ? (
                  <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
                ) : (
                  <FormControl.HelperText>
                    Name should contain atleast 3 character.
                  </FormControl.HelperText>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={"lastName" in errors}>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                >
                  Last Name
                </FormControl.Label>
                <Input
                  placeholder="Carbera"
                  onChangeText={(value) =>
                    setData({ ...formData, lastName: value })
                  }
                />
                {"email" in errors ? (
                  <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
                ) : (
                  <FormControl.HelperText>
                    Invalid Last Name
                  </FormControl.HelperText>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={"email" in errors}>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                >
                  Email
                </FormControl.Label>
                <Input
                  placeholder="myemail@gmail.com"
                  onChangeText={(value) =>
                    setData({ ...formData, email: value })
                  }
                />
                {"email" in errors ? (
                  <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
                ) : (
                  <FormControl.HelperText>
                    Invalid Email Address
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