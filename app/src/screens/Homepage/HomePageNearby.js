import React from "react"; // It's important to import React
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const HomePageNearby = ({ setNearbyTab, setSocialTab }) => {
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
      <View style={styles.nearbyBubblesDiv}></View>
    </View>
  );
};

export default HomePageNearby;

const styles = StyleSheet.create({
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
