import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from '../constant/color'
import { rf } from '../helpers/responsivedimention'

const RNText = ({ type, bold, semibold, Montserrat, NunitoSans, redcolor, style, ...props }: any) => {
    return (
        <Text style={StyleSheet.flatten([getTextStyle(type, bold, semibold, Montserrat, NunitoSans, redcolor), style])} {...props} />
    )
}

export default RNText;

const getTextStyle = (type: string, bold: string, semibold: string, Montserrat: string, NunitoSans: string, redcolor: string) => {
    let style;
    switch (type) {
        case 'heading':
            style = styles.textBold;
            break;
        case 'sub_heading':
            style = styles.SemiBold;
            break;
        default:
            style = styles.textregular;
    }
    if (bold) {
        style = { ...style, fontWeight: "bold" }
    }
    if (semibold) {
        style = { ...style, fontWeight: "semibold" };
    }
    if (Montserrat) {
        style = { ...style, fontFamily: 'Montserrat-Regular' };
    }
    if (NunitoSans) {
        style = { ...style, fontFamily: 'NunitoSans_7pt-Regular' };
    }
    if (redcolor) {
        style = { ...style, color: color.primaryRed };
    }
    return style;
};

const styles = StyleSheet.create({
    textBold: {
        fontSize: rf(3.5),
        color: color.white,
    },
    SemiBold: {
        fontSize: rf(2.2),
        color: color.white
    },
    textregular: {
        fontSize: rf(1),
        color: color.white
    }
});