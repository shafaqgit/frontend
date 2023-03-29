import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView} from 'react-native';
import Xyz from './Xyz';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from "../context/AuthContext";

const RatingStars = ({ skillLevel }) => {
  return (
    <View style={styles.ratingContainer}>
      {/* {[1, 2, 3].map((i) => (
        <Ionicons
          key={i}
          name={i <= skillLevel ? "star" : "star-outline"}
          size={20}
          color={i <= skillLevel ? "gold" : "gray"}
        />
      ))} */}
      
    </View>
  );
};
const Topics = (props) => {
  
  const [result, setResult] = useState(null);
  // const [complete, handleComplete]=useState(null)
  
  
  const [topics, setTopics] = useState([]);
  
  const topicsRef = useRef(topics);
  const { userInfo } = useContext(AuthContext);

  // const { userInfo } = useContext(AuthContext);
  useEffect(() => {
    setTopics(userInfo.user.personalTopics);
  }, [userInfo]);
  
  const unlockTopic = (index) => {
    setTopics(topics.map((topic, i) => {
      if (i === index) {
        return { ...topic, locked: false };
      } else {
        return topic;
      }
    }));
  };
//topic bhejo yahan se 
  const completeAssessment = (index) => {
    const topicId = topics[index]._id; // Assuming the topic object has an `id` property

    props.navigation.navigate('Xyz', { index})
    console.log(topicId)
    
  };
  

  const canUnlockTopic = (index) => {
    if (index === 0) {
      return true; // first topic can always be unlocked
    }
    const prevTopic = topics[index - 1];
    return prevTopic && (prevTopic.index === 1 || prevTopic.assessmentCompleted);
  };

  const updateTopicLockedStatus = () => {
    setTopics((prevTopics) => {
      const updatedTopics = prevTopics.map((topic, index) => {
        const nextTopic = prevTopics[index + 1];
        if (canUnlockTopic(index) && (!nextTopic || !nextTopic.locked)) {
          return { ...topic, locked: false };
        } else {
          return { ...topic, locked: true };
        }
      });
  
      topicsRef.current = updatedTopics;
  
      return updatedTopics;
    });
  };

  useEffect(() => {
    updateTopicLockedStatus();
  }, []);
  
  return (
    <ScrollView>
      <View style={{marginTop:20}}>
        {topics.map((topic, index) => (
          <View key={index} style={[styles.card, topic.locked && styles.lockedCard]}>
            <Text style={styles.title}>{topic.tName}</Text>
            {topic.locked && (
              <TouchableOpacity style={styles.button} onPress={() => canUnlockTopic(index) && unlockTopic(index)}>
                <Text style={styles.buttonText}>Unlock</Text>
              </TouchableOpacity>
            )}
            {!topic.locked && !topic.assessmentCompleted && (
              
              <TouchableOpacity style={styles.button} onPress={() => completeAssessment(index)}>
                <Text style={styles.buttonText}>Complete Assessment</Text>
              </TouchableOpacity>
            )}

            {!topic.locked && topic.assessmentCompleted && index !== topics.length - 1 && (
              <View style={{ flexDirection: 'row'}}>
              <TouchableOpacity style={styles.button} onPress={() => canUnlockTopic(index + 1) && unlockTopic(index + 1)}>
                <Text style={styles.buttonText}>Unlock Next Topic</Text>
                
              </TouchableOpacity >
               <TouchableOpacity style={styles.button} onPress={() => completeAssessment(index)}>
               <Text style={styles.buttonText} >Complete Assessment</Text>
             </TouchableOpacity>
             </View>
            )}

            <RatingStars skillLevel={topic.skillLevel} />
            {/* <RatingStars skillLevel={1} /> */}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    // backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "lightgrey",
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  lockedCard:{
    backgroundColor: 'pink'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    marginLeft:10,
    borderRadius: 5,
    marginTop: 10
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold'
  },
  completedText: {
    marginTop: 10,
    color: 'green'
  }
});

export default Topics;