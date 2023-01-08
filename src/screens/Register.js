// import React from "react";
// import { useState } from "react";

// import Ionicons from "@expo/vector-icons/Ionicons";
// // import all the components we are going to use
// import {
//   TextInput,
//   StyleSheet,
//   View,
//   Animated,
//   Easing,
//   TouchableHighlight,
//   Text,
// } from "react-native";

// import { Button, NativeBaseProvider, Heading } from "native-base";
// import { withOrientation } from "react-navigation";

// const Register = () => {
//   const [firstName, setFname] = useState("");
//   const [lastName, setLname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [contact, setContact] = useState("");
//   const [profilePic, setProfile] = useState("");

//   let rotateValueHolder = new Animated.Value(0);

//   // const startImageRotateFunction = () => {
//   //   rotateValueHolder.setValue(0);
//   //   Animated.timing(rotateValueHolder, {
//   //     toValue: 1,
//   //     duration: 5000,
//   //     easing: Easing.linear,
//   //     useNativeDriver: false,
//   //   }).start(() => startImageRotateFunction());
//   // };

//   // const RotateData = rotateValueHolder.interpolate({
//   //   inputRange: [0, 1],
//   //   outputRange: ["0deg", "360deg"],
//   // });

//   return (
//     <NativeBaseProvider>
//       <View style={styles.container}>
//         <Text style={styles.textStyle}>SIGN UP</Text>
//         <Animated.Image
//           style={{
//             width: 150,
//             height: 150,
//             top: -120,
//             marginTop: 110,
//             // transform: [{ rotate: RotateData }],
//           }}
//           source={require("../../assets/images/coding.png")}
//         />
//         <View
//           style={{
//             flexDirection: "row",
//             marginHorizontal: 40,
//             alignItems: "center",
//             padding: 5,
//             borderWidth: 2,
//             borderRadius: 35,
//             shadowOpacity: 0.2,
//             marginTop: 50,
//             top: -40,
//           }}
//         >
//           <Ionicons name="md-person" size={32} color="black" />
//           <TextInput
//             placeholder="First Name"
//             value={firstName}
//             onChangeText={(text) => setFname(text)}
//             keyboardType="default"
//             style={styles.input}
//           />
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             marginHorizontal: 40,
//             alignItems: "center",
//             padding: 5,
//             borderWidth: 2,
//             borderRadius: 35,
//             shadowOpacity: 0.2,
//             top: -20,
//           }}
//         >
//           <Ionicons name="md-person" size={32} color="black" />
//           <TextInput
//             placeholder="Last Name"
//             value={lastName}
//             onChangeText={(text) => setLname(text)}
//             keyboardType="default"
//             style={styles.input}
//           />
//         </View>

//         <View
//           style={{
//             flexDirection: "row",
//             marginHorizontal: 40,
//             alignItems: "center",
//             padding: 5,
//             borderWidth: 2,
//             borderRadius: 35,
//             shadowOpacity: 0.2,
//             top: 0,
//           }}
//         >
//           <Ionicons name="md-mail" size={32} color="black" />
//           <TextInput
//             placeholder="Email"
//             value={email}
//             onChangeText={(text) => setEmail(text)}
//             keyboardType="email-address"
//             secureTextEntry
//             style={styles.input}
//           />
//         </View>

//         <View
//           style={{
//             flexDirection: "row",
//             marginHorizontal: 40,
//             alignItems: "center",
//             padding: 5,
//             borderWidth: 2,
//             borderRadius: 35,
//             shadowOpacity: 0.2,
//             top: 20,
//           }}
//         >
//           <Ionicons name="md-key" size={32} color="black" />
//           <TextInput
//             placeholder="Password"
//             value={password}
//             onChangeText={(text) => setPassword(text)}
//             keyboardType="visible-password"
//             secureTextEntry
//             style={styles.input}
//           />
//         </View>

//         <View
//           style={{
//             flexDirection: "row",
//             marginHorizontal: 40,
//             alignItems: "center",
//             padding: 5,
//             borderWidth: 2,
//             borderRadius: 35,
//             shadowOpacity: 0.2,
//             top: 40,
//             marginBottom: 50,
//           }}
//         >
//           <Ionicons name="md-call" size={32} color="black" />
//           <TextInput
//             placeholder="Contact"
//             value={contact}
//             onChangeText={(text) => setContact(text)}
//             keyboardType="default"
//             secureTextEntry
//             style={styles.input}
//           />
//         </View>

//         <View marginBottom={"20%"}>
//           <Button style={styles.buttonStyle}>SIGN UP</Button>
//         </View>
//         {/* <TouchableHighlight
//         onPress={startImageRotateFunction}
//         style={styles.buttonStyle}
//       >
//         <Text style={styles.buttonTextStyle}>Start Image Rotate Function</Text>
//       </TouchableHighlight> */}
//       </View>
//     </NativeBaseProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#D2822D",
//   },
//   input: {
//     padding: 2,
//     width: "80%",
//     marginLeft: 10,
//     fontFamily: "Roboto-Light",
//     color: "white",
//     fontSize: 20,
//   },
//   textStyle: {
//     top: 250,
//     marginBottom: 40,
//     fontFamily: "Roboto-Black",
//     color: "beige",
//     fontSize: 40,
//     textAlign: "center",
//   },
//   buttonStyle: {
//     height: 55,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 35,
//     marginHorizontal: 20,
//     marginVertical: 10,
//     borderWidth: 1,
//     minWidth: 250,
//     shadowOpacity: 0.3,
//   },
//   buttonTextStyle: {
//     fontFamily: "Roboto-Black",
//     fontSize: 20,
//     padding: 5,
//     color: "white",
//     textAlign: "center",
//   },
// });

// export default Register;


import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
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
import { Alert, View, Toast } from "react-native";
import { AuthContext } from "../context/AuthContext";


const Register = ({navigation}) => {
  
const {serverUrl, serverPort} = useContext(AuthContext);
const baseUrl= serverUrl + serverPort;

  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [hasShownAlert, setHasShownAlert] = useState(false);
  const [emailError, setemailError] = useState();
  const [image, setImage] = useState(null);
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = () => {
    console.log("hi");
    if (!email) {
      Alert.alert("Email is required.");
    } else if (!regEmail.test(email)) {
      Alert.alert("Invalid Email");
    } 
    else{

      fetch(`${baseUrl}/api/signup`,{
      method:"post",
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        "firstName":fname,
        "lastName":lname,
        "email":email,
      })
    })
    .then(res=>{
      res.json()
      navigation.navigate("Login")
      })
    .then(data=>{
      console.log(data)
    })
    .catch(error => {
      console.error(error);
    });
    }
  };

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
      <View style={{ backgroundColor: "#D2822D", flex: 1 }}>
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
                color="coolGray.800"
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
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
            >
              Sign up to continue!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>First Name</FormControl.Label>
                <Input
                  type="text"
                  value={fname}
                  onChangeText={(text) => setFname(text)}
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>Last Name</FormControl.Label>
                <Input
                  type="text"
                  value={lname}
                  onChangeText={(text) => setLname(text)}
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>Email ID</FormControl.Label>
                <Input
                  type="email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </FormControl>

              

              <Button
                onPress={() => {
                  handleSubmit();
                }}
                mt="2"
                colorScheme="indigo"
              >
                Sign up
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  I'm an old user.{" "}
                </Text>
                <Link
                  _text={{
                    color: "indigo.500",
                    fontWeight: "medium",
                    fontSize: "sm",
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