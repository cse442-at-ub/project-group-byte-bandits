import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GetUsername = () => {
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Hello,</Text>
        <Text style={styles.subWelcomeText}>Welcome to <Text style={{color: '#93B8DA'}}>Bubble</Text> 👋</Text>
      </View>


      <View style={styles.centerContent}>
        <View style={styles.profileCircle}>
          <Ionicons name="add-circle" style={styles.addIcon} />
        </View>

        <View style={styles.leftContent}>
          <Text style={styles.enterUsername}>Enter a <Text style={{color: '#93B8DA'}}>username</Text></Text>
          <Text style={styles.description}>Others will be able to search you up with this username</Text>
        </View>


        <TextInput
          style={styles.inputField}
          placeholder="Enter a username"
          placeholderTextColor="gray"
        />

        <TouchableOpacity style={styles.createAccountButton}>
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191818",
    justifyContent: "flex-start",
    
  },
  welcomeContainer: {
    alignItems: "flex-start",
    margin: 20,
    marginTop: '20%'
  },
  welcomeText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  subWelcomeText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  centerContent: {
    alignItems: "center",
  },
  profileCircle: {
    borderWidth: 2,
    borderColor: "white",
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    margin: 20,
  },
  addIcon: {
    fontSize: 32,
    color: "white",
    bottom: 5,
  },
  leftContent: {
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 10,
  },
  enterUsername: {
    color: "white",
    fontSize: 26,
  },
  description: {
    color: "#939BA7",
    fontSize: 14,
  },
  inputField: {
    width: "80%",
    borderRadius: 20,
    backgroundColor: "#272727",
    borderColor: "#939BA7",
    borderWidth: 1,
    color: "white",
    paddingLeft: 15,
    marginTop: 40,
    padding: 10,
  },
  createAccountButton: {
    width: "40%",
    borderRadius: 20,
    backgroundColor: "#93B8DA",
    padding: 15,
    marginTop: 60,
    alignItems: "center",
  },
  createAccountText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default GetUsername;
