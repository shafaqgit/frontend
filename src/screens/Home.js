import React from "react";
// import RNFS from 'react-native-fs';
// import RNFetchBlob from 'rn-fetch-blob'
import * as FileSystem from 'expo-file-system';
import { useState, useContext , useEffect} from "react";
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
import {StyleSheet} from "react-native";
import { AuthContext } from "../context/AuthContext";


const Home = ({ navigation }) => {
  


  const { logout, userInfo } = useContext(AuthContext);
  const {newFilePath, setNewFilePath} = useState(null);


  const [imageUri, setImageUri] = React.useState(null);
  // console.log(userInfo.user.profilePicture);
  const decoded = userInfo.user.profilePicture;
  React.useEffect(() => {
    async function decodeAndDisplay() {
     
      // Write the decoded image data to a file
      const fileName = 'image.jpg';
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;
      await FileSystem.writeAsStringAsync(fileUri, decoded, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Set the image URI
      setImageUri(fileUri);
    }

    decodeAndDisplay();
  }, []);

  return (
    <NativeBaseProvider>
       <Image
          style={styles.Image}
          source={{ uri: imageUri }}
          resizeMode="contain"
          alt = "Profile Picture"
        />    

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
        onPress={() => navigation.navigate("Friends")}
      >
        All Friends List
      </Button>
      <Button
        style={{ backgroundColor: "#A66117" }}
        onPress={() => navigation.navigate("RequestPage")}
      >
        Friend Requests
      </Button>
      <Button
        style={{ backgroundColor: "#A66117" }}
        onPress={() => navigation.navigate("NonFriends")}
      >
        All Non-Friends List
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: 18,
  },
  Image: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  wrapText: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  item: {
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    padding: 10,
  },
});
export default Home;
