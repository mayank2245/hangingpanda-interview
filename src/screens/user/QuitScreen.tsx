import { ImageBackground, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { BackgroundImage } from '../../assests/images'
import { color } from '../../constant/color'
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { Alert } from '../../assests/lottie';
import { rf, rh, rw } from '../../helpers/responsivedimention';
import { ShowToast } from '../../helpers/toast';

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
                <Text style={styles.modalText}>
                    You exit the screen {"\n"}Your paper is submited
                </Text>
                <TouchableOpacity style={styles.modalbox} onPress={() => navigation.push("LoginUserPage")}>
                    <Text style={styles.modalText2}>Go to Login</Text>
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
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        fontSize: rf(2.4),
        paddingHorizontal: rw(4),
        color: color.primaryRed,
        lineHeight: rh(3)
    },
    modalText2: {
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        fontSize: rf(2.2),
        color: color.white,
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