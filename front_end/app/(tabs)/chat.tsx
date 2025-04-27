import { Text, View, StyleSheet, Pressable } from "react-native";
import dayjs from "dayjs";
import isYesterday from "dayjs/plugin/isYesterday";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import NewChatButton from "@/components/NewChatButton";
import NewChat from "@/components/NewChat";
import { useTheme } from "@/app/contexts/ThemeContext";
import axios from 'axios';


const now = dayjs().format("YYYY-MM-DD");
const TEST = "http://46.110.43.43:8080/chat-dialog";

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
  const [chats, setChats] = useState<any>([]);
  const dynamicTextColor = { color: isDarkMode ? "#fff" : "#000" };
  const dynamicBackground = { backgroundColor: isDarkMode ? "#25292e" : "#f0f0f0" };
  const [swipeRight, setSwipeRight] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await handleQueryChats();
        const fetchedChats = data?.chatDialog;
  
        if (Array.isArray(fetchedChats) && fetchedChats.length > 0) {
          setChats(fetchedChats);
        } else {
          // Default fallback
          setChats([
            {
              _id: "680df0b32e1284eb1730b111",
              uid: "user123",
              chatTitle: "Health Data Review and Consultation Chat",
              __v: 0,
            },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch chats, using fallback:", error);
        // In case of error, also use fallback
        setChats([
          {
            _id: "680df0b32e1284eb1730b111",
            uid: "user123",
            chatTitle: "Health Data Review and Consultation Chat",
            __v: 0,
          },
        ]);
      }
    };
  
    fetchChats();
  }, []);

  const handleQueryChats = async () => {

    const response = await axios.get(TEST, {
        params: {
          uid: "user123",
        },
      });

      return response.data
  }

  handleQueryChats()

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
          {chats.map((chat: any) => (
          <NewChat
            key={chat._id}
            swipeRight={swipeRight}
            chatTitle={chat.chatTitle}
          />
        ))}
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
