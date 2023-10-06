import React from "react"; // It's important to import React
import { Text, View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Onboarding = ({ navigation }) => {
  return (
    <View style={styles.onboardingBackground}>
      <View style={styles.upperHalfofOnboarding}>
        <View style={styles.lowerOfUpper}>
          {/* View for Bubble Logo and Motto*/}
          <View style={styles.bubbleLogo}>
            <Ionicons name="chatbox" size={100} style={styles.iconStyle} />
            <Text style={{ fontSize: 64, color: "gray" }}>Bubble</Text>
          </View>
          <View></View>
        </View>
      </View>

      {/* View for Login and Register Buttons*/}
      <View style={styles.bottomHalfofOnboarding}>
        <Text>Joe</Text>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  onboardingBackground: {
    display: "flex",
    backgroundColor: "#1a1a1a",
  },
  upperHalfofOnboarding: {
    display: "flex",
    justifyContent: "flex-end",
    height: "50%",
    width: "100%",
    backgroundColor: "red",
  },
  bottomHalfofOnboarding: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
    backgroundColor: "blue",
  },
  bubbleLogo: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  lowerOfUpper: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    backgroundColor: "green",
    height: "50%",
  },
  iconStyle: {
    size: 100,
    position: "absolute",
    right: "60%",
    color: "black",
  },
});
