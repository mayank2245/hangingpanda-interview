import { FlatList, ImageBackground, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { rf, rh, rw } from '../../Helpers/Responsivedimention'
import Addques from '../../Assests/svgs/addQues';
import CustomModal from '../../Components/modal';
const bgImage = require('../../Assests/HeaderImage.png')


export default function QuestionList() {
    const data = [{
        sn: 1,
        ques: "What is a lambda function in Python ?",
        type: "Text"
    },
    {
        sn: 2,
        ques: "What is a lambda function in Python ?",
        type: "Text"
    },
    {
        sn: 3,
        ques: "What is a lambda function in Python ?",
        type: "Text"
    },
    {
        sn: 4,
        ques: "What is a lambda function in Python ?",
        type: "MCQ",
        Option1: "Lorem",
        Option2: "Ipsum",
        Option3: "Lorem Ipsum",
        Option4: "None of the above"

    },
    {
        sn: 5,
        ques: "What is a lambda function in Python ?",
        type: "MCQ"
    }
    ]

    const [visibleModal, setVisibleModal] = useState(false)
    const modal = () => {
        return <View style={styles.modalcss}>
            <Text style={[styles.modalText, { color: '#ff3856', marginBottom: rh(1.4), fontFamily: 'Montserrat-SemiBold' }]}>Are you sure you want to submit the exam ?</Text>
            <View>
                <Pressable style={styles.modalbox}>
                    <Text style={styles.modalText}>Yes</Text>
                </Pressable>
                <Pressable style={styles.modalbox}
                    onPress={() => setVisibleModal(false)}>
                    <Text style={styles.modalText}>No</Text>
                </Pressable>
            </View>
        </View>
    }
    return (
        <View>
            <StatusBar backgroundColor={'transparent'} translucent={true} />
            <ImageBackground
                style={styles.backgroundImage}
                source={bgImage}
                resizeMode="cover">

                <View style={styles.overlay}>
                    <View style={styles.flatviewcss}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => (
                                <View>
                                    <Text style={styles.FlatListques}>
                                        Q {item.sn}. {item.ques}
                                    </Text>
                                </View>
                            )}
                        />
                    </View>
                    <CustomModal visible={visibleModal} onClose={() => setVisibleModal(false)} content={modal()} modaloverlaycss={styles.modaloverlayCss} contentcss={styles.modalcss} />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.submitcss}
                        onPress={() => setVisibleModal(true)}>
                        <Addques />
                        <Text style={styles.submittext}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        height: '100%',
        width: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        opacity: 0.9,
        width: rw(100)
    },
    flatviewcss: {
        zIndex: 0,
        flex: 1,
        marginTop: rh(4),
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

        justifyContent: 'center',
        borderWidth: 2,
        alignItems: 'center',
        width: rw(60),
        marginLeft: rw(15),
        backgroundColor: 'black',
        borderRadius: 25,
    },
    modalbox: {
        justifyContent: 'center',
        backgroundColor: '#FF3856',
        borderRadius: 10,
        marginTop: rh(1),
        width: rw(34),
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
        flex: 1,
        width: '100%',
        backgroundColor: '#ffffff20',
        zIndex: 0,
    }
})

