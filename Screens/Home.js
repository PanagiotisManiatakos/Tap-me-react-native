import { useNavigation } from '@react-navigation/core'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { signOut } from 'firebase/auth'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { auth } from '../firebase'
import UserAvatar from '../components/UserAvatar'
import { Sizes } from 'rn-avatar'
import Setting from './Setting';
import SignUp from './SignUp';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import PlayGround from './PlayGround';

const HomeScreen = () => {
    const navigation = useNavigation();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => navigation.replace('Login'))
            .catch(error => alert(error.message))
    }

    return (
        <View style={styles.container}>
            <UserAvatar size={Sizes.LARGE} title={auth.currentUser?.email} />
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

const Tab = createMaterialBottomTabNavigator();
function Home() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#212529"
            inactiveColor="black"
            barStyle={{ backgroundColor: '#ffc404' }}
            shifting={true}
        >
            <Tab.Screen name="Homsse" component={HomeScreen}
                options={{
                    tabBarLabel: 'Homeeeee',
                    tabBarIcon: () => (
                        <AntDesign name="apple1" size={18} color="#212529" />
                    ),
                }} 
            />
            <Tab.Screen name="Settings" component={Setting} options={{
                    tabBarLabel: 'Homeeeee',
                    tabBarIcon: () => (
                        <AntDesign name="apple1" size={18} color="#212529" />
                    ),
                }} 
            />
            <Tab.Screen name="Home" component={PlayGround} options={{
                    tabBarIcon: () => (
                        <FontAwesome name="bitcoin" size={24} color="#212529" />
                    ),
                }} 
            />
            <Tab.Screen name="SignUp" component={SignUp} options={{
                    tabBarLabel: 'Homeeeee',
                    tabBarIcon: () => (
                        <AntDesign name="apple1" size={18} color="#212529" />
                    ),
                }} />
            <Tab.Screen name="SignUssp" component={SignUp}  options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: () => (
                        <FontAwesome name="user" size={18} color="#212529" />
                    ),
                }} />
        </Tab.Navigator>
    );
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
