import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { VictoryPie, VictoryLegend } from 'victory-native';

const ProgressChart = () => {
  const [data, setData] = useState(null);
  const { userInfo, serverUrl, serverPort } = useContext(AuthContext);
  const baseUrl = serverUrl + serverPort;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const playerId = "64121292de6365205fdc2227"; // Replace with the actual player ID
      const response = await fetch(baseUrl + `/api/players/${userInfo.user._id}/progress`);
      const jsonData = await response.json();
      setData(processData(jsonData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const processData = (jsonData) => {
    return jsonData.map(topic => ({
      topicId: topic.topicId,
      topicName: topic.topicName,
      progress: parseFloat(topic.progress)
    }));
  };

  const screenWidth = Dimensions.get('window').width;
  const chartSize = screenWidth * 0.8;

  return (
    <ScrollView style={{ backgroundColor:"#594057"}}>
      <Text style={styles.heading}>Player Progress</Text>
      <View style={styles.container}>
        {data ? (
          data.map(topic => (
            <View key={topic.topicId} style={styles.chartContainer}>
              <Text style={styles.topicName}>{topic.topicName}</Text>
              <VictoryPie
                data={[
                  { x: 'Progress', y: parseInt(topic.progress) },
                  { x: 'Remaining', y: 100 - parseInt(topic.progress) },
                ]}
                colorScale={['#2ecc71', '#e74c3c']}
                width={chartSize}
                height={chartSize}
                padAngle={2}
                labels={() => null}
                innerRadius={chartSize * 0.1}
              />
              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendIcon, { backgroundColor: '#2ecc71' }]} />
                  <Text style={styles.legendLabel}>Progress</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendIcon, { backgroundColor: '#e74c3c' }]} />
                  <Text style={styles.legendLabel}>Remaining</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: '5%',
   
    color:"white"
  },
  container: {
    backgroundColor:"#594057",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  chartContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  topicName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:"white"
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  legendIcon: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendLabel: {
    fontSize: 12,
    color:"white"
  },
});

export default ProgressChart;