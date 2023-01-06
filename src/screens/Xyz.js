import React, { useState } from "react";
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

const Xyz = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasShownAlert, setHasShownAlert] = useState(false);
  const [emailError, setemailError] = useState();
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = () => {
    console.log("hi");
    if (!email) {
      Alert.alert("Email is required.");
    } else if (!regEmail.test(email)) {
      Alert.alert("Invalid Email");
    } else if (!password) {
      Alert.alert("Password is required.");
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
                  maxLength={6}
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
                  href="#"
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

export default Xyz;
