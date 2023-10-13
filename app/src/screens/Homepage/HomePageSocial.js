import React, { useState } from "react"; // It's important to import React
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import BubbleComponent from "../../svgs/bubbleComponent";
import { Dimensions } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const HomePageSocial = ({ navigation }) => {
  return (
    <View style={styles.HomePageBackground}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topOfHomePage}>
          {/* Top Icon Bar */}
          <View style={styles.topBar}>
            {/* Bubble Logo */}
            <View style={styles.bubbleLogo}>
              <BubbleComponent width={120} height={40} />
            </View>
            {/* Padding Div*/}
            <View style={styles.paddingDiv}></View>
            {/* Div for Notifcations and DM Icons */}
            <View style={styles.topIcons}>
              {/* Notifcation Icon */}
              <View style={styles.notiDiv}>
                <TouchableOpacity>
                  <Feather name="bell" size={34} color={"#56585B"} />
                </TouchableOpacity>
              </View>
              {/* DM Icon */}
              <View style={styles.dmDiv}>
                <TouchableOpacity>
                  <Octicons name="paper-airplane" size={28} color={"#56585B"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.bottomBar}>
            <View style={styles.addBubbleDiv}>
              <TouchableOpacity style={styles.addBubbleIcon}>
                <View style={styles.plusLogoIcon}>
                  <AntDesign name="pluscircleo" size={20} color={"white"} />
                </View>

                <View style={styles.BubbleText}>
                  <Text
                    style={{ fontWeight: "bold", color: "white", fontSize: 16 }}
                  >
                    Bubble
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.contentOfHomePage}>
          {/* Div for Main Three Tabs */}
          <View style={styles.mainTabs}>
            {/* Social Icon */}
            <View style={styles.topIconDiv}>
              <View style={styles.iconDiv}>
                <Ionicons name="people-outline" size={60} />
              </View>

              <View style={styles.iconTextDiv}>
                <Text style={styles.iconText}>Social</Text>
              </View>
            </View>

            {/* Nearby Icon */}
            <View style={styles.topIconDiv}>
              <View style={styles.iconDiv}>
                <Feather name="map-pin" size={50} />
              </View>

              <View style={styles.iconTextDiv}>
                <Text style={styles.iconText}>Nearby</Text>
              </View>
            </View>

            {/* Explore Icon */}
            <View style={styles.topIconDiv}>
              <View style={styles.iconDiv}>
                <MaterialCommunityIcons name="map-search-outline" size={50} />
              </View>

              <View style={styles.iconTextDiv}>
                <Text style={styles.iconText}>Explore</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomNavBar}>{/* BOTTOM 8 PERCENT */}</View>
      </SafeAreaView>
    </View>
  );
};

export default HomePageSocial;

const styles = StyleSheet.create({
  iconText: {
    fontWeight: "bold",
    fontSize: 18,
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

    backgroundColor: "green",
  },
  topIconDiv: {
    display: "flex",
    height: "100%",
    width: "33%",
    alignItems: "center",
    backgroundColor: "blue",
  },
  mainTabs: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: "15%",
    width: "100%",
    backgroundColor: "red",
  },
  BubbleText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "70%",
    paddingRight: 5,
  },
  plusLogoIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    height: "100%",
    width: "30%",
  },
  addBubbleIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 100,
    height: 35,
    backgroundColor: "#93B8DA",
    borderRadius: 20,
  },
  addBubbleDiv: {
    display: "flex",
    height: "100%",
    width: "35%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBar: {
    display: "flex",
    flexDirection: "row",
    height: "50%",
    width: "100%",
  },
  dmDiv: {
    display: "flex",
    height: "100%",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "-45deg" }],
    paddingBottom: 8,
  },
  notiDiv: {
    display: "flex",
    height: "100%",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  topIcons: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  paddingDiv: {
    display: "flex",
    height: "100%",
    width: "35%",
  },
  bubbleLogo: {
    display: "flex",
    height: "100%",
    width: "35%",
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    height: "50%",
    width: "100%",
  },
  HomePageBackground: {
    display: "flex",
    height: "100%",
    width: "100%",
    backgroundColor: "#191818",
  },
  topOfHomePage: {
    display: "flex",
    justifyContent: "flex-start",
    height: "18%",
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
  bottomNavBar: {
    display: "flex",
    height: "8%",
    width: "100%",
    backgroundColor: "#1a1a1a",
  },
});
