import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Welcome from "../screens/Welcome";
// import SampleForm from "../screens/SampleForm";

const stackNavigatorOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: "#172f38",
  },
  headerTintColor: "white",
  title: false,
};

const AppNavigator = createStackNavigator(
  {
    Welcome: { screen: Welcome, navigationOptions: { headerShown: false } },
    // Login: { screen: Login, navigationOptions: { headerShown: false } },
    Login: { screen: Login, navigationOptions: { title: "Login" } },
    Register: { screen: Register, navigationOptions: { title: "Register" } },
    // SampleForm: { screen: SampleForm, navigationOptions: { title: "Sample Form" }},
    // Home: { screen: Home, navigationOptions: { title: "Home" } },
  },
  {
    defaultNavigationOptions: stackNavigatorOptions,
  }
);
export default createAppContainer(AppNavigator);
