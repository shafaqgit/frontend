import React, { useState, useEffect, useContext, useRef } from "react";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  LogBox,
  ImageDetail,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  Box,
  Card,
  Text,
  Button,
  Center,
  Progress,
  NativeBaseProvider,
} from "native-base";


const MultiplayerResultScreen = ({ navigation }) => {
  
  const gameResult=navigation.state.params.gameData.winner;
  console.log(gameResult)

  return(
    <NativeBaseProvider>
    <Text> {gameResult} </Text>
    </NativeBaseProvider>
  )

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

export default MultiplayerResultScreen;
