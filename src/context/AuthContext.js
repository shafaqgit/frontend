import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {createContext, useState, useEffect} from "react";
import axios from "axios";
import io from "socket.io-client";
export const AuthContext= createContext();

export const AuthProvider = ({children}) =>{
    const baseUrl = "http://192.168.42.232:3000";
    const socket=io("http://192.168.42.232:8080");

    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken]= useState(null);
    const [userInfo, setUserInfo]= useState(null);

    const login =(email, password)=>{

        setIsLoading(true);
        axios.post(`${baseUrl}/api/player/signin`, {
            email,
            password
        })
        .then(res => {
            
            let userInfo= res.data;
            setUserInfo(userInfo);
            setUserToken(userInfo.token);
            AsyncStorage.setItem('userToken', userInfo.token);
            AsyncStorage.setItem('userInfo',JSON.stringify(userInfo));
            console.log(userInfo)
                        

            socket.emit("login", userInfo.user.firstName);
        })
        .catch(e => {
            console.log(`Login error ${e}`);
        });
        // setUserToken("IamSecretToken");
        // AsyncStorage.setItem('userToken', 'IamSecretToken');
        setIsLoading(false);
        console.log("Clicked the logged-in");
        console.log("Entered email and Password is: ", email,"  ",password);
    }

    const logout =()=>{
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('userInfo');
        setIsLoading(false);
        console.log("Clicked the logged-out");
        socket.emit("logout", userInfo.user.firstName);
    }

    const isLoggedIn = async() => {
        try{
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo);

            if(userInfo){
                setUserToken(userToken);
                setUserInfo(userInfo);
            }
            
            setIsLoading(false);

        }catch(e){
            console.log(`isLogged in error ${e}`);
        }
    }

    useEffect(()=> {
        isLoggedIn();
    }, []);
    return(
        <AuthContext.Provider value={{login, logout, isLoading, userToken, userInfo}}>
            {children}
        </AuthContext.Provider>

    );
}