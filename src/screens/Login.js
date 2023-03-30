import React, { useState, useContext } from "react";
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
import { Alert, View, Toast , ActivityIndicator} from "react-native";
import { AuthContext } from "../context/AuthContext";

const Login =  ({ navigation }) => {
  const { login, isLoading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasShownAlert, setHasShownAlert] = useState(false);
  const [emailError, setemailError] = useState();
  // let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  let regEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const handleSubmit = () => {
    console.log(email);
    if (!email) {
      Alert.alert("Email is required.");
    } else if (!password) {
      Alert.alert("Password is required.");
    } else if (!regEmail.test(email)) {
      Alert.alert("Invalid Email");
    }
    // else{
    //   if (!login(email, password)){
    //     Alert.alert("Invalid Email or Password.");
    //   }
    // }
    else {
      login(email, password)
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
              color="warmGray.800"
              
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
              color="white"
              fontWeight="medium"
              size="xs"
            >
              Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
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
              <FormControl>
                <FormControl.Label>
                  <Text color="white">Password</Text>
                </FormControl.Label>
                <Input
                  type="password"
                  value={password}
                  minLength={3}
                  maxLength={50}
                  onChangeText={(text) => setPassword(text)}
                />
                {/* <Link
                  _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "indigo.250",
                  }}
                  alignSelf="flex-end"
                  mt="1"
                >
                  Forget Password?
                </Link> */}
              </FormControl>
              {isLoading ? (
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
                Sign in
              </Button>)}
                
              
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="white"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  I'm a new user.{" "}
                </Text>
                <Link
                  _text={{
                    fontSize: "sm",
                    fontWeight: "500",
                    color: "indigo.350",
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
