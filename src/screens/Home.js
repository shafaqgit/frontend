import React from "react";
// import RNFS from 'react-native-fs';
// import RNFetchBlob from 'rn-fetch-blob'
import { useState, useContext } from "react";
import {
  VStack,
  FormControl,
  Button,
  Center,
  Container,
  Header,
  Content,
  CardItem,
  Text,
  Body,
  Box,
  Image,
  Stack,
  Heading,
  //   errors,
  Card,
  NativeBaseProvider,
  Input,
} from "native-base";
import {} from "react-native";
import { AuthContext } from "../context/AuthContext";


const Home = ({ navigation }) => {
  const { logout, userInfo } = useContext(AuthContext);

  // const base64Image = FS.Base64.encode(userInfo.user.profilePicture);
  // console.log(base64Image);
  // const userImg = require("../../assets/images/profile.jpg");

  return (
    <NativeBaseProvider>
              {/* <Center>
              <Image size={150} borderRadius={100} source={{ uri: SERVER_IP + './public/uploads/'+userInfo.user._id +'_profile'+'.jpeg'}} alt="Alternate Text" />
              </Center> */}
              

      <Box bg={"orange.200"} flex={1}>
              
        <Box
          bg="white"
          shadow={5}
          rounded="lg"
          maxWidth="90%"
          margin={5}
          marginTop={"30%"}
          // justifyContent={"center"}
        >
          <Image
            source={{
              uri: "https://i.pinimg.com/originals/54/e3/7d/54e37d8074ebcde1d96c77d7b2a7f310.gif",
            }}
            alt="image base"
            resizeMode="cover"
            height={150}
            roundedTop="md"
          />
          <Text bold position="absolute" color="white" top={0} m={[4, 4, 8]}>
            NEWS
          </Text>
          <Stack space={4} p={[4, 4, 8]}>
            <Button
              style={{ backgroundColor: "#A66117" }}
              onPress={() => navigation.navigate("Xyz")}
            >
              Practice Mode
            </Button>
          </Stack>
        </Box>

        <Box
          bg="white"
          shadow={5}
          rounded="lg"
          maxWidth="90%"
          margin={5}
          marginTop={"10%"}
          // justifyContent={"center"}
        >
          <Image
            source={{
              // uri: "https://cdn.dribbble.com/users/2726/screenshots/2874677/media/01ba523c71acc05534b3be18d903eba7.gif",
              uri: "https://i.pinimg.com/originals/49/84/c0/4984c0ac41b13002de2873e622efa63c.gif",
            }}
            alt="image base"
            resizeMode="cover"
            height={150}
            roundedTop="md"
          />
          <Text bold position="absolute" color="white" top={0} m={[4, 4, 8]}>
            NEWS
          </Text>
          <Stack space={4} p={[4, 4, 8]}>
            <Button style={{ backgroundColor: "#A66117" }}>
              Challenge Mode
            </Button>
          </Stack>
        </Box>

        {/* ; } */}
      </Box>
      <Button
        style={{ backgroundColor: "#A66117" }}
        onPress={() => navigation.navigate("Edit")}
      >
        Edit
      </Button>
      <Button
        style={{ backgroundColor: "#A66117" }}
        onPress={() => navigation.navigate("SampleForm")}
      >
        SampleForm
      </Button>

      <Text style={{ fontSize: 18, fontFamily: "Roboto-Medium" }}>
        Hello {userInfo.user.firstName}
      </Text>
      <Button
        style={{ backgroundColor: "#bc231e" }}
        onPress={() => {
          logout();
        }}
      >
        Logout
      </Button>
    </NativeBaseProvider>
  );
};

export default Home;