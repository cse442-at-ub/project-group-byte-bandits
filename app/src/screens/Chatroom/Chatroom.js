import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  Entypo,
  Feather,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

export const Chatroom = () => {
  return (
    <View style={styles.ChatroomBackground}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.leaveButton}>
            <Entypo name="chevron-left" size={32} color="red" />
            <Text style={styles.leaveText}>Leave</Text>
          </TouchableOpacity>
          {/* padding View */}
          <View
            style={{ display: "flex", height: "100%", width: "70%" }}
          ></View>
          <View style={styles.leaveButton}>
            <TouchableOpacity>
              <FontAwesome5 name="user-friends" size={32} color="#555454" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.chatroomTitle}>
          <Text style={styles.chatroomTitleText}>Machine Learning Bubble</Text>
        </View>

        {/* WHERE CHATS WILL RENDER */}
        <View style={styles.chatroomBody}></View>
        <View style={styles.bottomBar}>
          <View style={styles.mapIcon}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="map-search-outline"
                size={50}
                color={"#56585B"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.textBox}>
            <TextInput
              style={styles.searchBar}
              placeholder=""
              placeholderTextColor={"#3D3C3C"}
              maxLength={10}
            />
          </View>
          <View style={styles.sendMessage}>
            <TouchableOpacity>
              <Feather
                name="send"
                size={40}
                color={"#555454"}
                style={{ transform: [{ rotate: "45deg" }] }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    height: "55%",
    width: "100%%",
    borderRadius: 30,
    borderColor: "#3D3C3C",
    borderWidth: 1,
    backgroundColor: "#3C3B3B",
    color: "#56585B",
    fontWeight: "bold",
    paddingLeft: 15,
    paddingRight: 85,
  },
  sendMessage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "60%",
    width: "15%",
  },
  textBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
    width: "70%",
  },
  mapIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
    width: "15%",
  },
  bottomBar: {
    display: "flex",
    flexDirection: "row",
    height: "20%",
    width: "100%",
  },
  chatroomBody: {
    display: "flex",
    height: "70%",
    width: "100%",
  },
  chatroomTitleText: {
    fontWeight: "bold",
    fontSize: 32,
    color: "#93B8DA",
  },
  chatroomTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
    width: "100%",
  },
  leaveText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "red",
  },
  leaveButton: {
    display: "flex",
    height: "100%",
    width: "15%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    height: "5%",
    width: "100%",
  },

  ChatroomBackground: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#191818",
  },
});
