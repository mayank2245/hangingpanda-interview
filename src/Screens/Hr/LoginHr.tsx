import { useState } from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { color } from "../../constant/color";
import { Arrow, Ellipse, Loginellips, Logo } from "../../assests/svg";
import { BackgroundImage } from "../../assests/images";
import { rf, rh, rw } from "../../helpers/responsivedimention";
import { ApiService } from "../../api/apiCalls/ApiCalls";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ShowToast } from "../../helpers/toast";
import { Loader } from "../../components/Loader";

export default function LoginUserPage() {
    const [userId, setUserId] = useState("")
    const [email, setEmail] = useState("")
    const [callApi, setCallApi] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation();

    const loginhandle = async () => {
        const payload = {
            email: email,
            hrID: userId
        }
        const res = await ApiService.login(payload)
        return res
    }
    const mutation = useMutation({
        mutationKey: ["passingKeyLoginhr"],
        mutationFn: loginhandle,
        onSuccess: async data => {
            if (data?.data.token) {
                await AsyncStorage.setItem('HrLogintoken', data.data.token);
            }
            setIsLoading(false)

            navigation.navigate('HrHome')
            setUserId("")
            setEmail("")
        },
        onError: () => { setIsLoading(false); ShowToast("error", "Please Check your id and email") }
    })

    const handlepress = () => {
        if (userId === "") {
            const type = "error";
            const text1 = "Please fill the Admin Id";
            ShowToast(type, text1);
        }
        else if (email === "") {
            const type = "error";
            const text1 = "Please fill the Email Id";
            ShowToast(type, text1);
        }
        else if (callApi === false) {
            const type = "error";
            const text1 = "Please enter correct Email Id";
            ShowToast(type, text1);
        }
        else {
            setIsLoading(true)
            setCallApi(false)
            mutation.mutate()
        }
    }

    const handleValidEmail = (text: any) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setCallApi(false)
            return false;
        } else {
            setCallApi(true)
        }
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
                            <Text style={[styles.textShowCss, { color: color.logintextWhite }]}>At</Text>
                            <Text style={[styles.textShowCss, { color: color.primaryRed }]}>HangingPanda !</Text>
                            <Text style={[styles.textShowCss, { color: color.logintextWhite }]}>we truly value your exceptional work,</Text>
                            <Text style={[styles.textShowCss, { color: color.logintextWhite }]}>HR.</Text>
                        </View>
                        <Text style={[styles.discriptionText, { color: color.white }]}>Pls Enter your Details here to enter in your interview process</Text>
                        <View style={styles.viewTextInp}>
                            <TextInput keyboardType="numeric" onChangeText={setUserId} value={userId} style={styles.textQues} placeholder="Hr Id" placeholderTextColor={color.primaryRed} cursorColor={color.primaryRed} />
                            <TextInput
                                style={styles.textQues}
                                placeholder="Email Id"
                                placeholderTextColor={color.primaryRed}
                                cursorColor={color.primaryRed}
                                value={email}
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={value => {
                                    setEmail(value.trim());
                                    handleValidEmail(value);
                                }}
                            />
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={handlepress}
                                style={styles.ellipetouchable}>
                                {!isLoading && <Loginellips style={styles.ellipseCss} />}
                            </TouchableOpacity>
                            {isLoading && <><Ellipse style={styles.ellipsisloading} />
                                <View style={styles.loaderstyle}>
                                    <Loader isLoading={isLoading} />
                                </View>
                            </>}

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
        fontSize: rf(2),
        paddingHorizontal: rw(8.6),
        marginTop: rh(6),
        marginBottom: rh(3)
    },
    ellipseCss: {
        borderWidth: 2,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: rh(3),
    },
    ellipsisloading: {
        marginLeft: rw(38.2),
        borderWidth: 2,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: rh(3),
    },
    ellipetouchable: {
        alignSelf: 'center'
    },
    loaderstyle: {
        position: 'absolute',
        top: rh(25),
        left: rw(45)
    },
})

