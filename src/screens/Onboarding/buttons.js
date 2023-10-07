import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Oticons from "react-native-vector-icons/Octicons";

const CustomButtons = () => {
  return (
    <>
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
              <Text style={styles.buttonText}>Login with Apple</Text>
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
              <Text style={styles.buttonText}>Login with Google</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* BUTTON THREE */}
        <View style={styles.buttonDiv}>
          {/* ADD ONCLICK FUNCTIONALITY HERE */}
          <TouchableOpacity style={styles.accountButton}>
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
              <Text style={styles.buttonText}>Login with Username</Text>
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
            <Button title="Register Here" color={"royalblue"} />
          </View>
        </View>
      </View>
    </>
  );
};

export default CustomButtons;

const styles = StyleSheet.create({
  bottomHalfofOnboarding: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 60,
    height: "50%",
  },
  buttonDiv: {
    display: "flex",
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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
  logoDiv: {
    display: "flex",
    height: "100%",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
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
  buttonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
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
  changeToRegister: {
    display: "flex",
    flexDirection: "column",
    height: "40%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  orDesign: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "25%",
  },
  registerHere: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "25%",
  },
});
