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
    Welcome: { screen: Welcome, navigationOptions: { headerShown: false } },
    Register: { screen: Register, navigationOptions: { title: "Register" } },
    Login: { screen: Login, navigationOptions: { title: "Login" } },
    List: { screen: List, navigationOptions: { title: "Topic List" } },
    Edit: { screen: Edit, navigationOptions: { title: "Edit" } },
    Home: { screen: Home, navigationOptions: { title: "Home" } },
    Xyz: { screen: Xyz, navigationOptions: { title: "Assessment" } },
    Assess: { screen: Assess, navigationOptions: { title: "Assess" } },
    Profile: { screen: Profile, navigationOptions: { title: "Profile" } },
    SampleForm: {
      screen: SampleForm,
      navigationOptions: { title: "Sample Form" },
    },
  },
  {
    defaultNavigationOptions: stackNavigatorOptions,
  }
);
export default createAppContainer(AppNavigator);
