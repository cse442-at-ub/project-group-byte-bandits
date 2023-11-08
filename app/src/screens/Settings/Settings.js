import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import * as Haptics from "expo-haptics";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const Settings = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          navigation.goBack();
        }}
      >
        <Entypo name="chevron-left" size={32} color="white" />
      </TouchableOpacity>

      <View style={styles.grayBox}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("Privacy")}
        >
          <Text style={styles.optionText}>Privacy</Text>
          <Entypo name="chevron-right" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text style={styles.optionText}>Change Password</Text>
          <Entypo name="chevron-right" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("BlockedUsers")}
        >
          <Text style={styles.optionText}>Blocked Users</Text>
          <Entypo name="chevron-right" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("DeleteAccount")}
        >
          <Text style={styles.optionText}>Delete Account</Text>
          <Entypo name="chevron-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.grayBox}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("InviteFriends")}
        >
          <Text style={styles.optionText}>Invite Friends </Text>
          <Entypo name="chevron-right" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("JoinCommunity")}
        >
          <Text style={styles.optionText}>Join the Community</Text>
          <Entypo name="chevron-right" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("About")}
        >
          <Text style={styles.optionText}>About & Privacy Policy</Text>
          <Entypo name="chevron-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signOutButton}>
        <View style={styles.gradient}>
          <Text style={styles.signOutButtonText}>Sign Out </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.copyright}>© Bubbles 2023</Text>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#191818",
  },
  grayBox: {
    backgroundColor: "#181818",
    borderRadius: 20,
    marginBottom: 20,
    width: "80%",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderColor: "gray",
  },
  optionText: {
    fontSize: 17,
    color: "white", // Adjust as necessary
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ff4757",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  footer: {
    position: "absolute",
    bottom: "10%",
    alignItems: "center",
    width: "100%",
  },
  copyright: {
    fontSize: 12,
    color: "gray",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 10,
  },

  signOutButton: {
    marginTop: 40,
    width: 220,
    height: 60,
    alignSelf: "center",
  },
  gradient: {
    padding: 15,
    alignItems: "center",
    borderRadius: 20,
  },
  signOutButtonText: {
    color: "white",
    fontSize: 20,
  },
});
