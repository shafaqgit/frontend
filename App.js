import React,{ useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import AppNavigator from "./src/navigations/Navigation";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import Navigator from "./src/navigations/Navigation";
import { AuthContext, AuthProvider } from "./src/context/AuthContext";
import AppNav from './src/navigations/AppNav';

export default function App() {
  let [fontsLoaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-BlackItalic": require("./assets/fonts/Roboto-BlackItalic.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-LightItalic": require("./assets/fonts/Roboto-LightItalic.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-MediumItalic": require("./assets/fonts/Roboto-MediumItalic.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
    "Roboto-Thin": require("./assets/fonts/Roboto-ThinItalic.ttf"),
  });
  const visibility = NavigationBar.useVisibility();

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }
   // Hide the splash screen
   SplashScreen.hideAsync();
     
  if (fontsLoaded) {
    return (
      <AuthProvider>
          <AppNav/>
      </AuthProvider>
    );
  }
}
