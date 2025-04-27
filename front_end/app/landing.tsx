import { View, StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "expo-router";

export default function Landing() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello, welcome to Wellnest. This is your personal healthcare provider. </Text>
            <Pressable onPressOut={()=> {
                // @ts-expect-error
                navigation.navigate("(tabs)");
            }}>
                <Text style={[styles.text, { marginTop: 16, fontSize: 16, color: '#88D498', marginLeft: 200}]}>Enter</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#fff', 
        alignItems: 'center', 
    }, 
    text: {
        marginHorizontal: 48, 
        marginTop: 320, 
        fontSize: 24, 
        color: '#222',
    }
})