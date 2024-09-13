import { FlatList, ImageBackground, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { rf, rh, rw } from '../../Helpers/Responsivedimention'
import Addques from '../../Assests/svgs/addQues';
import CustomModal from '../../Components/modal';
import { useNavigation } from '@react-navigation/native';
const bgImage = require('../../Assests/HeaderImage.png')

export default function QuestionList({ route }: any) {
    const { item } = route.params;
    const navigation = useNavigation();

    const datas = [
        {
            sn: 1,
            ques: "What is a lambda function in Python ?",
            type: "Text",
            answer: ""
        },
        {
            sn: 2,
            ques: "What is a lambda function in Python ?",
            type: "Text",
            answer: ""
        },
        {
            sn: 3,
            ques: "What is a lambda function in Python ?",
            type: "Text",
            answer: ""
        },
        {
            sn: 4,
            ques: "What is a lambda function in Python ?",
            type: "MCQ",
            Option1: "Lorem",
            Option2: "Ipsum",
            Option3: "Lorem Ipsum",
            Option4: "None of the above",
            correctOption: -1,
        },
        {
            sn: 5,
            ques: "What is a lambda function in Python ?",
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

    const handlepressques = (data: any) => {
        navigation.navigate("UserHome", { itemes: data });
    };

    const modal = () => (
        <View>
            <Text style={[styles.modalText, { width: rw(70), marginBottom: rh(1), marginLeft: rw(12), color: '#ff3856', lineHeight: 30, fontFamily: 'Montserrat-SemiBold' }]}>
                Are you sure you want to submit the exam?
            </Text>
            <View>
                <Pressable style={styles.modalbox}>
                    <Text style={styles.modalText}>Yes</Text>
                </Pressable>
                <Pressable style={styles.modalbox} onPress={() => setVisibleModal(false)}>
                    <Text style={styles.modalText}>No</Text>
                </Pressable>
            </View>
        </View>
    );
    console.log(data?.correctOption, 'item.correctOption')
    return (
        <View>
            <StatusBar backgroundColor={'transparent'} translucent={true} />
            <ImageBackground style={styles.backgroundImage} source={bgImage} resizeMode="cover">
                <View style={styles.overlay}>
                    <View>
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', color: 'white', textAlign: 'center', marginTop: rh(4.5) }}>
                            Total Time : 30 mins
                        </Text>
                        <View style={[styles.timebar2, { marginTop: rh(1) }]}>
                            <Text style={styles.timebar2Text}>Remaining time : 25 mins</Text>
                        </View>
                    </View>
                    <View style={styles.flatviewcss}>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.sn.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handlepressques(item)}
                                >
                                    <Text style={styles.FlatListques}>
                                        Q {item.sn}. {item.ques}
                                    </Text>
                                    {
                                        item.type === "Text" && item.answer !== "" && (
                                            <Text style={styles.textanswer}>{item.answer}</Text>
                                        )
                                    }
                                    {
                                        item.type === "MCQ" && (
                                            <View>
                                                <Text style={[styles.textoption, item.correctOption === 1 ? { color: '#06D001' } : { color: '#ffffff' }]}>
                                                    A. {item.Option1}
                                                </Text>
                                                <Text style={[styles.textoption, item.correctOption === 2 ? { color: '#06D001' } : { color: '#ffffff' }]}>
                                                    B. {item.Option2}
                                                </Text>
                                                <Text style={[styles.textoption, item.correctOption === 3 ? { color: '#06D001' } : { color: '#ffffff' }]}>
                                                    C. {item.Option3}
                                                </Text>
                                                <Text style={[styles.textoption, item.correctOption === 4 ? { color: '#06D001' } : { color: '#ffffff' }]}>
                                                    D. {item.Option4}
                                                </Text>
                                            </View>
                                        )
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        opacity: 0.96,
        width: rw(100)
    },
    flatviewcss: {
        zIndex: 0,
        flex: 1,
        marginLeft: rw(5),
        marginRight: rh(4),
    },
    FlatListques: {
        color: '#FF3856',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(1.8),
        marginBottom: rh(1.6),
        marginTop: rh(2.6)
    },
    submitcss: {
        height: rh(8),
        backgroundColor: '#FF3856',
        borderTopRightRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 12,
    },
    submittext: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#FFFFFF',
        fontSize: rf(2.6),
    },
    modalcss: {
        height: rh(25),
        justifyContent: 'center',
        alignItems: 'center',
        width: rw(92),
        marginLeft: rw(4),
        backgroundColor: '#000000',
        borderRadius: 25,
    },
    modalbox: {
        marginHorizontal: rw(28),
        justifyContent: 'center',
        backgroundColor: '#FF3856',
        borderRadius: 10,
        marginTop: rh(1.6),
        width: rw(40),
        height: rh(5),
    },
    modalText: {
        fontFamily: 'NunitoSans-SemiBold',
        textAlign: 'center',
        fontSize: rf(2.2),
        color: '#ffffff',
    },
    modaloverlayCss: {
        justifyContent: 'center',
        width: rw(100),
        backgroundColor: '#ffffff20',
        zIndex: 0,
    },
    timebar2: {
        marginHorizontal: rh(1.7),
        borderRadius: 100,
        backgroundColor: '#06D001',
        height: rh(4),
        justifyContent: 'center'
    },
    timebar2Text: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(1.6),
        textAlign: 'center'
    },
    textanswer: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#06D001',
        fontSize: rf(1.9),
        marginLeft: rw(2.6)
    },
    textoption: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#ffffff',
        fontSize: rf(1.9),
        marginLeft: rw(2.6)
    }
});
