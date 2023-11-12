import React, { useEffect, useState } from "react";
import {
  StatusBar,
  FlatList,
} from 'react-native';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,

} from "react-native";
import { useNavigation } from '@react-navigation/native';
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Location from "expo-location";
import axios from "axios";
import qs from "qs";


const HomePageNearby = ({ setNearbyTab, setSocialTab }) => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [chatroom_data, setChatroomData] = useState(null);

  async function make_csrf_token() {
    const csrf_response = await axios.get("https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/generate_csrf");
    csrf_data = csrf_response.data;
    return csrf_data.csrf_token;
  }
  async function connect_to_chatroom(chatroom_id) {
    const data = qs.stringify({
      id: chatroom_id
    });
    
    const token = await make_csrf_token();
    const response = await axios.post(
      "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/join_chatroom",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Csrf-Token": token,
        },
      }
    );
    setErrorMsg(response.data);
    console.log(response.data);
    if (response.data == '') {
      navigation.navigate("Chatroom")
    }
  }

  async function load_chatrooms() {
    const response = await axios.get("https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/load_chatrooms");
    let chatrooms = [];
    const data = await response.data;
    data.forEach(element => {
      element = JSON.parse(element);
      id = element.id;
      loc = element.location;
      host = element.host;
      chatrooms.push([id, loc, host]);
    });
    setChatroomData(chatrooms);
  }
  load_chatrooms();

  async function update_location(loc) {
    const data = qs.stringify({
      location: loc
    });
    const token = await make_csrf_token();

    const response = await axios.post(
      "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/update_user_location",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Csrf-Token": token,
        },
      }
    );
    setErrorMsg(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("STATUS", status);

      if (status !== "granted") {
        console.log("Location permission not granted");
        return;
      }

      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        console.error("Error getting the initial position:", error);
      }

      try {
        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (newLocation) => {
            setLocation(newLocation);
            console.log("User's location:", newLocation);
          }
        );
      } catch (error) {
        console.error("Error starting location monitoring:", error);
      }
    };

    //getLocation();
   //  Clean up the location subscription when the component unmounts
    //return () => {
      //if (locationSubscription) {
      //  locationSubscription.remove();
      //}
    //};
  }, []);

  return (
    <View style={styles.contentOfHomePage}>
      {/* Div for Main Three Tabs */}
      <View style={styles.mainTabs}>
        {/* Social Icon */}
        <View style={styles.topIconDiv}>
          <View style={styles.iconDiv}>
            <TouchableOpacity
              onPress={() => {
                setNearbyTab(false);
                setSocialTab(true);
              }}
            >
              <Ionicons name="people-outline" size={60} color={"#56585B"} />
            </TouchableOpacity>
          </View>
          <View style={styles.iconTextDiv}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                color: "#56585B",
              }}
            >
              Social
            </Text>
          </View>
        </View>

        {/* Nearby Icon */}
        <View style={styles.topIconDiv}>
          <View style={styles.iconDiv}>
            <TouchableOpacity>
              <Feather name="map-pin" size={50} color={"#93B8DA"} />
            </TouchableOpacity>
          </View>

          <View style={styles.iconTextDiv}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                color: "#93B8DA",
              }}
            >
              Nearby
            </Text>
          </View>
        </View>

        {/* Explore Icon */}
        <View style={styles.topIconDiv}>
          <View style={styles.iconDiv}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="map-search-outline"
                size={50}
                color={"#56585B"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.iconTextDiv}>
            <Text style={styles.iconText}>Explore</Text>
          </View>
        </View>
      </View>

      {/* Recent Users Text */}
      <View style={styles.recentUserTextDiv}>
        <View style={styles.infoIcon}>
          <Octicons name="info" size={20} color={"#93B8DA"} />
        </View>

        <View style={styles.recentUserText}>
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 14 }}>
            Tap a Bubble to Join
          </Text>
        </View>
      </View>
      {/* WHERE TO ADD BUBBLES NEARBY */}
      <View style={styles.nearbyBubblesDiv}>
        <View>  
          <View style={styles.container_style}>
            <FlatList 
              data={chatroom_data}
              renderItem={({item}) => <Text style={{color : 'white'}} onPress={() => connect_to_chatroom(item[0])}>{item}</Text> }
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomePageNearby;

const styles = StyleSheet.create({
  chatroom_list_box: {
    backgroundColor: '#B591FF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  nearbyBubblesDiv: {
    display: "flex",
    height: "73%",
    width: "100%",
  },

  recentUserText: {
    display: "flex",
    height: "100%",
    width: "85%",
    justifyContent: "flex-end",
    paddingLeft: 3,
  },
  infoIcon: {
    display: "flex",
    height: "100%",
    width: "15%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  recentUserTextDiv: {
    display: "flex",
    flexDirection: "row",
    height: "12%",
    width: "100%",
  },

  iconText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#56585B",
  },
  iconTextDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "25%",
    width: "100%",
  },
  iconDiv: {
    display: "flex",
    paddingTop: 15,
    justifyContent: "center",
    alignItems: "center",
    height: "75%",
    width: "100%",
  },
  topIconDiv: {
    display: "flex",
    height: "100%",
    width: "33%",
    alignItems: "center",
  },
  mainTabs: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: "15%",
    width: "100%",
  },
  contentOfHomePage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 5,
    height: "74%",
    backgroundColor: "#131313",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
});
