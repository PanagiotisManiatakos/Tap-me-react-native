import { useNavigation } from '@react-navigation/core'
import { signOut } from 'firebase/auth'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { auth } from '../firebase'

const Home = () => {
    const navigation = useNavigation();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => navigation.replace('Login'))
            .catch(error => alert(error.message))
    }

    return (
        <View style={styles.container}>
            <Text>Email:{auth.currentUser?.email}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={handleSignOut}
            >
                <Text style={styles.buttonText}>SignOut</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    }
})
