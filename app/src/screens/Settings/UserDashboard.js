import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import { Ionicons, Entypo, AntDesign  } from '@expo/vector-icons';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
import * as Haptics from 'expo-haptics'
import axios from "axios";
import { useState } from "react";

const UserDashboard = ({ navigation }) => {
  const barData = [
    {value: 2, label: 'M'},
    {value: 1, label: 'T'},
    {value: 10, label: 'W'},
    {value: 15, label: 'F'},
    {value: 20, label: 'S'},
  ];
  const colorScale = ["gray", "#00a9ff"];

  const [username, setUsername] = useState(null);
  const [userid, setUserId] = useState(null);

  async function load_profile_data() {
    const response = await axios.get(
      "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/account_ops/profile_data"
    );
    profile_data = response.data;
    setUsername(profile_data.name);
    setUserId(profile_data.id);
  }

  return (
    <View style={styles.container} onLayout={() => load_profile_data() }>
            <SafeAreaView style={{ flex: 1 }}>

      <ScrollView showsVerticalScrollIndicator={false}>

      <View style={styles.header}>
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileInfo}>
            <View style={styles.circle}></View>
            <View style={styles.nameInfo}>
              <Text style={styles.name}>{ username }</Text>
              <Text style={styles.handle}>@{ userid }</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.weeklyDashboard}>
          <Text style={styles.dashboardTitle}>Weekly Dashboard</Text>
          <View style={styles.dashboardContent}>

          <View style={styles.barChartContainer}>
          <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: [30, 30], y: 20 }}
                height={200}
                width={250}
              >
                <VictoryAxis
                  style={{
                    grid: { stroke: "none" },
                    ticks: { stroke: "none" },
                    tickLabels: {
                      fill: "white",  // Removed labels
                    },
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  style={{
                    grid: { stroke: "none" },
                    tickLabels: {
                      fill: "none",  // Removed y-axis
                    },
                  }}
                />
  <VictoryBar
  data={barData.map((dataPoint, index) => ({
    ...dataPoint,
      value: dataPoint.value,
      index,
    }))}
    x="label"
    y="value"
    style={{
      data: {
        fill: ({ datum }) => datum.frontColor || colorScale[datum.index % colorScale.length],
        borderRadius: 8,
      },

    }}
    labels={({ datum }) => `${datum.value} ${currentMetric}`}
    cornerRadius={5}
    animate={{
      duration: 2000,
      onLoad: { duration: 1000 },
    }}
  />
</VictoryChart>
</View>
<View style={styles.bubbleInfoContainer}>
          <Text style={styles.headerText}>Bubbles Joined</Text>
          <View style={styles.blackBox}>
            <Text style={styles.boxText}>20</Text>
          </View>
          <Text style={styles.headerText}>Bubbles Created</Text>
          <View style={styles.greenBox}>
            <Text style={styles.boxText}>5</Text>
          </View>
        </View>
        </View>
        </View>
      </View>

      <View style={styles.infoContainer}>
      <AntDesign name="infocirlceo" size={24} color="gray" />
    <Text style={styles.infoText}>Bubbles your friends are in</Text>
  </View>

  <View style={styles.rectangleContainer}>
    {/* Rectangle 1 */}
    <View style={styles.rectangle}>
  <View style={styles.statusInfoContainer}>
    <View style={styles.circle2}></View>
    <View style={styles.statusInfo}>
      <Text style={styles.onlineStatus}>Online</Text>
      <Text style={styles.roomStatus}>Searching for a room...</Text>
    </View>
  </View>
  <View style={styles.usernameInfo}>
    <Text style={styles.usernameInGreen}>John</Text>
    <Text style={styles.username}>@john</Text>
  </View>
</View>

<View style={styles.rectangle}>
  <View style={styles.statusInfoContainer}>
    <View style={styles.circle2}></View>
    <View style={styles.statusInfo}>
      <Text style={styles.onlineStatus}>Online</Text>
      <Text style={styles.roomStatus}>Searching for a room...</Text>
    </View>
  </View>
  <View style={styles.usernameInfo}>
    <Text style={styles.usernameInGreen}>John</Text>
    <Text style={styles.username}>@john</Text>
  </View>
</View>

<View style={styles.rectangle}>
  <View style={styles.statusInfoContainer}>
    <View style={styles.circle2}></View>
    <View style={styles.statusInfo}>
      <Text style={styles.onlineStatus}>Online</Text>
      <Text style={styles.roomStatus}>Searching for a room...</Text>
    </View>
  </View>
  <View style={styles.usernameInfo}>
    <Text style={styles.usernameInGreen}>John</Text>
    <Text style={styles.username}>@john</Text>
  </View>
</View>

  </View>

      
      </ScrollView>
      </SafeAreaView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191818',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Changed to flex-start
    marginBottom: 20,
  },
  profileInfoContainer: {
    marginTop: 30, // Added more margin to move the circle down
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 80, // Increased the size
    height: 80, // Increased the size
    borderRadius: 40, // Increased the size
    borderWidth: 5,
    borderColor: 'white',
  },
  nameInfo: {
    marginLeft: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  handle: {
    color: 'gray',
  },
  content: {
    flexDirection: 'row', // Changed to row for side-by-side layout
    justifyContent: 'space-between',
  },
  weeklyDashboard: {
    flex: 1,
    backgroundColor: '#242735',
    borderRadius: 20,
    padding: 20,
    height: '80%'
  },
  dashboardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Center children vertically,
    marginBottom: '20%'
  },

  dashboardTitle: {
    color: '#56586F',
    fontSize: 12,
    marginBottom: 10,
  },
  bubbleInfo: {
    flex: 0.4, // Adjusted flex
    backgroundColor: '#1B1D26',
    padding: 20,
    borderRadius: 20,
  },
  bubbleText: {
    color: 'white',
    fontSize: 12,
    marginBottom: 10,
  },
  barChartContainer: {
    flex: 1,  // Takes up 60% of the available space
    alignItems: 'center', // Center chart content horizontally
    justifyContent: 'center', // Center chart content vertically
  },

  
  bubbleInfoContainer: {  
    backgroundColor: '#1B1D26',
    padding: 15,  // Reduced padding to make the box smaller
    borderRadius: 20,
    alignItems: 'center', // Center text content horizontally
    justifyContent: 'center', // Center text content vertically
  },
  headerText: {
    color: 'white',
    fontSize: 12,
    marginBottom: 10,
  },
  blackBox: {
    backgroundColor: 'black',
    borderRadius: 10, // Adjusted borderRadius
    width: 40, // Adjusted dimensions
    height: 40, // Adjusted dimensions
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5, // Reduced marginBottom
  },
  greenBox: {
    backgroundColor: '#83BD72',
    borderRadius: 10, // Adjusted borderRadius
    width: 40, // Adjusted dimensions
    height: 40, // Adjusted dimensions
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  boxText: {
    color: 'white',
    fontSize: 16,
  },
  
infoContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 10, // Move it to the left side of the screen
},
infoText: {
  color: 'gray',
  marginLeft: 10, // Space between the icon and the text
},
rectangleContainer: {
  marginTop: 20,
},
rectangle: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start', // Changed from 'center' to 'flex-start'
  backgroundColor: '#181A20',
  borderRadius: 20,
  marginBottom: 10, // Space between rectangles
  padding: 20,
  height: 100,
},
circle2: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: 'gray', // Replace with actual image later
},
statusInfoContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
statusInfo: {
  marginLeft: 10,
},
usernameInfo: {
  alignItems: 'flex-end',
},

usernameInGreen: {
  color: '#83BD72',
  fontSize: 12, // You can adjust the size as per your need
},
username: {
  color: 'gray',
  fontSize: 8, // You can adjust the size as per your need
},
onlineStatus: {
  color: '#83BD72',
},
roomStatus: {
  color: '#555353',
},
});

export default UserDashboard;
