import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, useColorScheme, Modal, TouchableWithoutFeedback } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import theme from '../../components/theme.js';
import { Header } from 'react-native-elements';
import { load_chatroom_data, load_chatroom_users, send_friend_request } from "../../bubble_api/bubble_api.js";

export const ChatroomUsers = ({ navigation }) => {
  const scheme = useColorScheme();
  const colors = theme(scheme);

  const [chatroom_name, setChatroomName] = useState(null);
  const [chatroom_users, setChatroomUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    async function LoadChatroomData() {
      const data = await load_chatroom_data();
      setChatroomName(data.name);
    }

    LoadChatroomData();
  }, []);

  useEffect(() => {
    async function LoadChatroomUsers() {
      const users = await load_chatroom_users();
      setChatroomUsers(users);
    }

    LoadChatroomUsers();
  }, []);

  async function SendFriendRequest(id) {
    const data = await send_friend_request(id);
    console.log(data);
  }


  return (
    <View style={[styles.container, { backgroundColor: colors.widget }]}>
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={24} color={colors.text} />
          </TouchableOpacity>
        }
        centerComponent={{ text: chatroom_name || 'Chatroom Users', style: { color: colors.text, fontSize: 20 } }}
        backgroundColor={colors.widget}
        containerStyle={{ borderBottomWidth: 0 }}
      />
      
      <FlatList
        data={chatroom_users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => {
              setSelectedUser(item);
              setModalVisible(true);
            }}
          >
            <View style={[styles.circle, { backgroundColor: colors.background }]} />
            <Text style={{ color: colors.text, marginLeft: 10 }}>{item.user_name}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>

        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: colors.modalBackground }]}>
            <Text style={[styles.modalText, { color: colors.modalText }]}>
              Send friend request to {selectedUser ? selectedUser.user_name : ''}?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.modalButtonBackground }]}
                onPress={() => selectedUser && SendFriendRequest(selectedUser.id)}
              >
                <Text style={styles.textStyle}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: '500'
  },
  modalButtonContainer: {
    flexDirection: "row",
    width: "100%"
  },
  button: {
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    marginHorizontal: 20,

  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});