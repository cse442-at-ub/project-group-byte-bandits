import React, { useState } from "react"; // It's important to import React
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { ConfirmDeleteBubble } from "../Bubbles/confirmDeleteBubble";

export const CreateBubble = ({ setCreatingBubble }) => {
  const [confirmDeleteBubble, setConfirmDeleteBubble] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={() => setConfirmDeleteBubble(true)}>
      <View style={styles.invisibleScreen}>
        {confirmDeleteBubble && (
          <ConfirmDeleteBubble
            setConfirmDeleteBubble={setConfirmDeleteBubble}
            setCreatingBubble={setCreatingBubble}
          />
        )}
        <View style={styles.createBubble}></View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  createBubble: {
    display: "flex",
    position: "absolute",
    width: "90%",
    height: "75%",
    backgroundColor: "#1B1B1B",
    borderRadius: 30,
    shadowOpacity: 0.5,
  },
  invisibleScreen: {
    display: "flex",
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
});
