import { TouchableOpacity, StyleSheet, Text, View, Dimensions } from 'react-native';
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

export default function PlayGround() {
    const windowWidth = Dimensions.get('screen').width;
    const [points, setPoints] = useState(0);
    return (
        <View style={styles.containerPage}>
            <FontAwesome5 name="coins" size={35} color="white" style={{ zIndex: 1, position: 'absolute', top: 80, left: 30 }} />
            <Text style={{ fontSize: 25, top: 120,left: 30, zIndex: 1, color: 'white' }}>{points}</Text>
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
    containerPage: {
        backgroundColor: '#212529',
        flex: 1,
        shadowColor: 'white',
        shadowOpacity :10,
        shadowRadius :10,
        shadowOffset :{width:100,height:30}
    },
    container: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#212529',
    },
    round: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
        backgroundColor: '#ffc404',
        borderRadius: 150
    }
});
