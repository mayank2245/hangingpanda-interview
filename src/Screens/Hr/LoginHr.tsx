import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { rf, rh, rw } from "../../helpers/Responsivedimention";
import { Arrow, Logo } from "../../assests/svg";
import { BackgroundImage } from "../../assests/images";
import { Color } from "../../constant/Color";


export default function LoginUserPage() {
    const [userId, setUserId] = useState("")
    const [name, setName] = useState("")

    const navigation = useNavigation();

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
                            <Text style={[styles.textShowCss, { color: Color.logintextWhite }]}>At</Text>
                            <Text style={[styles.textShowCss, { color: Color.red }]}>HangingPanda !</Text>
                            <Text style={[styles.textShowCss, { color: Color.logintextWhite }]}>we truly value your exceptional work,</Text>
                            <Text style={[styles.textShowCss, { color: Color.logintextWhite }]}>HR.</Text>
                        </View>
                        <Text style={[styles.discriptionText, { color: Color.white }]}>Pls Enter your Details here to enter in your interview process</Text>
                        <View style={styles.viewTextInp}>
                            <TextInput keyboardType="numeric" onChangeText={setUserId} value={userId} style={styles.textQues} placeholder="Hr Id" placeholderTextColor={Color.red} cursorColor={Color.red} />
                            <TextInput onChangeText={setName} value={name} style={styles.textQues} placeholder="Email Id" placeholderTextColor={Color.red} cursorColor={Color.red} />
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={
                                    () => { navigation.navigate('UserHome') }
                                }>
                                <Arrow style={styles.arrowCss} />
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
        backgroundColor: 'black',
        opacity: 0.85,
    },
    textQues: {
        fontFamily: 'Montserrat-Bold',
        color: Color.white,
        borderWidth: 3,
        borderColor: Color.red,
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
        fontSize: rf(2),
        paddingHorizontal: rw(8.6),
        marginTop: rh(6),
        marginBottom: rh(3)
    },

})

