import { ImageBackground, StyleSheet, Text, TextInput, View } from "react-native";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import bgImage from '../../Assests/HeaderImage.png'
import Logo from '../../Assests/svgs/logo'
import { useState } from "react";
import Arrow from '../../Assests/svgs/arrow'

export default function LoginUserPage() {
    const [UserId, setUserId] = useState("")
    const [name, setName] = useState("")
    return (
        <View>
            <StatusBar backgroundColor={'transparent'} translucent={true} />
            <ImageBackground
                style={styles.backgroundImage}
                source={bgImage}
                resizeMode="cover">
                <View style={styles.container}>
                    <View style={styles.logoCss}>
                        <Logo />
                    </View>

                    <View style={styles.textShowCss}>
                        <Text style={[styles.textShowCss, { color: '#D9D9D980' }]}>Welcome at</Text>
                        <Text style={[styles.textShowCss, { color: '#FF3856' }]}>HangingPanda !</Text>
                        <Text style={[styles.textShowCss, { color: '#D9D9D980' }]}>We believe in your
                            talent.</Text>
                    </View>
                    <Text style={[styles.discriptionText, { color: '#FFFFFF' }]}>Pls Enter your Details here to enter in your interview process</Text>
                    <View style={styles.viewTextInp}>
                        <TextInput onChangeText={setUserId} value={UserId} style={styles.textQues} placeholder="                 Interview Id" placeholderTextColor="#FF3856"></TextInput>
                        <TextInput onChangeText={setName} value={name} style={styles.textQues} placeholder="                 Your Name" placeholderTextColor="#FF3856"></TextInput>
                        <Arrow style={styles.arrowCss} />
                    </View>

                </View>
            </ImageBackground>
        </View>
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
        color: '#FFFFFF',
        borderWidth: 3,
        borderColor: '#FF3856',
        width: '80%',
        margin: 'auto',
        height: 67,
        marginTop: 30,
        borderRadius: 15,
        fontSize: 18,
        paddingTop: 20,
        paddingBottom: 20,
        paddingStart: 13,
    },
    logoCss: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 98,
    },
    textShowCss: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 32,
        paddingLeft: 18,
        lineHeight: 36,
        paddingTop: 20
    },
    viewTextInp: {

    },
    arrowCss: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 160,
    },
    discriptionText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 15,
        paddingLeft: 38,
        paddingRight: 39,
        lineHeight: 22,
        marginTop: 40,
        marginBottom: 20
    }

})

