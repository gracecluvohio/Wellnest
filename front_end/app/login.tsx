import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useForm } from "react-hook-form";

const GoogleSignIn = require('@/assets/images/ios_neutral_rd_SI.png');

export default function Login() {
    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors } 
    } = useForm({
        defaultValues: {
            user: '',
            password: '',
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{"Wellnest"}</Text>
            <MaterialCommunityIcons style={styles.logo} name="flower-tulip-outline" size={100} color="white" />
            <Image source={GoogleSignIn} style={styles.googleSignIn} />
            <Text style={styles.text}>{"or"}</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Email or username"
                    placeholderTextColor="#999"
                    {...register("user", { required: "Email is required" })}
                />
            </View>
            {errors.user && <Text style={{ color: 'red' }}>{errors.user.message}</Text>}

            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                    {...register("password", { required: "Password is required" })}
                />
            </View>
            {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}

            <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSubmit((data) => {
                    alert(`Email: ${data.user}, Password: ${data.password}`);
                })}
            >
                <Text style={styles.sendText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#25292e', 
        alignItems: 'center', 
    }, 
    title: {
        marginTop: 128, 
        fontSize: 30, 
        color: '#fff', 
    }, logo: {
        marginBottom: 32, 
    }, text: {
        fontSize: 16, 
        color: '#fff', 
        marginVertical: 18
    },
    inputWrapper: {
        flexDirection: 'row',
        backgroundColor: '#40414f',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 8,
        width: 320,
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
    },
    sendButton: {
        backgroundColor: '#10a37f',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 6,
    },
    sendText: {
        color: '#fff',
        fontWeight: '600',
    }, googleSignIn: {
        marginTop: 20, 
        width: 220,
        height: 40, 
        resizeMode: 'contain',
    }
})