import { View, StyleSheet, Switch } from "react-native";

export default function Settings() {
    return (
        <View style={styles.container}>
            <Switch 
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={false ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {}}
                value={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#25292e', 
        alignItems: 'center', 
    }, 
})