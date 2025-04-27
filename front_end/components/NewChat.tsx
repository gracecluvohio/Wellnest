import { StyleSheet, View, Pressable, Text } from "react-native";
import dayjs from "dayjs";
import isYesterday from "dayjs/plugin/isYesterday";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTheme } from "@/app/contexts/ThemeContext";

const DEFAULT_ICON_SIZE = 24;

const formatMessageTimestamp = (date: string): string => {
  const { isDarkMode } = useTheme();
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

export default function NewChat(swipeRight: any, chatTitle: any) {
  const { isDarkMode } = useTheme(); 

  const handlePencilPress = () => {
    console.log("pencil");
  };

  const handleTrashPress = () => {
    console.log("trash");
  };

  // ✅ Dynamic color based on dark mode
  const dynamicTextColor = { color: isDarkMode ? "#fff" : "#000" };
  const dynamicBackground = { backgroundColor: isDarkMode ? "#25292e" : "#f0f0f0" };

  return (
    <>
      <View style={[styles.chat_options, dynamicBackground]}>
        <View style={[styles.individual_chat, dynamicBackground]}>
          <Text style={[styles.chat_text, dynamicTextColor]}>{chatTitle.chatTitle || "Health Data Review and Consultation Chat"}</Text>
          <Text style={[styles.chat_text, dynamicTextColor]}>
            {formatMessageTimestamp(dayjs().toString())}
          </Text>
        </View>
        {swipeRight.swipeRight && (
          <View style={[styles.right_swipe, dynamicBackground]}>
            <Pressable onPressOut={handleTrashPress}>
              <Ionicons size={DEFAULT_ICON_SIZE} name="trash" color={isDarkMode ? "white" : "black"} />
            </Pressable>
            <Pressable onPressOut={handlePencilPress}>
              <Ionicons size={DEFAULT_ICON_SIZE} name="pencil" color={isDarkMode ? "white" : "black"} />
            </Pressable>
          </View>
        )}
      </View>
      <View style={[styles.chat_options, dynamicBackground]}>
        <Text style={[styles.description_text, dynamicTextColor]}>A quick summary of your recent health data and follow-up discussion.</Text>
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
