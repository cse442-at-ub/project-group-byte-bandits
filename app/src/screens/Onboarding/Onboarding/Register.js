import React from "react"; // It's important to import React
import { Text, View, StyleSheet, TouchableOpacity, Button } from "react-native";
import Oticons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BubbleComponent from "../../../svgs/bubbleComponent";
import LineComponent from "../../../svgs/lineComponent";

const Register = ({ navigation }) => {
  return (
    <View style={styles.onboardingBackground}>
      <View style={styles.upperHalfofOnboarding}>
        <View style={styles.lowerOfUpper}>
          {/* View for Bubble Logo and Motto*/}
          <View style={styles.bubbleLogo}>
            <BubbleComponent />
          </View>
          {/* View for Underline */}
          <View style={styles.underLineArea}>
            <LineComponent />
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                position: "absolute",
                top: 18,
                fontSize: 18,
              }}
            >
              where conversation pops
            </Text>
          </View>
        </View>
      </View>

      {/* View for Login and Register Buttons*/}
      <View style={styles.bottomHalfofOnboarding}>
        {/* BUTTON ONE */}
        <View style={styles.buttonDiv}>
          {/* ADD ONCLICK FUNCTIONALITY HERE */}
          <TouchableOpacity style={styles.appleButton}>
            {/* Apple Logo */}
            <View style={styles.logoDiv}>
              <AntDesign name="apple-o" size={44} color={"white"} />
            </View>

            {/* Login w/ Apple Text*/}
            <View
              style={{
                height: "100%",
                width: "80%",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Text style={styles.buttonText}>Register with Apple</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* BUTTON TWO */}
        <View style={styles.buttonDiv}>
          {/* ADD ONCLICK FUNCTIONALITY HERE */}
          <TouchableOpacity style={styles.googleButton}>
            {/* Google Logo */}
            <View style={styles.logoDiv}>
              <MaterialCommunityIcons name="google" size={44} color={"white"} />
            </View>

            {/* Login w/ Google Text*/}
            <View
              style={{
                height: "100%",
                width: "80%",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Text style={styles.buttonText}>Register with Google</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* BUTTON THREE */}
        <View style={styles.buttonDiv}>
          {/* ADD ONCLICK FUNCTIONALITY HERE */}
          <TouchableOpacity
            style={styles.accountButton}
            onPress={() => navigation.navigate("UsernameRegister")}
          >
            {/* Account Logo */}
            <View style={styles.logoDiv}>
              <MaterialCommunityIcons
                name="account-outline"
                size={44}
                color={"white"}
              />
            </View>

            {/* Login w/ Email/Password Text*/}
            <View
              style={{
                height: "100%",
                width: "80%",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Text style={styles.buttonText}>Create Account</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Area to switch to Register */}
        <View style={styles.changeToRegister}>
          {/* -- OR -- */}
          <View style={styles.orDesign}>
            <Oticons name="horizontal-rule" size={35} color={"darkslategrey"} />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                paddingLeft: 3,
                paddingRight: 3,
                color: "darkslategrey",
              }}
            >
              OR
            </Text>
            <Oticons name="horizontal-rule" size={35} color={"darkslategrey"} />
          </View>

          {/* REGISTER HERE BUTTON */}
          <View style={styles.registerHere}>
            <Button
              onPress={() => navigation.navigate("Login")}
              title="Login Here"
              color={"royalblue"}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  registerHere: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "25%",
  },
  orDesign: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "25%",
  },
  changeToRegister: {
    display: "flex",
    flexDirection: "column",
    height: "40%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  accountButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    height: 60,
    backgroundColor: "darkslategrey",
    borderRadius: 20,
  },
  googleButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    height: 60,
    backgroundColor: "royalblue",
    borderRadius: 20,
  },
  logoDiv: {
    display: "flex",
    height: "100%",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDiv: {
    display: "flex",
    height: "22%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  appleButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    height: 60,
    backgroundColor: "black",
    borderRadius: 20,
  },
  onboardingBackground: {
    display: "flex",
    height: "100%",
    width: "100%",
    backgroundColor: "#1a1a1a",
  },
  upperHalfofOnboarding: {
    display: "flex",
    justifyContent: "flex-end",
    height: "50%",
    width: "100%",
  },
  bottomHalfofOnboarding: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "50%",
  },
  bubbleLogo: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  underLineArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "50%",
  },

  lowerOfUpper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    height: "50%",
  },
});
