import React, { useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import Constants from "expo-constants";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const Timer = (props) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const timerProps = {
    isPlaying: true,
    size: 120,
    strokeWidth: 6,
  };

  return props.check ? (
    <View marginTop={10} marginLeft={10}>
      <CountdownCircleTimer
        size={100}
        isPlaying={isPlaying}
        duration={60}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[60, 50, 30, 10]}
        //   colors="#A30000"
        onComplete={() => {
          setIsPlaying(false);
          props.func(false);
          // do your stuff here
          return { shouldRepeat: false, delay: 1.5 }; // repeat animation in 1.5 seconds
        }}
      >
        {({ remainingTime, color }) => (
          <Text style={{ color, fontSize: 15 }}>{remainingTime}</Text>
        )}
      </CountdownCircleTimer>
    </View>
  ) : (
    <View></View>
  );

  // <View>
  //   <CountdownCircleTimer
  //     isPlaying={isPlaying}
  //     duration={30}
  //     colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
  //     colorsTime={[0, 10, 5, 0]}
  //     onComplete={() => ({ shouldRepeat: true, delay: 2 })}
  //     updateInterval={1}
  //   >
  //     {({ remainingTime, color }) => (
  //       <Text style={{ color, fontSize: 15 }}>{remainingTime}</Text>
  //     )}
  //   </CountdownCircleTimer>
  //   <Button
  //     marginTop={5}
  //     title="Toggle Playing"
  //     onPress={() => setIsPlaying((prev) => !prev)}
  //   >
  //     Start Assessment
  //   </Button>
  // </View>
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