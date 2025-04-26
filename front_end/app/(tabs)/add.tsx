import { Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const DEFAULT_ICON_SIZE = 24;
const PLUS_ICON_SIZE = 96;
const SWIPE_LEFT = false;
const SWIPE_RIGHT = false;

export default function Add() {
  return (
    <>
      <View style={styles.add_screen}>
        <Ionicons size={PLUS_ICON_SIZE} name="cloud-upload" color="white" />
      </View>
      {/* TODO: Add logic to handle icons changing on tap */}
      {/* TODO: handle form input  */}
      <View style={styles.add_options}>
        <Text style={styles.manual_text}>Or Manual Input</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  add_screen: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  add_options: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  manual_text: {
    fontSize: 24,
    color: "#fff",
  },
  text: {
    color: "#fff",
  },
});
