import React from "react";
import { StyleSheet, View } from "react-native";
const OnlineStatus = (props) => {
  return <View style={props.color ? styles.green : styles.red}></View>;
};
const styles = StyleSheet.create({
  green: {
    borderRadius: 50,
    height: 15,
    width: 15,
    backgroundColor: "green",
  },
  red: {
    borderRadius: 50,
    height: 15,
    width: 15,
    backgroundColor: "red",
  },
});

export default OnlineStatus;