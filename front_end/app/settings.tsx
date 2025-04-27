import { View, StyleSheet, Switch, SectionList, Text } from "react-native";
import SettingsRow from "@/components/SettingsRow";
import {ThemeProvider, useTheme} from '@/app/contexts/ThemeContext'; 

export default function Settings() {
    const {isDarkMode, toggleDarkMode} = useTheme();

    const DATA = [
        {
            title: 'Display', 
            data: ['Theme'], 
        },
        {
            title: 'Data', 
            data: ['Clear Chats'],
        }, 
        {
            title: 'Account Settings', 
            data: ['Logout', 'Delete Account'], 
        }
    ];

    const icons = {
        'Theme': 'color-palette', 
        'Clear Chats': 'trash-bin', 
        'Logout': 'log-out', 
        'Delete Account': 'person-remove', 
    }
    
    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#25292e' : '#aaa' }]}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    // @ts-expect-error
                    <SettingsRow icon={icons[item]} title={item} hasToggle={item==="Theme"} />
                )}
                renderSectionHeader={({section: {title}}) => (
                    <Text style={{ fontSize: 24, color: isDarkMode ? '#fff' : '#111', marginTop: 20, marginBottom: 10 }}>{title}</Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
    }, 
})