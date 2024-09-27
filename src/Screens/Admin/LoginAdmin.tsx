import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { rf, rh, rw } from "../../helpers/Responsivedimention";
import { useMutation } from "@tanstack/react-query";
import { ApiService } from '../../api/apicalls/ApiCalls'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loader } from "../../components/Loader";
import Toast from "react-native-toast-message";
import { Arrow, Logo } from "../../assests/svg";
import { BackgroundImage } from "../../assests/images";
import { Color } from "../../constant/Color";

export default function LoginUserPage() {
    const [userId, setUserId] = useState("")
    const [email, setEmail] = useState("")

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
            navigation.navigate('AdminHome')
        },
        onError: (error) => console.error("Failed to update data:", error),
        onSettled: () => { console.log("seltesle") }
    })

    const handlepress = () => {
        if (userId === "") {
            Toast.show({
                type: 'error',
                text1: 'Please fill the User Id',
            });
        }
        else if (email === "") {
            Toast.show({
                type: 'error',

                text1: 'Please fill the Email Id',
            });
        }
        else {
            mutation.mutate()
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
                            <Text style={[styles.textShowCss, { color: '#D9D9D980' }]}>At</Text>
                            <Text style={[styles.textShowCss, { color: '#FF3856' }]}>HangingPanda !</Text>
                            <Text style={[styles.textShowCss, { color: '#D9D9D980' }]}>we truly value your exceptional work,</Text>
                            <Text style={[styles.textShowCss, { color: '#D9D9D980' }]}>Admin.</Text>
                        </View>
                        <Text style={[styles.discriptionText, { color: Color.white }]}>Pls Enter your Details here to enter in your interview process</Text>
                        <View style={styles.viewTextInp}>
                            <TextInput keyboardType="numeric" onChangeText={setUserId} value={userId} style={styles.textQues} placeholder="Admin Id" placeholderTextColor="#FF3856" cursorColor={"#FF3856"} />
                            <TextInput onChangeText={setEmail} value={email} style={styles.textQues} placeholder="Email Id" placeholderTextColor="#FF3856" cursorColor={"#FF3856"} />

                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={handlepress}>
                                <Arrow style={styles.arrowCss} />
                            </TouchableOpacity>
                            <Loader isLoading={false} />
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
        marginTop: rh(3),
        marginLeft: rh(17.5),
    },
    discriptionText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(2),
        paddingHorizontal: rw(8.6),
        marginTop: rh(4),
        marginBottom: rh(3)
    },

})

