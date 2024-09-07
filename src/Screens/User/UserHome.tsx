import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { rf, rh, rw } from "../../Helpers/Responsivedimention";


export default function Home() {
    const [answer, setAnswer] = useState("")
    const [focusText, setFocusText] = useState(false)
    console.log(focusText)
    const handlesubmit = () => {
        console.log(answer)
    }
    return (
        <View style={styles.safearea}>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
            />
            <Text style={styles.quescss}>Q 1. What is a lambda function in Python?</Text>
            <KeyboardAwareScrollView style={{ paddingBottom: 120 }}>
                <TextInput onFocus={() => setFocusText(true)} multiline style={focusText ? styles.anscss2 : styles.anscss} value={answer} onChangeText={setAnswer} onBlur={() => setFocusText(false)} placeholder="Please Enter your answer..." placeholderTextColor="#a8acb2" />
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.touchable}
                    onPress={handlesubmit}
                >
                    <Text style={styles.submit}> Submit</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        backgroundColor: 'black',
        height: '100%',
        width: '100%',
        paddingBottom: rh(2),
    },
    quescss: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#FFFFFF',
        width: '90%',
        marginTop: rh(7),
        marginBottom: rh(1),
        fontSize: rf(2),
        marginHorizontal: rw(5)
    },
    anscss: {
        textAlignVertical: 'top',
        fontFamily: 'Montserrat-SemiBold',
        paddingTop: rh(2),
        paddingHorizontal: rw(3.6),
        fontSize: rf(2.2),
        color: '#FFFFFF',
        width: '90%',
        height: rh(74),
        borderRadius: 15,
        borderWidth: 4,
        borderColor: "#FF3856",
        marginTop: rh(2),
        marginHorizontal: rw(5)
    },
    anscss2: {
        textAlignVertical: 'top',
        fontFamily: 'Montserrat-SemiBold',
        paddingTop: rh(2),
        paddingHorizontal: rw(3.6),
        fontSize: rf(2.2),
        color: '#FFFFFF',
        width: '90%',
        height: rh(40),
        borderRadius: 15,
        borderWidth: 4,
        borderColor: "#FF3856",
        marginTop: rh(2),
        marginHorizontal: rw(5)
    },
    keybordcss: {
        flex: 1,
    },
    touchable: {
        backgroundColor: "#FF3856",
        width: "90%",
        height: rh(6),
        marginTop: rh(2),
        marginLeft: rh(2.2),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    submit: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(2.2),
    }
})