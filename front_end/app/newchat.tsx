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

const NEW_CHAT_ROUTE = "http://46.110.43.43:8080/new-chat";
const TEST = "http://46.110.43.43:8080/chat";

export default function NewChat() {
  // Response
  const [res, setRes] = useState("");
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (data: any) => {
    const payload = {
      uid: "user123", // Replace with actual user ID if available
      chatId: "chat456", // Replace with actual chat ID if available
      prompt: data.message, // Message from the user
    };
    console.log("User message:", data.message);
    const response = await axios.post(NEW_CHAT_ROUTE, payload);
    // const response = await axios.get(TEST, {
    //   params: {
    //     uid: "user123",
    //     chatId: "680df7436ae024dd485f3fc8"
    //   },
    // });
    setRes(response.data);
    reset();
  };

  return (
    <>

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            {res && (
              <View style={styles.responseContainer}>
                <Text style={styles.responseText}>{res}</Text>
              </View>
            )}
          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              name="message"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Send a message..."
                  placeholderTextColor="#999"
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
    </>
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
