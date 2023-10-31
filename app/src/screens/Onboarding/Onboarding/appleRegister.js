import React from "react"; // It's important to import React
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

const AppleRegister = ({ navigation, setIsRegisteringWithApple }) => {
  // Calculating width of phone screen to dynamically change position of text
  const windowWidth = Dimensions.get("window").width;
  const leftIndentation = 0.1 * windowWidth;

  // FUNCTION TO CREATE APPLE ACCOUNT FOR USER
  function signup_post_request() {
    try {
      url = "https://cse.buffalo.edu/~jjalessi/auth/validate_signup";
      var xhr = new XMLHttpRequest();
      const request =
        "username=" +
        username +
        "&password=" +
        password +
        "&password_check=" +
        confirmPassword +
        "&email=" +
        email;
      xhr.addEventListener("load", function (event) {
        console.log("Creating Account For User");
      });
      xhr.open("POST", url);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(request);
      xhr.onload = function () {
        console.log(xhr.response);
        navigation.navigate("HomePageSocial");
      };
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <View
      onClick={() => setIsRegisteringWithApple(false)}
      style={styles.onboardingBackground}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* View for Login and Register Buttons*/}

        {/* APPLE ID WORDS */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "10%",
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              display: "flex",
              height: "100%",
              width: "40%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Apple ID
            </Text>
          </View>
        </View>

        {/* TEXT INFORMING USER THEY ARE CREATING ACCOUNT WITH APPLE */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "10%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Create an account for Bubble using your Apple ID
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "10%",
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "white",
            }}
          ></Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "20%",
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
            ></View>

            <View
              style={{
                display: "flex",
                width: "90%",
                height: "80%",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            ></View>
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
              onPress={() => {
                setIsRegisteringWithApple(false);
              }}
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
              onPress={() => signup_post_request()}
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
                <Text style={styles.buttonText}>Continue</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AppleRegister;

const styles = StyleSheet.create({
  logInButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 140,
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
    backgroundColor: "darkslategray",
    borderRadius: 30,
  },
  upperHalfofOnboarding: {
    display: "flex",
    justifyContent: "flex-end",
    height: "50%",
    width: "100%",
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
