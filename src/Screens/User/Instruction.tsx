import { ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { rf, rh, rw } from '../../Helpers/Responsivedimention';
import OnbordingImg from '../../Assests/svgs/onbording';
import IconArrow from 'react-native-vector-icons/AntDesign';
import LottieView from "lottie-react-native";
import { useNavigation } from '@react-navigation/native';
const bgImage = require('../../Assests/HeaderImage.png');

export default function Instruction() {
    const [timebar, setTimebar] = useState(true);
    const [nextButton, setNextButton] = useState<number>(1);

    const handletimebar = () => {
        setTimebar(!timebar);
    };
    const navigation = useNavigation();
    const handleNextButton = () => {
        setNextButton(nextButton + 1);
        nextButton === 3 && navigation.navigate("QuestionList", { ans: "", serial: -1 })
    };

    const renderInstructionContent = () => {
        switch (nextButton) {
            case 1:
                return (
                    <View>
                        <Text style={styles.textTime}>Timer</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={handletimebar}
                            style={styles.touchableCss}>
                            {
                                !timebar ? <View style={styles.timebar}></View> :
                                    <View>
                                        <Text style={{ color: 'white', textAlign: 'center', marginTop: rh(1.5) }}>Total Time : 30 mins</Text>
                                        <View style={[styles.timebar2, { marginTop: rh(1) }]}>
                                            <Text style={styles.timebar2Text}>Remaining time : 25 mins</Text>
                                        </View>
                                    </View>
                            }
                        </TouchableOpacity>
                        <Text style={[styles.instructionText, { marginTop: rh(24) }]}>
                            You have a timer at the top of the screen to track your exam duration. Ensure you manage your time effectively for each question type: input, MCQ, and blank space.
                        </Text>
                    </View>
                );
            case 2:
                return (
                    <View>
                        <Text style={styles.textTime}>Stay Focused</Text>
                        <LottieView
                            source={require('../../Assests/svgs/alert.json')}
                            style={{ width: "100%", height: "40%", marginTop: rh(2) }}
                            autoPlay
                        />
                        <Text style={[styles.instructionText, { fontSize: rh(2), width: rw(92), marginLeft: rw(4) }]}>
                            Do not close the app or switch to other applications. If you attempt to exit or switch apps, your exam will be automatically terminated.
                        </Text>
                    </View>
                );
            case 3:
                return (
                    <View>
                        <Text style={styles.textTime}>Follow All Instructions</Text>
                        <LottieView
                            source={require('../../Assests/svgs/checklist.json')}
                            style={{ width: "100%", height: "38%", marginTop: rh(2) }}
                            autoPlay
                        />
                        <Text style={styles.instructionText}>
                            Carefully read and answer each question type as prompted. Your performance is monitored, and any disruptions will end the interview.
                        </Text>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View>
            <StatusBar backgroundColor={'transparent'} translucent={true} />
            <ImageBackground
                style={styles.backgroundImage}
                source={bgImage}
                resizeMode="cover" />
            <View style={styles.overlay2}>
                <View style={styles.overlay}>
                    <LottieView
                        source={require('../../Assests/svgs/panda.json')}
                        style={{ width: "80%", height: "80%" }}
                        autoPlay
                        loop
                    />
                    <Text style={styles.mustreadText}>Must Read Instruction</Text>
                </View>

                {renderInstructionContent()}

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.touchable}
                    onPress={handleNextButton}
                >
                    <Text style={styles.Nextpage}> {nextButton === 3 ? "Get started" : "Next page " + nextButton + "/3"} </Text>
                    <IconArrow name="arrowright" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        height: rh(100)
    },
    overlay: {
        backgroundColor: '#D9D9D94D',
        height: rh(45),
        opacity: 30,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    overlay2: {
        backgroundColor: '#000000E5',
        height: rh(100)
    },
    mustreadText: {
        paddingBottom: rh(1),
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 25,
        color: '#FF3856',
        backgroundColor: "black",
    },
    textTime: {
        color: '#FF3856',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(3),
        textAlign: 'center',
        marginTop: rh(2.5),
    },
    instructionText: {
        position: "absolute",
        marginTop: rh(28),
        marginLeft: rh(4.5),
        marginHorizontal: rw(7),
        color: '#FF3856',
        fontFamily: 'NunitoSans-SemiBold',
        fontSize: rf(2.4),
        textAlign: 'center'
    },
    timebar: {
        marginTop: rh(5),
        marginHorizontal: rh(3),
        borderRadius: 100,
        backgroundColor: '#06D001',
        height: rh(1.2)
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
    touchable: {
        position: 'absolute',
        backgroundColor: "#FF3856",
        width: "93%",
        height: rh(6),
        marginTop: rh(90),
        marginLeft: rh(1.5),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    Nextpage: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(2.2),
    },
    touchableCss: {
        marginVertical: rh(3)
    }
});
