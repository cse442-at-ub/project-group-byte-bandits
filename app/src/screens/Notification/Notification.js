import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, useColorScheme,FlatList } from 'react-native';
import { Header, Avatar, Badge, Button } from 'react-native-elements';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import theme from '../../components/theme'; // Adjust the import path according to your project structure
import { accept_friend_request, decline_friend_request, get_friend_requests } from "../../bubble_api/bubble_api";

const Notification = ({ navigation }) => {
  const scheme = useColorScheme();
  const colors = theme(scheme);
  const [friend_request_data, SetFriendRequestData] = useState(null);

  async function GetFriendRequests() {
    const data = await get_friend_requests();
    SetFriendRequestData(data);
  }
  // Improved dark theme colors for better contrast
  const darkThemeStyles = scheme === 'dark' ? { 
    notification: {
      backgroundColor: '#1F1F1F', // Darker background for notifications
    },
    declineButton: {
      backgroundColor: '#555', // Dark decline button for better visibility
    },
    acceptButton: {
      backgroundColor: '#0A84FF', // Bright color for accept button to stand out
    },
  } : {};

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}
          onLayout={() => GetFriendRequests()}>
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color={colors.iconColor} />
          </TouchableOpacity>
        }
        centerComponent={{ text: 'Friend Request', style: { color: colors.text } }}
        rightComponent={<MaterialIcons name="person-add" size={24} color={colors.iconColor} />}
        containerStyle={{
          backgroundColor: colors.background,
          justifyContent: 'space-around',
          borderBottomWidth: 0, // Remove border for a cleaner look
        }}
      />
      <FlatList
              data={friend_request_data}
              renderItem={({ item }) => (
                <View style={[styles.notification, darkThemeStyles.notification]}>
                <Avatar
                  rounded
                  source={{ uri: 'https://placeimg.com/140/140/any' }} // Placeholder image
                  size="medium"
                />
                <Text style={[styles.text, { color: colors.text }]}>{item['user_s_name']} ({item['user_s_id']}) sent you a friend request.</Text>
                <View style={styles.buttonGroup}>
                  <Button
                    buttonStyle={[styles.button, darkThemeStyles.acceptButton]}
                    titleStyle={[styles.buttonText, { color: colors.buttonText }]}
                    title="Accept"
                    onPress={() => { accept_friend_request(item['user_s_id']) }}
                  />
                  <Button
                    buttonStyle={[styles.button, darkThemeStyles.declineButton]}
                    titleStyle={[styles.buttonText, { color: colors.buttonText }]}
                    title="Decline"
                    onPress={() => { decline_friend_request(item['user_s_id']) }}
                  />
                </View>
                <Badge
                  value="1"
                  status="error"
                  containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                />
              </View>
              )}
              />
    </View>
  )
}

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20, 
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
  },
  text: {
    flex: 1,
    marginLeft: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5, // Add spacing between buttons
  },
  buttonText: {
    fontSize: 16,
  },
});
