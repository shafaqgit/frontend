import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Welcome from "../screens/Welcome";
import List from "../screens/List";
import SampleForm from "../screens/SampleForm";
const stackNavigatorOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: "#3F778E",
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
