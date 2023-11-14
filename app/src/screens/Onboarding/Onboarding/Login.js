import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from "react-native";

import Oticons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LineComponent from "../../../svgs/lineComponent";
import BubbleComponent from "../../../svgs/bubbleComponent";
import * as AppleAuthentication from "expo-apple-authentication";
import axios from "axios";
import qs from "qs";
import { logIn } from "../../../../redux/user";

const Login = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [userID, setUserID] = useState();
  const dispatch = useDispatch();

  // RUNS ON COMPONENT MOUNT, will immediately check if user cookies exist
  useEffect(() => {
    const fetchCookies = async () => {
      try {
        const response = await axios.post(
          "https://cse.buffalo.edu/~jjalessi/auth/fetch_cookies"
        );
        // if cookie found, send to Homepage

        navigation.navigate("HomePage");
        console.log("RESPONSE", response.data);
      } catch (error) {
        console.log("ERROR: ", error.response.data);
      }
    };

    fetchCookies();
  }, []);

  const fetchAppleInfo = async () => {
    try {
      const response = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // IF APPLE RETURNS INFORMATION WE SEND INFO TO DATABASE TO CREATE USER
      const apple_user = response.user;
      try {
        const data = qs.stringify({
          apple_user: apple_user,
        });
        const response = await axios.post(
          "https://cse.buffalo.edu/~jjalessi/auth/apple_login",
          data,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        // if valid data was entered, navigate user to HomePage
        console.log("Response", response.data.user_info);
        dispatch(logIn(response.data.user_info.id));

        if (response.data.user_info.name === null) {
          navigation.navigate("GetUsername"); // If user prematurely exited login screen, send them to GetUsername to make username
        } else {
          await axios.post("https://cse.buffalo.edu/~jjalessi/auth/set_cookie");
          navigation.navigate("HomePage"); // else set cookie and send to HomePage
        }
      } catch (error) {
        setErrorMessage(error.response.data.error);
      }
    } catch (error) {
      if (error.code === "ERR_REQUEST_CANCELED") {
        console.log("Error while fetching apple data");
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };

  return (
    <View style={styles.onboardingBackground}>
      <SafeAreaView style={{ flex: 1 }}>
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
            <TouchableOpacity
              onPress={() => {
                fetchAppleInfo().then((response) => {
                  console.log(response);
                });
              }}
              style={styles.appleButton}
            >
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
                <MaterialCommunityIcons
                  name="google"
                  size={44}
                  color={"white"}
                />
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
            <TouchableOpacity
              style={styles.accountButton}
              onPress={() => {
                navigation.navigate("EmailorUsernameLogin");
                setErrorMessage("");
              }}
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
                <Text style={styles.buttonText}>Login with Email</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* ERROR MESSAGE DISPLAYED HERE */}
          <View
            style={{
              height: "8%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                color: "red",
              }}
            >
              {errorMessage}
            </Text>
          </View>

          {/* Area to switch to Register */}
          <View style={styles.changeToRegister}>
            {/* -- OR -- */}
            <View style={styles.orDesign}>
              <Oticons
                name="horizontal-rule"
                size={35}
                color={"darkslategrey"}
              />
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
              <Oticons
                name="horizontal-rule"
                size={35}
                color={"darkslategrey"}
              />
            </View>

            {/* REGISTER HERE BUTTON */}
            <View style={styles.registerHere}>
              <Button
                onPress={() => navigation.navigate("Register")}
                title="Register Here"
                color={"royalblue"}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Login;

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
    height: "20%",
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
