import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";

export default function NewChat() {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            message: '',
        },
    });

    const onSubmit = (data: any) => {
        // TODO: send to backend
        console.log("User message:", data.message);
        reset(); 
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.inputWrapper}>
                    <Controller
                        control={control}
                        name="message"
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Send a message..."
                                placeholderTextColor="#999"
                                onChangeText={onChange}
                                value={value}
                                returnKeyType="send"
                                onSubmitEditing={handleSubmit(onSubmit)} 
                            />
                        )}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.sendText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'flex-end',
        padding: 16,
    },
    inputWrapper: {
        flexDirection: 'row',
        backgroundColor: '#40414f',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        marginRight: 10,
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
    },
});
