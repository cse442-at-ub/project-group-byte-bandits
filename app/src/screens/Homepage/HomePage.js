import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Switch,
} from "react-native";
import { useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";

import BubbleComponent from "../../svgs/bubbleComponent";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import HomePageSocial from "../../components/HomePageSocial";
import HomePageNearby from "../../components/HomePageNearby";

const HomePage = ({ navigation }) => {
  const [creatingBubble, setCreatingBubble] = useState(false);
  const [showDeleteBubble, setShowDeleteBubble] = useState(false);
  const [socialTab, setSocialTab] = useState(true);
  const [nearbyTab, setNearbyTab] = useState(false);
  const [exploreTab, setExploreTab] = useState(false);
  const [bubbleTitle, setBubbleTitle] = useState("");
  const [bubbleDescription, setBubbleDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedRadius, setSelectedRadius] = useState(150);
  const [maxPeople, setMaxPeople] = useState(1);

  const userID = useSelector((state) => state.user.userID);

  const createBubble = () => {
    try {
      const data = qs.stringify({
        chatroom_radius: selectedRadius,
      });
    } catch {}
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.HomePageBackground}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* CREATE BUBBLE MODAL */}
          <Modal
            transparent={true}
            animationType="fade"
            visible={creatingBubble}
          >
            <TouchableWithoutFeedback
              onPress={
                bubbleDescription.length === 0 && bubbleTitle.length === 0
                  ? () => {
                      setCreatingBubble(false);
                      setIsPrivate(false);
                      setMaxPeople(1);
                      setSelectedRadius(150);
                    }
                  : () => setShowDeleteBubble(true)
              }
            >
              <View style={styles.invisibleScreen}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    Keyboard.dismiss();
                  }}
                >
                  <View style={styles.createBubble}>
                    <View style={styles.createBubbleLabel}>
                      <View style={styles.cancelDiv}>
                        <TouchableOpacity
                          onPress={
                            bubbleDescription.length === 0 &&
                            bubbleTitle.length === 0
                              ? () => {
                                  setCreatingBubble(false);
                                  setIsPrivate(false);
                                  setMaxPeople(1);
                                  setSelectedRadius(150);
                                }
                              : () => setShowDeleteBubble(true)
                          }
                        >
                          <MaterialIcons
                            name="cancel"
                            size={30}
                            color="#6B6A6A"
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.createBubbleTop}>
                        <Text style={styles.createBubbleTopText}>
                          Create Bubble
                        </Text>
                      </View>
                    </View>
                    <View style={styles.createBubbleTitle}>
                      <Text style={styles.createBubbleTitleText}>Title</Text>
                    </View>
                    <View style={styles.searchBarDiv}>
                      <TextInput
                        style={styles.searchBar}
                        placeholder="Add a title..."
                        placeholderTextColor={"#3D3C3C"}
                        onChangeText={(text) => setBubbleTitle(text)}
                        value={bubbleTitle}
                        maxLength={25}
                      />
                      <Text style={styles.titleCounter}>
                        {bubbleTitle.length + "/25"}
                      </Text>
                    </View>
                    <View style={styles.createBubbleDescription}>
                      <Text style={styles.createBubbleDescriptionText}>
                        Description
                      </Text>
                    </View>

                    <View style={styles.searchBarDivDescription}>
                      <TextInput
                        style={{
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.23,
                          shadowRadius: 2.62,
                          elevation: 4,
                          padding: 20,
                          width: "80%%",
                          borderRadius: 20,
                          borderColor: "#3D3C3C",
                          borderWidth: 1,
                          backgroundColor: "#191818",
                          color: "#56585B",
                          fontWeight: "bold",
                          paddingLeft: 15,
                          paddingRight: 85,
                          paddingTop: bubbleDescription.length === 0 ? 25 : 10,
                        }}
                        placeholder="Add a description..."
                        placeholderTextColor={"#3D3C3C"}
                        onChangeText={(text) => setBubbleDescription(text)}
                        value={bubbleDescription}
                        maxLength={80}
                        multiline={true}
                        textAlignVertical="top"
                        onSubmitEditing={() => {
                          Keyboard.dismiss;
                        }}
                      />
                      <Text style={styles.descriptionCounter}>
                        {bubbleDescription.length + "/80"}
                      </Text>
                    </View>

                    <View style={styles.createBubbleSettings}>
                      <View style={styles.settings}>
                        <View style={styles.oneThirdSettings}>
                          <View style={styles.setting2Title}>
                            <Text style={styles.settingsTitleText}>
                              Privacy
                            </Text>
                          </View>
                          <View style={styles.privacySwitchBar}>
                            {/* Public by default */}
                            <Switch
                              trackColor={{ false: "#767577", true: "#81b0ff" }}
                              onValueChange={() => setIsPrivate(!isPrivate)}
                              value={isPrivate}
                              style={{
                                transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                              }}
                            ></Switch>
                          </View>
                          <View style={styles.informOfPrivacy}>
                            <Text style={styles.privacyText}>
                              {isPrivate
                                ? "Currently Private"
                                : "Currently Public"}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.oneThirdSettings}>
                          <View style={styles.settingTitle}>
                            <Text style={styles.settingsTitleText}>
                              Bubble Radius
                            </Text>
                          </View>

                          <View style={styles.radiusChoiceDiv}>
                            <Picker
                              style={styles.radiusChoiceDiv}
                              selectedValue={selectedRadius}
                              onValueChange={(itemValue) =>
                                setSelectedRadius(itemValue)
                              }
                              itemStyle={styles.radiusChoices}
                            >
                              <Picker.Item label="50 ft" value={50} />
                              <Picker.Item label="100 ft" value={100} />
                              <Picker.Item label="150 ft" value={150} />
                              <Picker.Item label="200 ft" value={200} />
                              <Picker.Item label="250 ft" vvalue={250} />
                              <Picker.Item label="300 ft" value={300} />
                            </Picker>
                          </View>
                        </View>
                        <View style={styles.oneThirdSettings}>
                          <View style={styles.settingTitle}>
                            <Text style={styles.settingsTitleText}>
                              Max People
                            </Text>
                          </View>

                          <View style={styles.radiusChoiceDiv}>
                            <Picker
                              style={styles.radiusChoiceDiv}
                              selectedValue={maxPeople}
                              onValueChange={(itemValue) =>
                                setMaxPeople(itemValue)
                              }
                              itemStyle={styles.radiusChoices}
                            >
                              <Picker.Item label="1" value={1} />
                              <Picker.Item label="2" value={2} />
                              <Picker.Item label="3" value={3} />
                              <Picker.Item label="4" value={4} />
                              <Picker.Item label="5" value={5} />
                              <Picker.Item label="6" value={6} />
                              <Picker.Item label="7" value={7} />
                              <Picker.Item label="8" value={8} />
                              <Picker.Item label="9" value={9} />
                              <Picker.Item label="10" value={10} />
                              <Picker.Item label="11" value={11} />
                              <Picker.Item label="12" value={12} />
                              <Picker.Item label="13" value={13} />
                              <Picker.Item label="14" value={14} />
                              <Picker.Item label="15" value={15} />
                              <Picker.Item label="16" value={16} />
                              <Picker.Item label="17" value={17} />
                              <Picker.Item label="18" value={18} />
                              <Picker.Item label="19" value={19} />
                              <Picker.Item label="20" value={20} />
                              <Picker.Item label="21" value={21} />
                              <Picker.Item label="22" value={22} />
                              <Picker.Item label="23" value={23} />
                              <Picker.Item label="24" value={24} />
                              <Picker.Item label="25" value={25} />
                              <Picker.Item label="26" value={26} />
                              <Picker.Item label="27" value={27} />
                              <Picker.Item label="28" value={28} />
                              <Picker.Item label="29" value={29} />
                              <Picker.Item label="30" value={30} />
                              <Picker.Item label="31" value={31} />
                              <Picker.Item label="32" value={32} />
                              <Picker.Item label="33" value={33} />
                              <Picker.Item label="34" value={34} />
                              <Picker.Item label="35" value={35} />
                              <Picker.Item label="36" value={36} />
                              <Picker.Item label="37" value={37} />
                              <Picker.Item label="38" value={38} />
                              <Picker.Item label="39" value={39} />
                              <Picker.Item label="40" value={40} />
                              <Picker.Item label="41" value={41} />
                              <Picker.Item label="42" value={42} />
                              <Picker.Item label="43" value={43} />
                              <Picker.Item label="44" value={44} />
                              <Picker.Item label="45" value={45} />
                              <Picker.Item label="46" value={46} />
                              <Picker.Item label="47" value={47} />
                              <Picker.Item label="48" value={48} />
                              <Picker.Item label="49" value={49} />
                              <Picker.Item label="50" value={50} />
                              <Picker.Item label="51" value={51} />
                              <Picker.Item label="52" value={52} />
                              <Picker.Item label="53" value={53} />
                              <Picker.Item label="54" value={54} />
                              <Picker.Item label="55" value={55} />
                              <Picker.Item label="56" value={56} />
                              <Picker.Item label="57" value={57} />
                              <Picker.Item label="58" value={58} />
                              <Picker.Item label="59" value={59} />
                              <Picker.Item label="60" value={60} />
                              <Picker.Item label="61" value={61} />
                              <Picker.Item label="62" value={62} />
                              <Picker.Item label="63" value={63} />
                              <Picker.Item label="64" value={64} />
                              <Picker.Item label="65" value={65} />
                              <Picker.Item label="66" value={66} />
                              <Picker.Item label="67" value={67} />
                              <Picker.Item label="68" value={68} />
                              <Picker.Item label="69" value={69} />
                              <Picker.Item label="70" value={70} />
                              <Picker.Item label="71" value={71} />
                              <Picker.Item label="72" value={72} />
                              <Picker.Item label="73" value={73} />
                              <Picker.Item label="74" value={74} />
                              <Picker.Item label="75" value={75} />
                              <Picker.Item label="76" value={76} />
                              <Picker.Item label="77" value={77} />
                              <Picker.Item label="78" value={78} />
                              <Picker.Item label="79" value={79} />
                              <Picker.Item label="80" value={80} />
                              <Picker.Item label="81" value={81} />
                              <Picker.Item label="82" value={82} />
                              <Picker.Item label="83" value={83} />
                              <Picker.Item label="84" value={84} />
                              <Picker.Item label="85" value={85} />
                              <Picker.Item label="86" value={86} />
                              <Picker.Item label="87" value={87} />
                              <Picker.Item label="88" value={88} />
                              <Picker.Item label="89" value={89} />
                              <Picker.Item label="90" value={90} />
                              <Picker.Item label="91" value={91} />
                              <Picker.Item label="92" value={92} />
                              <Picker.Item label="93" value={93} />
                              <Picker.Item label="94" value={94} />
                              <Picker.Item label="95" value={95} />
                              <Picker.Item label="96" value={96} />
                              <Picker.Item label="97" value={97} />
                              <Picker.Item label="98" value={98} />
                              <Picker.Item label="99" value={99} />
                              <Picker.Item label="100" value={100} />
                            </Picker>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.createBubbleButton}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Chatroom");
                          setCreatingBubble(false);
                        }}
                      >
                        <View style={styles.newBubble}>
                          <Text style={styles.newBubbleText}>Create</Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.errorMessageDiv}>
                      <Text style={styles.errorMessageText}></Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>

            {/* CONFIRM DELETE MODAL */}
            <Modal
              transparent={true}
              animationType="fade"
              visible={showDeleteBubble}
            >
              <View style={styles.deleteBubbleBackground}>
                <View style={styles.deleteBubblePopup}>
                  {/* TOP WARNING LABEL */}
                  <View style={styles.topWarning}>
                    <Text style={styles.topWarningText}>Warning</Text>
                  </View>
                  <View style={styles.bodyWarning}>
                    <Text style={styles.bodyWarningText}>
                      Are you sure you want to cancel creating this Bubble? All
                      progress will be lost.
                    </Text>
                  </View>
                  <View style={styles.continueAndcancelButtons}>
                    <TouchableOpacity
                      onPress={() => {
                        setBubbleDescription("");
                        setBubbleTitle("");
                        setIsPrivate(false);
                        setMaxPeople(1);
                        setSelectedRadius(150);
                        setCreatingBubble(false);
                        setShowDeleteBubble(false);
                      }}
                      style={styles.buttonDiv}
                    >
                      <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setShowDeleteBubble(false)}
                      style={styles.buttonDiv}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </Modal>

          <View style={styles.topOfHomePage}>
            {/* Top Icon Bar */}
            <View style={styles.topBar}>
              {/* Bubble Logo */}
              <View style={styles.bubbleLogo}>
                <BubbleComponent width={120} height={40} />
              </View>
              {/* Padding Div*/}
              <View style={styles.paddingDiv}></View>
              {/* Div for Notifcations and DM Icons */}
              <View style={styles.topIcons}>
                {/* Notifcation Icon */}
                <View style={styles.notiDiv}>
                  <TouchableOpacity>
                    <Feather name="bell" size={34} color={"#56585B"} />
                  </TouchableOpacity>
                </View>
                {/* DM Icon */}
                <View style={styles.dmDiv}>
                  <TouchableOpacity>
                    <Octicons
                      name="paper-airplane"
                      size={28}
                      color={"#56585B"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.bottomBar}>
              <View style={styles.addBubbleDiv}>
                <TouchableOpacity
                  onPress={() => setCreatingBubble(true)}
                  style={styles.addBubbleIcon}
                >
                  <View style={styles.plusLogoIcon}>
                    <AntDesign name="pluscircleo" size={20} color={"white"} />
                  </View>

                  <View style={styles.BubbleText}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "white",
                        fontSize: 16,
                      }}
                    >
                      Bubble
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* ====================================SOCIAL TAB======================================== */}

          {socialTab && (
            <HomePageSocial
              setSocialTab={setSocialTab}
              setNearbyTab={setNearbyTab}
            />
          )}

          {/* ====================================NEARBY TAB======================================== */}

          {nearbyTab && (
            <HomePageNearby
              setNearbyTab={setNearbyTab}
              setSocialTab={setSocialTab}
            />
          )}

          {/* ===================================EXPLORE TAB========================================== */}

          <View style={styles.bottomNavBar}>
            {/* Home Icon */}
            <View style={styles.bottomIconDiv}>
              <TouchableOpacity>
                <Octicons name="home" size={54} color={"#628CD1"} />
              </TouchableOpacity>
            </View>
            {/* Settings Icon */}
            <View style={styles.bottomIconDiv}>
              <TouchableOpacity
                onPress={() => navigation.navigate("UserDashboard")}
              >
                <MaterialCommunityIcons
                  name="account-circle-outline"
                  size={60}
                  color={"white"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  errorMessageText: {
    fontWeight: "bold",
    fontSize: 12,
  },

  errorMessageDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "7%",
    width: "100%",
  },
  newBubbleText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  newBubble: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 40,
    backgroundColor: "#93B8DA",
    borderRadius: 20,
  },
  createBubbleButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "8%",
    width: "100%",
  },
  radiusChoices: {
    width: "100%",
    height: "90%",
    color: "white",
  },
  radiusChoiceDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  privacyText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#56585B",
  },
  informOfPrivacy: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "15%",
    width: "100%",
  },
  privacySwitchBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
    width: "100%",
  },
  settingsTitleText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  settingTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "15%",
  },
  oneThirdSettings: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "33%",
  },
  settings: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "90%",
    width: "100%",
  },
  createBubbleSettingsBody: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "25%",
  },
  createBubbleSettingsText: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#6B6A6A",
    paddingLeft: 16,
  },
  createBubbleSettings: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "30%",
    width: "100%",
  },
  descriptionCounter: {
    color: "#3D3C3C",
    textAlign: "right",
  },
  searchBarDivDescription: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "18%",
    width: "100%",
  },
  createBubbleDescriptionText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#6B6A6A",
    paddingLeft: 16,
  },
  createBubbleDescription: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "5%",
    width: "100%",
  },
  titleCounter: {
    textAlign: "right",
    color: "#3D3C3C",
  },
  searchBarDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "12%",
    width: "100%",
  },
  createBubbleTitleText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#6B6A6A",
    paddingLeft: 16,
  },
  createBubbleTitle: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "5%",
    width: "100%",
  },
  createBubbleTopText: {
    fontWeight: "bold",
    fontSize: 34,
    color: "white",
  },
  createBubbleTop: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "70%",
  },
  cancelDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "15%",
  },
  createBubbleLabel: {
    display: "flex",
    flexDirection: "row",
    height: "15%",
    width: "100%",
  },
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
    fontSize: 14,
    color: "white",
    padding: 5,
    textAlign: "center",
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
  deleteBubblePopup: {
    display: "flex",
    height: "20%",
    width: "60%",
    backgroundColor: "#252525",
    borderRadius: 30,
    alignItems: "center",
  },
  deleteBubbleBackground: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  invisibleScreen: {
    display: "flex",
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  createBubble: {
    display: "flex",
    position: "absolute",
    width: "90%",
    height: "60%",
    backgroundColor: "#1B1B1B",
    borderRadius: 30,
    shadowOpacity: 0.5,
    opacity: 1,
  },
  bottomIconDiv: {
    display: "flex",
    height: "100%",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    padding: 15,
    width: "80%",
    borderRadius: 20,
    borderColor: "#3D3C3C",
    borderWidth: 1,
    backgroundColor: "#191818",
    color: "#56585B",
    fontWeight: "bold",
    paddingLeft: 15,
    paddingRight: 85,
  },

  topIconDiv: {
    display: "flex",
    height: "100%",
    width: "33%",
    alignItems: "center",
  },

  BubbleText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "70%",
    paddingRight: 5,
  },
  plusLogoIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    height: "100%",
    width: "30%",
  },
  addBubbleIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 100,
    height: 35,
    backgroundColor: "#93B8DA",
    borderRadius: 20,
  },
  addBubbleDiv: {
    display: "flex",
    height: "100%",
    width: "35%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBar: {
    display: "flex",
    flexDirection: "row",
    height: "50%",
    width: "100%",
  },
  dmDiv: {
    display: "flex",
    height: "100%",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "-45deg" }],
    paddingBottom: 8,
  },
  notiDiv: {
    display: "flex",
    height: "100%",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  topIcons: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  paddingDiv: {
    display: "flex",
    height: "100%",
    width: "35%",
  },
  bubbleLogo: {
    display: "flex",
    height: "100%",
    width: "35%",
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    height: "50%",
    width: "100%",
  },
  HomePageBackground: {
    display: "flex",
    height: "100%",
    width: "100%",
    backgroundColor: "#191818",
  },
  topOfHomePage: {
    display: "flex",
    justifyContent: "flex-start",
    height: "18%",
    width: "100%",
  },

  bottomNavBar: {
    display: "flex",
    flexDirection: "row",
    height: "8%",
    width: "100%",
    backgroundColor: "#1a1a1a",
  },
});
