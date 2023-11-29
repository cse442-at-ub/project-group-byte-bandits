import React, { useState, useEffect } from "react";
import { StatusBar, FlatList, TouchableWithoutFeedback, useColorScheme } from "react-native";
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
import axios from "axios";
import qs from "qs";
import { Header } from "react-native-elements";
import { Keyboard } from "react-native";

import {
  disconnect_from_chatroom,
  handle_login_state,
  load_chatroom_data,
  load_messages,
  send_text_message,
} from "../../bubble_api/bubble_api.js";
import { color } from "react-native-elements/dist/helpers/index.js";
import theme from '../../components/theme.js'; // Update path as necessary

export const Chatroom = ({ navigation }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [message_contents, setMessageContents] = useState(null);
  const [message_data, setMessageData] = useState(null);
  const [chatroom_name, setChatroomName] = useState(null);
  const [chatroom_description, setDescription] = useState(null);
  const [errMessage, setErrorMsg] = useState(null);
  const scheme = useColorScheme();
  const colors = theme(scheme);
  
  async function LoadMessages() {
    const data = await load_messages();
    setMessageData(data);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      LoadMessages();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  async function send_text() {
    const data = await send_text_message(message_contents);
    setErrorMsg(data);
    setMessageContents("");
    LoadMessages();
  }

  async function ChatroomDisconnect() {
    const data = await disconnect_from_chatroom();
    if (data == "") {
      navigation.navigate("HomePage");
    }
  }

  async function LoadChatroomData() {
    const data = await load_chatroom_data();
    setChatroomName(data.name);
    setDescription(data.description);
  }

  return (
    <SafeAreaView
      style={styles.ChatroomBackground}
      onLayout={() => {
        handle_login_state(navigation);
        LoadChatroomData();
        LoadMessages();
      }}
    >
      {/* CONFIRMATION TO LEAVE ROOM */}
      <Modal transparent={true} animationType="fade" visible={showConfirm}>
        <View style={styles.showConfirmBackground}>
          <View style={styles.showConfirmPopup}>
            {/* TOP WARNING LABEL */}
            <View style={styles.topWarning}>
              <Text style={styles.topWarningText}>Warning</Text>
            </View>
            <View style={styles.bodyWarning}>
              <Text style={styles.bodyWarningText}>
                Are you sure you want to to leave this Bubble?
              </Text>
            </View>
            <View style={styles.continueAndcancelButtons}>
              <TouchableOpacity
                onPress={() => {
                  ChatroomDisconnect();
                  setShowConfirm(false);
                }}
                style={styles.buttonDiv}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowConfirm(false)}
                style={styles.buttonDiv}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Header
        leftComponent={{
          icon: "chevron-left",
          color: "#fff",
          type: "entypo",
          onPress: () => {
            setShowConfirm(true);
          },
        }}
        rightComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate("ChatroomUsers")}
            style={styles.leaveButton}
          >
            <FontAwesome5 name="user-friends" size={32} color="#555454" />
          </TouchableOpacity>
        }
        containerStyle={{
          backgroundColor: "transparent",
          borderBottomWidth: 0,
          marginTop: Platform.OS === "ios" ? 0 : -24,
        }}
      />

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.chatroomTitle}>
          <Text style={styles.chatroomTitleText}>{chatroom_name}</Text>
          <Text style={{ color: "white" }}>{chatroom_description}</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoid}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <View style={styles.chatroomBody}>
            <View>
              <View style={styles.container_style}>
                <FlatList
                  data={message_data}
                  renderItem={({ item }) => (
                    <Text style={{ color: "white" }}>
                      {item[0]} - {item[1]}
                    </Text>
                  )}
                />
              </View>
            </View>
          </View>

          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.mapIcon}>
              <MaterialCommunityIcons
                name="map-search-outline"
                size={50}
                color={"#56585B"}
              />
            </TouchableOpacity>
            <View style={styles.textBox}>
              <TextInput
                onChangeText={(text) => setMessageContents(text)}
                value={message_contents}
                style={styles.searchBar}
                placeholder="Type a message..."
                placeholderTextColor={"#3D3C3C"}
                color="white"
                maxLength={40}
              />
            </View>
            <TouchableOpacity
              style={styles.sendMessage}
              onPress={() => {
                send_text();
              }}
            >
              <Feather
                name="send"
                size={42}
                color={"#555454"}
                style={{ transform: [{ rotate: "45deg" }] }}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
