import { useState } from "react";
import { AnimatePresence, Text, View } from 'moti'
import { useNavigation } from "@react-navigation/native";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StatusBar, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { color } from "../../constant/color";
import { rf, rh, rw } from "../../helpers/responsivedimention";
import BackArrow from "../../components/BackArrow";

export default function Home({ route }: any) {
    const { itemes } = route.params;
    const [data, setData] = useState(itemes);
    const [answer, setAnswer] = useState("");
    const [focusText, setFocusText] = useState(false);
    const navigation = useNavigation();
    const progress = useSharedValue(rw(93));
    const [time, setTime] = useState<number>(1);
    const [timeLeft, setTimeLeft] = useState(60 * time);

    const handlesubmit = (item: any) => {
        if (item.type === "Text") {
            item.answer = answer;
        }
        navigation.navigate("QuestionList", { item });
        setAnswer("");
    };

    const handlepressOption = (item: any, selectedOption: number) => {
        const updatedData = { ...item, correctOption: selectedOption };
        setData(updatedData);
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: progress.value,
        };
    });
    const [animate, setAnimate] = useState(true);
    const handleAnimation = () => {
        setAnimate(!animate)
    }
    return (
        <View style={styles.safearea}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <BackArrow></BackArrow>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setAnimate(prev => !prev)}
                style={styles.touchableCss}
            >
                <AnimatePresence onExitComplete={handleAnimation}>
                    <View style={{ height: rh(7) }}>
                        <Text
                            from={{
                                opacity: 0,
                                scaleY: 1,
                            }}
                            animate={{
                                opacity: animate ? 0 : 1,
                                scaleY: animate ? 0.5 : 1,
                            }}
                            transition={{
                                type: 'timing',
                                duration: 300,
                            }

                            } style={styles.timeText}>Total Time: {time} mins</Text>
                        <View from={{
                            height: rh(2)
                        }}
                            animate={{
                                height: animate ? rh(2) : rh(4),
                            }}
                            transition={{
                                type: 'timing',
                                duration: 300,
                            }}
                            style={styles.timebar1}></View>
                        <Text
                            from={{
                                opacity: 0,
                                scaleY: 1,
                            }}
                            animate={{
                                opacity: animate ? 0 : 1,
                                scaleY: animate ? 0.5 : 1,
                            }}
                            transition={{
                                type: 'timing',
                                duration: 300,
                            }

                            } style={styles.timebar2Text}>Remaining time: {Math.floor(timeLeft / 60)} mins</Text>
                    </View>
                </AnimatePresence>
            </TouchableOpacity>

            <Text style={styles.quescss}>
                Q "{data.sn}. {data.ques}"
            </Text>
            <KeyboardAwareScrollView style={{ paddingBottom: 120 }}>
                {data.type === "Text" && (
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
                    <View>
                        {["Option1", "Option2", "Option3", "Option4"].map(
                            (option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handlepressOption(data, index + 1)}
                                >
                                    <Text
                                        style={[
                                            styles.textoption,
                                            data.correctOption === index + 1
                                                ? { color: color.green }
                                                : { color: color.white },
                                        ]}
                                    >
                                        {String.fromCharCode(65 + index)}. {data[option]}
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
    quescss: {
        fontFamily: 'Montserrat-SemiBold',
        color: color.white,
        width: '90%',
        marginBottom: rh(1),
        fontSize: rf(2),
        marginHorizontal: rw(5),
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
        marginLeft: rw(6),
        marginTop: rh(1),
    },
});