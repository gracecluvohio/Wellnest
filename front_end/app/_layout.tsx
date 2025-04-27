import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useRouter, useNavigation } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    };

    checkAuthStatus();
  }, []);

  return { isLoggedIn };
}

export default function RootLayout() {
  const router = useRouter();
  const navigation = useNavigation();
  const { isLoggedIn } = useAuth(); // Replace with your actual authentication logic

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("(tabs)");
    } else {
      navigation.navigate("login");
    }
  }, [isLoggedIn]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#25292e",
          },
        }}
      />
      <Stack.Screen
        name="newchat"
        options={{
          title: "New Chat",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#25292e",
          },
        }}
      />
      <Stack.Screen
        name="manualinput"
        options={{
          title: "Manual Input",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#25292e",
          },
        }}
      />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="landing" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
