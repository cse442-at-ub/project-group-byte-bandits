import React, { useState } from "react"; // It's important to import React
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import BubbleComponent from "../../svgs/bubbleComponent";
import LineComponent from "../../svgs/lineComponent";
import { Dimensions } from "react-native";

const HomePageSocial = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <View style={styles.HomePageBackground}>
      <View style={styles.upperHalfOfHomePage}></View>

      {/* View for Login and Register Buttons*/}
      <View style={styles.bottomHalfOfHomePage}>
        {/* TEXT INPUT FOR USERNAME OR EMAIL */}
      </View>
    </View>
  );
};

export default HomePageSocial;

const styles = StyleSheet.create({
  HomePageBackground: {
    display: "flex",
    height: "100%",
    weight: "100%",
    backgroundColor: "#1a1a1a",
  },
  upperHalfOfHomePage: {
    display: "flex",
    justifyContent: "flex-end",
    height: "18%",
    width: "100%",
  },
  bottomHalfOfHomePage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 5,
    height: "82%",
    backgroundColor: "rgb(19,19,19)",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
});
