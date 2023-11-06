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
    <TouchableOpacity
      onPress={() => setConfirmDeleteBubble(true)}
      style={styles.invisibleScreen}
    >
      {confirmDeleteBubble && (
        <ConfirmDeleteBubble
          setConfirmDeleteBubble={setConfirmDeleteBubble}
          setCreatingBubble={setCreatingBubble}
        />
      )}
      <TouchableWithoutFeedback>
        <View style={styles.createBubble}></View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  createBubble: {
    display: "flex",
    position: "absolute",
    width: "70%",
    height: "60%",
    backgroundColor: "black",
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
