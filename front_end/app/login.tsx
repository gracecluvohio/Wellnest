import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Switch } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useForm } from "react-hook-form";
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme} from '@/app/contexts/ThemeContext'; 

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
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#1A936F' : '#fff' }]}>
            <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#1A936F'}]}>{"Wellnest"}</Text>
            <MaterialCommunityIcons style={styles.logo} name="flower-tulip-outline" size={100} color={isDarkMode ? '#fff' : '#88D498'} />
            <Image source={GoogleSignIn} style={styles.googleSignIn} />
            <Text style={[styles.text, {color: isDarkMode ? '#fff': '#155F4B'}]}>{"or"}</Text>
            {/* <Switch value={isDarkMode} onValueChange={toggleDarkMode} /> */}
            <View style={[styles.inputWrapper, { backgroundColor: isDarkMode ? '#fff' : '#eee' }]}>
                <TextInput
                    style={[styles.input]}
                    placeholder="Email or username"
                    placeholderTextColor="#222"
                    {...register("user", { required: "Email is required" })}
                />
            </View>
            {/* {errors.user && <Text style={{ color: 'red' }}>{errors.user.message}</Text>} */}

            <View style={[styles.inputWrapper, { backgroundColor: isDarkMode ? '#fff' : '#eee' }]}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#222"
                    secureTextEntry
                    {...register("password", { required: "Password is required" })}
                />
            </View>
            {/* {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>} */}

            <TouchableOpacity
                style={[styles.sendButton, { backgroundColor: isDarkMode ? '#1A936F' : '#88D498' }]}
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