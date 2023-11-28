import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from "react-native";
import {
  Entypo,
  Feather,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { disconnect_from_chatroom, handle_login_state, 
  load_chatroom_data, 
  load_messages, 
  send_text_message } from "../../bubble_api/bubble_api.js";

export const ChatroomUsers = ({ navigation }) => {
  const [chatroom_name, setChatroomName] = useState(null);
  const [chatroom_description, setDescription] = useState(null);

  async function LoadChatroomData() {
    const data = await load_chatroom_data();
    setChatroomName(data.name);
    setDescription(data.description);
  }

  return (
    <SafeAreaView style={styles.ChatroomBackground} onLayout={() => LoadChatroomData()}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Chatroom")}
          style={styles.leaveButton}
        >
          <Entypo name="chevron-left" size={36} color="white" />
        </TouchableOpacity>
        <View />
      </View>

      <View style={styles.chatroomTitle}>
        <Text style={styles.chatroomTitleText}>{chatroom_name}</Text>
        <Text style={{color:'white'}}>{chatroom_description}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  buttonDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "48%",
    borderRadius: 15,
    backgroundColor: "#191818",
  },
  continueAndcancelButtons: {
    display: "flex",
    flexDirection: "row",
    height: "30%",
    width: "90%",
    justifyContent: "space-between",
  },
  bodyWarningText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    padding: 5,
  },
  bodyWarning: {
    display: "flex",
    height: "40%",
    width: "90%",
    flexShrink: 1,
  },
  topWarningText: {
    fontWeight: "bold",
    fontSize: 28,
    color: "white",
  },
  topWarning: {
    display: "flex",
    height: "25%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  showConfirmPopup: {
    display: "flex",
    height: "20%",
    width: "60%",
    backgroundColor: "#252525",
    borderRadius: 30,
    alignItems: "center",
  },
  showConfirmBackground: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  ChatroomBackground: {
    flex: 1,
    backgroundColor: "#191818",
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: "5%",
    backgroundColor: "#191818",
  },
  leaveButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatroomTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
    backgroundColor: "#191818",
  },
  chatroomTitleText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#93B8DA",
  },
  keyboardAvoid: {
    flex: 1,
  },
  chatroomBody: {
    flex: 1,
    backgroundColor: "#232222",
  },

  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  mapIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    flex: 5,
    justifyContent: "center",
  },
  sendMessage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  searchBar: {
    padding: 10,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#3C3B3B",
    color: "#56585B",
    fontWeight: "bold",
  },
  leaveText: {
    fontSize: 16,
    color: "red",
    marginLeft: 5,
  },
});
