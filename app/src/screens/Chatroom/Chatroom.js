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

export const Chatroom = ({ navigation }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <SafeAreaView style={styles.ChatroomBackground}>
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
                  navigation.navigate("HomePage");
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
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => setShowConfirm(true)}
          style={styles.leaveButton}
        >
          <Entypo name="chevron-left" size={32} color="red" />
          <Text style={styles.leaveText}>Leave</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          onPress={() => navigation.navigate("ChatroomUsers")}
          style={styles.leaveButton}
        >
          <FontAwesome5 name="user-friends" size={32} color="#555454" />
        </TouchableOpacity>
      </View>

      <View style={styles.chatroomTitle}>
        <Text style={styles.chatroomTitleText}>Machine Learning Bubble</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView style={styles.chatroomBody}>
          {/* Chat messages will go here */}
        </ScrollView>

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
              style={styles.searchBar}
              placeholder="Type a message..."
              placeholderTextColor={"#3D3C3C"}
              maxLength={40}
            />
          </View>
          <TouchableOpacity style={styles.sendMessage}>
            <Feather
              name="send"
              size={42}
              color={"#555454"}
              style={{ transform: [{ rotate: "45deg" }] }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
