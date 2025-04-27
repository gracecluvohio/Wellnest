import { Tabs } from 'expo-router'; 
import Ionicons from '@expo/vector-icons/Ionicons';
import SettingsButton from '@/components/SettingsButton';
import { useTheme } from '@/app/contexts/ThemeContext';

const ICON_SIZE = 24;
const HEADER_ALIGNMENT = 'left';

export default function TabLayout() {
    const { isDarkMode } = useTheme();
    return (
        <Tabs
            screenOptions={{
            tabBarActiveTintColor: (isDarkMode ? '#1A936F' : '#222'),
            headerStyle: {
                backgroundColor: (isDarkMode ? '#25292e' : '#fff'),
            },
            headerShadowVisible: false,
            headerTintColor: (isDarkMode ? '#fff' : '#222'),
            tabBarStyle: {
                backgroundColor: (isDarkMode ? '#25292e' : '#eee'),
            },
            }}
        >
            <Tabs.Screen
            name="index"
            options={{
                headerTitleAlign: HEADER_ALIGNMENT,
                title: 'Home',
                tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={ICON_SIZE} />
                ),
                headerRight: () => (
                    <>
                        <SettingsButton />
                        <Ionicons name="help" size={ICON_SIZE} color={isDarkMode ? '#fff' : '#222'} style={{ marginRight: 15 }} />
                    </>
                ),
            }}
            />
            <Tabs.Screen
            name="chat"
            options={{
                headerTitleAlign: HEADER_ALIGNMENT,
                title: 'Chat',
                tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'chatbox' : 'chatbox-outline'} color={color} size={ICON_SIZE} />
                ),
                headerLeft: () => (
                    <>
                      <Ionicons size={ICON_SIZE} name="menu" color={isDarkMode ? '#fff' : '#222'} style={{marginLeft: 15}} />
                    </>
                  )
            }}
            />
            <Tabs.Screen
            name="add"
            options={{
                headerTitleAlign: HEADER_ALIGNMENT,
                title: 'Add',
                tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'add' : 'add-outline'} color={color} size={ICON_SIZE} />
                ),
            }}
            />
        </Tabs>
    );
}

// active page is highlighted yellow
