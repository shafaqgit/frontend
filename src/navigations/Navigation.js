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
import OnlineFriends from "../screens/OnlineFriends";
import OnlineGamePage from "../screens/OnlineGamePage";
import MultiplayerResultScreen from "../screens/MultiplayerResultScreen";
import Topics from "../screens/Topics";
import Result from "../screens/Result";
import Analytics from "../screens/Analytics";
import ChallengeAna from "../screens/ChallengeAna";
import ProgressChart from "../screens/ProgressChart";
import QuestionAna from "../screens/QuestionAna";
import SkillChart from "../screens/SkillChart";
import TopicAnalytics from "../screens/TopicAnalytics";
const stackNavigatorOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: "#36162e",
  },
  headerTintColor: "white",
  title: true,
};

const AppNavigator = createStackNavigator(
  {
    // Login: { screen: Login, navigationOptions: { headerShown: false } },
    SampleForm: {
      screen: SampleForm,
     
      navigationOptions: { headerShown: false },
    },
    Analytics:{
      screen:Analytics,
      navigationOptions:{headerShown:true, title:"Analytics"},
    },
    QuestionAna:{
      screen:QuestionAna,
      navigationOptions:{headerShown:true, title:"Question Analytics"},
    },
    ChallengeAna:{
      screen:ChallengeAna,
      navigationOptions:{headerShown:true, title:"Challenge Analytics"},
    },
    ProgressChart:{
      screen:ProgressChart,
      navigationOptions:{headerShown:true, title:"Progress Analytics"},
    },
    SkillChart:{
      screen:SkillChart,
      navigationOptions:{headerShown:true, title:"Skill Analytics"},
    },
    TopicAnalytics:{
      screen:TopicAnalytics,
      navigationOptions:{headerShown:true, title:"Topic Analytics"},
    },
    
    Home: { screen: Home, navigationOptions: { title: "Home" } },
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
    Xyz: { screen: Xyz, navigationOptions: { title: "Assessment" } },
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
    MultiplayerResultScreen: {
      screen: MultiplayerResultScreen,
      navigationOptions: { title: "Final Result" },
    },
  },
  {
    defaultNavigationOptions: stackNavigatorOptions,
  }
);
export default createAppContainer(AppNavigator);
