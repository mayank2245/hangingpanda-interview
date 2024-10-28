import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { rf } from '../helpers/responsivedimention'
import { color } from '../constant/color'

const RNText = ({ type, font, colortype, style, ...props }: any) => {
    return (
        <Text style={StyleSheet.flatten([getTextStyle(type, font, colortype), style])} {...props} />
    )
}

export default RNText;

const getTextStyle = (type: string, font: string, colortype: string) => {
    let style;
    switch (type) {
        case 'heading':
            style = styles.heading;
            break;
        case 'subHeading':
            style = styles.sub_heading;
            break;
        default:
            style = styles.textregular;
    }
    switch (font) {
        case 'MontserratBold':
            style = { ...style, fontFamily: 'Montserrat-Bold' };
            break;
        case 'MontserratSemiBold':
            style = { ...style, fontFamily: 'Montserrat-SemiBold' };
            break;
        case 'NunitoSans':
            style = { ...style, fontFamily: 'NunitoSans_7pt-Regular' };

        case 'NunitoSemiBold':
            style = { ...style, fontFamily: 'NunitoSans_7pt-SemiBold' };
        default:
            style = styles.textregular;
    }
    if (colortype === "red") {
        style = { ...style, color: color.primaryRed };
    }
    if (colortype === "logintextWhite") {
        style = { ...style, color: color.logintextWhite };
    }
    if (colortype === "white") {
        style = { ...style, color: color.white };
    }
    if (colortype === "lightRed") {
        style = { ...style, color: color.lightRed };
    }
    if (colortype === "lightBlue") {
        style = { ...style, color: color.lightBlue };
    }
    if (colortype === "lightWhite") {
        style = { ...style, color: color.lightWhite };
    }
    if (colortype === "green") {
        style = { ...style, color: color.green };
    }
    if (colortype === "black") {
        style = { ...style, color: color.black };
    }


    return style;
};

const styles = StyleSheet.create({
    heading: {
        fontSize: rf(3.5),
    },
    sub_heading: {
        fontSize: rf(2.2),
    },
    textregular: {
        fontSize: rf(1.8),
    },
});