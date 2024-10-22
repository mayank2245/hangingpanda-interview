import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, Text, View } from 'moti'
import { rf, rh, rw } from '../helpers/responsivedimention'
import { color } from '../constant/color';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface TimeDurationProps {
    paperduration: number
    animationStart: boolean
    initalHeight: 2 | 4
    timeLeft: number
}

const TimeDuration: React.FC<TimeDurationProps> = ({ paperduration, animationStart, initalHeight, timeLeft }) => {
    const [time, setTime] = useState<number>(paperduration);
    const [animate, setAnimate] = useState(animationStart);
    const handleAnimation = () => {
        setAnimate(!animate)
    }
    const progress = useSharedValue(rw(93));
    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: progress.value,
        };
    });


    return (
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
                        height: rh(initalHeight)
                    }}
                        animate={{
                            height: animate ? rh(2) : rh(4),
                        }}
                        transition={{
                            type: 'timing',
                            duration: 300,
                        }}
                        style={styles.timebar1}>
                        <Animated.View
                            style={[animatedStyle,
                                (timeLeft / (60 * time)) > 0.75 ? { backgroundColor: color.green }
                                    : (timeLeft / (60 * time)) > 0.5 ? { backgroundColor: color.yellow }
                                        : (timeLeft / (60 * time)) > 0.25 ? { backgroundColor: color.orange }
                                            : { backgroundColor: color.timebarRed },
                                { height: rh(4) }]}
                        />
                    </View>
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

                        } style={styles.timebar2Text}>Remaining time: {Math.floor(timeLeft / 60)} mins {Math.floor(timeLeft - (Math.floor(timeLeft / 60) * 60))} sec</Text>
                </View>
            </AnimatePresence>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    touchableCss: {
        marginVertical: rh(0),
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

    timebar2Text: {
        color: 'black',
        position: 'absolute',
        top: rh(4.2),
        marginLeft: rw(23),
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(1.6),
        textAlign: 'center',
    },
})
export default TimeDuration;