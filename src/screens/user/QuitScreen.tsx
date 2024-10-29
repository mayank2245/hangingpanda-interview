import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { BackgroundImage } from '../../assests/images'
import { color } from '../../constant/color'
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { Alert } from '../../assests/lottie';
import { rf, rh, rw } from '../../helpers/responsivedimention';
import { ShowToast } from '../../helpers/toast';
import RNText from '../../components/RNText';

export default function QuitScreen() {
    const navigation = useNavigation();
    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
        });
        return unsubscribe;
    }, [navigation]);
    return (
        <View>
            <StatusBar backgroundColor={'transparent'} translucent={true} />
            <View style={styles.overlay}>
                {ShowToast("success", "Paper Submitted")}
                <LottieView
                    source={Alert}
                    style={styles.lottieview}
                    autoPlay
                />
                <RNText style={styles.modalText} type="subHeading" font='MontserratSemiBold' colortype="red">You exit the screen {"\n"}Your paper is submited</RNText>
                <TouchableOpacity style={styles.modalbox} onPress={() => navigation.push("LoginUserPage")}>
                    <RNText style={styles.modalText2} type="subHeading" font='MontserratSemiBold' colortype="white">Go to Login</RNText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        height: '100%',
        width: '100%',
        backgroundColor: color.black,
        opacity: 0.8,
    },
    lottieview: {
        marginTop: rh(24),
        width: "100%",
        height: "32%",
    },
    modalText: {
        textAlign: 'center',
        paddingHorizontal: rw(4),
        lineHeight: rh(3)
    },
    modalText2: {
        textAlign: 'center',
    },
    modalbox: {
        marginHorizontal: rw(28),
        justifyContent: 'center',
        backgroundColor: color.primaryRed,
        borderRadius: 10,
        marginTop: rh(1.6),
        width: rw(40),
        height: rh(5),
    },
})