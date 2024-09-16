import { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { rf, rh, rw } from "../../Helpers/Responsivedimention";
import { useNavigation } from "@react-navigation/native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export default function Home({ route }: any) {
    const { itemes } = route.params;
    const [data, setData] = useState(itemes);
    const [answer, setAnswer] = useState("");
    const [focusText, setFocusText] = useState(false);

    const navigation = useNavigation();
    const [timebar, setTimebar] = useState(true);

    const progress = useSharedValue(rw(93));
    const [time, setTime] = useState<number>(1);
    const [timeLeft, setTimeLeft] = useState(60 * time);

    const handletimebar = () => {
        setTimebar(!timebar);
    };

    useEffect(() => {
        if (!timeLeft) return;

        const intervalId = setInterval(() => {
            setTimeLeft((prev) => {
                const newTimeLeft = prev - 1;
                const percentage = (newTimeLeft / (60 * time)) * rw(93);
                progress.value = withTiming(percentage, { duration: 1000 });
                return newTimeLeft;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const handlesubmit = (item: any) => {
        if (item.type === "Text") {
            item.answer = answer;
        }
        navigation.navigate("QuestionList", { item });
        setAnswer("");
    };

    const handlepressOption = (item: any, selectedOption: number) => {
        const correctOption = item?.correctOption
        const updatedData = { ...item, correctOption: selectedOption }
        setData(updatedData)
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: progress.value,
        };
    });

    return (
        <View style={styles.safearea}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handletimebar}
                style={styles.touchableCss}
            >
                {timebar ? (
                    <View>
                        <View style={styles.timebar}>
                            <Animated.View
                                style={[
                                    styles.timebar2,
                                    animatedStyle,
                                    { height: rh(2) },
                                    (timeLeft / (60 * time)) > 0.75 ? { backgroundColor: '#06D001' }
                                        : (timeLeft / (60 * time)) > 0.5 ? { backgroundColor: "#FBC02D" }
                                            : (timeLeft / (60 * time)) > 0.25 ? { backgroundColor: "#F57C00" }
                                                : { backgroundColor: "#D32F2F" },
                                ]}
                            ></Animated.View>
                        </View>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.timeText}>Total Time: {time} mins</Text>
                        <View style={styles.timebar1}>
                            <Animated.View
                                style={[
                                    styles.timebar2,
                                    animatedStyle,
                                    { height: rh(6) },
                                    (timeLeft / (60 * time)) > 0.75 ? { backgroundColor: '#06D001' }
                                        : (timeLeft / (60 * time)) > 0.5 ? { backgroundColor: "#FBC02D" }
                                            : (timeLeft / (60 * time)) > 0.25 ? { backgroundColor: "#F57C00" }
                                                : { backgroundColor: "#D32F2F" },
                                ]}
                            ></Animated.View>
                        </View>
                        <Text style={styles.timebar2Text}>Remaining time: {Math.floor(timeLeft / 60)} mins</Text>
                    </View>
                )}
            </TouchableOpacity>
            <Text style={styles.quescss}>Q "{data.sn}. {data.ques}"</Text>
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
                        placeholderTextColor="#a8acb2"
                    />
                )}
                {data.type === "MCQ" && (
                    <View>
                        {["Option1", "Option2", "Option3", "Option4"].map((option, index) => (
                            <TouchableOpacity key={index} onPress={() => handlepressOption(data, index + 1)}>
                                <Text
                                    style={[
                                        styles.textoption,
                                        data.correctOption === index + 1 ? { color: '#06D001' } : { color: '#ffffff' },
                                    ]}
                                >
                                    {String.fromCharCode(65 + index)}. {data[option]}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.touchable}
                    onPress={() => handlesubmit(data)}
                >
                    <Text style={styles.submit}> Submit</Text>
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
        color: '#FFFFFF',
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
        color: '#FFFFFF',
        width: '90%',
        height: rh(67),
        borderRadius: 15,
        borderWidth: 4,
        borderColor: "#FF3856",
        marginTop: rh(2),
        marginHorizontal: rw(5),
    },
    anscss2: {
        textAlignVertical: 'top',
        fontFamily: 'Montserrat-SemiBold',
        paddingTop: rh(2),
        paddingHorizontal: rw(3.6),
        fontSize: rf(2.2),
        color: '#FFFFFF',
        width: '90%',
        height: rh(33),
        borderRadius: 15,
        borderWidth: 4,
        borderColor: "#FF3856",
        marginTop: rh(2),
        marginHorizontal: rw(5),
    },
    touchable: {
        backgroundColor: "#FF3856",
        width: "90%",
        height: rh(6),
        marginTop: rh(2),
        marginLeft: rh(2.2),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submit: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(2.2),
    },
    touchableCss: {
        marginVertical: rh(2.6),
    },
    timebar: {
        marginBottom: rh(2.1),
        overflow: 'hidden',
        marginTop: rh(3),
        marginLeft: rh(1.7),
        marginRight: rh(1.7),
        borderRadius: 100,
        backgroundColor: '#ffffff',
        height: rh(2),
        justifyContent: 'center',
    },
    timeText: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        textAlign: 'center',
        marginBottom: rh(1)
    },
    timebar1: {
        overflow: 'hidden',
        marginLeft: rh(1.7),
        marginRight: rh(1.7),
        borderRadius: 100,
        backgroundColor: '#ffffff',
        height: rh(4),
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
        color: '#ffffff',
        fontSize: rf(1.9),
        marginLeft: rw(6),
        marginTop: rh(1),
    },
});
