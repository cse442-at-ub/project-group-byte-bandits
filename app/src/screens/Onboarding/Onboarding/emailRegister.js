import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import BubbleComponent from "../../../svgs/bubbleComponent";
import LineComponent from "../../../svgs/lineComponent";
import axios from "axios";
import qs from "qs";

const EmailRegister = ({ navigation }) => {
  // Calculating width of phone screen to dynamically change position of text
  const windowWidth = Dimensions.get("window").width;
  const leftIndentation = 0.1 * windowWidth;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const send_email_signup_request = async () => {
    try {
      console.log("EMAIL", email);
      console.log("PASSWORD", password);
      console.log("CONFIRMPASSWORD", confirmPassword);

      const data = qs.stringify({
        user_email: email,
        user_password: password,
        user_password_check: confirmPassword,
      });

      const response = await axios.post(
        "https://cse.buffalo.edu/~jjalessi/auth/email_register",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("GOOD:", response.data);
      navigation.navigate("HomePageSocial");
    } catch (error) {
      console.log("BAD: \n", error.response.data);
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
          {/* TEXT INPUT FOR USERNAME OR EMAIL */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "25%",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <View
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  width: "80%",
                  height: "20%",
                  marginBottom: 3,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                    paddingLeft: leftIndentation,
                  }}
                >
                  Email
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  width: "90%",
                  height: "80%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <TextInput
                  style={styles.textBox}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  fontWeight={"bold"}
                />
              </View>
            </View>
          </View>

          {/* TEXT INPUT FOR PASSWORD */}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "25%",
              alignItems: "flex-start",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <View
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  width: "80%",
                  height: "20%",
                  marginBottom: 3,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                    paddingLeft: leftIndentation,
                  }}
                >
                  Password
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  width: "90%",
                  height: "80%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <TextInput
                  style={styles.textBox}
                  value={password}
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword(text)}
                  fontWeight={"bold"}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "25%",
              alignItems: "flex-start",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <View
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  width: "80%",
                  height: "20%",
                  marginBottom: 3,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                    paddingLeft: leftIndentation,
                  }}
                >
                  Confirm Password
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  width: "90%",
                  height: "80%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <TextInput
                  style={styles.textBox}
                  value={confirmPassword}
                  secureTextEntry={true}
                  onChangeText={(text) => setConfirmPassword(text)}
                  fontWeight={"bold"}
                />
              </View>
            </View>
          </View>

          <View style={styles.logInDiv}>
            <View
              style={{
                height: "100%",
                width: "25%",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="caret-back-outline" size={32} />
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Back
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "50%",
              }}
            >
              <TouchableOpacity
                onPress={() => send_email_signup_request()}
                style={styles.logInButton}
              >
                {/* Login w/ Apple Text*/}
                <View
                  style={{
                    height: "100%",
                    width: "80%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.buttonText}>Create Account</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default EmailRegister;

const styles = StyleSheet.create({
  logInButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 180,
    backgroundColor: "royalblue",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  logInDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "20%",
    width: "100%",
  },
  textBox: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    height: 41,
    width: 300,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "gray",
    paddingLeft: 15,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
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
    paddingTop: 5,
    height: "50%",
    backgroundColor: "darkslategrey",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
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