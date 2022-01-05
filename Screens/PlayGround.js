import { TouchableOpacity, StyleSheet, Text, View, Dimensions } from 'react-native';
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

export default function PlayGround() {
    const windowWidth = Dimensions.get('screen').width;
    const [points, setPoints] = useState(0);
    return (
        <View style={{flex:1}}>
            <FontAwesome5 name="coins" size={35} color="black" style={{zIndex:1,position:'absolute',top:5,left:0}}/>
            <Text style={{fontSize:25,top:40,zIndex:1}}>{points}</Text>
            <View style={[styles.container]}>

                <TouchableOpacity
                    onPress={() => setPoints(points + 1)}
                    style={[styles.round]}
                >
                    <Text>Press Here</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
    },

    round: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
        backgroundColor: 'yellow',
        borderRadius: 150
    }
});
