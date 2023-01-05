import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  ImageDetail,
  Text,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from "react-native";

const ITEM_MARGIN_BOTTOM = 20;

const List = () => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

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
  renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <Image
          style={styles.Image}
          source={{ uri: item.url }}
          resizeMode="contain"
        />

        <View style={styles.wrapText}>
          <Text style={styles.textStyle}>{index + "." + item.title}</Text>
        </View>
      </View>
    );
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
            renderItem={renderItem}
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
    flexDirection: "row",
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
    padding: 10,
  },
});

export default List;
