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
import  socket  from "../service/socket";

// LogBox.ignoreAllLogs();
const ITEM_MARGIN_BOTTOM = 20;
let timer = () => {};
const OnlineGamePage = ({ navigation }) => {
  
  const data=navigation.state.params.gameData.gameData.questions;
  const sessionId=navigation.state.params.gameData.sessionId;
  
  const { userInfo } = useContext(AuthContext);
  const currUserId=userInfo.user._id;

  const [timeLeft, setTimeLeft] = useState(60);
  const [count, setCount] = useState(0);
  const [nexted, setNext] = useState(0);
  const [check, setCheck] = useState(false);
  const [currQues, setCurrQues]=useState(0);
  const [booleanOption, setBooleanOption] = useState({});
  const [res, setRes]= useState([]);
  const [color, setColor]=useState("blue");
  const [optionSelected, setOptionSelected]=useState(false);



  useEffect(() => {
    socket.on('nextQues', (quesCount) => {
     
      console.log("Question Count: ", quesCount.currQues);
      setCurrQues(quesCount.currQues);
    });
  
  }, []);

  const makeResult=(ques_id, answer, selected)=>{
    const newObj = { id: ques_id, ans: booleanOption[ques_id], check:selected };

    const index = res.findIndex(obj => obj.id === newObj.id);

    if (index === -1) {
      setRes([...res, newObj]);
    } else {
      setRes([...res.slice(0, index), newObj, ...res.slice(index + 1)]);
    }

  }

  const handleButtonClick = (question,option) => {
    setBooleanOption({
      ...booleanOption,
      [question]: option

    });
    // console.log(booleanOption[question])
    setOptionSelected(true);
  };

  const renderItem = ({ item, index }) => {
    return (
      <NativeBaseProvider>
        {/* {index == count && ( */}
        {index == currQues && (
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

 
  const next = () => {
    // console.log(res);
    setOptionSelected(false);
    socket.emit('answered', {res, currUserId ,sessionId});
    // setCount(count + 1);
    setNext(nexted + 10);
  };

  return (
    <View style={styles.container}>
     
      
        <NativeBaseProvider>
          
            <Box style={{ backgroundColor: "#2d596b", flex: 1 }}>
              <Timer check={check} func={setCheck} />
              
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
                      

                    {optionSelected ? (
                    <Button style={{ width: "40%" }} onPress={next}> <Text style={{ paddingRight: 10 }}>Next</Text>
                      </Button>
                      ):(
                        <Button style={{ width: "40%" }} > <Text style={{ paddingRight: 10 }}>Next</Text>
                      </Button>
                        )  }
                       
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
                          setCheck(false);
                        }}
                      >
                        <Text style={{ paddingLeft: 0 }}>Submit</Text>
                      </Button>
                    </Box>
                  )}
                </Box>
              </Center>
            </Box>
          
        </NativeBaseProvider>
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

export default OnlineGamePage;
