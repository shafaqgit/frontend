import React, { useState, useEffect, useContext } from "react";
import * as FileSystem from "expo-file-system";
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
import { AuthContext } from "../context/AuthContext";
// import Navigation from "../navigations/Navigation";

const cardGap = 16;

const cardWidth = (Dimensions.get("window").width - cardGap * 3) / 2;

const Profile = ({ navigation }) => {
  const { userInfo, serverUrl, serverPort } = useContext(AuthContext);
  const baseUrl = serverUrl + serverPort;
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [isLoading, setisLoading] = useState(true);

  // const [oneTimeLoad, setOneTimeLoad]= useState(false);

  const downloadImage = async (imageUrl) => {
    console.log("Image Url is: ", imageUrl);
    const fileName = imageUrl.split("/").pop();
    const newPath = `${FileSystem.documentDirectory}${fileName}`;

    try {
      await FileSystem.downloadAsync(imageUrl, newPath);
      return newPath;
    } catch (error) {
      console.error(error);
    }
  };

  const [image, setImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      const imagePath = await downloadImage(
        baseUrl + "/api/Image/" + userInfo.user.profilePicture
      );
      setImage(imagePath);
    };
    loadImage();
    // setOneTimeLoad(true);
  }, [image]);

  useEffect(() => {
    getListPhotos();
    return () => {};
  }, []);
  const getCards = (marginRight) => {
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
  const getListPhotos = () => {
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
  const renderItem = ({ item, index }) => {
    return (
      <NativeBaseProvider>
        {/* <Image
      style={{ width: 200, height: 200 }}
      source={image ? { uri: image } : null}
      alt="Profile Picture"
    /> */}
        {item.id == count && (
          <Box flexDirection={"row"} marginTop={"5%"}>
            {userInfo.user.profilePicture == "" ? (
              <Image
                size={150}
                marginTop={"5%"}
                marginRight={"5%"}
                borderWidth={1}
                borderColor="#3F778E"
                alt="fallback text"
                borderRadius={100}
                source={require("../../assets/images/profile.jpg")}
                fallbackSource={
                  // uri: "https://www.w3schools.com/css/img_lights.jpg",
                  require("../../assets/images/profile.jpg")
                }
              />
            ) : (
              <Image
                size={150}
                marginTop={"5%"}
                marginRight={"5%"}
                borderWidth={1}
                borderColor="#3F778E"
                alt="fallback text"
                borderRadius={100}
                source={{ uri: image }}
                fallbackSource={
                  // uri: "https://www.w3schools.com/css/img_lights.jpg",
                  require("../../assets/images/profile.jpg")
                }
              />
            )}
            <Box flexDirection={"column"}>
              <Heading
                paddingTop={"10%"}
                color="white"
                size="md"
                fontSize={35}
                bold
              >
                Welcome
              </Heading>
              <Heading
                flexDirection={"column"}
                color="white"
                size="md"
                fontSize={35}
                bold
              >
                {userInfo.user.firstName}
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
    <View backgroundColor="#594057" flex={1}>
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
                bottom: "140%",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                // onPress={() => {
                //   navigation.navigate("List");
                // }}
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

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("RequestPage");
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

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Friends");
                }}
              >
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