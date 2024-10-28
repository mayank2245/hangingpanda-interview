import {
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View,
    StatusBar,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { color } from "../../constant/color";
import { BackgroundImage } from "../../assests/images";
import { Logo } from "../../assests/svg";
import { rf, rh, rw } from "../../helpers/responsivedimention";
import { LandingPageData } from "../../constant/staticData";
import RNText from "../../components/RNText";

export default function LandingPage() {
    const navigation = useNavigation();
    const [screen, setScreen] = useState<string>()

    const handleScreen = (ei: string) => {
    }

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
                            <RNText style={styles.textShowCss} type="heading" font='MontserratBold' colortype="logintextWhite">Welcome at</RNText>
                            <RNText style={styles.textShowCss} type="heading" font='MontserratBold' colortype="red">HangingPanda !</RNText>
                            <RNText style={styles.textShowCss} type="heading" font='MontserratBold' colortype="logintextWhite">We believe in your talent.</RNText>
                        </View>
                        <RNText style={styles.discriptionText} font='MontserratBold' colortype="white">Pls Enter your Details here to enter in your interview process</RNText>
                        {
                            LandingPageData.map((ei, i) => {
                                return <TouchableOpacity key={i} onPress={() => navigation.navigate(`${ei.screen}`)}>
                                    <RNText style={styles.textQues} type="subHeading" font='MontserratBold' colortype="white">{ei.title}</RNText>
                                </TouchableOpacity>
                            })
                        }
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
        borderWidth: 3,
        borderColor: color.primaryRed,
        width: '80%',
        margin: 'auto',
        height: rh(7),
        marginTop: rh(2.4),
        borderRadius: 15,
        paddingTop: rh(1.8),
        paddingBottom: rh(2.6),
        textAlign: 'center'
    },
    logoCss: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: rh(10.8),
    },
    textShowCss5: {
        color: color.logintextWhite,
        paddingLeft: rw(4),
        paddingTop: rh(1.7),
    },
    textShowCss: {
        paddingLeft: rw(4),
        paddingTop: rh(1.7),
    },
    arrowCss: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: rh(4),
        marginLeft: rh(17.5),
    },
    discriptionText: {
        paddingHorizontal: rw(8.6),
        marginTop: rh(4),
        marginBottom: rh(3),
    },
    switchScreen: {
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(1.2),
        borderWidth: rw(0.2),
        borderRadius: 17,
        borderColor: color.primaryRed,
        color: color.primaryRed,
        paddingHorizontal: rh(1),
        paddingVertical: rw(0.4),
        marginHorizontal: rw(2),
    },
    viewscreen: {
        flexDirection: 'row',
        marginTop: rh(2),
        marginLeft: rw(24)
    }

})

