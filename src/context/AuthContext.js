import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect } from "react";
import { Buffer } from "buffer";
import axios from "axios";
import io from "socket.io-client";
import  socket  from "../service/socket";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const serverUrl = "http://192.168.10.11";
  const serverPort = ":3000";
  const socketPort = ":8080";
  const baseUrl = serverUrl + serverPort;
  // const socket = io(serverUrl + socketPort);


  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const [onlineUser, setOnlineUser] = useState(null);

  const [challengeRequest,setChallengeRequest]=useState(null);


  // useEffect(() => {
  //   socket.on('challengeRequest', (data) => {
  //     setChallengeRequest(data);
  //     console.log("Got a challenge!",data);
  //   });
  
  // }, [challengeRequest]);

  // useEffect(() => {

  //   socket.on("connect", () => {
  //     console.log("New Socket Connection: ",socket.id); 
  //   });

  // }, []);


  useEffect(() => {
    socket.on("userConnected", (user) => {
      const set = new Set(JSON.parse(user));
      setOnlineUser(set);
      // console.log("Socket-ID:",socket.id);
    });

    socket.on("userDisconnected", (user) => {
      const set = new Set(JSON.parse(user));
      setOnlineUser(set);
    });

   
    // return () => {
    //   socket.disconnect();
    // };
  }, [onlineUser]);

  const login = (email, password) => {
    setIsLoading(true);
    axios
      .post(`${baseUrl}/api/player/signin`, {
        email,
        password,
      })
      .then((res) => {
        // Decode the base64-encoded image data
        // res.data.user.profilePicture = Buffer.from(res.data.user.profilePicture, 'base64').toString();
        // res.data.user.profilePicture = res.data.user._id+"_profile.jpeg"
        let userInfo = res.data;
        setUserInfo(userInfo);
        setUserToken(userInfo.token);
        AsyncStorage.setItem("userToken", userInfo.token);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));

        console.log(userInfo.user.firstName, " joined and Socket-ID:",socket.id);
       

        socket.emit("login", userInfo.user._id);
        // return true;
      })
      .catch((e) => {
        console.log(`Login error ${e}`);
        // return false;
      })
      .finally(() => {
        setIsLoading(false);
      });
    // setUserToken("IamSecretToken");
    // AsyncStorage.setItem('userToken', 'IamSecretToken');

    console.log("Clicked the logged-in");
    console.log("Entered email and Password is: ", email, "  ", password);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userInfo");
    setIsLoading(false);
    console.log("Clicked the logged-out");
    socket.emit("logout", userInfo.user._id);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }

      setIsLoading(false);
    } catch (e) {
      console.log(`isLogged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading,
        userToken,
        userInfo,
        serverUrl,
        serverPort,
        socketPort,
        onlineUser,
        setUserInfo,
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
