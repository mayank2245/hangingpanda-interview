import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons';
import { color } from '../constant/color';
import { rh, rw } from '../helpers/responsivedimention';

export default function BackArrow() {
    const navigation = useNavigation()
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.Iconstyle}><Icon name="chevron-back" size={28} color={color.white} /></Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Iconstyle: {
        marginTop: rh(4),
        marginLeft: rw(4)
    }
})