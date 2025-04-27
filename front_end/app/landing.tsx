import { View, StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "expo-router";
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function Landing() {

    const navigation = useNavigation();

    return (
        <Pressable style={styles.container} onPressOut={()=> {
            // @ts-expect-error
            navigation.navigate("(tabs)");
        }}>
        <Animated.View 
            style={styles.container}
            entering={FadeIn.duration(1000)}
            exiting={FadeOut.duration(400)}>
            
                <Text style={styles.text}>Hello, welcome to Wellnest.</Text>
            
        </Animated.View>
        
        </Pressable>
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
        marginTop: 360, 
        fontSize: 24, 
        color: '#222',
    }
})