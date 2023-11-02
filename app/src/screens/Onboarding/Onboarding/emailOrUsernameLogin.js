import React, { useState } from "react"; // It's important to import React
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

const EmailOrUsernameLogin = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;

  // Calculating width of phone screen to dynamically change position of text
  const leftIndentation = 0.1 * windowWidth;
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const send_email_login_request = async () => {
    try {
      const response = await axios.post(
        "https://cse.buffalo.edu/~jjalessi/auth/emailorusername_login",
        {
          user_emailorusername: emailOrUsername,
          user_password: password,
        }
      );
    } catch (error) {
      console.log("Error:", error);
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
              height: "30%",
              alignItems: "space-between",
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
                  Email or Username
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
                  value={emailOrUsername}
                  onChangeText={(text) => setEmailOrUsername(text)}
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
              height: "30%",
              alignItems: "space-between",
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

          <View style={styles.logInDiv}>
            <TouchableOpacity
              // ADD FUNCTION THAT SENDS GET REQUEST
              style={styles.logInButton}
              onPress={() => send_email_login_request()}
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
                <Text style={styles.buttonText}>Log In</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              height: "35%",
              width: "100%",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                height: "80%",
                width: "30%",
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "50%",
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
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
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default EmailOrUsernameLogin;

const styles = StyleSheet.create({
  logInButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 200,
    backgroundColor: "royalblue",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  logInDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "15%",
    width: "100%",
    paddingTop: 10,
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
    height: 60,
    width: 300,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "gray",
    paddingLeft: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 22,
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
    justifyContent: "space-between",
    paddingTop: 20,
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
