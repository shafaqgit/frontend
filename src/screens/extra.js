import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Topics = () => {
  const [topics, setTopics] = useState([
    { id: 1, title: 'Topic 1', locked: true, assessmentCompleted: false },
    { id: 2, title: 'Topic 2', locked: true, assessmentCompleted: false },
    { id: 3, title: 'Topic 3', locked: true, assessmentCompleted: false },
    { id: 4, title: 'Topic 4', locked: true, assessmentCompleted: false }
  ]);
  const topicsRef = useRef(topics);

  const unlockTopic = (id) => {
    setTopics(topics.map((topic) => {
      if (topic.id === id) {
        return { ...topic, locked: false };
      } else {
        return topic;
      }
    }));
  };

  const completeAssessment = (id) => {
    setTopics(topics.map((topic) => {
      if (topic.id === id) {
        return { ...topic, assessmentCompleted: true };
      } else {
        return topic;
      }
    }));
  };

  const canUnlockTopic = (id) => {
    if (id === 1) {
      return true; // first topic can always be unlocked
    }

    const prevTopic = topics.find((topic) => topic.id === id - 1);
    return prevTopic && prevTopic.assessmentCompleted;
  };

  const updateTopicLockedStatus = () => {
    setTopics((prevTopics) => {
      const updatedTopics = prevTopics.map((topic, index) => {
        const nextTopic = prevTopics[index + 1];
        if (canUnlockTopic(topic.id) && (!nextTopic || !nextTopic.locked)) {
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
    <View>
      {topics.map((topic) => (
        <View key={topic.id} style={styles.card}>
          <Text style={styles.title}>{topic.title}</Text>
          {topic.locked && (
            <TouchableOpacity style={styles.button} onPress={() => canUnlockTopic(topic.id) && unlockTopic(topic.id)}>
              <Text style={styles.buttonText}>Unlock</Text>
            </TouchableOpacity>
          )}
          {!topic.locked && !topic.assessmentCompleted && (
            <TouchableOpacity style={styles.button} onPress={() => completeAssessment(topic.id)}>
              <Text style={styles.buttonText}>Complete Assessment</Text>
            </TouchableOpacity>
          )}
          {!topic.locked && topic.assessmentCompleted && (
            <TouchableOpacity style={styles.button} onPress={() => canUnlockTopic(topic.id + 1) && unlockTopic(topic.id + 1)}>
              <Text style={styles.buttonText}>Unlock Next Topic</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
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

export default Topics;
