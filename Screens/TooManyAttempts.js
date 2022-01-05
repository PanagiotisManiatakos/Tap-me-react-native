import React, { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/core';


const TooManyAttempts = ({ route }) => {
    const navigation = useNavigation();
    const { emailRecover } = route.params;

    const failedToastConifg = {
        duration: Toast.durations.SHORT,
        position: 50,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: 'red',
    }

    const successToastConifg = {
        duration: Toast.durations.SHORT,
        position: 50,
        shadow: true,
        animation: true,
        hideOnPress: true,
    }


    const handleForgotPassword = () => {
        sendPasswordResetEmail(auth, emailRecover)
            .then(() => {
                Toast.show('Recovery email send', successToastConifg)
                navigation.replace('Login');
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/missing-email':
                        Toast.show('Provide an email', failedToastConifg);
                        break;
                    case 'auth/invalid-email':
                        Toast.show('Invalid email', failedToastConifg);
                        break;
                    case 'auth/user-not-found':
                        Toast.show('No such user found', failedToastConifg);
                        break;
                    default:
                        Toast.show('Error. Try again', failedToastConifg);
                }
                console.log(error.message)
            });
    }


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'>
            <View style={{width:'80%'}}>
                <Text style={styles.forgotTextHeader}>Hey {emailRecover}</Text>
                <Text style={styles.forgotText}>Seems you forgot your password.</Text>
                <Text style={styles.forgotText}>Wanna reset this shit?</Text>

            </View>
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder="Email"
                    value={emailRecover}
                    editable={false} 
                    selectTextOnFocus={false}
                    style={styles.input}
                    textContentType='emailAddress'
                />
                <TouchableOpacity
                    onPress={handleForgotPassword}
                    style={styles.buttonOutline}>
                    <Text style={styles.buttonOutlineText}>Reset password</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Link style={styles.loginText} to={{ screen: 'Login', params: { id: 'jane' } }}>
                    Login
                </Link>
            </View>
        </KeyboardAvoidingView>
    )
}

export default TooManyAttempts

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212529'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButton: {
        backgroundColor: '#ffc404',
        width: '100%',
        padding: 15,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonOutline: {
        backgroundColor: '#212529',
        width: '100%',
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: '#ffc404',
        borderWidth: 1
    },
    buttonText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutlineText: {
        color: '#ffc404',
        fontWeight: '700',
        fontSize: 16
    },
    forgotTextHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
        fontWeight: '500',
        fontSize: 24,
        color: 'white'
    },
    forgotText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '400',
        fontSize: 16,
        color: 'white'
    },
    loginText: {
        color: 'white',
        marginTop: 10,
        marginBottom: 10,
        textDecorationLine: 'underline'
    },
})
