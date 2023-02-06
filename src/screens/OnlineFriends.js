import React, { useState, useEffect ,useContext} from "react";
import OnlineStatus from "../components/OnlineStatus";
import Swipeable from "react-native-gesture-handler/Swipeable";
import * as FileSystem from 'expo-file-system';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  ImageDetail,
  TouchableOpacity,
  Text,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Button, NativeBaseProvider, Heading } from "native-base";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import { AuthContext } from "../context/AuthContext";
//import { flexbox } from "native-base/lib/typescript/theme/styled-system";
import axios from "axios";
import io from "socket.io-client";

const ITEM_MARGIN_BOTTOM = 20;

const OnlineFriends = () => {
  
  const {serverUrl, serverPort, userInfo, socketPort,onlineUser}= useContext(AuthContext);
  const baseUrl = serverUrl+serverPort;
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [key, setKey] = useState(null);
  const [color, setColor] = useState(false);
  const [anyOnlineFriends, setAnyOnlineFriends] = useState(false);
  const [isSent, setIsSent] = useState([]);
  const [activeButtons, setActiveButtons] = useState([]);

  const socket = io(serverUrl + socketPort);
  
  const downloadImage = async (imageUrl) => {
    // console.log("Image Url is: ", imageUrl);
    const fileName = imageUrl.split('/').pop();
    const newPath = `${FileSystem.documentDirectory}${fileName}`;
  
    try {
      await FileSystem.downloadAsync(imageUrl, newPath);
      return newPath;
    } catch (error) {
      console.error(error);
    }
  };

  const [images, setImages] = useState({});

    const loadProfPic = async (profPic) => {
      const imagePath = await downloadImage(baseUrl+'/api/Image/'+profPic);
      
      setImages({
        ...images,
        // [profPic]: imagePath,
        [profPic]: imagePath,
      });
      console.log("After setting image: ",images);
    }
    

  let row = [];
  let prevOpenedRow;
  const profPic = require("../../assets/images/profile.jpg");

  // console.log("List of online users:",onlineUser);
  // if(onlineUser!==null)
  // console.log("User present:",onlineUser.has("6373a5ed0e628115fcc3f8ac"));
  // Array.from(onlineUser).includes(userId)

  const sendChallengeRequest = (challenger,challengee) => {
   
    socket.emit('sendChallengeRequest', { challenger, challengee });
   
 };

  const getListPhotos = () => {

    if (onlineUser){
    const apiURL = baseUrl+"/api/onlineFriends/"+userInfo.user._id+"/"+JSON.stringify([...onlineUser]);
  
    // const axios_body = { "userId": userInfo.user._id };
    fetch(apiURL)
      .then((res) => res.json())
      .then((resJSON) => {
        setData(resJSON);

        if(Object.keys(resJSON).length > 0){

          // resJSON.forEach(user => {
          //   console.log("P-Pic: ",user.profilePicture);
          //   loadProfPic(user.profilePicture);
          //   console.log(images);
          // });

          setAnyOnlineFriends(true);
        }
        // console.log(resJSON);
      })
      .catch((error) => {
        console.log("API ERROR", error);
      })
      .finally(() => {
        setisLoading(false);
      });
    }
    else{
        setisLoading(false);
    }
  };

  
  useEffect(() => {
    getListPhotos();
    return () => {};
  }, []);

//   const closeRow = (index) => {
//     console.log("closerow");
//     if (prevOpenedRow && prevOpenedRow !== row[index]) {
//       prevOpenedRow.close();
//     }
//     prevOpenedRow = row[index];
//   };

  
  const renderItem = ({ item, index }, onClick) => {
    return (
      <NativeBaseProvider>
       
          <View style={styles.item}>
            <View style={{ flexDirection: "row" }}>
            {onlineUser!==null ? ( onlineUser.has(item._id) ? ( <OnlineStatus color={true} /> ) : (<OnlineStatus color={false} />)) :(<OnlineStatus color={false} />)}
              <Image
                style={styles.Image}
                // source={ images[item.profilePicture] }
                source={profPic}
                resizeMode="contain"
              />
              <View style={styles.wrapText}>
                <Text style={styles.textStyle}>{ item.firstName+" "+item.lastName}</Text>
              </View>
            </View>

            <View
              style={{ flexDirection: "row", marginLeft: 90, marginTop: 10 }}
            >

            <TouchableOpacity>
            {isSent.includes(item._id) ? 
            (
              <Button
              style={{
                width: 130,
                height: 35,
                top: 5,
                padding: 10,
                justifyContent: "center",
                marginRight: 5,
                backgroundColor: "red",
              }}
              
            >
               <ActivityIndicator size="small" color="#333" />

            </Button>
            ) : (

              activeButtons.includes(item._id) ? (
                <Text
                  style={{
                    
                    paddingTop: 15,
                    marginRight: 50,
                  }}
                >
                  Challenge Sent
                </Text>
              ) : (

            <Button
                    style={{
                      width: 130,
                      height: 35,
                      top: 5,
                      padding: 10,
                      justifyContent: "center",
                      marginRight: 5,
                      backgroundColor: "green",

                    }}
                    onPress={() => {
                        sendChallengeRequest(userInfo.user._id,item._id);
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontStyle: "Roboto-Black",
                        color: "white",
                      }}
                    >
                       Challenge
                    </Text>
                  </Button>
            ))}
            </TouchableOpacity>      
            </View>
          </View>
        
      </NativeBaseProvider>
    );
  };

  return (
    <View style={styles.container}>
      
      {isLoading ? (
        <ActivityIndicator />
      ) : (
         anyOnlineFriends ? (
        <View style={{ backgroundColor: "#2d596b", flex: 1 }}>
          <FlatList
            data={data}
            keyExtractor={(item) => `key-${item._id}`}
            renderItem={(v) =>
              renderItem(v, () => {
                console.log("Pressed");
                deleteItem(v);
              })
            }
            contentContainerStyle={{ padding: 10 }}
          />
        </View>
        ) : (
          <View style={styles.container2}>
          <Text style={styles.text}>No any friend is online at the moment</Text>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 18,
  },
  Image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  wrapText: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  item: {
    flexDirection: "column",
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
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default OnlineFriends;
