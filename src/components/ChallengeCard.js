import React from "react";
import { StyleSheet, View,TouchableOpacity } from "react-native";
import {
    Button,
    Text,
    Image,
    
  } from "native-base";
  import  socket  from "../service/socket";

  

const ChallengeCard = (props) => {
    const profPic = require("../../assets/images/profile.jpg");


    const acceptChallengeRequest = (gameWith,gameFrom) => {
   
        socket.emit('acceptChallenge', {gameFrom, gameWith });
        props.setVis(false);
     };


     const rejectChallengeRequest = (gameWith,gameFrom) => {
   
      socket.emit('rejectChallenge', {gameFrom, gameWith });

   };
 
  return(  <View style={styles.item}>
    <View style={{ flexDirection: "row" }}>
      <Image
        style={styles.Image}
        // source={ images[item.profilePicture] }
        source={profPic}
        resizeMode="contain"
        alt="User Profile"
      />
      {/* <View style={styles.wrapText}>
        <Text style={styles.textStyle}> {props.item.challenger.user.firstName}  {props.item.challenger.user.lastName}</Text>
      </View> */}
    </View>

    <View
      style={{ flexDirection: "row", marginLeft: 90, marginTop: 10 }}
    >

    <TouchableOpacity>
    

        <Button
            style={{
              width: 135,
              height: 40,
              top: 5,
              padding: 10,
              justifyContent: "center",
              marginRight: 5,
              backgroundColor: "red",

             }}
            onPress={() => {
              props.setVis(false);
              rejectChallengeRequest(props.item.challengee,props.item.challenger.user._id);
            }}
           >
            <Text
              style={{
                fontWeight: "bold",
                fontStyle: "Roboto-Black",
                color: "white",
              }}
            >
              Reject
            </Text>
         </Button>
         </TouchableOpacity>      


         <Button
            style={{
              width: 135,
              height: 40,
              top: 5,
              padding: 10,
              justifyContent: "center",
              marginRight: 5,
              backgroundColor: "#2b692d",

             }}
            onPress={() => {
                acceptChallengeRequest(props.item.challengee,props.item.challenger.user._id);
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
    {/* ))} */}
    
    </View>
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

export default ChallengeCard;