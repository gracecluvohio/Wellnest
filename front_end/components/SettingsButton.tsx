import { StyleSheet, View, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from 'expo-router';
import { useTheme } from '@/app/contexts/ThemeContext';

export default function SettingsButton() {
    const { isDarkMode } = useTheme();
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {/* @ts-ignore */}
            <Pressable style={styles.button} onPress={() => navigation.navigate('settings')}>
                <Ionicons name="settings" size={24} color={isDarkMode ? '#fff' : '#222'} />
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 16,
    }, 
    button: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    }
});
