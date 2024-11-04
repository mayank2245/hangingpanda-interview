import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import RNText from './RNText'
import { color } from '../constant/color'
import { rh, rw } from '../helpers/responsivedimention'

export default function CustomSwitch({ isEnable }: { isEnable: (value: boolean) => void }) {
    const [isGiven, setIsGiven] = useState<"isGiven" | "notGiven">("notGiven")
    return (
        <View style={styles.borderFilter}>
            <TouchableOpacity onPress={() => { setIsGiven("notGiven"), isEnable(false) }} style={isGiven === "notGiven" && { backgroundColor: color.white, borderRadius: 16, }}>
                <RNText style={[styles.switchOn, isGiven === "notGiven" && { color: 'black' }]} font='MontserratSemiBold' colortype="white">Not Given</RNText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setIsGiven("isGiven"), isEnable(true) }} style={isGiven === "isGiven" && { backgroundColor: color.white, borderRadius: 16, }}>
                <RNText style={[styles.switchOff, isGiven === "isGiven" && { color: 'black' }]} font='MontserratSemiBold' colortype="white">Is Given</RNText>
            </TouchableOpacity >

        </View>
    )
}

const styles = StyleSheet.create({
    borderFilter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1.8,
        alignItems: 'center',
        borderColor: color.white,
        marginTop: rh(0.6),
        borderRadius: 18,
        height: rh(3),
        padding: rw(0.4),
        overflow: "hidden",

    },
    switchOn: {
        color: 'white',
        marginHorizontal: rw(12),
    },
    switchOff: {
        color: 'white',
        marginHorizontal: rw(11),
    }
})