import { FlatList, ImageBackground, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { rf, rh, rw } from '../../helpers/responsivedimention'
import Addques from '../../assests/svg/addQues';
import CustomModal from '../../components/Modal';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { BackgroundImage } from '../../assests/images';
import { color } from '../../constant/color';


export default function QuestionList({ route }: any) {

    const { item } = route.params;

    const navigation = useNavigation();

    const datas = [
        {
            sn: 1,
            ques: "What is a lambda function in Python?",
            type: "Text",
            answer: ""
        },
        {
            sn: 2,
            ques: "What is a lambda function in Python?",
            type: "Text",
            answer: ""
        },
        {
            sn: 3,
            ques: "What is a lambda function in Python?",
            type: "Text",
            answer: ""
        },
        {
            sn: 4,
            ques: "What is a lambda function in Python?",
            type: "MCQ",
            Option1: "Lorem",
            Option2: "Ipsum",
            Option3: "Lorem Ipsum",
            Option4: "None of the above",
            correctOption: -1,
        },
        {
            sn: 5,
            ques: "What is a lambda function in Python?",
            type: "MCQ",
            Option1: "Lorem",
            Option2: "Ipsum",
            Option3: "Lorem Ipsum",
            Option4: "None of the above",
            correctOption: -1,
        }
    ];


    const [data, setdata] = useState(datas);
    const [visibleModal, setVisibleModal] = useState(false);
    const [time, setTime] = useState<number>(3);
    const [timeLeft, setTimeLeft] = useState(60 * time);

    const progress = useSharedValue(rw(93));

    const updatedData = () => {
        data[item?.sn - 1] = item;
    };
    updatedData();

    const handlepressques = (data: any) => {
        navigation.navigate("UserHome", { itemes: data });
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

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: progress.value,
        };
    });

    const modal = () => (
        <View>
            <Text style={[styles.modalText, {}]}>
                Are you sure you want to submit the exam?
            </Text>
            <Pressable style={styles.modalbox}>
                <Text style={styles.modalText}>Yes</Text>
            </Pressable>
            <Pressable style={styles.modalbox} onPress={() => setVisibleModal(false)}>
                <Text style={styles.modalText}>No</Text>
            </Pressable>
        </View>
    );

    return (
        <View>
            <StatusBar backgroundColor={'transparent'} translucent={true} />
            <ImageBackground style={styles.backgroundImage} source={BackgroundImage} resizeMode="cover">
                <View style={styles.overlay}>
                    <Text style={styles.timerbar}>
                        Total Time: {time} mins
                    </Text>
                    <View style={styles.timebar1}>
                        <Animated.View
                            style={[styles.timebar2, animatedStyle,
                            (timeLeft / (60 * time)) > 0.75 ? { backgroundColor: color.green }
                                : (timeLeft / (60 * time)) > 0.5 ? { backgroundColor: color.yellow }
                                    : (timeLeft / (60 * time)) > 0.25 ? { backgroundColor: color.orange }
                                        : { backgroundColor: color.timebarRed },
                            { height: rh(4) }]}
                        />
                    </View>
                    <Text style={styles.timebar2Text}>Remaining time: {Math.floor(timeLeft / 60)} mins</Text>

                    <View style={styles.flatviewcss}>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.sn.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handlepressques(item)}>
                                    <Text style={styles.FlatListques}>
                                        Q {item.sn}. {item.ques}
                                    </Text>
                                    {item.type === "Text" && item.answer !== "" && (
                                        <Text style={styles.textanswer}>{item.answer}</Text>
                                    )}
                                    {item.type === "MCQ" &&
                                        <View>
                                            <Text style={[styles.textoption, item.correctOption === 1 ? { color: color.green } : { color: color.white }]}>
                                                A. {item.Option1}
                                            </Text>
                                            <Text style={[styles.textoption, item.correctOption === 2 ? { color: color.green } : { color: color.white }]}>
                                                B. {item.Option2}
                                            </Text>
                                            <Text style={[styles.textoption, item.correctOption === 3 ? { color: color.green } : { color: color.white }]}>
                                                C. {item.Option3}
                                            </Text>
                                            <Text style={[styles.textoption, item.correctOption === 4 ? { color: color.green } : { color: color.white }]}>
                                                D. {item.Option4}
                                            </Text>
                                        </View>
                                    }
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <CustomModal
                        visible={visibleModal}
                        onClose={() => setVisibleModal(false)}
                        content={modal()}
                        modaloverlaycss={styles.modaloverlayCss}
                        contentcss={styles.modalcss}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.submitcss}
                        onPress={() => setVisibleModal(true)}
                    >
                        <Addques />
                        <Text style={styles.submittext}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        height: '100%',
        width: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: color.black,
        opacity: 0.96,
        width: '100%',
        overflow: 'hidden'
    },
    flatviewcss: {
        zIndex: 0,
        flex: 1,
        marginLeft: rw(5),
        marginRight: rh(4),
    },
    FlatListques: {
        color: color.primaryRed,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(1.8),
        marginBottom: rh(1.6),
        marginTop: rh(2.6)
    },
    submitcss: {
        height: rh(8),
        backgroundColor: color.primaryRed,
        borderTopRightRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 12,
    },
    submittext: {
        fontFamily: 'Montserrat-SemiBold',
        color: color.white,
        fontSize: rf(2.6),
    },
    modalcss: {
        height: rh(25),
        justifyContent: 'center',
        alignItems: 'center',
        width: rw(92),
        marginLeft: rw(4),
        backgroundColor: color.black,
        borderRadius: 25,
    },
    modalbox: {
        marginHorizontal: rw(28),
        justifyContent: 'center',
        backgroundColor: color.primaryRed,
        borderRadius: 10,
        marginTop: rh(1.6),
        width: rw(40),
        height: rh(5),
    },
    modalText: {
        fontFamily: 'NunitoSans-SemiBold',
        textAlign: 'center',
        fontSize: rf(2.2),
        color: color.white,
    },
    modalText2: {
        textAlign: 'center',
        fontSize: rf(2.2),
        width: rw(70),
        marginBottom: rh(1),
        marginLeft: rw(12),
        color: color.primaryRed,
        lineHeight: 30,
        fontFamily: 'Montserrat-SemiBold'
    },
    modaloverlayCss: {
        justifyContent: 'center',
        width: rw(100),
        backgroundColor: '#ffffff20',
        zIndex: 0,
    },
    timebar1: {
        overflow: 'hidden',
        marginTop: rh(1),
        marginLeft: rh(1.7),
        marginRight: rh(1.7),
        borderRadius: 100,
        backgroundColor: color.white,
        height: rh(4),
        justifyContent: 'center',
    },
    timebar2: {},
    timebar2Text: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(1.6),
        textAlign: 'center',
        position: 'absolute',
        marginTop: 75,
        marginLeft: 105
    },
    textanswer: {
        fontFamily: 'Montserrat-SemiBold',
        color: color.green,
        fontSize: rf(1.9),
        marginLeft: rw(2.6)
    },
    textoption: {
        fontFamily: 'Montserrat-SemiBold',
        color: color.white,
        fontSize: rf(1.9),
        marginLeft: rw(2.6)
    },
    timerbar: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        textAlign: 'center',
        marginTop: rh(4.5)
    }
});
