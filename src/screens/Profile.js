import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import {
  Button,
  Text,
  Box,
  Stack,
  Card,
  Heading,
  AspectRatio,
  Center,
  HStack,
  NativeBaseProvider,
  Image,
} from "native-base";
import Navigation from "../navigations/Navigation";

const cardGap = 16;

const cardWidth = (Dimensions.get("window").width - cardGap * 3) / 2;
const Profile = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getListPhotos();
    return () => {};
  }, []);
  getCards = (marginRight) => {
    return (
      <View
        style={{
          marginTop: cardGap,
          marginRight: marginRight,
          width: cardWidth,
          height: 180,
          backgroundColor: "white",
          borderRadius: 16,
          shadowOpacity: 0.2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity>
          <Text>Hi</Text>
        </TouchableOpacity>
      </View>
    );
  };
  getListPhotos = () => {
    const apiURL = "https://jsonplaceholder.typicode.com/photos";
    fetch(apiURL)
      .then((res) => res.json())
      .then((resJSON) => {
        setData(resJSON);
      })
      .catch((error) => {
        console.log("API ERROR", error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };
  renderItem = ({ item, index }) => {
    return (
      <NativeBaseProvider>
        {item.id == count && (
          <Box flexDirection={"row"} marginTop={"5%"}>
            <Image
              size={150}
              marginTop={"5%"}
              marginRight={"5%"}
              borderWidth={"1%"}
              borderColor="#3F778E"
              alt="fallback text"
              borderRadius={100}
              source={{ uri: item.url }}
              fallbackSource={{
                uri: "https://www.w3schools.com/css/img_lights.jpg",
              }}
            />
            <Box flexDirection={"column"}>
              <Heading
                paddingTop={"10%"}
                color="white"
                size="md"
                fontSize={50}
                bold
              >
                Welcome
              </Heading>
              <Heading
                flexDirection={"column"}
                color="white"
                size="md"
                fontSize={50}
                bold
              >
                Home!
              </Heading>
            </Box>
          </Box>
        )}

        <Box
          bg="white"
          shadow={5}
          rounded="lg"
          maxWidth="90%"
          margin={5}
          marginTop={"10%"}
          // justifyContent={"center"}
        ></Box>
      </NativeBaseProvider>
    );
  };
  return (
    <View backgroundColor="#E79E4F" flex={1}>
      {/* <ImageBackground
        source={require("/Users/user/Desktop/frontend/FYP/assets/images/profile.jpg")}
        style={StyleSheet.absoluteFillObject}
        blurRadius={100}
      /> */}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        // <NativeBaseProvider>
        <View>
          <FlatList
            data={data}
            scrollEnabled={false}
            keyExtractor={(item) => `key-${item.id}`}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 10 }}
          />

          <NativeBaseProvider>
            <View
              style={{
                bottom: "130%",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("List");
                }}
              >
                <View
                  style={{
                    marginTop: cardGap,
                    marginRight: "3%",
                    width: cardWidth,
                    height: 150,
                    backgroundColor: "white",
                    borderRadius: 16,
                    shadowOpacity: 0.2,

                    // justifyContent: "center",
                    // alignItems: "top",
                  }}
                >
                  <ImageBackground
                    source={require("../../assets/images/list.jpg")}
                    style={StyleSheet.absoluteFillObject}
                    borderRadius={16}
                    // blurRadius={100}
                  />
                  <Text
                    style={{
                      color: "grey",
                      fontWeight: "bold",
                      paddingLeft: "5%",
                    }}
                  >
                    Topics
                  </Text>

                  {/* <TouchableOpacity></TouchableOpacity> */}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Edit");
                }}
              >
                <View
                  style={{
                    marginTop: cardGap,
                    // marginLeft: count % 2 !== 0 ? cardGap : 0,
                    width: cardWidth,
                    height: 150,
                    backgroundColor: "white",
                    borderRadius: 16,
                    shadowOpacity: 0.2,
                    // justifyContent: "center",
                    // alignItems: "center",
                  }}
                >
                  <ImageBackground
                    source={require("../../assets/images/edit.jpg")}
                    style={StyleSheet.absoluteFillObject}
                    borderRadius={16}
                    // blurRadius={100}
                  />
                  <Text
                    style={{
                      color: "grey",
                      fontWeight: "bold",
                      paddingLeft: "5%",
                    }}
                  >
                    Edit Profile
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View
                  style={{
                    marginTop: cardGap,
                    marginRight: "3%",
                    width: cardWidth,
                    height: 150,
                    backgroundColor: "white",
                    borderRadius: 16,
                    shadowOpacity: 0.2,
                    // justifyContent: "center",
                    // alignItems: "center",
                  }}
                >
                  <ImageBackground
                    source={require("../../assets/images/analytics.jpg")}
                    style={StyleSheet.absoluteFillObject}
                    borderRadius={16}
                    // blurRadius={100}
                  />
                  <Text
                    style={{
                      color: "grey",
                      fontWeight: "bold",
                      paddingLeft: "5%",
                    }}
                  >
                    Progress
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View
                  style={{
                    marginTop: cardGap,

                    width: cardWidth,
                    height: 150,
                    backgroundColor: "white",
                    borderRadius: 16,
                    shadowOpacity: 0.2,
                    // justifyContent: "center",
                    // alignItems: "center",
                  }}
                >
                  <ImageBackground
                    source={require("../../assets/images/badge.jpg")}
                    style={StyleSheet.absoluteFillObject}
                    borderRadius={16}
                    // blurRadius={100}
                  />
                  <Text
                    style={{
                      color: "grey",
                      fontWeight: "bold",
                      paddingLeft: "5%",
                    }}
                  >
                    Badges
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View
                  style={{
                    marginTop: cardGap,
                    marginRight: "3%",
                    width: cardWidth,
                    height: 150,
                    backgroundColor: "white",
                    borderRadius: 16,
                    shadowOpacity: 0.2,
                    // justifyContent: "center",
                    // alignItems: "center",
                  }}
                >
                  <ImageBackground
                    source={require("../../assets/images/friendreq.jpg")}
                    style={StyleSheet.absoluteFillObject}
                    borderRadius={16}
                    // blurRadius={100}
                  />
                  <Text
                    style={{
                      color: "grey",
                      fontWeight: "bold",
                      paddingLeft: "5%",
                    }}
                  >
                    Friend Requests
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View
                  style={{
                    marginTop: cardGap,

                    width: cardWidth,
                    height: 150,
                    backgroundColor: "white",
                    borderRadius: 16,
                    shadowOpacity: 0.2,
                    // justifyContent: "center",
                    // alignItems: "center",
                  }}
                >
                  <ImageBackground
                    source={require("../../assets/images/friend.jpg")}
                    style={StyleSheet.absoluteFillObject}
                    borderRadius={16}
                    // blurRadius={100}
                  />
                  <Text
                    style={{
                      color: "grey",
                      fontWeight: "bold",
                      paddingLeft: "5%",
                    }}
                  >
                    Friends
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </NativeBaseProvider>
        </View>
      )}
    </View>
  );
};

export default Profile;
