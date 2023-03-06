import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button } from "react-native";
import { Center, Progress, Card, Box, NativeBaseProvider } from "native-base";

const Assess = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [count, setCount] = useState(0);

  const timerRef = useRef();

  const startTimer = () => {
    timerRef.current = setTimeout(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleNext = () => {
    setCount((count) => count + 1);
  };

  const handleStart = () => {
    setTimeLeft(50);
    clearTimeout(timerRef.current);
    startTimer();
  };

  return (
    <NativeBaseProvider>
      <Center w="100%">
        <View>
          <Text>{timeLeft}</Text>
        </View>

        <View>
          <Button onPress={handleNext} title="Next" />
        </View>

        <Box w="90%" maxW="400">
          <Progress value={count} mx="4" />
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default Assess;
