import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

import { View, Text } from 'react-native';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack, VictoryLegend,VictoryLabel } from 'victory-native';

const QuestionAna = () => {
  const [data, setData] = useState([]);
  const { userInfo, serverUrl, serverPort } = useContext(AuthContext);
  const baseUrl = serverUrl + serverPort;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data from API
      const response = await fetch(baseUrl + `/api/question-stats/${userInfo.user._id}`);
      const jsonData = await response.json();

      // Update the state with the processed data
      setData(processData(jsonData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const processData = (jsonData) => {
    const processedData = [];

    for (const difficulty in jsonData) {
      const difficultyData = jsonData[difficulty];
      const dataPoint = {
        difficulty: difficulty,
        correct: parseFloat(difficultyData.correct),
        incorrect: parseFloat(difficultyData.incorrect),
        total: parseFloat(difficultyData.total),
      };

      processedData.push(dataPoint);
    }

    return processedData;
  };

  return (
    <View style={{ flex: 1,  backgroundColor:"#594057"}}>
      {data.length > 0 ? (
        <View style={{flex:1}}>
           <Text style={{marginTop:"30%", marginBottom:"20%",fontWeight:"bold", fontSize:"20%",color:"white", padding:"10%"}}>Bar Chart For Question Analytics</Text>
          <VictoryChart domainPadding={{ x: [30, 30], y: [20, 20] }}>
          <VictoryLegend
            x={300}
            y={0}
            style={{ fill: 'white' }}
            orientation="vertical"
            style={{ border: { stroke: 'white'}, fill:"white" }}
            gutter={20}
            data={[
              { name: 'Incorrect', symbol: { fill: '#6FCF97' } },
              { name: 'Correct', symbol: { fill: '#EB5757' } },
            ]}
            labelComponent={
              <VictoryLabel style={{ fill: 'white' }} /> // Set the text color to white
            }
          />
          <VictoryLabel
          text="Difficulty Level"
          x={200}
          y={295}
          textAnchor="middle"
          style={{ fill: 'white' }}
        />
        <VictoryLabel
          text="Count of Total Answers"
          x={10}
          y={150}
          angle={-90}
          textAnchor="middle"
          style={{ fill: 'white' }}
        />
            <VictoryAxis
              tickValues={data.map((d) => d.difficulty)}
              style={{ tickLabels: { angle: -45, fill:"white" } }}
              // style={{ fill: 'white' }}
            />
            <VictoryAxis dependentAxis 
             style={{ tickLabels: { fontSize: 10, fill:"white" } }}/>
            <VictoryStack colorScale={['#6FCF97', '#EB5757']}>
              <VictoryBar
                data={data}
                x="difficulty"
                y="incorrect"
              />
              <VictoryBar
                data={data}
                x="difficulty"
                y="correct"
              />
            </VictoryStack>
          </VictoryChart>
          
        </View>
      ) : null}
    </View>
  );
};

export default QuestionAna;