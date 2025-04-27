import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack> 
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{
        title: 'Settings',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#25292e',
        }
      }}/> 
      <Stack.Screen name="newchat" options={{
        title: 'New Chat',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#25292e',
        }
      }}/> 
      <Stack.Screen name="manualinput" options={{
        title: 'Manual Input',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#25292e',
        }
      }}/> 
      <Stack.Screen name="login" options={{headerShown: false}} />
      <Stack.Screen name="landing" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" /> 
    </Stack>
  );
}
