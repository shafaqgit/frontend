import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Button } from 'react-native';

import List from "../screens/List";
import Edit from "../screens/Edit";
import SampleForm from "../screens/SampleForm";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Assess from "../screens/Assess";
import Xyz from "../screens/Xyz";
import NonFriends from "../screens/NonFriends";
import Friends from "../screens/Friends";
import RequestPage from "../screens/RequestPage";
import OnlineFriends from "../screens/OnlineFriends";
import OnlineGamePage from "../screens/OnlineGamePage";
import MultiplayerResultScreen from "../screens/MultiplayerResultScreen";
import Topics from "../screens/Topics";
import Result from "../screens/Result";

const stackNavigatorOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: "#36162e",
  },
  headerTintColor: "white",
  title: false,
};

const AppNavigator = createStackNavigator(
  {
    // Login: { screen: Login, navigationOptions: { headerShown: false } },
    SampleForm: {
      screen: SampleForm,
      navigationOptions: { headerShown: false },
    },
    
    // Welcome: { screen: Welcome, navigationOptions: { headerShown: false } },
    // Register: { screen: Register, navigationOptions: { title: "Register" } },
    // Welcome: { screen: Welcome, navigationOptions: { title: "Welcome" } },
    List: { screen: List, navigationOptions: { title: "Topic List" } },
    NonFriends: {
      screen: NonFriends,
      navigationOptions: { title: "All Users" },
    },
    Result: {
      screen: Result,
      navigationOptions: { title: "Result" },
    },
    RequestPage: {
      screen: RequestPage,
      navigationOptions: { title: "RequestPage" },
    },
    Friends: { screen: Friends, navigationOptions: { title: "Friends" } },
    Topics: { screen: Topics, navigationOptions: { title: "Topics" } },
    Edit: { screen: Edit, navigationOptions: { title: "Edit" } },

    MultiplayerResultScreen: { screen: MultiplayerResultScreen, navigationOptions: (props) => ({
      title: "Final Result", 
      headerLeft: () => (
       <Button
         title="Back"
         onPress={() =>props.navigation.pop(2)}
       />
     ),
   })
  },

  Xyz: {
    screen: Xyz,
    navigationOptions: { title: "Assessment" },
  },
  Home: { screen: Home, navigationOptions: { title: "Home" } },

    Assess: { screen: Assess, navigationOptions: { title: "Assess" } },
    Profile: { screen: Profile, navigationOptions: { title: "Profile" } },
    OnlineFriends: {
      screen: OnlineFriends,
      navigationOptions: { title: "Online Users" },
    },
    OnlineGamePage: {
      screen: OnlineGamePage,
      navigationOptions: { headerShown: false },
    },
    
  },
  {
    defaultNavigationOptions: stackNavigatorOptions,
  }
);
export default createAppContainer(AppNavigator);
