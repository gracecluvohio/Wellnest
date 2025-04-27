import { Platform, Text, Button, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import React, { useState, useCallback } from "react";
import { useNavigation } from "expo-router";
import { useTheme } from "@/app/contexts/ThemeContext";
import axios from "axios";
import { exec } from "child_process";

const DEFAULT_ICON_SIZE = 24;
const PLUS_ICON_SIZE = 96;

const NEW_UPLOAD_ROUTE = "http://46.110.43.43:8080/user-info-document";

type FileResponse = DocumentPicker.DocumentPickerResult | File;

export default function Add() {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  const [fileResponse, setFileResponse] = useState<FileResponse[]>([]);

  const handleDocumentSelection = useCallback(async () => {
    if (Platform.OS === "web") {
      const fileInput = document.createElement("input");
      fileInput.type = "file";

      fileInput.onchange = async (event: Event) => {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
          // TODO: Send to backend
          console.log("Selected file on web:", file);
          setFileResponse([file]);
          const formData = new FormData();
          formData.append("uid", "user123");
          formData.append("file", file); 

          const response = await fetch(
            "http://46.110.43.43:8080/user-info-document",
            {
              method: "POST",
              body: formData,
            }
          );

          const result = await response.json();
          console.log(result);
        }
      };

      fileInput.click();
    } else {
      try {
        const result = await DocumentPicker.getDocumentAsync({
          type: "*/*",
        });

        if (result.output) {
          setFileResponse([result]);
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }, []);

  const handlePress = () => {
    // @ts-ignore
    navigation.navigate("manualinput");
  };

  return (
    <>
      <View
        style={[
          styles.add_screen,
          { backgroundColor: isDarkMode ? "#25292e" : "#fff" },
        ]}
      >
        <Ionicons
          size={PLUS_ICON_SIZE}
          name="cloud-upload"
          color={isDarkMode ? "white" : "#25292e"}
          onPress={handleDocumentSelection}
        />
        <Text
          style={[
            styles.upload_text,
            { color: isDarkMode ? "white" : "#25292e" },
          ]}
        >
          Upload PDF
        </Text>
      </View>
      {/* TODO: Add logic to handle icons changing on tap */}
      {/* TODO: handle form input  */}
      <View
        style={[
          styles.add_options,
          { backgroundColor: isDarkMode ? "#25292e" : "#fff" },
        ]}
      >
        <Button title="Or Manual Input" onPress={handlePress} />
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
  upload_text: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
  },
});
