import { Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const DEFAULT_ICON_SIZE = 24;
const PLUS_ICON_SIZE = 96;
const SWIPE_LEFT = false;
const SWIPE_RIGHT = false;

export default function Chat() {
  return (
    <>
      <View style={styles.chat_screen}>
        <AntDesign size={PLUS_ICON_SIZE} name="pluscircleo" color="white" />
      </View>
      {/* TODO: Add logic to handle icons changing on swipe  */}
      {/* TODO: Make a function out of this whenever a new chat is created  */}
      <View style={styles.chat_options}>
        {SWIPE_LEFT && (
          <View>
            <AntDesign size={DEFAULT_ICON_SIZE} name="inbox" color="white" />
          </View>
        )}
        {/* TODO: Finish formatting date when chat was created */}
        <Text style={styles.text}>Chat screen Placeholder Date</Text>
        {/* TODO: Finish formatting description */}
        <Text style={styles.text}>Description</Text>
        {SWIPE_RIGHT && (
          <View style={styles.right_swipe}>
            <Ionicons size={DEFAULT_ICON_SIZE} name="trash" color="white" />
            <Ionicons size={DEFAULT_ICON_SIZE} name="pencil" color="white" />
          </View>
        )}
      </View>
      <View style={styles.archive}>
        <Text style={styles.archive_text}>Archive</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  hamburger: {
    backgroundColor: "#25292e",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 24,
  },
  chat_screen: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  chat_options: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  right_swipe: {
    flexDirection: "row",
    backgroundColor: "#25292e",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  archive: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: 24,
    paddingLeft: 24,
  },
  archive_text: {
    fontSize: 36,
    color: "#fff",
  },
  text: {
    color: "#fff",
  },
});
