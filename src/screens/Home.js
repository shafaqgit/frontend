import React from "react";
// import Modal from "react-native-modal";
// import RNFS from 'react-native-fs';
// import RNFetchBlob from 'rn-fetch-blob'
import * as FileSystem from "expo-file-system";
import { useState, useContext, useEffect } from "react";
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
  Modal,
  //   errors,
  Card,
  NativeBaseProvider,
  Input,
} from "native-base";
import { StyleSheet,View,TouchableOpacity,ActivityIndicator } from "react-native";
import { AuthContext } from "../context/AuthContext";
import io from "socket.io-client";
import  socket  from "../service/socket";
import ChallengeCard from "../components/ChallengeCard";

// const Home = ({ navigation }) => {

const Home = (props) => {

  const {serverUrl, serverPort, userInfo, onlineUser}= useContext(AuthContext);
  const baseUrl = serverUrl + serverPort;

  
  // const socket = io(serverUrl + socketPort);

  // const {newFilePath, setNewFilePath} = useState(null);

  // const [imageUri, setImageUri] = React.useState(null);
  // console.log(userInfo.user.profilePicture);

  // const decoded = userInfo.user.profilePicture;
  // React.useEffect(() => {
  //   async function decodeAndDisplay() {

  //     // Write the decoded image data to a file
  //     const fileName = 'image.jpg';
  //     const fileUri = `${FileSystem.documentDirectory}${fileName}`;
  //     await FileSystem.writeAsStringAsync(fileUri, decoded, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });

  //     // Set the image URI
  //     setImageUri(fileUri);
  //   }

  //   decodeAndDisplay();
  // }, []);

  //----------------------------------------------------------------------------------------
  const [challengeRequest, setChallengeRequest] = useState(null);
  const [acceptChallenge, setAcceptChallenge] = useState(null);

  const [vis,setVis]=useState(false)
  
  useEffect(() => {
    socket.on('challengeRequest', (data) => {
      setChallengeRequest(data);
      setVis(true);
      // console.log("Got a challenge!");
    });
  
    // return () => {
    //   socket.off('challengeRequest');
    // };
  }, []);

  useEffect(() => {
    socket.on('startGame', (gameData) => {
      // setAcceptChallenge(data);

      console.log("Challenge Accepted.. Game Going to start: ");
       props.nav.navigate("OnlineGamePage", { gameData });
      // navigation.navigate("OnlineGamePage")
    });
  
  }, []);



  // useEffect(() => {

  //     if(acceptChallenge){
  //       // props.nav.navigate("OnlineFriends")
  //      navigation.navigate("OnlineGamePage")
  //     }
  
  // }, []);



  // const downloadImage = async (imageUrl) => {
  //   console.log("Image Url is: ", imageUrl);
  //   const fileName = imageUrl.split("/").pop();
  //   const newPath = `${FileSystem.documentDirectory}${fileName}`;

  //   try {
  //     await FileSystem.downloadAsync(imageUrl, newPath);
  //     return newPath;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const [image, setImage] = useState(null);

  // useEffect(() => {
  //   const loadImage = async () => {
  //     const imagePath = await downloadImage(
  //       baseUrl + "/api/Image/" + userInfo.user.profilePicture
  //     );
  //     setImage(imagePath);
  //   };
  //   loadImage();
  // }, [image]);

  return (
    <NativeBaseProvider>
      {/* <Image
          style={styles.Image}
          source={{ uri: imageUri }}
          resizeMode="contain"
          alt = "Profile Picture"
        />     */}

      {/* <Image
      style={{ width: 200, height: 200 }}
      source={image ? { uri: image } : null}
      alt="Profile Picture"
    /> */}

      <Box bg={"#594057"} flex={1}>
        <Box
          bg="white"
          shadow={5}
          rounded="lg"
          maxWidth="90%"
          margin={5}
          marginTop={"40%"}
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
              style={{ backgroundColor: "#b14b4b" }}
              
              // onPress={() => navigation.navigate("Xyz")}
              onPress={() => props.nav.navigate("Topics")}
              
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
            <Button style={{ backgroundColor: "#b14b4b" }}
            // onPress={() => navigation.navigate("OnlineFriends")}
            onPress={() => props.nav.navigate("OnlineFriends")}
            
            >
              Challenge Mode
            </Button>
          </Stack>
        </Box>

        {/* ; } */}
      </Box>

      {/* <Button title="Show Popup" onPress={() => setVis(true)} /> */}
     

      <Modal isOpen={vis} onClose={() => {
        setChallengeRequest(null)
        setVis(false)}}>
        <View style={{ backgroundColor: 'white', padding: 16 }}>

          {/* --------------------------------------------------------------------------------------------- */}

            <ChallengeCard item={challengeRequest} scr={props.nav} setVis={setVis}/>
            
            {/* -------------------------------------------------------------------------------------------------- */}
          {/* <Button title="Close" onPress={() => {
            setChallengeRequest(null)
            setVis(false)}} /> */}

        </View>
      </Modal>
      
      
      {/* {challengeRequest ? <Text>{challengeRequest.challenger.user.firstName} Sent a challenge</Text> : <Text>No any Requests</Text>} */}
     
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
