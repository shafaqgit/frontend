import React, { useState, useEffect, useContext } from "react";
import Timer from "../components/Timer";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  LogBox,
  ImageDetail,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  Box,
  Card,
  Text,
  Button,
  Center,
  Progress,
  NativeBaseProvider,
} from "native-base";
import { AuthContext } from "../context/AuthContext";

// LogBox.ignoreAllLogs();
const ITEM_MARGIN_BOTTOM = 20;
let timer = () => {};
const Xyz = (props) => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [count, setCount] = useState(0);
  const [nexted, setNext] = useState(0);
  const [check, setCheck] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  // const [booleanOption, setBooleanOption] = useState({});
  const [booleanOption, setBooleanOption] = useState({});
  const [res, setRes]= useState([]);
  const [color, setColor]=useState("blue");
  const [score, setScore] = useState(0);
  const { serverUrl, serverPort } = useContext(AuthContext);
  
  const baseUrl = serverUrl + serverPort;


  // Call the callback function passed in through the navigation parameters with the data you want to pass back
  const handleData = (data) => {

    props.navigation.getParam('onResult')(data);
    setData1(data);
    console.log(res)
    
    props.navigation.navigate('Topics')
  };
  const handleOptions=(key, value)=>{

    setBooleanOption(prevBooleanOption => ({
      ...prevBooleanOption,
      [question]: option
    }));
    // setBooleanOption({
    //   ...booleanOption, // Spread operator to copy existing key-value pairs
    //   [key]: value, // Set the new value for the specified key
    // });
  }
  const handleButtonClick = (question,option) => {
    setBooleanOption({
      ...booleanOption,
      [question]: option

    });
    console.log(booleanOption[question])
  };

  const makeResult=(ques_id, answer, selected)=>{
    const newObj = { id: ques_id, ans: booleanOption[ques_id], check:selected };

    const index = res.findIndex(obj => obj.id === newObj.id);

    if (index === -1) {
      setRes([...res, newObj]);
    } else {
      setRes([...res.slice(0, index), newObj, ...res.slice(index + 1)]);
    }

  }
  useEffect(() => {
    console.log("Score updated: ", score);
  }, [score]);
  
  const calculateScore = () => {
    let newScore = 0;
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      
      const selectedAnswerIndex = booleanOption[item._id];
      console.log("my answer",selectedAnswerIndex)
      if (item.options[selectedAnswerIndex] === item.correctAnswer) {
        
        newScore++;
        console.log("hhhh",newScore)
      }
    }
    
    setScore(newScore)
    console.log(score)
  };
  const getListPhotos = () => {
    const apiURL = baseUrl + "/api/questions";
    fetch(apiURL)
      .then((res) => res.json())
      .then((resJSON) => {
        setData(resJSON);
        // console.log(resJSON);
      })
      .catch((error) => {
        console.log("API ERROR", error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };
  useEffect(() => {
    getListPhotos();
    return () => {};
  }, []);
  const renderItem = ({ item, index }) => {
    return (
      <NativeBaseProvider>
        {index == count && (
          <Box>
            <Box
              bg="white"
              shadow={5}
              rounded="2xl"
              maxWidth="90%"
              margin={5}
              marginTop={"10%"}
              marginBottom={"10%"}
              // justifyContent={"center"}
            >
              <Card paddingBottom={"15%"}>
                <Text
                  bold
                  position="absolute"
                  color="black"
                  top={0}
                  m={[1, -2, 8]}
                >
                  {/* {...(selected == 3 && navigation.navigate("Edit"))} */}
                  {/* {item.id == { count } && item.questionContent} */}

                  {item.questionContent}
                 
                </Text>
              </Card>
            </Box>

            <Box>
              {item.options.map((i,ans) => {
                 
                return (
                  <Box
                    flexDirection={"column"}
                    marginLeft={"5%"}
                    marginTop={"5%"}
                    marginRight={"5%"}
                  >
                    <Button
                      justifyContent={"center"}
                      borderRadius="20"
                      size="sm"
                      // backgroundColor={selectedAnswerIndex[i] === i ? "green.400" : "gray.200"}
                      // onPress={() => handleOptions(i)}
                      // backgroundColor={color}
                      onPress={() => {
                        handleButtonClick(item._id, ans)
                        makeResult(item._id, ans, false)
                      }
                      }
                      
                     
                      style={{
                        backgroundColor:
                          
                        booleanOption[item._id] === ans ? "green" : color,
                      }}

                      
                    // onPress={() => handleButtonClick(item.questionContent,i)}

                      
                      // style={{
                      //   backgroundColor: booleanOption[item.questionContent] === i ? 'green' : 'blue',
                        
                      // }}
                    >
                      {" "}
                      {i}
                     
                    </Button>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
      </NativeBaseProvider>
    );
  };

  const startTimer = () => {
    timer = setTimeout(() => {
      if (timeLeft <= 0) {
        clearTimeout(timer);
        return false;
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);
  };

  // useEffect(() => {
  //   startTimer();
  //   return () => clearTimeout(timer);
  // });

  const prev = () => {
    setCount(count - 1);
    setNext(nexted - 10);
  };
  const next = () => {
    setCount(count + 1);
    setNext(nexted + 10);
  };
  const start = () => {
    setTimeLeft(60);
    clearTimeout(timer);
    startTimer();
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
        <NativeBaseProvider>
          {check == false ? (
            <Button
              onPress={() => {
                // calculateScore()
                setCheck(true);
              }}
            >
              Start Assessment
            </Button>
          ) : (
            <Box style={{ backgroundColor: "#2d596b", flex: 1 }}>
              <Timer check={check} func={setCheck} />
              {/* <Center w="100%">
                <View>
                  <Text>{timeLeft}</Text>
                </View>
              </Center> */}

              <FlatList
                data={data}
                keyExtractor={(item) => `key-${item._id}`}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 10 }}
              />
              <Center marginBottom={"15%"}>
                <Box>
                  {nexted !== 100 ? (
                    <View flexDirection="row" justifyContent="center">
                      <Button
                        style={{ width: "40%", marginRight: "2%" }}
                        onPress={() => {
                          if ((nexted !== 0) | (nexted < 0)) {
                            prev();
                          }
                        }}
                      >
                        <Text style={{ paddingRight: 10 }}>Prev</Text>
                      </Button>

                      <Button style={{ width: "40%" }} onPress={next}>
                        <Text style={{ paddingRight: 10 }}>Next</Text>
                      </Button>
                    </View>
                  ) : (
                    <View></View>
                  )}
                </Box>
              </Center>
              <Center>
                <Box w="90%" maxW="400" marginBottom={"10%"}>
                  {nexted != 100 ? (
                    <Progress value={nexted} mx="10" />
                  ) : (
                    <Box>
                      <Button
                        style={{ width: "100%", color: "green" }}
                        onPress={() => {
                          calculateScore()
                         
                          setCheck(false);
                          handleData(1);
                        }}
                      >
                        <Text style={{ paddingLeft: 0 }}>Submit</Text>
                      </Button>
                    </Box>
                  )}
                </Box>
              </Center>
            </Box>
          )}
        </NativeBaseProvider>
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
    borderRadius: 20,
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

export default Xyz;