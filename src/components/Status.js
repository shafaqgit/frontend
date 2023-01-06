import React from "react";
import { StyleSheet, View } from "react-native";
const Status = (props) => {
  return <View style={props.color ? styles.green : styles.red}></View>;
};
const styles = StyleSheet.create({
  green: {
    borderRadius: "50",
    height: 20,
    width: 20,
    backgroundColor: "green",
  },
  red: {
    borderRadius: "50",
    height: 20,
    width: 20,
    backgroundColor: "red",
  },
});

export default Status;
