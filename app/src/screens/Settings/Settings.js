import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  TouchableWithoutFeedback
} from "react-native";
import React, {useState} from "react";
import * as Haptics from "expo-haptics";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";

const Settings = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');

  async function user_logout() {
    const response = await axios.get(
      "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/logout"
    );
    const data = response.data;
    console.log(data);
    if (data == '') {
      navigation.navigate("Login");
    }
  }
  const confirmDeleteAccount = () => {
    //add api here
    console.log("Account deletion confirmed. Password: ", password);
    setModalVisible(false);
  };

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
        onPress={() => setModalVisible(true)}
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
      <TouchableOpacity style={styles.signOutButton}
                        onPress={() => user_logout()}>
        <View style={styles.gradient}>
          <Text style={styles.signOutButtonText}>Sign Out </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.copyright}>© Bubbles 2023</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Enter your password"
              secureTextEntry
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={confirmDeleteAccount}
            >
              <Text style={styles.textStyle}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});