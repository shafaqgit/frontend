// import { React, useState, useContext } from "react";
// import Home from "./Home.js";

// import {
//   NativeBaseProvider,
//   HStack,
//   Pressable,
//   Center,
//   Box,
//   Image,
//   Stack,
//   Button,
//   IContainerProps,
//   Text,
// } from "native-base";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { View, Dimensions } from "react-native";
// import { AuthContext } from "../context/AuthContext.js";

// // import Navigation from "../navigations/Navigation";

// const SampleForm = ({ navigation }) => {
//   const { logout } = useContext(AuthContext);
//   const [selected, setSelected] = useState(0);
//   const windowWidth = Dimensions.get("window");
//   const handleClick = (count) => {
//     setSelected(count);
//     switch (count) {
//       // case 0:
//       //   navigation.navigate("Home");

//       //   break;
//       case 1:
//         setSelected(1);
//         navigation.navigate("NonFriends");
//         break;
//       case 2:
//         setSelected(2);
//         navigation.navigate("Profile");
//         break;
//       case 3:
//         setSelected(3);
//         navigation.navigate("Edit");
//         break;
//       // default:
//       // setSelected(0);
//       // navigation.navigate("Home");
//     }
//   };

//   return (
//     <NativeBaseProvider>
//       <Home nav={navigation} />
//       <HStack
//         bg="#172f38"
//         alignItems="center"
//         // safeAreaBottom
//         shadow={6}
//       >
//         <Pressable
//           cursor="pointer"
//           marginTop={1}
//           opacity={selected === 0 ? 1 : 0.5}
//           py="3"
//           flex={1}
//           onPress={() => {
//             handleClick(0);
//           }}
//           //  {...(selected === 0 && navigation.navigate("Home"))}
//         >
//           <Center>
//             <Ionicons name="home" color="white" size="20px" />
//             <Text color="white" fontSize="12" marginTop="5%" marginBottom="10%">
//               Home
//             </Text>
//           </Center>
//         </Pressable>
//         <Pressable
//           cursor="pointer"
//           opacity={selected === 1 ? 1 : 0.5}
//           py="2"
//           flex={1}
//           onPress={() => handleClick(1)}
//           // {...(selected == 1 && navigation.navigate("List"))}
//         >
//           <Center>
//             <Ionicons mb="1" name="person-add" color="white" size="20px" />
//             <Text color="white" fontSize="12" marginTop="5%" marginBottom="10%">
//               Suggestions
//             </Text>
//           </Center>
//         </Pressable>
//         <Pressable
//           cursor="pointer"
//           opacity={selected === 2 ? 1 : 0.6}
//           py="2"
//           flex={1}
//           onPress={() => handleClick(2)}
//           //{...(selected === 2 && navigation.navigate("Profile"))}
//         >
//           <Center>
//             <Ionicons mb="1" name="eye" color="white" size="20px" />
//             <Text color="white" fontSize="12" marginTop="5%" marginBottom="10%">
//               Profile
//             </Text>
//           </Center>
//         </Pressable>
//         <Pressable
//           cursor="pointer"
//           opacity={selected === 3 ? 1 : 0.5}
//           py="2"
//           flex={1}
//           onPress={() => {
//             logout();
//           }}
//           // {...(selected === 3 && navigation.navigate("Edit"))}
//         >
//           <Center>
//             <Ionicons mb="1" name="power" color="white" size="20px" />
//             <Text color="white" fontSize="12" marginTop="5%" marginBottom="10%">
//               Sign off
//             </Text>
//           </Center>
//         </Pressable>
//       </HStack>
//       {/* <Box bg={"orange.200"}> */}
//       {/* <View>
//           <Footer selected={selected} func={handleClick} />
//         </View> */}
//       {/* <Box
//           bg="white"
//           shadow={5}
//           rounded="lg"
//           maxWidth="90%"
//           margin={5}
//           marginTop={"30%"}
//           // justifyContent={"center"}
//         >
//           <Image
//             source={{
//               uri: "https://i.pinimg.com/originals/54/e3/7d/54e37d8074ebcde1d96c77d7b2a7f310.gif",
//             }}
//             alt="image base"
//             resizeMode="cover"
//             height={150}
//             roundedTop="md"
//           />
//           <Text bold position="absolute" color="white" top={0} m={[4, 4, 8]}>
//             NEWS
//           </Text>
//           <Stack space={4} p={[4, 4, 8]}>
//             <Button
//               style={{ backgroundColor: "#A66117" }}
//               onPress={() => navigation.navigate("Xyz")}
//             >
//               Practice Mode
//             </Button>
//           </Stack>
//         </Box>
//         <Box
//           bg="white"
//           shadow={5}
//           rounded="lg"
//           maxWidth="90%"
//           margin={5}
//           marginTop={"10%"}
//           // justifyContent={"center"}
//         >
//           <Image
//             source={{
//               // uri: "https://cdn.dribbble.com/users/2726/screenshots/2874677/media/01ba523c71acc05534b3be18d903eba7.gif",
//               uri: "https://i.pinimg.com/originals/49/84/c0/4984c0ac41b13002de2873e622efa63c.gif",
//             }}
//             alt="image base"
//             resizeMode="cover"
//             height={150}
//             roundedTop="md"
//           />
//           <Text bold position="absolute" color="white" top={0} m={[4, 4, 8]}>
//             NEWS
//           </Text>
//           <Stack space={4} p={[4, 4, 8]}>
//             <Button style={{ backgroundColor: "#A66117" }}>
//               Challenge Mode
//             </Button>
//           </Stack>
//         </Box> */}

