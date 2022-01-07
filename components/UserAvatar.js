import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Avatar, { IconTypes } from 'rn-avatar';
import { auth } from '../firebase';

const UserAvatar = (pros) => {
    return (
        <Avatar
            rounded
            showEditButton
            size={pros.size}
            source={ auth.currentUser?.photoURL === null ? require('../assets/icon.png') : { uri: auth.currentUser?.photoURL}}
            title={pros.title}
            containerStyle={{ margin: 10 }}
            onEditPress={() => console.log('edit button pressed')}
            onLongPress={() => console.log('component long pressed')}
            onPress={() => console.log('component pressed')}
            editButton={{
                name: 'edit', type: IconTypes.Entypo
            }}
        />
    )
}

export default UserAvatar

const styles = StyleSheet.create({})
