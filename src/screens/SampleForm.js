import { React, useState } from "react";
import {
  NativeBaseProvider,
  HStack,
  Pressable,
  Center,
  Box,
  IContainerProps,
  Text,
} from "native-base";
// import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Dimensions } from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// import { MaterialCommunityIcons } from "@expo/vector-icons";


const SampleForm = ({ navigation }) => {
  const handleClick = (count) => {
    setSelected(count);
    switch (count) {
      case 0:
        navigation.navigate("Home");
        break;
      case 1:
        setSelected(1);
        navigation.navigate("List");
        break;
      case 2:
        setSelected(2);
        navigation.navigate("Profile");
        break;
      case 3:
        setSelected(3);
        navigation.navigate("Edit");
        break;
      default:
        setSelected(0);
        navigation.navigate("Home");
    }
  };
  const [selected, setSelected] = useState(0);
  const windowWidth = Dimensions.get("window");
  return (
    <NativeBaseProvider>
      <HStack
        marginTop="175%"
        flex={1}
        bg="#A66117"
        alignItems="center"
        // safeAreaBottom
        shadow={6}
      >
        <Pressable
          cursor="pointer"
          marginTop={1}
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => handleClick(0)}
          //  {...(selected === 0 && navigation.navigate("Home"))}
        >
          <Center>
            {/* <Icon name="home" color="white" size="20px" /> */}
            <Text color="white" fontSize="12">
              Home
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => handleClick(1)}
          // {...(selected == 1 && navigation.navigate("List"))}
        >
          <Center>
            {/* <Ionicons mb="1" name="search" color="white" size="20px" /> */}
            <Text color="white" fontSize="12">
              Search
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 2 ? 1 : 0.6}
          py="2"
          flex={1}
          onPress={() => handleClick(2)}
          //{...(selected === 2 && navigation.navigate("Profile"))}
        >
          <Center>
            {/* <Icon mb="1" name="eye" color="white" size="20px" /> */}
            <Text color="white" fontSize="12">
              Profile
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 3 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => handleClick(3)}
          // {...(selected === 3 && navigation.navigate("Edit"))}
        >
          <Center>
            {/* <Icon mb="1" name="account" color="white" size="20px" /> */}
            <Text color="white" fontSize="12">
              Account
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </NativeBaseProvider>
  );
};

export default SampleForm;