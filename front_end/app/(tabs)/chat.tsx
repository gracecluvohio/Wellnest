import { Text, View, StyleSheet, Pressable } from "react-native";
import dayjs from "dayjs";
import isYesterday from "dayjs/plugin/isYesterday";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import React, { useState } from "react";
import NewChatButton from "@/components/NewChatButton";
import NewChat from "@/components/NewChat";
import { useTheme } from "@/app/contexts/ThemeContext";


const now = dayjs().format("YYYY-MM-DD");

dayjs.extend(isYesterday);

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


export default function Chat() {
  const { isDarkMode } = useTheme();
  const dynamicTextColor = { color: isDarkMode ? "#fff" : "#000" };
  const dynamicBackground = { backgroundColor: isDarkMode ? "#25292e" : "#f0f0f0" };
  const [swipeRight, setSwipeRight] = useState(false);

  const handleGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { translationX } = event.nativeEvent;

    if (translationX > 50) {
      setSwipeRight(false);
    } else if (translationX < -50) {
      setSwipeRight(true);
    } else if (Math.abs(translationX) < 10) {
      setSwipeRight(false);
    }
  };

  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={handleGestureEvent}>
        <View style={[styles.chat_screen, {backgroundColor: isDarkMode ? '#25292e' : '#fff'}]}>
          <View style={[styles.add_chat_button, , {backgroundColor: isDarkMode ? '#25292e' : '#fff'}]}>
            <NewChatButton />
            <Text style={[styles.new_chat_text, dynamicTextColor]}>New Chat</Text>
          </View>
          <NewChat swipeRight={swipeRight} />
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
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
