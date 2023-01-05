import React from "react";
import { useState, useContext } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
// import all the components we are going to use
import {
  TextInput,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableHighlight,
  Text,
} from "react-native";
import { Button, NativeBaseProvider } from "native-base";
import { withOrientation } from "react-navigation";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login} = useContext(AuthContext);

  let rotateValueHolder = new Animated.Value(0);

  // const startImageRotateFunction = () => {
  //   rotateValueHolder.setValue(0);
  //   Animated.timing(rotateValueHolder, {
  //     toValue: 1,
  //     duration: 5000,
  //     easing: Easing.linear,
  //     useNativeDriver: false,
  //   }).start(() => startImageRotateFunction());
  // };

  // const RotateData = rotateValueHolder.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ["0deg", "360deg"],
  // });

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.textStyle}>WELCOME</Text>
       
        <Animated.Image
          style={{
            width: 200,
            height: 200,
            top: -200,
            marginTop: 60,
            // transform: [{ rotate: RotateData }],
          }}
          source={require("../../assets/images/coding.png")}
        />
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 40,
            alignItems: "center",
            padding: 10,
            borderWidth: 2,
            borderRadius: 35,
            shadowOpacity: 0.2,
            top: -60,
          }}
        >
          <Ionicons name="md-mail" size={32} color="black" />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            style={styles.input}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 40,
            alignItems: "center",
            padding: 10,
            borderWidth: 2,
            borderRadius: 35,
            shadowOpacity: 0.2,
            top: -30,
          }}
        >
          <Ionicons name="md-call" size={32} color="black" />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            keyboardType="default"
            secureTextEntry
            style={styles.input}
          />

        </View>
        <View>
          <Button style={styles.buttonStyle} onPress={()=>{login(email, password)}}>LOGIN</Button>
          {/* <Text style={styles.buttonTextStyle}>LOGIN</Text> */}
        </View>

        {/* <TouchableHighlight
        onPress={startImageRotateFunction}
        style={styles.buttonStyle}
      >
        <Text style={styles.buttonTextStyle}>Start Image Rotate Function</Text>
      </TouchableHighlight> */}



      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D2822D",
  },
  input: {
    padding: 2,
    width: "80%",
    marginLeft: 10,
    fontFamily: "Roboto-Light",
    color: "white",
    fontSize: 20,
  },
  textStyle: {
    top: 200,
    marginBottom: 50,
    fontFamily: "Roboto-Black",
    color: "beige",
    fontSize: 40,
    textAlign: "center",
  },
  buttonStyle: {
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    minWidth: 250,
    shadowOpacity: 0.3,
  },
  buttonTextStyle: {
    fontFamily: "Roboto-Black",
    fontSize: 20,
    padding: 5,
    color: "white",
    textAlign: "center",
  },
});

export default Login;
