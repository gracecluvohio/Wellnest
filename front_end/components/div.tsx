import { StyleSheet, View } from 'react-native';

export default function Div() {
    return (
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 320, 
        height: 100, 
        borderRadius: 18, 
        marginTop: 18, 
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});