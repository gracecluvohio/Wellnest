import { Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import dayjs from "dayjs";
import isYesterday from "dayjs/plugin/isYesterday";
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
    GestureHandlerRootView
} from "react-native-gesture-handler";
import React, { useState } from "react";
import NewChatButton from "@/components/NewChatButton";

const DEFAULT_ICON_SIZE = 24;
const PLUS_ICON_SIZE = 96;
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
    const [swipeLeft, setSwipeLeft] = useState(false);
    const [swipeRight, setSwipeRight] = useState(false);

    const handleGestureEvent = (event: PanGestureHandlerGestureEvent) => {
        const { translationX } = event.nativeEvent;

        if (translationX > 50) {
            setSwipeRight(true);
            setSwipeLeft(false);
        } else if (translationX < -50) {
            setSwipeRight(false);
            setSwipeLeft(true);
        } else if (Math.abs(translationX) < 10) {
            setSwipeRight(false);
            setSwipeLeft(false);
        }
    };

    return (
        <GestureHandlerRootView>
            <PanGestureHandler onGestureEvent={handleGestureEvent}>
                <View style={styles.chat_screen}>
                    <View style={styles.chat_screen}>
                        <NewChatButton />
                    </View>
                    {/* TODO: Add logic to handle icons changing on swipe  */}
                    {/* TODO: Make a function out of this whenever a new chat is created  */}

                    {/* TODO: Finish formatting date when chat was created */}
                    <View style={styles.chat_options}>
                        {swipeRight && (
                            <View style={styles.left_swipe}>
                                <AntDesign size={DEFAULT_ICON_SIZE} name="inbox" color="white" />
                            </View>
                        )}
                        <View style={styles.individual_chat}>
                            <Text style={styles.chat_text}>Chat screen</Text>
                            <Text style={styles.chat_text}>
                                {formatMessageTimestamp(dayjs().toString())}
                            </Text>
                        </View>
                        {swipeLeft && (
                            <View style={styles.right_swipe}>
                                <Ionicons size={DEFAULT_ICON_SIZE} name="trash" color="white" />
                                <Ionicons size={DEFAULT_ICON_SIZE} name="pencil" color="white" />
                            </View>
                        )}
                        {/* TODO: Finish formatting description */}
                    </View>
                    <Text style={styles.description_text}>Description</Text>
                    <View style={styles.archive}>
                        <Text style={styles.archive_text}>Archive</Text>
                    </View>
                </View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    hamburger: {
        backgroundColor: "#25292e",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingLeft: 24,
    },
    individual_chat: {
        flex: 1,
        gap: 48,
        flexDirection: "row",
        backgroundColor: "#25292e",
        justifyContent: "center",
        alignItems: "center",
    },
    chat_screen: {
        flex: 1,
        backgroundColor: "#25292e",
        justifyContent: "center",
        alignItems: "center",
    },
    chat_options: {
        paddingBottom: 8,
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
    description_text: {
        fontSize: 14,
        color: "#fff",
    },
    chat_text: {
        fontSize: 16,
        color: "#fff",
    },
});
