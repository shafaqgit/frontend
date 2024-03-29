import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const Result = ({navigation}) => {
    
    // { correctAnswers, totalQuestions }
  
  const score = navigation.state.params.percentageScore
  console.log("score",score)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assessment Results</Text>
      <Text style={styles.subtitle}>
        You answered {navigation.state.params.count} out of {10} questions correctly.
      </Text>
      <Text style={styles.score}>
        Your total score is {navigation.state.params.percentageScore}%.
      </Text>

      <Text style={styles.elapsedTime}>
        Time Elapsed {navigation.state.params.elapsedTime} Seconds.
      </Text>

      {score < 50 ? (
      <ConfettiCannon
        count={300}
        origin={{ x: -10, y: 0 }}
        autoStart={true}
        colors={['#333333', '#555555', '#222222']}
        shape="triangle"
        size={10}
        fallSpeed={20000}
        blastDirection={-90}
      />
      ):(

      <ConfettiCannon
        count={200}
        origin={{ x: -10, y: 0 }}
        autoStart={true}
        size={15}
        fallSpeed={10000}
        blastDirection={-90}
      />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#594057",
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color:"white"
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
    color:"white"
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"white"
  },
  elapsedTime: {
    fontSize: 16,
    color: '#777',
    marginTop: 8,
  }
});

export default Result;