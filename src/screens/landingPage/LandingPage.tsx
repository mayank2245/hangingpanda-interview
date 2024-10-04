import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    StatusBar,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { color } from "../../constant/color";
import { BackgroundImage } from "../../assests/images";
import { Loginellips, Logo } from "../../assests/svg";
import { rf, rh, rw } from "../../helpers/responsivedimention";
import { LandingPageData } from "../../constant/staticData";

export default function LandingPage() {
    const navigation = useNavigation();
    const [screen, setScreen] = useState<string>()

    const handleScreen = (ei: string) => {
        set
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
                            <Text style={styles.textShowCss}>Welcome at</Text>
                            <Text style={styles.textShowCss2}>HangingPanda !</Text>
                            <Text style={styles.textShowCss}>We believe in your
                                talent.</Text>
                        </View>
                        <Text style={styles.discriptionText}>Pls Enter your Details here to enter in your interview process</Text>
                        {
                            LandingPageData.map((ei, i) => {
                                return <TouchableOpacity key={i} onPress={() => navigation.navigate(`${ei.screen}`)}><Text style={styles.textQues}>{ei.title}</Text></TouchableOpacity>
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
        color: color.logintextWhite,
        fontSize: rf(3.5),
        paddingLeft: rw(4),
        paddingTop: rh(1.7),
        lineHeight: rh(3.4)
    },
    textShowCss2: {
        fontFamily: 'Montserrat-Bold',
        color: color.primaryRed,
        fontSize: rf(3.5),
        paddingLeft: rw(4),
        paddingTop: rh(1.7),
        lineHeight: rh(3.4)
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
        marginTop: rh(4),
        marginBottom: rh(3),
        color: color.white
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

