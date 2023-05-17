import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { View, Text } from 'react-native';
import { VictoryChart, VictoryPolarAxis, VictoryTheme, VictoryArea, VictoryLabel, VictoryScatter } from 'victory-native';

const SkillChart = () => {
  
  const [chartData, setChartData] = useState(null);
  const { userInfo, serverUrl, serverPort } = useContext(AuthContext);
  const baseUrl = serverUrl + serverPort;
  useEffect(() => {
    fetch(baseUrl + `/api/players/${userInfo.user._id}/topics-and-stages`)
      .then(response => response.json())
      .then(data => {
        const processedData = data.map(item => ({
          topicName: item.topicName,
          stage: item.stage
        }));

        const radarData = processedData.map(item => ({
          x: item.topicName,
          y: item.stage === ('S1'||'S2'||'S3'||'S4'||'S5') ? 1 : item.stage === ('S6'||'S7'||'S8'||'S9'||'S10'||'S11') ? 2 : item.stage === 'S12' ? 3 : 0
        }));

        setChartData(radarData);
      })
      .catch(error => {
        console.error(error);
 });
  }, []);

  if (!chartData) {
    return null; // You can display a loading indicator here
  }

  return (
    <View style={{flex:1}}>
       <Text style={{marginBottom:"30%", marginTop:"20%", fontWeight:"bold", fontSize:"20%", paddingLeft:"20%"}}>Radar Chart For Topic Analytics</Text>

      <VictoryChart polar
        theme={VictoryTheme.material}
        domain={{ y: [0, 4] }}
      >
        <VictoryScatter
          data={chartData}
          size={5} // Adjust the size as needed
          style={{ data: { fill: "red" } }} // Adjust the color of the inner circles
          animate={{ duration: 500 }}
          // labels={({ datum }) => datum.y} // Set label to display topic name
          labelComponent={<VictoryLabel dy={-8} style={{ fill: "black" }} textAnchor="middle" />} // Adjust label position and color
        />
       <VictoryPolarAxis
          dependentAxis
          tickValues={[1, 2, 3]}
          // tickFormat={t => `S${t}`}
          tickFormat={["B", "I", "E"]}
          style={{
            axis: { stroke: "black" },
            grid: { stroke: "black", strokeWidth: 1, opacity: 0.5 },
            tickLabels: { fill: "black", fontSize: 20, padding: 6, opacity:1},
            
            axisLabel: { fontSize: 12, padding: 20 ,fill: "white"},
            innerTick: { stroke: "black", strokeWidth: 0.25, opacity: 1 },
            axisLine: { stroke: "grey", strokeWidth: 0.5, opacity: 1 },
          }}
          tickLabelComponent={<VictoryLabel angle={20} />}
        />
        <VictoryPolarAxis />
        <VictoryArea
          data={chartData}
          style={{ data: { fill: "rgba(217, 223, 37, 0.5)" } }} // Transpa
        />
      </VictoryChart>
    </View>
  );
};

export default SkillChart;
