import React, { useState, useEffect } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  ImageDetail,
  TouchableOpacity,
  Text,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Button, NativeBaseProvider, Heading } from "native-base";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
//import { flexbox } from "native-base/lib/typescript/theme/styled-system";
const ITEM_MARGIN_BOTTOM = 20;

const Friends = () => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [key, setKey] = useState(null);
  let row: Array<any> = [];
  let prevOpenedRow;

  useEffect(() => {
    getListPhotos();
    return () => {};
  }, []);

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

  const closeRow = (index) => {
    console.log("closerow");
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const renderRightActions = (progress, dragX, onClick) => {
    return (
      <View>
        <Button
          style={styles.item}
          borderRadius="10%"
          height="90%"
          style={{ backgroundColor: "red" }}
          onPress={onClick}
          title="DELETE"
        >
          DELETE
        </Button>
      </View>
    );
  };
  renderItem = ({ item, index }, onClick) => {
    return (
      <NativeBaseProvider>
        <Swipeable
          renderRightActions={(progress, dragX) =>
            renderRightActions(progress, dragX, onClick)
          }
          onSwipeableOpen={() => closeRow(index)}
          ref={(ref) => (row[index] = ref)}
          rightOpenValue={-100}
        >
          <View style={styles.item}>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={styles.Image}
                source={{ uri: item.url }}
                resizeMode="contain"
              />
              <View style={styles.wrapText}>
                <Text style={styles.textStyle}>{index + "." + item.title}</Text>
              </View>
            </View>

            <View
              style={{ flexDirection: "row", marginLeft: 90, marginTop: 10 }}
            >
              <TouchableOpacity>
                <Button
                  style={{
                    width: 130,
                    height: 35,
                    top: 5,
                    padding: 10,
                    justifyContent: "center",
                    marginRight: 5,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontStyle: "Roboto-Black",
                      color: "white",
                    }}
                  >
                    Add Friend
                  </Text>
                </Button>
              </TouchableOpacity>
              <Button
                style={{
                  width: 130,
                  height: 35,
                  top: 5,
                  padding: 10,
                  marginRight: 5,
                  backgroundColor: "#2b692d",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontStyle: "Roboto-Black",
                    color: "white",
                  }}
                >
                  View Profile
                </Text>
              </Button>
            </View>
          </View>
        </Swipeable>

        {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 100,
            }}
          >
            <Button
              style={{
                width: 110,
                height: 35,
                top: 5,
                padding: 10,
                justifyContent: "center",
                marginRight: 5,
              }}
            >
              Add Friend
            </Button>
            <Button
              style={{
                width: 110,
                height: 35,
                top: 5,
                padding: 10,
                marginRight: 5,
              }}
            >
              Remove Friend
            </Button>
          </View> */}
      </NativeBaseProvider>
    );
  };

  const deleteItem = ({ item, index }) => {
    console.log(item, index);
    let a = data;
    a.splice(index, 1);
    console.log(a);
    setData([...a]);
  };
  return (
    <View style={styles.container}>
      {/* <Image
        source={require("D:\react prac\shq_front_git\frontend\assets\images\bg.jpg")}
        style={StyleSheet.absoluteFillObject}
        blurRadius={70}
      /> */}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ backgroundColor: "#E79E4F", flex: 1 }}>
          <FlatList
            data={data}
            keyExtractor={(item) => `key-${item.id}`}
            renderItem={(v) =>
              renderItem(v, () => {
                console.log("Pressed", v);
                deleteItem(v);
              })
            }
            contentContainerStyle={{ padding: 10 }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: 18,
  },
  Image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  wrapText: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  item: {
    flexDirection: "column",
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    padding: 20,
  },
});

export default Friends;
