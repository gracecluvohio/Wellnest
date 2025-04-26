import { StyleSheet, View, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from 'expo-router';

export default function SettingsButton() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={() => navigation.navigate('settings')}>
                <Ionicons name="settings" size={24} color="white" />
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
