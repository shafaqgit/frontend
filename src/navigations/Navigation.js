import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Welcome from "../screens/Welcome";
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

const stackNavigatorOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: "#A66117",
  },
  headerTintColor: "white",
  title: false,
};

const AppNavigator = createStackNavigator(
  {
    // Login: { screen: Login, navigationOptions: { headerShown: false } },
    SampleForm: { screen: SampleForm, navigationOptions:  { headerShown: false} },
    Home: { screen: Home, navigationOptions: { title: "Home"}},
    // Welcome: { screen: Welcome, navigationOptions: { headerShown: false } },
    // Register: { screen: Register, navigationOptions: { title: "Register" } },
    // Welcome: { screen: Welcome, navigationOptions: { title: "Welcome" } },
    List: { screen: List, navigationOptions: { title: "Topic List" } },
    NonFriends: { screen: NonFriends, navigationOptions: { title: "NonFriends" } },
    RequestPage: { screen: RequestPage, navigationOptions: { title: "RequestPage" } },
    Friends: { screen: Friends, navigationOptions: { title: "Friends" } },
    Edit: { screen: Edit, navigationOptions: { title: "Edit" } },
    Xyz: { screen: Xyz, navigationOptions: { title: "Assessment" } },
    Assess: { screen: Assess, navigationOptions: { title: "Assess" } },
    Profile: { screen: Profile, navigationOptions: { title: "Profile" } },
    
  },
  {
    defaultNavigationOptions: stackNavigatorOptions,
  }
);
export default createAppContainer(AppNavigator);
