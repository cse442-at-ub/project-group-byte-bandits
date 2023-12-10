import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import theme from '../../components/theme.js';
import { Header } from 'react-native-elements';
import { load_chatroom_data, load_chatroom_users } from "../../bubble_api/bubble_api.js";
  
export const ChatroomUsers = ({ navigation }) => {
  const scheme = useColorScheme();
  const colors = theme(scheme);

  const [chatroom_name, setChatroomName] = useState(null);
  const [chatroom_users, setChatroomUsers] = useState([]);

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
          <View style={styles.userItem}>
            <View style={[styles.circle,{backgroundColor: colors.background}]} />
            <Text style={{ color: colors.text, marginLeft: 10 }}>{item.user_name}</Text>
          </View>
        )}
      />
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
});
