import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Switch } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useForm } from "react-hook-form";
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeProvider, useTheme} from '@/app/contexts/ThemeContext'; 

const GoogleSignIn = require('@/assets/images/ios_neutral_rd_SI.png');

export default function Login() {
    const {isDarkMode, toggleDarkMode} = useTheme();
    
    const navigation = useNavigation();

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
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#1c1c1e' : '#f2f2f7' }]}>
            <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#1c1c1e'}]}>{"Wellnest"}</Text>
            <MaterialCommunityIcons style={styles.logo} name="flower-tulip-outline" size={100} color={isDarkMode ? '#fff' : '#1c1c1e'} />
            <Image source={GoogleSignIn} style={styles.googleSignIn} />
            <Text style={styles.text}>{"or"}</Text>
            {/* <Switch value={isDarkMode} onValueChange={toggleDarkMode} /> */}
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
                    navigation.navigate("(tabs)");
                    // const login = async (username: string, password: string) => {
                    //     // const response = await fetch('https://example.com/login', {
                    //     //     method: 'POST',
                    //     //     headers: { 'Content-Type': 'application/json' },
                    //     //     body: JSON.stringify({ username, password }),
                    //     // });
                    //     // const data = await response.json();
                    //     // if (data.token) {
                    //     //     await AsyncStorage.setItem('authToken', data.token); // won't be a token
                    //     // }
                    //     const token = await AsyncStorage.getItem('authToken');
                        
                    // };
                })}
                onPressOut={() => {navigation.navigate("landing");}}
            >
                <Text style={styles.sendText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
    }, 
    title: {
        marginTop: 128, 
        fontSize: 64, 
        color: '#fff', 
        marginBottom: 16,
        fontWeight: 'bold',
        fontFamily: 'Avenir',
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