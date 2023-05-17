import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { View, Text } from 'react-native';
import { VictoryPie, VictoryLegend, VictoryLabel } from 'victory-native';


const ChallengeAna = () => {
  const [data, setData] = useState(null);
  const { userInfo, serverUrl, serverPort } = useContext(AuthContext);
  const baseUrl = serverUrl + serverPort;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const playerId = userInfo.user._id // Replace with the actual player ID
      const response = await fetch(baseUrl + `/api/multiplayerMatchResults/${playerId}`);
      
      const jsonData = await response.json();
      setData(jsonData[0]); // Assuming the API returns a single result object
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor:"#594057" }}>
      <Text style={{ fontWeight:'bold' , color:"white", marginTop:"10%", paddingLeft:"0%", fontSize:"20px"}}>Multiplayer Match Results</Text>
      {data ? (
        <View style={{top:"-10%"}}>
          
          <VictoryLegend
            x={250}
            y={200}
            title="Legend"
            centerTitle
            orientation="vertical"
            gutter={20}
            style={{ border: { stroke: 'white' }, title:{fill:"white"} }}
            data={[
              { name: 'Games Won', symbol: { fill: '#6FCF97' } },
              { name: 'Games Lost', symbol: { fill: '#EB5757' } },
            ]}
            labelComponent={
              <VictoryLabel style={{ fill: 'white' }} /> // Set the text color to white
            }
            
          />
          <VictoryPie
         
            data={[
              {  y: parseInt(data.gamesWon) },
              {  y:parseInt(data.gamesLost) },
            ]}
            colorScale={['#6FCF97', '#EB5757']}
            innerRadius={70}
            labelRadius={90}
            padAngle={2}
            labels={({ datum }) => `${datum.y}`}
            style={{ labels: { fontSize: 12, fontWeight: 'bold' } }}
          />
          
          <Text style={{fontWeight:"bold", paddingLeft:"10%", color:"white"}}>Total Games: {data.totalGames}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default ChallengeAna;