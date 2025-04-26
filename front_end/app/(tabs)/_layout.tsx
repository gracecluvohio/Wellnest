import { Tabs } from 'expo-router'; 
import Ionicons from '@expo/vector-icons/Ionicons';
import SettingsButton from '@/components/SettingsButton';


const ICON_SIZE = 24;
const HEADER_ALIGNMENT = 'left';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
            tabBarActiveTintColor: '#ffd33d',
            headerStyle: {
                backgroundColor: '#25292e',
            },
            headerShadowVisible: false,
            headerTintColor: '#fff',
            tabBarStyle: {
                backgroundColor: '#25292e',
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
                        <Ionicons name="help" size={ICON_SIZE} color="#fff" style={{ marginRight: 15 }} />
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
                <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={ICON_SIZE} />
                ),
                headerLeft: () => (
                    <>
                      <Ionicons size={ICON_SIZE} name="menu" color="white" style={{marginLeft: 15}} />
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
                <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={ICON_SIZE} />
                ),
            }}
            />
        </Tabs>
    );
}

// active page is highlighted yellow
