import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { color } from "../../constant/color";
import { Arrow, Loginellips, Logo } from "../../assests/svg";
import { BackgroundImage } from "../../assests/images";
import { rf, rh, rw } from "../../helpers/responsivedimention";


export default function LoginUserPage() {

    const navigation = useNavigation();
    const [userId, setUserId] = useState("")
    const [name, setName] = useState("")

    return (
        <View>
            <StatusBar backgroundColor={'transparent'} translucent={true} />
            <ImageBackground
                style={styles.backgroundImage}
                source={BackgroundImage}
                resizeMode="cover">
                <View style={styles.container}>
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        extraScrollHeight={169}
                    >
                        <View style={styles.logoCss}>
                            <Logo />
                        </View>
                        <View style={styles.textShowCss}>
                            <Text style={[styles.textShowCss, { color: color.logintextWhite }]}>Welcome at</Text>
                            <Text style={[styles.textShowCss, { color: color.primaryRed }]}>HangingPanda !</Text>
                            <Text style={[styles.textShowCss, { color: color.logintextWhite }]}>We believe in your
                                talent.</Text>
                        </View>
                        <Text style={[styles.discriptionText, { color: color.white }]}>Pls Enter your Details here to enter in your interview process</Text>
                        <View style={styles.viewTextInp}>
                            <TextInput keyboardType="numeric" onChangeText={setUserId} value={userId} style={styles.textQues} placeholder="Interview Id" placeholderTextColor={color.primaryRed} cursorColor={color.primaryRed} />
                            <TextInput onChangeText={setName} value={name} style={styles.textQues} placeholder="Email Id" placeholderTextColor={color.primaryRed} cursorColor={color.primaryRed} />
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={
                                    () => { navigation.navigate('Instruction') }
                                }>
                                <Loginellips style={styles.arrowCss} />
                            </TouchableOpacity>
                        </View>

                    </KeyboardAwareScrollView>
                </View>
            </ImageBackground >
        </View >
    )
}
const styles = StyleSheet.create({
    backgroundImage: {
        height: "100%"
    },
    container: {
        flex: 1,
        backgroundColor: color.black,
        opacity: 0.85,
    },
    textQues: {
        fontFamily: 'Montserrat-Bold',
        color: color.white,
        borderWidth: 3,
        borderColor: color.primaryRed,
        width: '80%',
        margin: 'auto',
        height: rh(7),
        marginTop: rh(2.4),
        borderRadius: 15,
        fontSize: rf(2.2),
        paddingTop: rh(1.8),
        paddingBottom: rh(2.6),
        textAlign: 'center'
    },
    logoCss: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: rh(10.8),
    },
    textShowCss: {
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(3.5),
        paddingLeft: rw(4),
        paddingTop: rh(1.7),
        lineHeight: rh(3.4)
    },
    viewTextInp: {

    },
    arrowCss: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: rh(4),
        marginLeft: rh(17.5),
    },
    discriptionText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(1.8),
        paddingHorizontal: rw(8.6),
        marginTop: rh(6),
        marginBottom: rh(3)
    },

})

