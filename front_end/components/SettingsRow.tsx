import { StyleSheet, View, Text, Switch } from 'react-native'; 
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
    icon: keyof typeof Ionicons.glyphMap;
    title: string; 
    hasToggle?: boolean;
}

export default function SettingsRow({ icon, title, hasToggle }: Props) {
    return (
        <View style={styles.container}>
            <Ionicons name={icon} size={24} color="white" />
            <Text style={styles.title}>{title}</Text>
            {hasToggle ? 
                <Switch 
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={false ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {}}
                value={false}
                /> : <></>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderRadius: 8,
        backgroundColor: '#555',
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
