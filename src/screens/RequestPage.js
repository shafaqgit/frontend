import React, { useState, useEffect ,useContext} from "react";

import Swipeable from "react-native-gesture-handler/Swipeable";
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
import axios from "axios";
//import { flexbox } from "native-base/lib/typescript/theme/styled-system";
const ITEM_MARGIN_BOTTOM = 20;

const RequestPage = () => {
  const [friend, setFriend] = useState(true);
  const [activeButtons, setActiveButtons] = useState([]);
  const [isSent, setIsSent] = useState([]);
  const [activeButtonsR, setActiveButtonsR] = useState([]);
  const [isRem, setIsRem] = useState([]);

  const {serverUrl, serverPort, userInfo}= useContext(AuthContext);
  const baseUrl = serverUrl+serverPort;
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [key, setKey] = useState(null);
  const [color, setColor] = useState(true);
  const [anyUser, setAnyUser] = useState(false);
  let row = [];
  let prevOpenedRow;
  const profPic = require("../../assets/images/profile.jpg");

  const handleAcceptReq = (index,id) => {
   

     // PUT request using axios with error handling
     setIsSent((isSent) => [...isSent, id]);

     const axios_body = { "userId": userInfo.user._id };
     console.log("Axios body is: ", axios_body);
     axios.put(`${baseUrl}/api/${id}/accept`, axios_body)
         .then(response => {
          console.log( response.data )
          setActiveButtons((activeButtons) => [...activeButtons, id]);
        })
         .catch(error => {
             console.log({ errorMessage: error });
             console.error('There was an error!', error);
         })
         .finally(() => {
          
          setIsSent((isSent) => isSent.filter((i) => i !== id));
        });

    console.log("User-Id is: ", id)
    
    
  };


  const handleDeclineReq = (id) => {
   

    // PUT request using axios with error handling
    setIsRem((isRem) => [...isRem, id]);

    const axios_body = { "userId": userInfo.user._id };
    console.log("Axios body is: ", axios_body);
    axios.put(`${baseUrl}/api/${id}/decline`, axios_body)
        .then(response => {
         console.log( response.data )
         setActiveButtonsR((activeButtonsR) => [...activeButtonsR, id]);
       })
        .catch(error => {
            console.log({ errorMessage: error });
            console.error('There was an error!', error);
        })
        .finally(() => {
         
         setIsRem((isRem) => isRem.filter((i) => i !== id));
       });

   console.log("User-Id is: ", id)
   
   
 };

  const getListPhotos = () => {

    const apiURL = baseUrl+"/api/friendRequests/"+userInfo.user._id;
  
    // const axios_body = { "userId": userInfo.user._id };
    fetch(apiURL)
      .then((res) => res.json())
      .then((resJSON) => {
        setData(resJSON);
        // console.log(resJSON);
        if(Object.keys(resJSON).length > 0){
          setAnyUser(true);
        }
      })
      .catch((error) => {
        console.log("API ERROR", error);
      })
      .finally(() => {
        setisLoading(false);
      });

  };

  
  useEffect(() => {
    getListPhotos();
    return () => {};
  }, []);

  const closeRow = (index) => {
    console.log("closerow");
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };


  const renderItem = ({ item, index }, onClick) => {
    return (
      <NativeBaseProvider>
      
          <View style={styles.item}>
            <View style={{ flexDirection: "row" }}>
            
              <Image
                style={styles.Image}
                source={ profPic }
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
                   Request Accepted
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

                    }}
                    onPress={() => {
                      handleAcceptReq(index,item._id);
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontStyle: "Roboto-Black",
                        color: "white",
                      }}
                    >
                      Accept 
                    </Text>
                  </Button>
                ))}

              </TouchableOpacity>

              <TouchableOpacity>
              {isRem.includes(item._id) ? 
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
                activeButtonsR.includes(item._id) ? (
                    <Text
                      style={{
                        
                        paddingTop: 15,
                        marginRight: 50,
                      }}
                    >
                     Request Rejected
                    </Text>
                  ) : (
              <Button
                style={{
                    width: 130,
                    height: 35,
                    top: 5,
                    padding: 10,
                    marginRight: 5,
                    backgroundColor: "red",
                }}
                onPress={() => {
                    handleDeclineReq(item._id);
                }}
                >
                <Text
                  style={{
                      fontWeight: "bold",
                      fontStyle: "Roboto-Black",
                      color: "white",
                    }}
                    >
                  Decline 
                </Text>
              </Button>
              ))}
            </TouchableOpacity>
            </View>
          </View>
     

      
      </NativeBaseProvider>
    );
  };

  const deleteItem = async ({ item, index }) => {
    // console.log(item, index);
    let a = data;
    a.splice(index, 1);
    console.log("Deleted");
    setData([...a]);
  };
  return (
    <View style={styles.container}>
      
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        anyUser ? (
        <View style={{ backgroundColor: "#594057", flex: 1 }}>
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
          <Text style={styles.text}>You Have No Friend Requests</Text>
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
});

export default RequestPage;
