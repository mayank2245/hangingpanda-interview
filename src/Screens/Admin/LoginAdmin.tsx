import {
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StatusBar
} from "react-native";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { color } from "../../constant/color";
import { ShowToast } from "../../helpers/toast";
import { Loader } from "../../components/Loader";
import { BackgroundImage } from "../../assests/images";
import { ApiService } from '../../api/apicalls/ApiCalls'
import { Arrow, Ellipse, Logo } from "../../assests/svg";
import { rf, rh, rw } from "../../helpers/responsivedimention";

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
        mutationKey: ["passingKey123"],
        mutationFn: loginhandle,
        onSuccess: async data => {
            if (data?.data.token) {
                await AsyncStorage.setItem('MYtoken', data.data.token);
            }
            setIsLoading(false)
            navigation.navigate('AdminHome')
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
                            <Text style={styles.textShowCss}>At</Text>
                            <Text style={styles.textShowCss2}>HangingPanda !</Text>
                            <Text style={styles.textShowCss}>we truly value your exceptional work,</Text>
                            <Text style={styles.textShowCss}>Admin.</Text>
                        </View>
                        <Text style={styles.discriptionText}>Pls Enter your Details here to enter in your interview process</Text>
                        <TextInput keyboardType="numeric" onChangeText={setUserId} value={userId} style={styles.textQues} placeholder="Admin Id" placeholderTextColor={color.primaryRed} cursorColor={color.primaryRed} />
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
                            onPress={handlepress}>
                            <Ellipse style={styles.ellipseCss} />
                            {!isLoading && <Arrow style={styles.arrowCss} />}
                        </TouchableOpacity>
                        <View style={styles.loaderstyle}>
                            <Loader isLoading={isLoading} />
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
        borderWidth: rw(0.6),
        borderColor: color.primaryRed,
        width: '80%',
        margin: 'auto',
        height: rh(7),
        marginTop: rh(2.4),
        borderRadius: 15,
        fontSize: rf(2.2),
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
    ellipseCss: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: rh(3),
        marginLeft: rh(17.5),
    },
    arrowCss: {
        position: 'absolute',
        marginTop: rh(6),
        marginLeft: rw(47.5),
    },
    loaderstyle: {
        position: 'absolute',
        top: rh(86.5),
        left: rw(44.5)
    },
    discriptionText: {
        fontFamily: 'Montserrat-Bold',
        color: color.white,
        fontSize: rf(2),
        paddingHorizontal: rw(8.6),
        marginTop: rh(4),
        marginBottom: rh(3)
    },

})

