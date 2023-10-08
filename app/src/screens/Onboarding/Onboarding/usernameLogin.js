import React, { useState } from "react"; // It's important to import React
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Oticons from "react-native-vector-icons/Octicons";

const UsernameLogin = ({ navigation }) => {
  const [username, setUserName] = useState("");
  const [password, setPassord] = useState("");
  return (
    <View style={styles.onboardingBackground}>
      <View style={styles.upperHalfofOnboarding}>
        <View style={styles.lowerOfUpper}>
          {/* View for Bubble Logo and Motto*/}
          <View style={styles.bubbleLogo}>
            <Ionicons name="chatbox" size={100} style={styles.iconStyle} />
            <Text
              style={{
                fontSize: 70,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Bubble
            </Text>
          </View>
          {/* View for Underline */}
          <View style={styles.underLineArea}>
            <Oticons
              name="horizontal-rule"
              size={150}
              style={styles.underlineStyle}
            />
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
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              display: "flex",
              width: "15%",
              height: "100%",
            }}
          ></View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "100%",
              height: "100%",
            }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-end",
                width: "90%",
                height: "20%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 18,
                  paddingLeft: 15,
                }}
              >
                Username or Email
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                width: "90%",
                height: "80%",
                justifyContent: "flex-start",
              }}
            >
              <TextInput
                style={styles.textBox}
                value={username}
                onChangeText={(text) => setUserName(text)}
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
              width: "15%",
              height: "100%",
            }}
          ></View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "100%",
              height: "100%",
            }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-end",
                width: "90%",
                height: "20%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 18,
                  paddingLeft: 15,
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
              }}
            >
              <TextInput
                style={styles.textBox}
                value={username}
                onChangeText={(text) => setUserName(text)}
              />
            </View>
          </View>
        </View>

        <View style={styles.logInDiv}>
          <TouchableOpacity style={styles.logInButton}>
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
    </View>
  );
};

export default UsernameLogin;

const styles = StyleSheet.create({
  logInButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 200,
    backgroundColor: "royalblue",
    borderRadius: 15,
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
    height: 60,
    width: 300,
    borderRadius: 20,
    backgroundColor: "gray",
  },
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

  buttonText: {
    color: "white",
    fontSize: 22,
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
    paddingTop: 60,
    height: "50%",
    backgroundColor: "darkslategrey",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
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
  iconStyle: {
    position: "absolute",
    right: "60%",
    color: "darkslategrey",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  underlineStyle: {
    position: "absolute",
    bottom: 30,
    color: "darkslategrey",
  },
});
