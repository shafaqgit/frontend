import React, { useState, useEffect, useContext, useRef } from "react";
// import ConfettiCannon from 'react-native-confetti-cannon';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  LogBox,
  Text,
  ImageDetail,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../context/AuthContext";


const MultiplayerResultScreen = (props) => {
  
  const { userInfo }= useContext(AuthContext);
  // console.log("-->",navigation.state.params.gameData.players[0][userInfo.user._id].Total_Score);
  console.log(props.navigation.state.params);
  console.log("my id:", userInfo.user._id)

  const score = props.navigation.state.params.percentageScore
  
  return (
    <View style={styles.container}>
      {props.navigation.state.params.gameData.winner===userInfo.user._id ? (
     
      props.navigation.state.params.gameData.left === true ? (<View>
         <Text style={styles.won}>You Won</Text>
       <Text style={styles.title}>Assessment Results</Text>
      {/* <Text style={styles.subtitle}>
        You answered {navigation.state.params.count} out of {10} questions correctly.
      </Text> */}
      <Text style={styles.score}>
        Your total score is {props.navigation.state.params.gameData.players[userInfo.user._id].Total_Score}
      </Text></View>
      ):(<View>
        <Text style={styles.won}>You Won</Text>
        <Text style={styles.title}>
       by resignation
      </Text> 
      </View>
      )
      ):(
      <Text style={styles.lost}>You lost 😔{'\n'}Better luck next time.</Text>)}
      <Text style={styles.score}>
        Your total score is {props.navigation.state.params.gameData.players[userInfo.user._id].Total_Score}
      </Text>
      
      {/* {score < 50 ? (
      <ConfettiCannon
        count={300}
        origin={{ x: -10, y: 0 }}
        autoStart={true}
        colors={['#333333', '#555555', '#222222']}
        shape="triangle"
        size={10}
        fallSpeed={20000}
        blastDirection={-90}
      />
      ):(

      <ConfettiCannon
        count={200}
        origin={{ x: -10, y: 0 }}
        autoStart={true}
        size={15}
        fallSpeed={10000}
        blastDirection={-90}
      />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    
  },
  won: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#00FF00', // green color
    textAlign: 'center',
  },
  lost: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#FF0000', // red color
    textAlign: 'center',
  },
});

export default MultiplayerResultScreen;
