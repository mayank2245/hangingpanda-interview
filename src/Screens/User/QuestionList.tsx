import {
    FlatList,
    ImageBackground,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@tanstack/react-query';

import { color } from '../../constant/color';
import Addques from '../../assests/svg/addQues';
import { ShowToast } from '../../helpers/toast';
import CustomModal from '../../components/Modal';
import { BackgroundImage } from '../../assests/images';
import TimeDuration from '../../components/TimeDuration';
import { ApiService } from '../../api/apicalls/ApiCalls';
import { rf, rh, rw } from '../../helpers/responsivedimention';

export default function QuestionList({ route }: any) {
    const { item } = route.params;
    const navigation = useNavigation();
    const [data, setdata] = useState();
    const [visibleModal, setVisibleModal] = useState(false);
    const [paperduration, setPaperduration] = useState<number>(60)

    const handlepressques = (data: any) => {
        navigation.navigate("UserHome", { itemes: data });
    };

    const email = "test@example.com"
    const interviewId = "CD126FBTYG"

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

    const loginhandle = async () => {
        const payload = {
            email: email,
            hrID: "userId"
        }
        const res = await ApiService.login(payload)
        return res
    }

    const mutation = useMutation({
        mutationKey: ["passingKey123"],
        mutationFn: loginhandle,
        onSuccess: async data => {
            navigation.navigate('LoginUserPage')
        },
        onError: () => { ShowToast("error", "Please Check your id and email") }
    })


    const handlesubmitpaper = () => {
        // mutation.mutate()
    }

    const modal = () => (
        <View>
            <Text style={[styles.modalText, {}]}>
                Are you sure you want to submit the exam?
            </Text>
            <Pressable style={styles.modalbox} onPress={handlesubmitpaper} >
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
                    <TimeDuration paperduration={paperduration} />
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
                                                Object.entries(item.options).map(([key, value]) => (
                                                    <Text style={[styles.textoption, item.correctOption === key ? { color: color.green } : { color: color.white }]}>{key}. {value}</Text>
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