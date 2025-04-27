import { StyleSheet, View, Pressable } from 'react-native';
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from 'expo-router';
import { useTheme } from "@/app/contexts/ThemeContext";

const PLUS_ICON_SIZE = 96;

export default function NewChatButton() {
    const navigation = useNavigation();
    const { isDarkMode } = useTheme();
    const dynamicBackground = isDarkMode ? "#25292e" : "black" ;
    return (
        <View style={styles.container}>
            {/* @ts-ignore */}
            <Pressable style={styles.button} onPress={() => navigation.navigate('newchat')}>
                <AntDesign size={PLUS_ICON_SIZE} name="pluscircleo" color={dynamicBackground} />
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
