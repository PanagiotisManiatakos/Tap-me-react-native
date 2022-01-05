import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity
} from 'react-native'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from '@react-navigation/native';
import Toast from 'react-native-root-toast';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [emailError, setEmailError] = useState(false)
    const [passError, setPassError] = useState(false);

    const failedToastConifg = {
        duration: Toast.durations.SHORT,
        position: 50,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: 'red',
    }

    const handleSignUp = () => {
        setEmailError(false);
        setPassError(false);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false) {
            setEmailError(true);
            Toast.show('Enter valid email', failedToastConifg);
            return false;
        }
        if (password !== passwordConf) {
            setPassError(true);
            Toast.show('Passwords do not match', failedToastConifg);
            return;
        } else {
            if (password.length < 6) {
                setPassError(true);
                Toast.show('Password must be at least 6 characters', failedToastConifg);
                return;
            } else {
                createUserWithEmailAndPassword(auth, email, password)
                    .then(userCredentials => {
                        const user = userCredentials.user;
                        console.log(user.email);
                    })
                    .catch(error => alert(error.message));
            }
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'>
            <View>
                <Text style={styles.loginText}>Sign Up</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={emailError ? styles.inputEmailError : styles.input}
                    textContentType='emailAddress'
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={password => setPassword(password)}
                    style={passError ? styles.inputPassError : styles.input}
                    secureTextEntry
                />
                <TextInput
                    placeholder="Confirm password"
                    value={passwordConf}
                    onChangeText={passwordConf => setPasswordConf(passwordConf)}
                    style={passError ? styles.inputPassError : styles.input}
                    secureTextEntry
                />
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={styles.buttonOutline}>
                    <Text style={styles.buttonOutlineText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{
                    color: 'white',
                    marginTop: 10,
                    marginBottom: 10,
                    marginRight: 2
                }}>
                    Already have an account?
                </Text>
                <Link style={styles.forgotText} to={{ screen: 'Login', params: { id: 'jane' } }}>
                    Log in
                </Link>
            </View>
        </KeyboardAvoidingView>
    )
}

export default SignUp

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
    inputEmailError: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        borderWidth: 2,
        borderColor: 'red'
    },
    inputPassError: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        borderWidth: 2,
        borderColor: 'red'
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonOutline: {
        backgroundColor: '#212529',
        width: '100%',
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#ffc404',
        borderWidth: 1
    },
    forgotText: {
        color: 'white',
        marginTop: 10,
        marginBottom: 10,
        textDecorationLine: 'underline'
    },
    buttonText: {
        color: 'black',
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
    buttonOutlineText: {
        color: '#ffc404',
        fontWeight: '700',
        fontSize: 16
    },
})
