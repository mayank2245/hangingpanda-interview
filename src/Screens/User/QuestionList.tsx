import {
    AppState,
    BackHandler,
    DeviceEventEmitter,
    FlatList,
    ImageBackground,
    Platform,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

import { color } from '../../constant/color';
import Addques from '../../assests/svg/addQues';
import { ShowToast } from '../../helpers/toast';
import CustomModal from '../../components/Modal';
import { BackgroundImage } from '../../assests/images';
import TimeDuration from '../../components/TimeDuration';
import { ApiService } from '../../api/apiCalls/ApiCalls';
import { rf, rh, rw } from '../../helpers/responsivedimention';
import { Alert } from '../../assests/lottie';
import React from 'react';
import QuestionListSkeleton from '../../helpers/skeletonUserData';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QuestionList({ route }: any) {
    const item = route.params;
    const navigation = useNavigation();
    const [data, setdata] = useState();
    const [paperduration, setPaperduration] = useState<number>()
    const [appState, setAppState] = useState(AppState.currentState);
    const [backgoing, setBackgoing] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const queryClient = new QueryClient()
    const dataapi = queryClient.getQueryData("passingKeyLoginUser")

    useEffect(() => {
        const handleAppStateBlur = () => {
            setBackgoing(true);
        };

        if (Platform.OS === 'android') {
            AppState.addEventListener('blur', handleAppStateBlur);
        }

        // Cleanup function to remove the event listener
        return () => {
            if (Platform.OS === 'android') {
                AppState.removeEventListener('blur', handleAppStateBlur);

            }
        };
    }, []);


    useEffect(() => {
        const handle = async () => {
            try {
                const myquestion = await AsyncStorage.getItem('MyPaper');
                if (myquestion !== null) {
                    setdata(JSON.parse(myquestion))
                }
                const paperduration = await AsyncStorage.getItem('PaperDuration');
                if (paperduration !== null) {
                    setPaperduration(JSON.parse(paperduration))
                }
            } catch (error) {
            }
        }
        handle()
    }, [])
    useEffect(() => {
        if (item?.item?.sn) {
            const updatedData = data?.map((ei: any) => {
                if (item?.item?.sn === ei.sn) {
                    return { ...ei, ...item.item };
                }
                return ei;
            });
            setdata(updatedData);
        }
    }, [item]);

    useEffect(() => {
        const appStateListener = AppState.addEventListener('change', nextAppState => {
            if (appState.match(/active/) && nextAppState === 'background') {
                handlesubmitpaper();
                setBackgoing(false)
                navigation.navigate("QuitScreen");
                setBackgoing(false)
            }
            if (nextAppState === 'inactive') {
                // Add any additional logic you want to execute in the inactive state here
            }

            setAppState(nextAppState);
        });

        return () => {
            appStateListener?.remove();
        };
    }, [appState]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            setBackgoing(true);
        });
        return unsubscribe;
    }, [navigation]);

    const handlepressques = (data: any) => {
        navigation.navigate("UserHome", { itemes: data });
    };

    const getquestionhandle = async () => {
        const res = await ApiService.getinterview(email, interviewId)
        return res
    }

    const { data: getinterviewpaper, isSuccess } = useQuery({
        queryKey: ['getinterview'],
        queryFn: getquestionhandle,
        enabled: true,
    });

    useEffect(() => {
        if (isSuccess) {
            setPaperduration(getinterviewpaper?.data?.timeLimit)
            setdata(getinterviewpaper?.data?.questions)
        }
    }, [isSuccess])

    const submitpaperhandle = async () => {
        const payload = {
            email: "email",
            interviewId: "interviewId",
            name: "vikas",
            questionPaperType: "MCQ",
            totalTime: paperduration,
            interviewDate: "2024-09-18",
            answers: data
        }
        const res = await ApiService.submitAnswers(payload)
        return res
    }

    const mutation = useMutation({
        mutationKey: ["passingKeyPaperSubmit"],
        mutationFn: submitpaperhandle,
        onSuccess: async data => {
            navigation.navigate('LoginUserPage')
        },
        onError: () => { ShowToast("error", "Please Check your id and email") }
    })

    const handlesubmitpaper = () => {
        mutation.mutate()
    }

    const handleNotSubmit = () => {
        setVisibleModal(false)
        setBackgoing(false)
    }
    const handleOncloseModal = () => {
        setVisibleModal(false)
        setBackgoing(false)
    }

    const modal2 = () => (
        <>
            <LottieView
                source={Alert}
                style={styles.lottieview}
                autoPlay
            />
            <Text style={styles.modalText}>
                You cannot exit while the test is in progress
            </Text>
            <Pressable style={styles.modalboxOk} onPress={() => { setBackgoing(false) }}>
                <Text style={styles.modalText2}>ok</Text>
            </Pressable>
        </>
    );

    const modal = () => (
        <>
            <Text style={styles.modalText}>
                Are you sure you want to submit the exam?
            </Text>
            <Pressable style={styles.modalbox} onPress={handlesubmitpaper}>
                <Text style={styles.modalText2}>Yes</Text>
            </Pressable>
            <Pressable style={styles.modalbox} onPress={handleNotSubmit}>
                <Text style={styles.modalText2}>No</Text>
            </Pressable>
        </>
    );

    return (
        <View>
            <StatusBar backgroundColor={'transparent'} translucent={true} />
            <ImageBackground style={styles.backgroundImage} source={BackgroundImage} resizeMode="cover">
                <View style={styles.overlay}>
                    {!data ?
                        <QuestionListSkeleton />
                        :
                        <>
                            <View style={styles.timeduration}>
                                {paperduration && <TimeDuration paperduration={paperduration} animationStart={false} initalHeight={4} countDownStart={true} />}
                            </View>
                            <View style={styles.flatviewcss}>
                                <FlatList
                                    data={data}
                                    keyExtractor={(item) => item.sn.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => handlepressques(item)}>
                                            <Text style={styles.FlatListques}>
                                                Q {item.sn}. {item.question}
                                            </Text>
                                            {item.type === "Input" && (
                                                <Text style={styles.textanswer}>{item.answer}</Text>
                                            )}
                                            {item.type === "MCQ" &&
                                                <View>
                                                    {
                                                        Object.entries(item.options).map(([key, value], i) => (
                                                            <Text key={i} style={[styles.textoption, item.correctOption === key ? { color: color.green } : { color: color.white }]}>{key}. {value}</Text>
                                                        ))
                                                    }
                                                </View>
                                            }
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                            <CustomModal
                                visible={visibleModal}
                                onClose={handleOncloseModal}
                                content={modal()}
                                modaloverlaycss={styles.modaloverlayCss}
                                contentcss={styles.modalcss}
                            />
                            {!visibleModal && <CustomModal
                                visible={backgoing}
                                onClose={() => setBackgoing(false)}
                                content={modal2()}
                                modaloverlaycss={styles.modaloverlayCss}
                                contentcss={styles.modalcss}
                            />}
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.submitcss}
                                onPress={() => setVisibleModal(true)}
                            >
                                <Addques />
                                <Text style={styles.submittext}>Submit</Text>
                            </TouchableOpacity>
                        </>
                    }
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
    },
    FlatListques: {
        color: color.primaryRed,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(1.8),
        marginBottom: rh(1.6),
        marginTop: rh(1.8)
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
    modalboxOk: {
        marginHorizontal: rw(28),
        justifyContent: 'center',
        backgroundColor: color.primaryRed,
        borderRadius: 10,
        marginVertical: rh(1.6),
        width: rw(40),
        height: rh(5),
    },
    modalText: {
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        fontSize: rf(2.4),
        paddingHorizontal: rw(4),
        color: color.primaryRed,
        lineHeight: rh(3)
    },
    modalText2: {
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        fontSize: rf(2.2),
        color: color.white,
    },
    modaloverlayCss: {
        justifyContent: 'center',
        width: rw(100),
        backgroundColor: '#ffffff70',
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
    },
    timeduration: {
        marginTop: rh(4)
    },
    isloader: {
        marginTop: rh(40)
    },
    lottieview: {
        width: "100%",
        height: "42%",
    },
});