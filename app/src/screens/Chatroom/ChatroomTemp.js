import React, { useState, useEffect, useRef } from "react";
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
import theme from '../../components/theme.js'; 


const MessageItem = ({ user, content }) => {
    const scheme = useColorScheme();
    const colors = theme(scheme);
  
    return (
      <View style={styles.messageContainer}>
        <View style={styles.profilePic} />
        <View>
          <Text style={{ color:  colors.primary  }}>
            {user}
          </Text>
          <Text style={{ color: colors.text }}>{content}</Text>
        </View>
      </View>
    );
  };

export const ChatroomTemp = ({ navigation }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [message_contents, setMessageContents] = useState(null);
  const [message_data, setMessageData] = useState(null);
  const [chatroom_name, setChatroomName] = useState(null);
  const [chatroom_description, setDescription] = useState(null);
  const [errMessage, setErrorMsg] = useState(null);
  const scheme = useColorScheme();
  const colors = theme(scheme);
  const flatListRef = useRef();
  const [isAtBottom, setIsAtBottom] = useState(true); 
  
  useEffect(() => {
    if (message_data && message_data.length > 0 && isAtBottom) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [message_data, isAtBottom]);

  const handleScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    const height = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    setIsAtBottom(y + height >= contentHeight);
  };

  useEffect(() => {
    LoadChatroomData(); 

    const messageIntervalId = setInterval(() => {
      LoadMessages();
    }, 1000);

    return () => clearInterval(messageIntervalId);
  }, []);
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
    <><View style={{ flex: 1, backgroundColor: colors.widget }}>

<TouchableOpacity style={styles.leaveButton} onPress={() => setShowConfirm(true)}>
          <Entypo name="chevron-left" size={24} color={colors.primary} />
        </TouchableOpacity>

          <View style={styles.chatroomHeader}>
              <Text style={styles.chatroomTitleText}>{chatroom_name}</Text>
              <Text style={styles.chatroomDescription}>{chatroom_description}</Text>
          </View>


          <FlatList
                    ref={flatListRef} 

              data={message_data}
              contentContainerStyle={{paddingBottom: 40,}}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              onScroll={handleScroll} 
              scrollEventThrottle={400} 
              renderItem={({ item }) => (
                  <MessageItem
                      user={item[0]}
                      content={item[1]} />
              )} />
          <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.inputContainer}
          >
              <TextInput
                  style={[styles.inputField, {backgroundColor: colors.background}]}
                  placeholder="Type a message"
                  placeholderTextColor={colors.subText}
                  onChangeText={(text) => setMessageContents(text)}
                  value={message_contents} />
              <TouchableOpacity onPress={send_text} style={styles.sendIcon}>
                  <Feather name="send" size={24} color={colors.primary} />
              </TouchableOpacity>
          </KeyboardAvoidingView>
      </View>      
      <Modal
        animationType="fade"
        transparent={true}
        visible={showConfirm}
        onRequestClose={() => setShowConfirm(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowConfirm(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalView, {backgroundColor: colors.modalBackground}]}>
              <Text style={[styles.modalText, {color: colors.modalText}]}>
                Are you sure you want to leave the chatroom?
              </Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: colors.modalButtonBackground}]}
                  onPress={() => {
                    ChatroomDisconnect();
                    setShowConfirm(false);
                  }}>
                  <Text style={[styles.textStyle, {color: colors.text}]}>Leave</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      </>
  );

};

const styles = StyleSheet.create({
    messageContainer: {
      flexDirection: 'row',
      padding: 10,
      alignItems: 'center'
    },
    chatroomHeader: {
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 60 : 40, // Responsive margin-top based on platform
        marginBottom: 10,
      },
      chatroomTitleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF', // Adjust color as needed
      },
      chatroomDescription: {
        fontSize: 16,
        color: '#CCCCCC', // Adjust color as needed
      },
    profilePic: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#ddd', 
      marginRight: 10
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        bottom: 20,
      },
      inputField: {
        flex: 1,
        paddingHorizontal: 15,

        paddingVertical: 15, // Increased padding for bigger size
        borderRadius: 20,
        
        fontSize: 16, // Adjust as needed
        marginBottom: 10,
        color: 'white'
      },
      sendIcon: {
        padding: 10,
        marginBottom: 10,
      },

      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        
      },

      modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimming effect
        padding: 50,

      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 30, // Increased border radius for rounded edges
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
      },
      modalButtons: {
        justifyContent: 'center',
        width: '100%',
      },
      button: {
        borderRadius: 20,
        padding: 15,
        elevation: 2,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignSelf: 'center'
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
      },
      leaveButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 40, // Responsive top positioning
        left: 10,
        zIndex: 1,
      },
    });
 