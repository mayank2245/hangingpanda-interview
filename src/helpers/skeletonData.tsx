
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { color } from '../constant/color';
import { StyleSheet, View } from 'react-native';
import { rf, rh, rw } from './responsivedimention';

const SkeletonCard = () => {
    return (
        <View style={styles.skeletonContainer}>
            <MotiView
                from={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{
                    type: 'timing',
                    duration: 500,
                    loop: true,
                    repeatReverse: true
                }}
            >
                <View style={styles.viewheader}>
                    <Skeleton colorMode="dark" colors={[color.white + '20', color.black + '20']} radius="round" height={rh(3)} width={rw(35)} />
                </View>
                <View style={styles.skeletonRow}>
                    <Skeleton colorMode="dark" colors={[color.white + '20', color.black + '20']} radius="round" height={rf(5)} width={rf(5)} />
                    <View style={styles.skeletonText}>
                        <Skeleton colorMode="dark" colors={[color.white + '20', color.black + '20']} radius="round" height={rh(3)} width={rw(22)} />
                    </View>
                </View>
                <View style={styles.skeletonId}>
                    <Skeleton colorMode="dark" colors={[color.white + '20', color.black + '20']} radius="round" height={rh(2)} width={rw(35)} />
                </View>
            </MotiView>
        </View>
    );
};

const styles = StyleSheet.create({
    skeletonContainer: {
        width: rw(45),
        height: rh(20),
        borderWidth: rw(0.3),
        padding: rh(1),
        paddingLeft: rh(2),
        marginLeft: rh(1.6),
        borderRadius: 30,
        marginTop: rh(1),
        backgroundColor: color.skeletonColor,
        color: color.lightWhite
    },
    viewheader: {
        marginTop: rh(2)
    },
    skeletonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: rh(2),
    },
    skeletonText: {
        marginLeft: rw(2),
    },
    skeletonId: {
        marginTop: rh(2)
    },
});

export default SkeletonCard;
