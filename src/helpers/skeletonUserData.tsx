import React from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    StyleSheet
} from 'react-native';
import { BackgroundImage } from '../assests/images';
import { color } from '../constant/color';
import { rh, rw } from './responsivedimention';
import { Skeleton } from 'moti/skeleton';

export default function QuestionListSkeleton() {
    const skeletonQuestions = Array(5).fill({});

    return (
        <View>
            <StatusBar backgroundColor={'transparent'} translucent={true} />
            <ImageBackground style={styles.backgroundImage} source={BackgroundImage} resizeMode="cover">
                <View style={styles.overlay}>
                    <View style={styles.skeletonTimeContainer}>
                        <Skeleton colorMode="dark" radius="round" height={rh(4)} width={rw(90)} />
                    </View>
                    <View style={styles.flatviewcss}>
                        <FlatList
                            data={skeletonQuestions}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={() => (
                                <View style={styles.skeletonItem}>
                                    <Skeleton colorMode="dark" width={rw(80)} height={rh(3)} />
                                    <View style={styles.skeletonSubItem}>
                                        <Skeleton colorMode="dark" width={rw(70)} height={rh(2)} />
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                    <TouchableOpacity activeOpacity={0.8} style={styles.skeletonSubmitButton}>
                        <Skeleton colorMode="dark" width={rw(30)} height={rh(3)} />
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
        overflow: 'hidden',
    },
    flatviewcss: {
        flex: 1,
        marginLeft: rw(5),
        marginTop: rh(2),
    },
    skeletonItem: {
        marginBottom: rh(1.6),
        marginTop: rh(1.8),
    },
    skeletonSubItem: {
        marginTop: rh(1.5)
    },

    skeletonSubmitButton: {
        height: rh(8),
        backgroundColor: color.skeletonColor,
        borderTopRightRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 12,
        marginTop: rh(4),
    },
    skeletonTimeContainer: {
        marginTop: rh(4),
        marginHorizontal: rw(5),
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
    modaloverlayCss: {
        justifyContent: 'center',
        width: rw(100),
        backgroundColor: '#ffffff70',
    },
});
