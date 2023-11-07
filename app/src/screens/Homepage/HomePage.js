import React, { useState } from "react"; // It's important to import React
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import BubbleComponent from "../../svgs/bubbleComponent";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import HomePageSocial from "../Homepage/HomePageSocial";
import HomePageNearby from "../Homepage/HomePageNearby";

const HomePage = ({ navigation }) => {
  const [creatingBubble, setCreatingBubble] = useState(false);
  const [showDeleteBubble, setShowDeleteBubble] = useState(false);
  const [socialTab, setSocialTab] = useState(true);
  const [nearbyTab, setNearbyTab] = useState(false);
  const [exploreTab, setExploreTab] = useState(false);
  const [bubbleTitle, setBubbleTitle] = useState("");

  return (
    <View style={styles.HomePageBackground}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* CREATE BUBBLE MODAL */}
        <Modal transparent={true} animationType="fade" visible={creatingBubble}>
          <TouchableWithoutFeedback onPress={() => setShowDeleteBubble(true)}>
            <View style={styles.invisibleScreen}>
              <TouchableWithoutFeedback>
                <View style={styles.createBubble}>
                  <View style={styles.createBubbleLabel}>
                    <View style={styles.cancelDiv}>
                      <TouchableOpacity
                        onPress={() => setShowDeleteBubble(true)}
                      >
                        <MaterialIcons name="cancel" size={30} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.createBubbleTop}>
                      <Text style={styles.createBubbleTopText}>
                        Create Bubble
                      </Text>
                    </View>
                  </View>
                  <View style={styles.createBubbleTitle}>
                    <Text style={styles.createBubbleTitleText}>
                      Bubble Title...
                    </Text>
                  </View>
                  <View style={styles.searchBarDiv}>
                    <TextInput
                      style={styles.searchBar}
                      placeholder="What are you interested in?"
                      placeholderTextColor={"#3D3C3C"}
                      onChangeText={(text) => setBubbleTitle(text)}
                      value={bubbleTitle}
                      maxLength={30}
                    />
                    <Text style={styles.titleCounter}>
                      {bubbleTitle.length + "/30"}
                    </Text>
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
                  <Octicons name="paper-airplane" size={28} color={"#56585B"} />
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
  );
};

export default HomePage;

const styles = StyleSheet.create({
  titleCounter: {
    position: "absolute",
    right: 65,
    bottom: 15,
    color: "#3D3C3C",
  },
  searchBarDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    height: "12%",
    width: "100%",
  },
  createBubbleTitleText: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#6B6A6A",
    paddingLeft: 16,
  },
  createBubbleTitle: {
    display: "flex",
    justifyContent: "flex-end",
    height: "10%",
    width: "100%",
  },
  createBubbleTopText: {
    fontWeight: "bold",
    fontSize: 30,
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
    fontSize: 16,
    color: "white",
    padding: 5,
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
    height: "55%",
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
    height: 50,
    width: 320,
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
