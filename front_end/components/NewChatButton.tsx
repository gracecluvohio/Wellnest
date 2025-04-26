import { StyleSheet, View, Pressable } from 'react-native';
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from 'expo-router';

const PLUS_ICON_SIZE = 96;

export default function NewChatButton() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {/* @ts-ignore */}
            <Pressable style={styles.button} onPress={() => navigation.navigate('newchat')}>
                <AntDesign size={PLUS_ICON_SIZE} name="pluscircleo" color="white" />
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
