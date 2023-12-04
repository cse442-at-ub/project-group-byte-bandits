import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Modal, Switch, Button, useColorScheme } from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { Header } from "react-native-elements";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
  Entypo,
} from "@expo/vector-icons";
import theme from "../../components/theme";
import NearbyDark from "../../assets/nearbydark.gif";
import ExploreDark from "../../assets/exploredark.gif";
import SocialDark from "../../assets/socialdark.gif";
import NearbyLight from "../../assets/nearbylight.gif";
import ExploreLight from "../../assets/explorelight.gif";
import SocialLight from "../../assets/sociallight.gif";
import NavBar from "../../components/Navbar";
import { connect, useSelector } from "react-redux";
import {
  load_profile_data,
  connect_to_chatroom,
  load_chatrooms,
  search_user,
  update_location,
  send_friend_request,
  create_chatroom,
  load_chatroom_data,
  load_all_chatroom,
} from "../../bubble_api/bubble_api";
import * as Location from "expo-location";
import axios from "axios";
import qs from "qs";
import { handle_login_state } from "../../bubble_api/bubble_api";
import { Slider } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";

const HomePage = ({ navigation }) => {
  const [creatingBubble, setCreatingBubble] = useState(false);
  const [showDeleteBubble, setShowDeleteBubble] = useState(false);
  const [socialTab, setSocialTab] = useState(true);
  const [nearbyTab, setNearbyTab] = useState(false);
  const [exploreTab, setExploreTab] = useState(false);
  const [bubbleTitle, setBubbleTitle] = useState("");
  const [bubbleDescription, setBubbleDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(0);
  const [selectedRadius, setSelectedRadius] = useState(150);
  const [maxPeople, setMaxPeople] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    handle_login_state(navigation);
  }, [navigation]);

  const userID = useSelector((state) => state.user.userID);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const getDescriptionStyle = (description) => {
    return description === "No description"
      ? { color: "gray", fontSize: 10, marginTop: 5 }
      : { color: colors.text, fontSize: 10, marginTop: 5 };
  };

  const scheme = useColorScheme();
  const colors = theme(scheme);
  const [selectedTab, setSelectedTab] = useState("nearby");

  const [location, setLocation] = useState(null);
  const [connected_chatroom, setConnectedChatroom] = useState([]);

  const [errorMsg, setErrorMsg] = useState(null);
  const [username, setUsername] = useState(null);
  const [userid, setUserId] = useState(null);
  const [chatroom_data, setChatroomData] = useState(null);
  const [searched_user, setSearchedUser] = useState(null);
  const [map_chatrooms, setMapData] = useState(null);

  async function CreateChatroom() {
    const data = await create_chatroom(
      selectedRadius,
      maxPeople,
      isPrivate,
      bubbleDescription,
      bubbleTitle
    );
    //console.log(data);
    if (data == "") {
      setIsModalVisible(false);
      navigation.navigate("Chatroom");
    }
  }

  async function ConnectToChatroom(id) {
    const data = await connect_to_chatroom(id);
    setErrorMsg(data);
    if (data == "") {
      navigation.navigate("Chatroom");
    }
  }

  async function LoadAllChatrooms() {
    const data = await load_all_chatroom();
    setMapData(data);
  }

  async function SearchUser(username) {
    const data = await search_user(username);
    let users = [];
    if (data.length > 0) {
      data.forEach((element) => {
        users.push([element.name, element.id]);
      });
      setSearchedUser(users);
    } else setSearchedUser("");
  }

  async function SendFriendRequest(id) {
    const data = await send_friend_request(id);
    console.log(data);
  }

  async function ProfileData() {
    const data = await load_profile_data();
    setUsername(data["name"]);
    setUserId(data["id"]);
  }

  async function CheckConnection() {
    const response = await load_chatroom_data();
    if (response.code) {
      console.log("connected chatroom", response);
      setConnectedChatroom([]);
      return false;
    } else {
      console.log(response);
      setConnectedChatroom([response.id, response.name, response.host]);
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      let hasRun = false;

      if (!hasRun) {
        LoadAllChatrooms();
        CheckConnection();

        hasRun = true;
      }

      return () => {
        hasRun = false;
      };
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      let hasRun = false;

      if (!hasRun) {
        console.log("===========================================");

        const getLocation = async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          console.log("STATUS", status);

          if (status !== "granted") {
            console.log("Location permission not granted");
            return;
          }

          try {
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
          } catch (error) {
            console.error("Error getting the initial position:", error);
          }

          try {
            locationSubscription = await Location.watchPositionAsync(
              {
                accuracy: Location.Accuracy.High,
                timeInterval: 10000,
                distanceInterval: 3,
              },
              async (newLocation) => {
                setLocation(newLocation);
                const data = await update_location(
                  newLocation.coords.longitude,
                  newLocation.coords.latitude
                );
                const c_data = await load_chatrooms(
                  newLocation.coords.longitude,
                  newLocation.coords.latitude
                );
                setChatroomData(c_data);
                setErrorMsg(data);
                //console.log(c_data);
              }
            );
          } catch (error) {
            console.error("Error starting location monitoring:", error);
          }
        };

        getLocation();
        hasRun = true;
      }

      return () => {
        hasRun = false;
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    }, [])
  );

  const renderIcon = (tabName) => {
    if (scheme === "dark") {
      switch (tabName) {
        case "nearby":
          return <Image source={NearbyDark} style={styles.iconImage} />;
        case "explore":
          return <Image source={ExploreDark} style={styles.iconImage} />;
        case "social":
          return <Image source={SocialDark} style={styles.iconImage} />;
        default:
          return null;
      }
    } else {
      switch (tabName) {
        case "nearby":
          return <Image source={NearbyLight} style={styles.iconImage} />;
        case "explore":
          return <Image source={ExploreLight} style={styles.iconImage} />;
        case "social":
          return <Image source={SocialLight} style={styles.iconImage} />;
        default:
          return null;
      }
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "social":
        return (
          <>
            <View style={styles.infoContainer}>
              <Feather name="info" size={16} color={colors.text} />
              <Text style={[styles.infoText, { color: colors.text }]}>
                Recent Users You’ve Chatted With
              </Text>
            </View>
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.secondary, color: colors.text },
              ]}
              onChangeText={(text) => SearchUser(text)}
              placeholder="Add a friend..."
              placeholderTextColor="gray"
            />
            <FlatList data={searched_user} renderItem={renderUserItem} />
          </>
        );
      case "nearby":
        const getChatroomItemStyle = (item) => {
          return userid === item[7]
            ? { ...styles.chatroomItemHost }
            : { ...styles.chatroomItem };
        };

        return (
          <View onLayout={() => ProfileData()}>
            <View style={styles.infoContainer}>
              <Feather name="info" size={16} color={colors.text} />
              <Text style={[styles.infoText, { color: colors.text }]}>
                Tap to join a bubble
              </Text>
            </View>
            <FlatList
              contentContainerStyle={{ paddingBottom: 150 }}
              data={chatroom_data}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    getChatroomItemStyle(item),
                    { backgroundColor: colors.homeBackground },
                  ]}
                  onPress={() => ConnectToChatroom(item[1])}
                >
                  <View style={styles.chatroomItemContent}>
                    <View style={styles.chatroomItemTextContainer}>
                      <Text
                        style={[
                          styles.chatroomItemName,
                          { color: colors.text },
                        ]}
                      >
                        {item[10]}
                      </Text>
                      <Text style={getDescriptionStyle(item[13])}>
                        {item[13]}
                      </Text>
                    </View>
                    <Text style={styles.chatroomItemJoin}>+ Join</Text>
                  </View>
                  <View style={styles.chatroomItemCreator}>
                    <Text style={{ color: "gray", fontWeight: "bold" }}>
                      Created by @{item[7]}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        );

      case "explore":
        return (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location?.coords.latitude ?? 37.785834, // Fallback to mock location if no location
                longitude: location?.coords.longitude ?? -122.406417, // Fallback to mock location if no location
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {map_chatrooms.map((bubble, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: parseFloat(bubble.latitude),
                    longitude: parseFloat(bubble.longitude),
                  }}
                  title={bubble.name}
                  description={bubble.description}
                  onCalloutPress={() => ConnectToChatroom(bubble.id)}
                >
                  <View style={styles.bubbleMarker}>
                    <Text style={styles.bubbleMarkerText}>{bubble.name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          </View>
        );
      default:
        return null;
    }
  };

  const modalViewStyle = {
    margin: 20,
    backgroundColor: colors.modalBackground,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  };
  const modalInputStyle = {
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    color: colors.text,
    width: "100%",
    borderWidth: 1,
    borderColor: colors.subText,
  };

  const modalTitleInputStyle = {
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    color: colors.text,
    width: "100%",
    fontSize: 24,
    fontWeight: "bold",
  };

  const renderUserItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.userListItem}
        onPress={() => SendFriendRequest(item[1])}
      >
        <View style={styles.profileImage} />
        <View>
          <Text style={styles.userListItemText}>{item[0]}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.homeBackground }]}
    >
