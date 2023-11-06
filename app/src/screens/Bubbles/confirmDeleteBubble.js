import React, { useState } from "react"; // It's important to import React
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export const ConfirmDeleteBubble = ({
  setConfirmDeleteBubble,
  setCreatingBubble,
}) => {
  return (
    <View style={styles.deleteBubble}>
      <View style={styles.topHalf}>
        <Text style={styles.warningText}>
          Pressing Confirm will Delete Bubble
        </Text>
      </View>

      <View style={styles.bottomHalf}>
        <TouchableOpacity
          onPress={() => {
            setConfirmDeleteBubble(false);
            setCreatingBubble(false);
          }}
          style={styles.confirmButton}
        >
          <Text>Confirm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setConfirmDeleteBubble(false);
          }}
          style={styles.denyButton}
        >
          <Text>Deny</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  denyButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "50%",
    borderLeftWidth: 1,
  },
  confirmButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "50%",
  },
  bottomHalf: {
    display: "flex",
    flexDirection: "row",
    height: "60%",
    width: "100%",
  },
  warningText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
  },
  topHalf: {
    display: "flex",
    height: "40%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  deleteBubble: {
    display: "flex",
    position: "absolute",
    height: "10%",
    width: "60%",
    backgroundColor: "white",
    borderRadius: 20,
    zIndex: 30,
  },
});
