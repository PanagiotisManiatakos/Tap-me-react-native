import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    OAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
} from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';
import * as GoogleAuthentication from 'expo-google-app-auth';
import * as FacebookAuthentication from 'expo-facebook';
import Toast from 'react-native-root-toast';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import {
    GOOGLE_ANDROID_CLIENT_ID,
    GOOGLE_IOS_CLIENT_ID,
    FACEBOOK_APP_ID
} from '@env';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                navigation.replace('Home')
            }
        })
        return unsubscribe
    }, [])

    const failedToastConifg = {
        duration: Toast.durations.SHORT,
        position: 50,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: 'red',
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email);
                console.log(user.photoURL);
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
                    case 'auth/wrong-password':
                        Toast.show('Wrong password', failedToastConifg);
                        break;
                    case 'auth/too-many-requests':
                        Toast.show('Too many attempts', failedToastConifg);
                        navigation.replace('TooManyAttempts', { emailRecover: email })
                        break;
                    default:
                        Toast.show('Error. Try again', failedToastConifg);
                }
                console.log(error.code)
            });
    }

    const handleGoogleLogin = () => {
        const config = {
            androidClientId: `${GOOGLE_ANDROID_CLIENT_ID}`,
            iosClientId: `${GOOGLE_IOS_CLIENT_ID}`,
            scopes: ['profile', 'email']
        }
        GoogleAuthentication
            .logInAsync(config)
            .then((logInResult) => {
                if (logInResult.type === 'success') {
                    const { idToken, accessToken } = logInResult;
                    const credential = GoogleAuthProvider.credential(
                        idToken,
                        accessToken
                    );

                    return signInWithCredential(auth, credential);
                    // Successful sign in is handled by firebase.auth().onAuthStateChanged
                }
                return Promise.reject(); // Or handle user cancelation separatedly
            })
            .catch((error) => {
                console.log(error)
            });
        // const { idToken } = await GoogleSignin.signIn();
        // const googleCredential = GoogleAuthProvider.credential(idToken);
        // signInWithCredential(auth,googleCredential)
    }

    const handleFacebookLogin = async () => {
        await FacebookAuthentication.initializeAsync({ 'appId': FACEBOOK_APP_ID })
        const permissions = ['public_profile', 'email'];  // Permissions required, consult Facebook docs
        FacebookAuthentication
            .logInWithReadPermissionsAsync({ permissions })
            .then((logInResult) => {
                if (logInResult.type === 'success') {
                    const credential = FacebookAuthProvider.credential(logInResult.token);
                    // console.log(credential);
                    return signInWithCredential(auth, credential);  // Sign in with Facebook credential
                }
                return Promise.reject(); // Or handle user cancelation separatedly
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const handleAppleLogin = async () => {
        const nonce = Math.random().toString(36).substring(2, 10);
        return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce)
            .then((hashedNonce) =>
                AppleAuthentication.signInAsync({
                    requestedScopes: [
                        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                        AppleAuthentication.AppleAuthenticationScope.EMAIL
                    ],
                    nonce: hashedNonce
                })
            ).then((appleCredential) => {
                const { identityToken } = appleCredential;
                const provider = new OAuthProvider('apple.com');
                const credential = provider.credential({
                    idToken: identityToken,
                    rawNonce: nonce
                });
                return signInWithCredential(auth,credential);
                // Successful sign in is handled by firebase.auth().onAuthStateChanged
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'>
            <View>
                <Text style={styles.loginText}>Log In</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    textContentType='emailAddress'
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={password => setPassword(password)}
                    style={styles.input}
                    secureTextEntry
                />
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.loginButton}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Link style={styles.forgotText} to={{ screen: 'ForgotPassword', params: { id: 'jane' } }}>
                    Forgot password?
                </Link>
            </View>
            <View>
                <Text style={styles.orText}>or</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleGoogleLogin}
                    style={styles.providerButton}>
                    <Text style={styles.providerButtonText}>
                        Sign in with
                    </Text>
                    <AntDesign name="google" size={16} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleFacebookLogin}
                    style={styles.providerButton}>
                    <Text style={styles.providerButtonText}>Sign in with</Text>
                    <FontAwesome name="facebook" size={18} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleAppleLogin}
                    style={styles.providerButton}>
                    <Text style={styles.providerButtonText}>Sign in with</Text>
                    <AntDesign name="apple1" size={18} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{
                    color: 'white',
                    marginTop: 10,
                    marginBottom: 10,
                    marginRight: 2
                }}>
                    Need an account?
                </Text>
                <Link style={styles.forgotText} to={{ screen: 'SignUp', params: { id: 'jane' } }}>
                    Sign Up
                </Link>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Login

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
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center'
    },
    forgotText: {
        color: 'white',
        marginTop: 10,
        marginBottom: 10,
        textDecorationLine: 'underline'
    },
    orText: {
        color: 'white',
        marginTop: 10,
        marginBottom: 5
    },
    buttonOutline: {
        backgroundColor: 'black',
        marginTop: 5,
        borderColor: '#ffc404',
        borderWidth: 2
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
    loginText: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
        fontWeight: '700',
        fontSize: 24,
        color: 'white'
    },
    providerButton: {
        backgroundColor: '#212529',
        width: '100%',
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    providerButtonText: {
        color: 'white',
        fontSize: 16,
        marginRight: 5,
    }
})
