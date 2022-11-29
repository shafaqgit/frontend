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
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Navigation from "../navigations/Navigation";

const SampleForm = ({ navigation }) => {
  const [selected, setSelected] = useState(1);
  const windowWidth = Dimensions.get("window");
  return (
    <NativeBaseProvider>
      <HStack
        marginTop="175%"
        flex={1}
        bg="#3F778E"
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
          onPress={() => setSelected(0)}
          {...(selected == 0 && navigation.navigate("Home"))}
        >
          <Center>
            <Icon name="home" color="white" size="20px" />
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
          onPress={() => setSelected(1)}
          {...(selected == 1 && navigation.navigate("List"))}
        >
          <Center>
            <Ionicons mb="1" name="search" color="white" size="20px" />
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
          onPress={() => setSelected(2)}
        >
          <Center>
            <Icon mb="1" name="cart" color="white" size="20px" />
            <Text color="white" fontSize="12">
              Cart
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 3 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(3)}
          {...(selected == 3 && navigation.navigate("Edit"))}
        >
          <Center>
            <Icon mb="1" name="account" color="white" size="20px" />
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
