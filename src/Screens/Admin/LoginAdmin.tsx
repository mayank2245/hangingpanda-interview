import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from '../../Assests/svgs/logo'
import { useEffect, useState } from "react";
import Arrow from '../../Assests/svgs/arrow';
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { rf, rh, rw } from "../../Helpers/Responsivedimention";
import { useQuery } from "@tanstack/react-query";
const bgImage = require('../../Assests/HeaderImage.png')

import { ApiService } from '../../API/apiCalls/apiCalls'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loader } from "../../Components/loader";
import Toast from "react-native-toast-message";

export default function LoginUserPage() {
    const [UserId, setUserId] = useState("")
    const [email, setEmail] = useState("")
    const navigation = useNavigation();
    const loginhandle = async () => {
        const payload = {
            email: email, // hr email 
            hrID: UserId
        }
        const res = await ApiService.login(payload)
        return res
    }
    const { data, isLoading, isSuccess, error, refetch } = useQuery({
        queryKey: ['querrykey'],
        queryFn: loginhandle,
        enabled: false
    })
    if (error) {
        console.log("first")
        Toast.show({
            type: 'success',
            text1: 'Hello',
            text2: 'This is some something 👋'
        });
    }

    if (isSuccess) {
        AsyncStorage.setItem('MYtoken', data?.data.token);
        navigation.navigate('AdminHome')
    }

    const handlepress = () => {
        if (UserId === "") {
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
            refetch()
        }

    }

    return (
        <View>
            <StatusBar backgroundColor={'transparent'} translucent={true} />
            <ImageBackground
                style={styles.backgroundImage}
                source={bgImage}
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
                        <Text style={[styles.discriptionText, { color: '#FFFFFF' }]}>Pls Enter your Details here to enter in your interview process</Text>
                        <View style={styles.viewTextInp}>
                            <TextInput keyboardType="numeric" onChangeText={setUserId} value={UserId} style={styles.textQues} placeholder="Admin Id" placeholderTextColor="#FF3856" cursorColor={"#FF3856"} />
                            <TextInput onChangeText={setEmail} value={email} style={styles.textQues} placeholder="Email Id" placeholderTextColor="#FF3856" cursorColor={"#FF3856"} />
                            {
                                !isLoading ? <TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={handlepress}>
                                    <Arrow style={styles.arrowCss} />
                                </TouchableOpacity>
                                    :

                                    <Loader isLoading={isLoading} />
                            }


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
        color: '#FFFFFF',
        borderWidth: 3,
        borderColor: '#FF3856',
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

