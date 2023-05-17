import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { View, StyleSheet, Text, LogBox } from 'react-native';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLegend, VictoryStack, VictoryLabel } from 'victory-native';
LogBox.ignoreAllLogs();
const TopicAnalytics = () => {
  const [data, setData] = useState([]);
  const { serverUrl, userInfo, serverPort } = useContext(AuthContext);
  const baseUrl = serverUrl + serverPort;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(baseUrl + `/api/topic-stats/${userInfo.user._id}`);
      const jsonData = await response.json();
      console.log(jsonData);
      const processedData = processData(jsonData);

      setData(processedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const processData = (jsonData) => {
    const processedData = [];

    for (const topicId in jsonData) {
      const stats = jsonData[topicId];
      let easyCorrect = 0;
      let mediumCorrect = 0;
      let hardCorrect = 0;

      for (const stat of stats) {
        if (stat.difficulty === 'easy') {
          easyCorrect += parseFloat(stat.correct);
        } else if (stat.difficulty === 'medium') {
          mediumCorrect += parseFloat(stat.correct);
        } else if (stat.difficulty === 'hard') {
          hardCorrect += parseFloat(stat.correct);
        }
      }

      processedData.push({
        topicId: topicId,
        easyCorrect: easyCorrect,
        mediumCorrect: mediumCorrect,
        hardCorrect: hardCorrect
      });
    }

    return processedData;
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight:"bold", fontSize:"20%", padding:"10%", color:"white"}}>Bar Chart Topic Analytics</Text>
      <VictoryChart height={400} domainPadding={20}>
      <VictoryLegend
          x={300}
          y={0}
          orientation="vertical"
          gutter={20}
          style={{ border: { stroke: 'white' }, fill: "white", color: "white" }} // Set color to white
          data={[
            { name: 'Easy', symbol: { fill: '#6FCF97' } },
            { name: 'Medium', symbol: { fill: '#F2C94C' } },
            { name: 'Hard', symbol: { fill: '#EB5757' } },
          ]}
          labelComponent={
            <VictoryLabel style={{ fill: 'white' }} /> // Set the text color to white
          }
        />
      <VictoryLabel
          text="Topics"
          x={200}
          y={392}
          textAnchor="middle"
          style={{ fill: 'white'}}
        />
        <VictoryLabel
          text="Count of Correct Answers"
          x={15}
          y={200}
          angle={-90}
          textAnchor="middle"
          style={{ fill: 'white' }}
        />
        <VictoryAxis
          tickFormat={() => ''}
          style={{ tickLabels: { fontSize: 10, fill:"white" } }}
        />
        
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => Math.round(tick)}
          style={{ tickLabels: { fontSize: 10, fill:"white" } }}
        />
        <VictoryStack colorScale={['#6FCF97', '#F2C94C', '#EB5757']}>
          <VictoryBar
            data={data}
            x="topicId"
            y={(datum) => parseFloat(datum.easyCorrect)}
            // labels={({ datum }) => datum.easyCorrect}
          />
          <VictoryBar
            data={data}
            x="topicId"
            y={(datum) => parseFloat(datum.mediumCorrect)}
            // labels={({ datum }) => datum.mediumCorrect}
          />
          <VictoryBar
            data={data}
            x="topicId"
            y={(datum) => parseFloat(datum.hardCorrect)}
            
            // labels={({ datum }) => datum.hardCorrect}
          />
        </VictoryStack>
        <VictoryAxis
          tickValues={data.map(topic => topic.topicId)}
          style={{ tickLabels: { fontSize: 8, angle: -45 , fill:"white"} }}
        />
        
      </VictoryChart>
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
});

export default TopicAnalytics;
