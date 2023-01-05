import Navigation from "./Navigation";
import AuthStack from "./AuthStack";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React,{ useContext } from 'react';
import { AuthContext } from "../context/AuthContext";




const AppNav = () => {
    //   const {isLoading, userToken} = useContext(AuthContext);
    const {isLoading, userToken} = useContext(AuthContext);
  if(isLoading){
    console.log("Loading...");
    return(
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size={'large'}/>
    </View>
    );
  }
  if(userToken !== null){
    console.log("Token is not null");
    return <Navigation />
  }else{
    console.log("Token is ZERO");
   return <AuthStack />
  }
  
}

export default AppNav;