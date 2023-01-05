import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Welcome from "../screens/Welcome";

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
    // Login: { screen: Login, navigationOptions: { headerShown: false } },
    Login: { screen: Login, navigationOptions: { title: "Login" } },
    Register: { screen: Register, navigationOptions: { title: "Register" } },
    // Home: { screen: Home, navigationOptions: { title: "Home" } },
  },
  {
    defaultNavigationOptions: stackNavigatorOptions,
  }
);
export default createAppContainer(AppNavigator);