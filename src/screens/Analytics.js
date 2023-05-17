import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CARD_WIDTH = 200;
const CARD_HEIGHT = 130;

const AnalyticsCard = ({ title, iconName, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Icon name={iconName} style={styles.icon} />
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const Analytics = ({ navigation }) => {
  const analyticsData = [
    { title: 'Topic Analytics', iconName: 'line-chart' },
    { title: 'Progress Analytics', iconName: 'tasks' },
    { title: 'Question Analytics', iconName: 'bar-chart' },
    { title: 'Challenge Analytics', iconName: 'users' },
    { title: 'Skill Analytics', iconName: 'id-badge' },
    // Add more analytics data as needed
  ];

  const handleCardPress = (title) => {
    // Navigate to a different page based on the card title
    if (title === 'Topic Analytics') {
      navigation.navigate('TopicAnalytics');
    } else if (title === 'Progress Analytics') {
      navigation.navigate('ProgressChart');
    } else if (title === 'Question Analytics') {
      navigation.navigate('QuestionAna');
    } else if (title === 'Challenge Analytics') {
      navigation.navigate('ChallengeAna');
    } else if (title === 'Skill Analytics') {
      navigation.navigate('SkillChart');
    }
  };

  return (
    <View style={styles.container}>
      {analyticsData.map((data, index) => (
        <AnalyticsCard
          key={index}
          title={data.title}
          iconName={data.iconName}
          onPress={() => handleCardPress(data.title)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#594057"
   
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    paddingTop: '10%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Analytics;
