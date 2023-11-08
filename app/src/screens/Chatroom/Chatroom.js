import React from "react";
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
} from "react-native";
import {
  Entypo,
  Feather,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

export const Chatroom = () => {
  return (
    <SafeAreaView style={styles.ChatroomBackground}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.leaveButton}>
          <Entypo name="chevron-left" size={32} color="red" />
          <Text style={styles.leaveText}>Leave</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.leaveButton}>
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
