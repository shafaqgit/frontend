// import React from "react";
// import { useState, useContext } from "react";

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
// import { Button, NativeBaseProvider } from "native-base";
// import { withOrientation } from "react-navigation";
// import { AuthContext } from "../context/AuthContext";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const {login} = useContext(AuthContext);

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
//         <Text style={styles.textStyle}>WELCOME</Text>
       
//         <Animated.Image
//           style={{
//             width: 200,
//             height: 200,
//             top: -200,
//             marginTop: 60,
//             // transform: [{ rotate: RotateData }],
//           }}
//           source={require("../../assets/images/coding.png")}
//         />
//         <View
//           style={{
//             flexDirection: "row",
//             marginHorizontal: 40,
//             alignItems: "center",
//             padding: 10,
//             borderWidth: 2,
//             borderRadius: 35,
//             shadowOpacity: 0.2,
//             top: -60,
//           }}
//         >
//           <Ionicons name="md-mail" size={32} color="black" />
//           <TextInput
//             placeholder="Email"
//             value={email}
//             onChangeText={(text) => setEmail(text)}
//             keyboardType="email-address"
//             style={styles.input}
//           />
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             marginHorizontal: 40,
//             alignItems: "center",
//             padding: 10,
//             borderWidth: 2,
//             borderRadius: 35,
//             shadowOpacity: 0.2,
//             top: -30,
//           }}
//         >
//           <Ionicons name="md-call" size={32} color="black" />
//           <TextInput
//             placeholder="Password"
//             value={password}
//             onChangeText={(text) => setPassword(text)}
//             keyboardType="default"
//             secureTextEntry
//             style={styles.input}
//           />

//         </View>
//         <View>
//           <Button style={styles.buttonStyle} onPress={()=>{login(email, password)}}>LOGIN</Button>
//           {/* <Text style={styles.buttonTextStyle}>LOGIN</Text> */}
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
//     top: 200,
//     marginBottom: 50,
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

// export default Login;




import React, { useState , useContext} from "react";
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

const Login = ({navigation}) => {
  const {login} = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasShownAlert, setHasShownAlert] = useState(false);
  const [emailError, setemailError] = useState();
  // let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let regEmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const handleSubmit = () => {
    console.log(email);
    if (!email) {
      Alert.alert("Email is required.");
    }  else if (!password) {
      Alert.alert("Password is required.");
    }
    else if (!regEmail.test(email)) {
      Alert.alert("Invalid Email");
    }
    // else{
    //   if (!login(email, password)){
    //     Alert.alert("Invalid Email or Password.");
    //   }
    // }
    else{
      login(email, password);
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
            marginTop: 100,
            marginBottom: 20,
          }}
          source={require("../../assets/images/coding.png")}
          alt="Application Logo"
        ></Image>
        <Center w="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
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
            <Heading
              mt="1"
              _dark={{
                color: "warmGray.200",
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
            >
              Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email ID</FormControl.Label>
                <Input
                  type="email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  type="password"
                  value={password}
                  minLength={3}
                  maxLength={50}
                  onChangeText={(text) => setPassword(text)}
                />
                <Link
                  _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "indigo.500",
                  }}
                  alignSelf="flex-end"
                  mt="1"
                >
                  Forget Password?
                </Link>
              </FormControl>

              <Button
                onPress={() => {
                  handleSubmit();
                }}
                mt="2"
                colorScheme="indigo"
              >
                Sign in
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  I'm a new user.{" "}
                </Text>
                <Link
                  _text={{
                    color: "indigo.500",
                    fontWeight: "medium",
                    fontSize: "sm",
                  }}
                  onPress={() => navigation.navigate("Register")}
                >
                  Sign Up
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </View>
    </NativeBaseProvider>
  );
};

export default Login;