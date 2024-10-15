import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { color } from "../../constant/color";
import BackArrow from "../../components/BackArrow";
import { rf, rh, rw } from "../../helpers/responsivedimention";
import TimeDuration from "../../components/TimeDuration";

export default function Home({ route }: any) {
    const { itemes } = route.params;
    const navigation = useNavigation();

    const [data, setData] = useState(itemes);
    const [answer, setAnswer] = useState("");
    const [focusText, setFocusText] = useState(false);

    useEffect(() => {
        if (data.type === "Input") {
            setAnswer(itemes?.answer)
        }
    }, [])


    const handlesubmit = (item: any) => {
        if (item.type === "Input") {
            item.answer = answer;
        }
        navigation.navigate("QuestionList", { item: data });
        setAnswer("");
    };

    const handlepressOption = (item: any, selectedOption: string) => {
        const updatedData = { ...item, correctOption: selectedOption };
        setData(updatedData);
    };

    return (
        <View style={styles.safearea}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <View style={styles.backarrow}>
                <BackArrow />
                <Text style={styles.quesnumber}>Question No. {data.sn}</Text>
            </View>
            <TimeDuration paperduration={60} animationStart={true} initalHeight={2} />
            <Text style={styles.quescss}>
                Q{data.sn}. {data.question}
            </Text>
            <KeyboardAwareScrollView style={styles.keybordScroller}>
                {data.type === "Input" && (
                    <TextInput
                        onFocus={() => setFocusText(true)}
                        multiline
                        style={focusText ? styles.anscss2 : styles.anscss}
                        value={answer}
                        onChangeText={setAnswer}
                        onBlur={() => setFocusText(false)}
                        placeholder="Please Enter your answer..."
                        placeholderTextColor={color.whitePlaceholder}
                    />
                )}
                {data.type === "MCQ" && (
                    <View style={styles.viewmcq}>
                        {Object.entries(data.options).map(([key, value]) => (
                            <TouchableOpacity
                                key={key}
                                onPress={() => handlepressOption(data, key)}
                            >
                                <Text
                                    style={[
                                        styles.textoption,
                                        data.correctOption === key
                                            ? { color: color.green }
                                            : { color: color.white },
                                    ]}
                                >
                                    {key}. {value}
                                </Text>
                            </TouchableOpacity>
                        )
                        )}
                    </View>
                )}
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.touchable}
                    onPress={() => handlesubmit(data)}
                >
                    <Text style={styles.submit}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        backgroundColor: 'black',
        height: '100%',
        width: '100%',
        paddingBottom: rh(2),
    },
    quesnumber: {
        fontFamily: 'Montserrat-SemiBold',
        color: color.primaryRed,
        width: '90%',
        marginBottom: rh(1),
        fontSize: rf(2.4),
        marginHorizontal: rw(5),
        marginTop: rh(3.8)
    },
    quescss: {
        fontFamily: 'Montserrat-SemiBold',
        color: color.white,
        width: '90%',
        marginBottom: rh(1),
        marginTop: rh(1.5),
        fontSize: rf(2.2),
        marginLeft: rw(6)
    },
    anscss: {
        textAlignVertical: 'top',
        fontFamily: 'Montserrat-SemiBold',
        paddingTop: rh(2),
        paddingHorizontal: rw(3.6),
        fontSize: rf(2.2),
        color: color.white,
        width: '90%',
        height: rh(65),
        borderRadius: 15,
        borderWidth: 4,
        borderColor: color.primaryRed,
        marginTop: rh(2),
        marginHorizontal: rw(5),
    },
    anscss2: {
        textAlignVertical: 'top',
        fontFamily: 'Montserrat-SemiBold',
        paddingTop: rh(2),
        paddingHorizontal: rw(3.6),
        fontSize: rf(2.2),
        color: color.white,
        width: '90%',
        height: rh(31),
        borderRadius: 15,
        borderWidth: 4,
        borderColor: color.primaryRed,
        marginTop: rh(2),
        marginHorizontal: rw(5),
    },
    touchable: {
        backgroundColor: color.primaryRed,
        width: "90%",
        height: rh(6),
        marginTop: rh(2),
        marginLeft: rh(2.2),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submit: {
        color: color.white,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(2.2),
    },
    touchableCss: {
        marginVertical: rh(0),
    },
    timebar: {
        overflow: 'hidden',
        marginTop: rh(3.3),
        marginLeft: rh(1.7),
        marginRight: rh(1.7),
        borderRadius: 100,
        backgroundColor: color.white,
        height: rh(2.5),
        justifyContent: 'center',
    },
    timeText: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        textAlign: 'center',
        marginBottom: rh(1),
    },
    timebar1: {
        overflow: 'hidden',
        marginLeft: rh(1.7),
        marginRight: rh(1.7),
        backgroundColor: color.white,
        justifyContent: 'center',
        borderRadius: 100,
    },
    timebar7: {
        overflow: 'hidden',
        marginLeft: rh(1.7),
        marginRight: rh(1.7),
        borderRadius: 100,
        height: rh(2),
        backgroundColor: color.white,
        justifyContent: 'center',
    },
    timebar2: {
        justifyContent: 'center',
    },
    timebar2Text: {
        position: 'absolute',
        marginTop: 35,
        marginLeft: 105,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(1.6),
        textAlign: 'center',
    },
    textoption: {
        fontFamily: 'Montserrat-SemiBold',
        color: color.white,
        fontSize: rf(1.9),
        marginLeft: rw(8),
        marginTop: rh(1),
    },
    keybordScroller: {
        paddingBottom: 120
    },
    backarrow: {
        marginTop: rh(1),
        flexDirection: 'row',
    },
    viewmcq: {
        marginBottom: rh(2),
    }
});