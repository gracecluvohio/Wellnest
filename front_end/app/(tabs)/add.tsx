import { Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Platform, Button } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import React, { useState, useCallback } from "react";

const DEFAULT_ICON_SIZE = 24;
const PLUS_ICON_SIZE = 96;

type FileResponse = DocumentPicker.DocumentPickerResult | File;

export default function Add() {
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

  return (
    <>
      <View style={styles.add_screen}>
        <Ionicons
          size={PLUS_ICON_SIZE}
          name="cloud-upload"
          color="white"
          onPress={handleDocumentSelection}
        />
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
