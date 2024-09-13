import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { rf, rh, rw } from "../../Helpers/Responsivedimention";
import { useNavigation } from "@react-navigation/native";


export default function Home({ route }: any) {
    const { itemes } = route.params;
    const [data, setdata] = useState(itemes)
    console.log(data, "DATAAS")
    const [answer, setAnswer] = useState("")
    const [focusText, setFocusText] = useState(false)
    const [timebar, setTimebar] = useState(true)
    const navigation = useNavigation();
    const handletimebar = () => {
        setTimebar(!timebar)
    }

    const handlesubmit = (data: any) => {
        data.type === "Text" && (data.answer = answer),

            navigation.navigate("QuestionList", { item: data })
        setAnswer("")
    }

    const handlepressOption = (item: any, selectedOption: number) => {
        const correctOption = item?.correctOption
        const updatedData = { ...item, correctOption: selectedOption }
        setdata(updatedData)
    };

    return (
        <View style={styles.safearea}>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
            />
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handletimebar}
                style={styles.touchableCss}>
                {
                    timebar ? <View style={styles.timebar}></View> :
                        <View style={{ marginTop: rh(0.2) }}>
                            <Text style={{ color: 'white', textAlign: 'center', marginBottom: rh(0.6) }}>Total Time : 30 mins</Text>
                            <View style={styles.timebar2}>
                                <Text style={styles.timebar2Text}>Remaining time : 25 mins</Text>
                            </View>
                        </View>
                }
            </TouchableOpacity>
            <Text style={styles.quescss}>Q "{data.sn}. {data.ques}"</Text>
            <KeyboardAwareScrollView style={{ paddingBottom: 120 }}>
                {data.type === "Text" && <TextInput onFocus={() => setFocusText(true)} multiline style={focusText ? styles.anscss2 : styles.anscss} defaultValue={data.answer} onChangeText={setAnswer} onBlur={() => setFocusText(false)} placeholder="Please Enter your answer..." placeholderTextColor="#a8acb2" />}
                {data.type === "MCQ" && <View>
                    <TouchableOpacity onPress={() => handlepressOption(data, 1)}>
                        <Text style={[styles.textoption, data.correctOption === 1 ? { color: '#06D001' } : { color: '#ffffff' }]}>
                            A. {data.Option1}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlepressOption(data, 2)}>
                        <Text style={[styles.textoption, data.correctOption === 2 ? { color: '#06D001' } : { color: '#ffffff' }]}>
                            B. {data.Option2}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlepressOption(data, 3)}>
                        <Text style={[styles.textoption, data.correctOption === 3 ? { color: '#06D001' } : { color: '#ffffff' }]}>
                            C. {data.Option3}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlepressOption(data, 4)}>
                        <Text style={[styles.textoption, data.correctOption === 4 ? { color: '#06D001' } : { color: '#ffffff' }]}>
                            D. {data.Option4}
                        </Text>
                    </TouchableOpacity>
                </View>}
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.touchable}
                    onPress={() => handlesubmit(data)}
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
        height: rh(65),
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
        height: rh(32),
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
    },
    touchableCss: {
        marginVertical: rh(3)
    },
    timebar: {
        marginBottom: rh(1.7),
        marginTop: rh(4),
        marginHorizontal: rh(3),
        borderRadius: 10,
        backgroundColor: '#06D001',
        height: rh(1.2)
    },
    timebar2: {
        marginHorizontal: rh(2.5),
        borderRadius: 100,
        backgroundColor: '#06D001',
        height: rh(4),
        justifyContent: 'center'
    },
    timebar2Text: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(1.6),
        textAlign: 'center',
    },

    textoption: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#ffffff',
        fontSize: rf(1.9),
        marginLeft: rw(6),
        marginTop: rh(1)
    }
})