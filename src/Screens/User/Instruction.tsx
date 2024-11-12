import {
    ImageBackground,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { useEffect, useState } from 'react';
import LottieView from "lottie-react-native";
import { useNavigation } from '@react-navigation/native';
import IconArrow from 'react-native-vector-icons/AntDesign';

import { color } from '../../constant/color';
import { BackgroundImage } from '../../assests/images';
import TimeDuration from '../../components/TimeDuration';
import { Alert, Checklist, Panda } from '../../assests/lottie';
import { rf, rh, rw } from '../../helpers/responsivedimention';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNText from '../../components/RNText';

export default function Instruction({ route }) {
    const { paperTiming, paperTime } = route.params;
    const navigation = useNavigation();
    const [nextButton, setNextButton] = useState<number>(1);
    const [paperduration, setPaperduration] = useState<number>(paperTiming)

    const handleNextButton = () => {
        if (nextButton < 3) {
            setNextButton(nextButton + 1);
        }
        nextButton === 3 && navigation.navigate("QuestionList", { ans: "", serial: -1 })
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
        });
        return unsubscribe;
    }, [navigation]);

    const renderInstructionContent = () => {
        switch (nextButton) {
            case 1:
                return (
                    <View>
                        <RNText style={styles.textTime} type="heading" font='MontserratSemiBold' colortype="red">Timer</RNText>
                        <View style={styles.timeduration}>
                            {paperduration && <TimeDuration paperduration={paperduration} animationStart={false} initalHeight={4} timeLeft={paperduration * 60} progress={undefined} />}
                        </View>
                        <RNText style={styles.instructionText} type="subHeading" font='NunitoSemiBold' colortype="red">
                            You have a timer at the top of the screen to track your exam duration. Ensure you manage your time effectively for each question type: input, MCQ, and blank space.
                        </RNText>
                    </View>
                );
            case 2:
                return (
                    <View>
                        <RNText style={styles.textTime} type="heading" font='MontserratSemiBold' colortype="red">Stay Focused</RNText>
                        <LottieView
                            source={Alert}
                            style={styles.lottieview}
                            autoPlay
                        />
                        <RNText style={styles.instructionText2} type="subHeading" font='NunitoSemiBold' colortype="red">
                            Do not close the app or switch to other applications. If you attempt to exit or switch apps, your exam will be automatically terminated.
                        </RNText>
                    </View>
                );
            case 3:
                return (
                    <View>
                        <RNText style={styles.textTime} type="heading" font='MontserratSemiBold' colortype="red">Follow All Instructions</RNText>
                        <LottieView
                            source={Checklist}
                            style={styles.lottieview}
                        />
                        <RNText style={styles.instructionText3} type="subHeading" font='NunitoSemiBold' colortype="red">
                            Carefully read and answer each question type as prompted. Your performance is monitored, and any disruptions will end the interview.
                        </RNText>
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
                source={BackgroundImage}
                resizeMode="cover" >
                <View style={styles.overlay2}>
                    <View style={styles.overlay}>
                        <LottieView
                            source={Panda}
                            style={styles.lottiepanda}
                            autoPlay
                            loop
                        />
                        <RNText style={styles.mustreadText} font='MontserratSemiBold' colortype="red">Must Read Instruction</RNText>
                    </View>
                    {renderInstructionContent()}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.touchable}
                        onPress={handleNextButton}
                    >
                        <RNText type="subHeading" font='MontserratSemiBold' colortype="white">{nextButton === 3 ? "Get started" : "Next page " + nextButton + "/3"} </RNText>
                        <IconArrow name="arrowright" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        height: rh(110)
    },
    overlay: {
        backgroundColor: color.logintextWhite,
        height: rh(45),
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    overlay2: {
        backgroundColor: color.black,
        opacity: 0.9,
        height: rh(110),
    },
    mustreadText: {
        paddingTop: rh(0.4),
        fontSize: rf(3),
        paddingBottom: rh(1),
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: "black",
    },
    textTime: {
        textAlign: 'center',
        marginTop: rh(2.5),
    },
    instructionText: {
        position: "absolute",
        marginLeft: rh(4),
        marginHorizontal: rw(7),
        textAlign: 'center',
        marginTop: rh(22)
    },
    instructionText3: {
        position: "absolute",
        marginLeft: rh(4),
        marginHorizontal: rw(7),
        textAlign: 'center',
        marginTop: rh(28)
    },
    instructionText2: {
        position: "absolute",
        marginTop: rh(28),
        marginHorizontal: rw(7),
        textAlign: 'center',
        width: rw(92),
        marginLeft: rw(4)
    },
    timebar: {
        marginTop: rh(5),
        marginHorizontal: rh(3),
        borderRadius: 100,
        backgroundColor: color.green,
        height: rh(1.2)
    },
    timebar2: {
        marginHorizontal: rh(1.7),
        borderRadius: 100,
        backgroundColor: color.green,
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
        backgroundColor: color.primaryRed,
        width: rw(93),
        height: rh(6),
        marginTop: rh(88),
        marginLeft: rh(1.5),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    lottieview: {
        width: "100%",
        height: "38%",
        marginTop: rh(2)
    },
    lottiepanda: {
        width: "80%",
        height: "80%"
    },
    timeduration: {
        marginTop: rh(2.8)
    }
});
