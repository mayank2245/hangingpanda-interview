import {
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomModal from './Modal';
import { color } from '../constant/color';
import { randomColor } from '../helpers/randomColor';
import { rf, rh, rw } from '../helpers/responsivedimention'
import RNText from './RNText';

interface CardProps {
    candidateName: string,
    interviewDate: any,
    candidateEmail: string,
    paperType: string
    onDelete: (email: string) => void;
}

const CandidateCard: React.FC<CardProps> = ({ candidateName, candidateEmail, interviewDate, paperType, onDelete }) => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [assignedColor, setAssignedColor] = useState();
    if (!assignedColor) {
        const newColor = randomColor({ luminosity: 'light' });
        setAssignedColor(newColor);
    }
    const handledeletePress = () => {
        setVisibleModal(true)
    }
    const handledeleteCard = () => {
        onDelete(candidateEmail);
        setVisibleModal(false)
    }

    const isValidDate = (date) => {
        return !isNaN(new Date(date).getTime());
    };


    const modal = () => (
        <>
            <RNText style={styles.modalText} font='MontserratSemiBold' colortype="red">Are you sure you want to delete this Question Paper?</RNText>
            <TouchableOpacity style={styles.modalbox} onPress={handledeleteCard}>
                <RNText style={styles.modalText2} type="subHeading" font='MontserratSemiBold' colortype="white">Yes</RNText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalbox} onPress={() => setVisibleModal(false)}>
                <RNText style={styles.modalText2} type="subHeading" font='MontserratSemiBold' colortype="white">No</RNText>
            </TouchableOpacity>
        </>
    );

    return (
        <View
            style={[styles.viewstyle, { backgroundColor: assignedColor }]}
        >
            <View style={styles.headerRow}>
                <RNText style={styles.cardName} type="subHeading" font='MontserratBold' colortype="black">{candidateName}</RNText>
                <TouchableOpacity onPress={handledeletePress}>
                    <MaterialCommunityIcons
                        color="black"
                        style={styles.deleteIcon}
                        name="delete-outline"
                        size={24}
                    />
                </TouchableOpacity>
            </View>
            <RNText style={styles.cardEmail} font='MontserratSemiBold' colortype="black">{candidateEmail}</RNText>
            <View style={styles.row}>
                <MaterialCommunityIcons
                    style={styles.icon}
                    color="black"
                    name="clock-time-nine-outline"
                    size={18}
                />
                <RNText style={styles.cardtext3} font='MontserratSemiBold' colortype="black">
                    {interviewDate && !isNaN(new Date(interviewDate)) ? (
                        <>
                            {new Date(interviewDate).toISOString().split('T')[0]}{' '}
                            {new Date(interviewDate).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })}
                        </>
                    ) : (
                        'Invalid Date'
                    )}
                </RNText>
            </View>
            <RNText style={styles.cardtext} type="subHeading" font='MontserratBold' colortype="black">{paperType}</RNText>
            <CustomModal
                visible={visibleModal}
                onClose={() => setVisibleModal(false)}
                content={modal()}
                modaloverlaycss={styles.modaloverlayCss}
                contentcss={styles.modalcss}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewstyle: {
        width: rw(45),
        height: rh(20),
        borderWidth: rw(0.3),
        padding: 10,
        paddingLeft: rw(3),
        marginLeft: rw(3.4),
        borderRadius: 30,
        marginTop: rh(1),
        opacity: 0.8,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardtext: {
        height: rh(2.7),
        marginTop: rh(1.4),
        marginLeft: rw(1)

    },
    cardEmail: {
        height: rh(2.3),
        marginTop: rh(0.8),
        marginLeft: rw(1)

    },
    cardName: {
        height: rh(2.7),
        marginTop: rh(1.4),
        marginLeft: rw(1)

    },
    deleteIcon: {
        borderRadius: 12,
        padding: rf(0.4),
        backgroundColor: color.bacgroundlightblack,
        opacity: 0.8,
        marginTop: rh(0.6)
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: rh(0.3),
    },
    icon: {
        marginTop: rh(1.3),
    },
    cardtext2: {
        fontFamily: 'Montserrat-SemiBold',
        color: color.black,
        fontSize: rf(2),
        width: rw(30),
        marginTop: rh(0.8)
    },
    cardtext3: {
        height: rh(2.3),
        marginTop: rh(1),
        marginLeft: rw(0.2),
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
        textAlign: 'center',
        paddingHorizontal: rw(4),
        lineHeight: rh(3)
    },
    modalText2: {
        textAlign: 'center',
    },
    modaloverlayCss: {
        justifyContent: 'center',
        width: rw(100),
        backgroundColor: '#ffffff20',
        zIndex: 0,
    },
    modalcss: {
        height: rh(25),
        justifyContent: 'center',
        alignItems: 'center',
        width: rw(88),
        marginLeft: rw(6),
        backgroundColor: color.black,
        borderRadius: 25,
    },
});

export default CandidateCard;
