// DM.js
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Header } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import theme from '../../components/theme';

const DM = ({ route, navigation }) => {
  const { user } = route.params;
  const scheme = useColorScheme();
  const colors = theme(scheme);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    setMessage(''); 
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>
        }
        centerComponent={{ text: user.name, style: { color: colors.text, fontSize: 20 } }}
        containerStyle={{
          backgroundColor: colors.background,
          justifyContent: 'space-around',
          borderBottomWidth: 0,
          elevation: 0, 
        }}
      />
      <ScrollView style={styles.messagesContainer} contentContainerStyle={{ flexGrow: 1 }}>
        {/* Messages would be rendered here */}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder='Type a message...'
          placeholderTextColor={colors.subText}
          style={[styles.input, { color: colors.text, backgroundColor: colors.widget, borderColor: colors.secondary }]}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color={colors.background} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default DM;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#e1e1e1',
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
  },
  sendButton: {
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
