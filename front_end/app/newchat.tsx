import React, { useState } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "@/app/contexts/ThemeContext";

const NEW_CHAT_ROUTE = "http://46.110.43.43:8080/new-chat";

export default function NewChat() {
    const { isDarkMode } = useTheme();
    const [res, setRes] = useState("");
    const { control, handleSubmit, reset } = useForm({ defaultValues: { message: "" } });
  
    const onSubmit = async (data: any) => {
      const payload = {
        uid: "user123",
        chatId: "chat456",
        prompt: data.message,
      };
      console.log("User message:", data.message);
      const response = await axios.post(NEW_CHAT_ROUTE, payload);
      setRes(response.data);
      reset();
    };
  
    // 🌓 Dynamic theme-aware styles
    const backgroundColor = isDarkMode ? "#25292e" : "#f5f5f5";
    const textColor = isDarkMode ? "#fff" : "#000";
    const inputBg = isDarkMode ? "#40414f" : "#e0e0e0";
  
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={[styles.container, { backgroundColor }]}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {res && (
            <View style={[styles.responseContainer, { backgroundColor: isDarkMode ? "#343541" : "#ddd" }]}>
              <Text style={[styles.responseText, { color: textColor }]}>{res}</Text>
            </View>
          )}
          <View style={[styles.inputWrapper, { backgroundColor: inputBg }]}>
            <Controller
              control={control}
              name="message"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, { color: textColor }]}
                  placeholder="Send a message..."
                  placeholderTextColor={isDarkMode ? "#999" : "#666"}
                  onChangeText={onChange}
                  value={value}
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
  

const styles = StyleSheet.create({
  responseContainer: {
    backgroundColor: "#343541",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignSelf: "flex-start", // So it doesn't span full width
    maxWidth: "80%",
  },
  responseText: {
    color: "#ffffff",
    fontSize: 16,
    lineHeight: 22,
  },
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "flex-end",
    padding: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    backgroundColor: "#40414f",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 84,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#10a37f",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  sendText: {
    color: "#fff",
    fontWeight: "600",
  },
});
