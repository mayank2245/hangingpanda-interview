import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, Text, View } from 'moti'
import { rf, rh, rw } from '../helpers/responsivedimention'
import { color } from '../constant/color';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function TimeAnimation() {
    const [time, setTime] = useState<number>(60);
    const [timeLeft, setTimeLeft] = useState(60 * time);
    const [animate, setAnimate] = useState(true);
    const handleAnimation = () => {
        setAnimate(!animate)
    }

    const progress = useSharedValue(rw(93));

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
                        height: rh(2)
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

                        } style={styles.timebar2Text}>Remaining time: {Math.floor(timeLeft / 60)} mins</Text>
                </View>
            </AnimatePresence>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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

    timebar2Text: {
        position: 'absolute',
        marginTop: 35,
        marginLeft: 105,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(1.6),
        textAlign: 'center',
    },
})