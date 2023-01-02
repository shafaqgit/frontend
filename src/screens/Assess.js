import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Center, Progress, Card, Box, NativeBaseProvider } from "native-base";

let timer = () => {};
const Assess = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [count, setCount] = useState(0);

  
  const startTimer = () => {
    timer = setTimeout(() => {
      if (timeLeft <= 0) {
        clearTimeout(timer);
        return false;
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => clearTimeout(timer);
  });

  const next = () => {
    setCount(count + 1);
  };
  const start = () => {
    setTimeLeft(50);
    clearTimeout(timer);
    startTimer();
  };

  return (
    <NativeBaseProvider>
      <Center w="100%">
        <View>
          <Text>{timeLeft}</Text>
        </View>
        

        <View>
          <Button onPress={next} title="Next" />
        </View>
        <Box w="90%" maxW="400">
          <Progress value={count} mx="4" />
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default Assess;