//       {/* ; } */}
//       {/* </Box> */}
//     </NativeBaseProvider>
//   );
// };

// export default SampleForm;








import { React, useState, useContext } from "react";
import Home from "./Home.js";

import {
  NativeBaseProvider,
  HStack,
  Pressable,
  Center,
  Box,
  Image,
  Stack,
  Button,
  IContainerProps,
  Text,
} from "native-base";
// import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Dimensions } from "react-native";
import { AuthContext } from "../context/AuthContext.js";

// import Navigation from "../navigations/Navigation";

const SampleForm = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const [selected, setSelected] = useState(0);
  const windowWidth = Dimensions.get("window");
  const handleClick = (count) => {
    setSelected(count);
    switch (count) {
      // case 0:
      //   navigation.navigate("Home");

      //   break;
      case 1:
        setSelected(1);
        navigation.navigate("NonFriends");
        break;
      case 2:
        setSelected(2);
        navigation.navigate("Profile");
        break;
      case 3:
        setSelected(3);
        navigation.navigate("Edit");
        break;
      // default:
      // setSelected(0);
      // navigation.navigate("Home");
    }
  };

  return (
    <NativeBaseProvider>
      <Home nav={navigation} />
      <HStack
        bg="#172f38"
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
          onPress={() => {
            handleClick(0);
          }}
          //  {...(selected === 0 && navigation.navigate("Home"))}
        >
          <Center>
            {/* <Ionicons name="home" color="white" size="20px" /> */}
            <Text color="white" fontSize="12" marginTop="5%" marginBottom="10%">
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
            {/* <Ionicons mb="1" name="person-add" color="white" size="20px" /> */}
            <Text color="white" fontSize="12" marginTop="5%" marginBottom="10%">
              Suggestions
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
            {/* <Ionicons mb="1" name="eye" color="white" size="20px" /> */}
            <Text color="white" fontSize="12" marginTop="5%" marginBottom="10%">
              Profile
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 3 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => {
            logout();
          }}
          // {...(selected === 3 && navigation.navigate("Edit"))}
        >
          <Center>
            {/* <Ionicons mb="1" name="power" color="white" size="20px" /> */}
            <Text color="white" fontSize="12" marginTop="5%" marginBottom="10%">
              Sign off
            </Text>
          </Center>
        </Pressable>
      </HStack>
      {/* <Box bg={"orange.200"}> */}
      {/* <View>
          <Footer selected={selected} func={handleClick} />
        </View> */}
      {/* <Box
          bg="white"
          shadow={5}
          rounded="lg"
          maxWidth="90%"
          margin={5}
          marginTop={"30%"}
          // justifyContent={"center"}
        >
          <Image
            source={{
              uri: "https://i.pinimg.com/originals/54/e3/7d/54e37d8074ebcde1d96c77d7b2a7f310.gif",
            }}
            alt="image base"
            resizeMode="cover"
            height={150}
            roundedTop="md"
          />
          <Text bold position="absolute" color="white" top={0} m={[4, 4, 8]}>
            NEWS
          </Text>
          <Stack space={4} p={[4, 4, 8]}>
            <Button
              style={{ backgroundColor: "#A66117" }}
              onPress={() => navigation.navigate("Xyz")}
            >
              Practice Mode
            </Button>
          </Stack>
        </Box>
        <Box
          bg="white"
          shadow={5}
          rounded="lg"
          maxWidth="90%"
          margin={5}
          marginTop={"10%"}
          // justifyContent={"center"}
        >
          <Image
            source={{
              // uri: "https://cdn.dribbble.com/users/2726/screenshots/2874677/media/01ba523c71acc05534b3be18d903eba7.gif",
              uri: "https://i.pinimg.com/originals/49/84/c0/4984c0ac41b13002de2873e622efa63c.gif",
            }}
            alt="image base"
            resizeMode="cover"
            height={150}
            roundedTop="md"
          />
          <Text bold position="absolute" color="white" top={0} m={[4, 4, 8]}>
            NEWS
          </Text>
          <Stack space={4} p={[4, 4, 8]}>
            <Button style={{ backgroundColor: "#A66117" }}>
              Challenge Mode
            </Button>
          </Stack>
        </Box> */}

      {/* ; } */}
      {/* </Box> */}
    </NativeBaseProvider>
  );
};

export default SampleForm;

