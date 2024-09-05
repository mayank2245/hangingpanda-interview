import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Home() {
    const [answer, setAnswer] = useState("")
    console.log(answer)
    const handlesubmit = () => {
        console.log(answer)
    }
    return (
        <View style={styles.safearea}>
            <KeyboardAvoidingView style={styles.keybordcss}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={0}>

                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                />
                <Text style={styles.quescss}>Q 1. What is a lambda function in Python?</Text>
                <TextInput multiline style={styles.anscss} value={answer} onChange={(text: string) => setAnswer(text)} placeholder="Please Enter your answer..." placeholderTextColor="#a8acb2" />
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.touchable}
                    onPress={handlesubmit}
                >
                    <Text style={styles.submit}> Submit</Text>
                </TouchableOpacity>


            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        backgroundColor: 'black',
        height: '100%',
        width: '100%'
    },
    quescss: {
        fontFamily: 'Montserrat',
        color: '#FFFFFF',
        width: 366,
        height: 22,
        top: 45,
        left: 23,
        fontSize: 17,
        lineHeight: 22,
        textAlign: 'center'
    },
    anscss: {
        textAlignVertical: 'top',
        paddingTop: 18,
        paddingLeft: 9,
        paddingRight: 12,
        fontSize: 18,
        color: '#FFFFFF',
        width: 384,
        height: 691,
        top: 80,
        left: 18,
        borderRadius: 15,
        borderWidth: 4,
        borderColor: "#FF3856"
    },
    keybordcss: {
        flex: 1,
    },
    touchable: {
        backgroundColor: "#FF3856",
        width: 394,
        height: 56,
        top: 99,
        left: 8,
        borderRadius: 10,
        borderWidth: 4,
    },
    submit: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 17,
        lineHeight: 22,
        width: 64,
        height: 22,
        left: 153,
        top: 12,
    }
})