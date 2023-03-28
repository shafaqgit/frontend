import React, { useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import Constants from "expo-constants";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const Timer = (props) => {
  // const [isPlaying, setIsPlaying] = useState(true);
  const timerProps = {
    isPlaying: true,
    size: 120,
    strokeWidth: 6,
  };

  return props.check ? (
    <View marginTop={10} marginLeft={10}>
      <CountdownCircleTimer
        size={100}
        isPlaying={props.isPlaying}
        duration={10}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 5, 3, 1]}
        //   colors="#A30000"
        onComplete={() => {
          props.setIsPlaying(false);
          props.func(false);
          props.nextQues();
          // do your stuff here
          return { shouldRepeat: false, delay: 1.5 }; // repeat animation in 1.5 seconds
        }}
        onElapsed={() => props.setCurrTime(0)}
        // Update remaining time every time the CountdownCircleTimer is updated
        onUpdate={(elapsedTime) => {
          // props.setCurrTime( elapsedTime);
          props.remainingTime.current =  elapsedTime;
        }}
      >
        {/* {({ remainingTime, color }) => (
          <Text style={{ color, fontSize: 15 }}>{remainingTime}</Text>
          
        )} */}
        {({ color }) => (
          <Text style={{ color, fontSize: 15 }}>{ props.remainingTime.current}</Text>
        )}
      </CountdownCircleTimer>
    </View>
  ) : (
    <View></View>
  );

 
};
const styles = StyleSheet.create({
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
export default Timer;

