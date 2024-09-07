import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function Home() {
    const [answer, setAnswer] = useState("")
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
                <TextInput multiline style={styles.anscss} value={answer} onChange={setAnswer} placeholder="Please Enter your answer..." placeholderTextColor="#a8acb2" />
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
        paddingBottom: 29,
    },
    quescss: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#FFFFFF',
        width: '90%',
        marginTop: 58,
        marginBottom: 20,
        fontSize: 17,
        marginLeft: 20,
        marginRight: 20,
    },
    anscss: {
        textAlignVertical: 'top',
        fontFamily: 'Montserrat-SemiBold',
        paddingTop: 18,
        paddingLeft: 9,
        paddingRight: 12,
        fontSize: 18,
        color: '#FFFFFF',
        width: '90%',
        height: 659,
        borderRadius: 15,
        borderWidth: 4,
        borderColor: "#FF3856",
        marginTop: 18,
        marginLeft: 19
    },
    keybordcss: {
        flex: 1,
    },
    touchable: {
        backgroundColor: "#FF3856",
        width: 374,
        height: 56,
        marginTop: 18,
        marginLeft: 19,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    submit: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 17,
    }
})