<Header
  leftComponent={
    (() => {
      if (connected_chatroom.length > 0) {
        return (
          <TouchableOpacity
            style={[
              styles.connectedChatroomButton,
              { backgroundColor: colors.widget, borderRadius: 20 },
            ]}
            onPress={() => {
              if (connected_chatroom) ConnectToChatroom(connected_chatroom[0]);
            }}
          >
            <Text
              style={[styles.connectedChatroomText, { color: colors.text }]}
            >
              {`${connected_chatroom[1]}`}
            </Text>
          </TouchableOpacity>
        );
      }
      return null; // Return null if no chatroom is connected
    })()
  }
        rightComponent={
          <View style={styles.iconsContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Notification")}
            >
              <Entypo name="mail" size={24} color={colors.iconColor} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("DMList")}>
              <Entypo
                name="message"
                size={24}
                color={colors.iconColor}
                style={styles.iconSpacing}
              />
            </TouchableOpacity>
          </View>
        }
        containerStyle={{
          backgroundColor: colors.homeBackground,
          borderBottomWidth: 0,
        }}
      />
      <View style={styles.createBubbleButton}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CreateChatroom")
          }}
        >
          <View
            style={[
              styles.newBubble,
              { backgroundColor: colors.buttonBackground },
            ]}
          >
            <Text style={[styles.newBubbleText, { color: colors.buttonText }]}>
              + Create
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.widget,
          {
            backgroundColor: colors.widget,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          },
        ]}
      >
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setSelectedTab("social")}
          >
            {renderIcon("social")}
            <Text
              style={[
                styles.tabText,
                selectedTab === "social"
                  ? { color: colors.text, fontWeight: "bold" }
                  : { color: colors.secondary },
              ]}
            >
              Social
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => {
              setSelectedTab("nearby");
              setNearbyTab(false);
              setSocialTab(true);
            }}
          >
            {renderIcon("nearby")}
            <Text
              style={[
                styles.tabText,
                selectedTab === "nearby"
                  ? { color: colors.text, fontWeight: "bold" }
                  : { color: colors.secondary },
              ]}
            >
              Nearby
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => setSelectedTab("explore")}
          >
            {renderIcon("explore")}
            <Text
              style={[
                styles.tabText,
                selectedTab === "explore"
                  ? { color: colors.text, fontWeight: "bold" }
                  : { color: colors.secondary },
              ]}
            >
              Explore
            </Text>
          </TouchableOpacity>
        </View>
        {renderContent()}
      </View>
      <NavBar navigation={navigation} currentScreen={"HomePage"} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay}>
            <View style={modalViewStyle}>
              <TextInput
                style={modalTitleInputStyle}
                onChangeText={setBubbleTitle}
                value={bubbleTitle}
                placeholder="Bubble Title"
                placeholderTextColor="gray"
                maxLength={30}
              />

              <TextInput
                style={[modalInputStyle, { height: 100 }]}
                onChangeText={setBubbleDescription}
                value={bubbleDescription}
                placeholder="Short Description"
                placeholderTextColor="gray"
                maxLength={100}
                multiline
              />

              <View style={styles.switchContainer}>
                <Text
                  style={[styles.modalText, { color: colors.text, right: 10 }]}
                >
                  Private Room
                </Text>
                <Switch
                  trackColor={{ false: "#767577", true: colors.primary }}
                  thumbColor={isPrivate ? colors.secondary : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={setIsPrivate}
                  value={isPrivate}
                />
              </View>

              <View style={styles.sliderContainer}>
                <Text style={[styles.modalText, { color: colors.text }]}>
                  Radius: {selectedRadius}m
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={10}
                  maximumValue={100}
                  step={1}
                  value={selectedRadius}
                  onValueChange={setSelectedRadius}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.secondary}
                  thumbTintColor={colors.primary}
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.createBubbleButtonStyle,
                  { backgroundColor: colors.buttonBackground },
                ]}
                onPress={() => {
                  setCreatingBubble(false);
                  CreateChatroom();
                }}
              >
                <Text style={{ color: colors.buttonText }}>Create Bubble</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  bubbleMarker: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0, 123, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  bubbleMarkerText: {
    color: "white",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  bubbleContainer: {},
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacing: {
    marginLeft: 20,
  },
  widget: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "75%",
    padding: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 20,
  },
  tabText: {
    fontSize: 16,
  },
  tab: {
    alignItems: "center",
  },
  iconImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  input: {
    borderRadius: 30,
    borderWidth: 1,
    padding: 15,
    margin: 10,
    fontSize: 12,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    marginTop: 10,
  },
  infoText: {
    fontSize: 12,
    fontWeight: "normal",
    left: 5,
    fontWeight: "bold",
  },
  map: {
    width: "95%",
    height: "85%",
    borderRadius: 20,
  },
  createBubbleButton: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "75%", // Since the widget is 75% of the height from the bottom, this button will sit on top of it
    paddingHorizontal: 20, // Match the padding of the widget for alignment
    paddingBottom: 20, // To give some space between the button and the widget,
    alignSelf: "center",
  },

  newBubble: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    width: 110,
  },

  newBubbleText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18, // Example size, adjust as needed
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  createBubbleButtonStyle: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2, // Optional for Android shadow
    shadowOpacity: 0.1, // Optional for iOS shadow
    shadowRadius: 2, // Optional for iOS shadow
    shadowOffset: { height: 2, width: 2 }, // Optional for iOS shadow
    shadowColor: "#000", // Optional for iOS shadow,
    marginTop: 10,
  },

  chatroomItem: {
    borderRadius: 30,
    padding: 25,
    margin: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  chatroomItemHost: {
    borderRadius: 30,
    borderWidth: 2,
    padding: 25,
    margin: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  chatroomItemCreator: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  chatroomItemContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatroomItemTextContainer: {
    flexShrink: 1,
  },
  chatroomItemName: {
    fontWeight: "bold",
    fontSize: 16, // You can adjust the font size as needed
  },
  chatroomItemJoin: {
    fontWeight: "bold",
    fontSize: 14, // You can adjust the font size as needed
    alignSelf: "flex-start",
    color: "white",
  },
  userListItem: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3, // for shadow on Android
    shadowColor: "#000", // for shadow on iOS
    shadowOffset: { width: 0, height: 1 }, // for shadow on iOS
    shadowOpacity: 0.2, // for shadow on iOS
    shadowRadius: 1.5, // for shadow on iOS
  },
  userListItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: "black",
  },
  userListItemSubText: {
    fontSize: 14,
    color: "grey",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
  },
  connectedChatroomButton: {
    padding: 15,
  },
  connectedChatroomText: {
    fontSize: 13,
    textAlign: "center",
  },
});
