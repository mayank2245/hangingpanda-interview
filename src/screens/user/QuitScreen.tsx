import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { color } from '../../constant/color';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { Alert } from '../../assests/lottie';
import { rf, rh, rw } from '../../helpers/responsivedimention';
import RNText from '../../components/RNText';
import { useToast } from 'react-native-toast-notifications';

export default function QuitScreen() {
    const navigation = useNavigation();
    const toast = useToast();

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
        });
        return unsubscribe;
    }, [navigation, toast]);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <View style={styles.overlay}>
                <LottieView
                    source={Alert}
                    style={styles.lottieview}
                    autoPlay
                    loop
                />
                <RNText
                    style={styles.modalText}
                    type="subHeading"
                    font="MontserratSemiBold"
                    colortype="white"
                >
                    You exit the screen{"\n"}Your paper is submitted
                </RNText>

                <TouchableOpacity
                    style={styles.modalbox}
                    onPress={() => navigation.push("LoginUserPage")}
                >
                    <RNText style={styles.modalText2} type="subHeading" font="MontserratSemiBold" colortype="white">
                        Go to Login
                    </RNText>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.black,
        opacity: 0.8,
    },
    lottieview: {
        width: '100%',
        height: '32%',
    },
    modalText: {
        textAlign: 'center',
        color: 'white',
    },
    modalText2: {
        textAlign: 'center',
        color: 'white',
    },
    modalbox: {
        marginHorizontal: rw(28),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.primaryRed,
        borderRadius: 10,
        marginTop: rh(2),
        width: rw(40),
        height: rh(5),
    },
});
