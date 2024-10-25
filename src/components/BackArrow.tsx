import { Button, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons';
import { color } from '../constant/color';
import { rh, rw } from '../helpers/responsivedimention';
import RNText from './RNText';

export default function BackArrow() {
    const navigation = useNavigation()
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <RNText style={styles.Iconstyle} type="subHeading" font='MontserratSemiBold' colortype="white"><Icon name="chevron-back" size={28} color={color.white} /></RNText>
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