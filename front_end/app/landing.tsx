import { View, StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "expo-router";

export default function Landing() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello, welcome to Wellnest.</Text>
            <Pressable onPressOut={()=> {
                // @ts-expect-error
                navigation.navigate("(tabs)");
            }}>
                <Text style={styles.text}>Enter</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#25292e', 
        alignItems: 'center', 
    }, 
    text: {
        fontSize: 24, 
        color: '#fff',
    }
})