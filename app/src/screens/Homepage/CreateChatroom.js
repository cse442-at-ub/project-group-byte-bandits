import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, useColorScheme, Switch, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Header, Icon, Slider } from 'react-native-elements';
import theme from '../../components/theme'; 
import MapIcon from '../../assets/mapicon.png'; 
import { Entypo } from '@expo/vector-icons';
import {
    create_chatroom,
  } from "../../bubble_api/bubble_api";

  const CreateChatroom = ({ navigation }) => {
    const scheme = useColorScheme();
    const colors = theme(scheme);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [distance, setDistance] = useState(50);
    const [maxPeople, setMaxPeople] = useState(10); 
 
    const handleCreateChatroom = async () => {
        try {
          const data = await create_chatroom(
            distance,
            maxPeople,
            isPrivate,
            description,
            title
          );
          console.log("Chatroom creation response:", data);
          if (data == "") {
            navigation.navigate("Chatroom");
          }
        } catch (error) {
          console.error("Error creating chatroom:", error);
        }
      };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.widget }}>
      <Header
        leftComponent={
          <Entypo name="chevron-left" size={26} color={colors.text} onPress={() => navigation.goBack()} />
        }
        centerComponent={{ text: 'Create Bubble', style: { color: colors.text, fontSize: 20, fontWeight: 'bold' } }}
        containerStyle={{
          backgroundColor: "transparent",
          justifyContent: 'space-around',
          borderBottomWidth: 0,
        }}
      />
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Image source={MapIcon} style={{ width: 100, height: 100 }} />
      </View>
      <View style={{ margin: 20 }}>
        <TextInput
          style={[styles.titleInput, { color: colors.text }]}
          onChangeText={setTitle}
          value={title}
          placeholder="Untitled..."
          placeholderTextColor="gray"
        />
        <View style={styles.descriptionContainer}>
          <TextInput
            style={[styles.descriptionInput, { borderColor: colors.subText, color: colors.text }]}
            onChangeText={setDescription}
            value={description}
            placeholder="What are you interested in?"
            placeholderTextColor="gray"
            maxLength={150}
          />
        </View>
        <Text style={[styles.switchLabel,{color: colors.text}]}>Privacy</Text>

        <View style={styles.switchContainer}>
          <Switch
            trackColor={{ false: "#767577", true: colors.primary }}
            thumbColor={isPrivate ? colors.secondary : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsPrivate}
            value={isPrivate}
            
          />
          <Text style = {{alignSelf: 'center', textAlign: 'center', color: "gray", fontSize: 12, marginLeft: 10,}}>{isPrivate ? "Private" : "Public"}</Text>
        </View>

        <View style={styles.sliderContainer}>
        <Text style={[styles.sliderLabel, { color: colors.text }]}>
          Max People - {maxPeople}
        </Text>
        <Slider
          value={maxPeople}
          onValueChange={setMaxPeople}
          maximumValue={100}
          minimumValue={1}
          step={1}
          thumbTintColor={colors.primary}
          trackStyle={{ height: 4, backgroundColor: 'transparent' }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: colors.primary }}
        />
      </View>

        <View style={styles.sliderContainer}>
          <Text style={[styles.sliderLabel, {color: colors.text}]}>Radius of Bubble - {distance}m</Text>
          <Slider
            value={distance}
            onValueChange={setDistance}
            maximumValue={100}
            minimumValue={10}
            step={1}
            thumbTintColor={colors.primary}
            trackStyle={{ height: 4, backgroundColor: 'transparent' }}
            thumbStyle={{ height: 20, width: 20, backgroundColor: colors.primary }}
          />
        </View>
<TouchableOpacity
          style={[styles.createButton, { backgroundColor: colors.buttonBackground }]}
          onPress={handleCreateChatroom} 
        >
          <Text style={{ color: colors.buttonText, fontSize: 16, fontWeight: 'bold' }}>+ Create</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateChatroom;

const styles = StyleSheet.create({
  titleInput: {
    fontSize: 32,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    marginTop: '10%',
    left: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
  },
  descriptionInput: {
    flex: 1,
    borderWidth: 1,
    padding: 20,
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  createButton: {
    marginTop: 20,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,

  },
  switchContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row'
  },
  switchLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  createButton: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 30,
    width: '40%', 
    alignSelf: 'center', 
    marginTop: 20,
  },
});
