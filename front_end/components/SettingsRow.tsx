import { StyleSheet, View, Text, Switch, Pressable } from 'react-native'; 
import Ionicons from '@expo/vector-icons/Ionicons';
import {ThemeProvider, useTheme} from '@/app/contexts/ThemeContext'; 

type Props = {
    icon: keyof typeof Ionicons.glyphMap;
    title: string; 
    hasToggle?: boolean;
    handlePress?: () => void; 
}

export default function SettingsRow({ icon, title, hasToggle, handlePress }: Props) {
    const {isDarkMode, toggleDarkMode} = useTheme();

    return (
        <Pressable onPress={handlePress}>
            <View style={[styles.container, { backgroundColor: isDarkMode ? '#555' : '#fff' }]}>
                <Ionicons name={icon} size={24} color={isDarkMode ? '#fff': '#555'} />
                <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#555' }]}>{title}</Text>
                {hasToggle ? 
                    <Switch 
                    trackColor={{ false: "#81b0ff", true: "#111" }}
                    thumbColor={isDarkMode ? "#81b0ff" : "#fff"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleDarkMode}
                    value={isDarkMode}
                    /> : <></>
                }
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 8,
        width: 320, 
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 16,
    },
    title: {
        flex: 1,
        fontSize: 16,
        color: '#fff',
        marginLeft: 8, 
    },
    toggle: {
        width: 40,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#ccc',
    },
});
