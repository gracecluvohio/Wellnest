import { StyleSheet, View, Pressable, Text } from "react-native";
import dayjs from "dayjs";
import isYesterday from "dayjs/plugin/isYesterday";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const DEFAULT_ICON_SIZE = 24;

const formatMessageTimestamp = (date: string): string => {
  const now = dayjs();
  const input = dayjs(date);

  if (input.isSame(now, "day")) {
    // e.g., "3:42 PM"
    return input.format("h:mm A");
  } else if (input.isYesterday()) {
    return "Yesterday";
  } else if (now.diff(input, "day") < 7) {
    // e.g., "Monday"
    return input.format("dddd");
  } else {
    // e.g., "Jan 12, 2024"
    return input.format("MMM D, YYYY");
  }
};

export default function NewChat(swipeRight: any) {
    const handlePencilPress = () => {
        console.log("pencil");
      };
    
      const handleTrashPress = () => {
        console.log("trash");
      };

  return (
    <>
      <View style={styles.chat_options}>
        <View style={styles.individual_chat}>
          <Text style={styles.chat_text}>Chat screen</Text>
          <Text style={styles.chat_text}>
            {formatMessageTimestamp(dayjs().toString())}
          </Text>
        </View>
        {swipeRight.swipeRight && (
          <View style={styles.right_swipe}>
            <Pressable onPressOut={handleTrashPress}>
              <Ionicons size={DEFAULT_ICON_SIZE} name="trash" color="white" />
            </Pressable>
            <Pressable onPressOut={handlePencilPress}>
              <Ionicons size={DEFAULT_ICON_SIZE} name="pencil" color="white" />
            </Pressable>
          </View>
        )}
      </View>
      <View style={styles.chat_options}>
        <Text style={styles.description_text}>Description</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  individual_chat: {
    // flex: 1,
    gap: 48,
    flexDirection: "row",
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  chat_screen: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  add_chat_button: {
    backgroundColor: "#25292e",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 12,
  },
  chat_options: {
    marginTop: 16,
    gap: 48,
    flexDirection: "row",
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  left_swipe: {
    flexDirection: "row",
    backgroundColor: "#25292e",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  right_swipe: {
    gap: 24,
    flexDirection: "row",
    backgroundColor: "#25292e",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  description_text: {
    fontSize: 14,
    color: "#fff",
  },
  chat_text: {
    fontSize: 16,
    color: "#fff",
  },
  new_chat_text: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
  },
});
