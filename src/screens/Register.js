import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios"
import {
  Center,
  Box,
  Heading,
  VStack,
  HStack,
  Image,
  FormControl,
  Input,
  Link,
  Form,
  Button,
  Text,
  NativeBaseProvider,
} from "native-base";
import { Alert, View, Toast, ActivityIndicator} from "react-native";
import { AuthContext } from "../context/AuthContext";

const Register = ({ navigation }) => {
  const { serverUrl, serverPort } = useContext(AuthContext);
  const baseUrl = serverUrl + serverPort;

  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [hasShownAlert, setHasShownAlert] = useState(false);
  const [emailError, setemailError] = useState();
  const [image, setImage] = useState(null);
  const [reg, isReg]= useState(false)
  let regEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const handleSubmit = () => {
   
    if (!email) {
      Alert.alert("Email is required.");
    } else if (!regEmail.test(email)) {
      Alert.alert("Invalid Email");
    } else {
      isReg(true)

  axios
  .post(`${baseUrl}/api/player/signup`, {
    firstName:fname,
    lastName:lname,
    email:email
  })
  .then((res) => {
    console.log(res);
    return res // Add return here
  })
  .then((data) => { // Handle response data here
    console.log(data);
    navigation.navigate("Login");
  })
  .catch((error) => {
    // console.error(error);
  if (error.response && error.response.data && error.response.data.message) {
    // extract the error message from the error object
    const errorMessage = error.response.data.message;
    // display the error message in an alert
    Alert.alert(errorMessage);
  } else {
    Alert.alert("Registration Failed");
  }
  })
}
  }


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <NativeBaseProvider style={{ backgroundColor: "#D2822D" }}>
      <View style={{ backgroundColor: "#594057", flex: 1 }}>
        <Image
          style={{
            height: 100,
            width: 100,
            marginLeft: 160,
            marginTop: 30,
            // marginBottom: 10,
          }}
          source={require("../../assets/images/coding.png")}
          alt="App Logo"
        ></Image>
        {/* <Image
          style={{
            height: 100,
            width: 100,
            marginLeft: 160,
            marginTop: 100,
            marginBottom: 20,
          }}
          source={require("/Users/user/Desktop/frontend/FYP/assets/images/coding.png")}
        ></Image> */}
        <Center w="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <View style={{ flexDirection: "row", marginTop: 30 }}>
              <Heading
                size="lg"
                fontWeight="600"
                color="warmGrey.800"
                _dark={{
                  color: "warmGray.50",
                }}
              >
                Welcome
              </Heading>
            </View>
            <Heading
              mt="1"
              _dark={{
                color: "warmGray.200",
              }}
              color="white"
              fontWeight="medium"
              size="xs"
            >
              Sign up to continue!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>
                  <Text color="white">First Name</Text>
                </FormControl.Label>
                <Input
                  type="text"
                  value={fname}
                  onChangeText={(text) => setFname(text)}
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>
                  <Text color="white">Last Name</Text>
                </FormControl.Label>
                <Input
                  type="text"
                  value={lname}
                  onChangeText={(text) => setLname(text)}
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>
                  <Text color="white">Email ID</Text>
                </FormControl.Label>
                <Input
                  type="email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </FormControl>
              {!isReg ?(
                <Button
                mt="2"
                colorScheme="indigo"
              >
                <ActivityIndicator size="small" color="#333" />
              </Button>

              ):(
                <Button
                onPress={() => {
                  handleSubmit();
                }}
                mt="2"
                backgroundColor={"#b14b4b"}
                colorScheme="indigo"
              >
                Sign up
              </Button>

              )}
              
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="white"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  I'm an old user.{" "}
                </Text>
                <Link
                  _text={{
                    fontSize: "sm",
                    fontWeight: "500",
                    color: "indigo.350",
                  }}
                  onPress={() => navigation.navigate("Login")}
                >
                  Sign in
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </View>
    </NativeBaseProvider>
  );
};

export default Register;
