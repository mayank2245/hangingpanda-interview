import {
    Pressable,
    StyleSheet,
    Text,
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

interface CardProps {
    candidateName: string,
    interviewDate: any,
    inteviewTime: any,
    candidateEmail: string,
    paperType: string
    onDelete: (email: string) => void;
}

const CandidateCard: React.FC<CardProps> = ({ candidateName, candidateEmail, interviewDate, paperType, onDelete, inteviewTime }) => {
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



    const modal = () => (
        <>
            <Text style={styles.modalText}>
                Are you sure you want to delete this Question Paper?
            </Text>
            <TouchableOpacity style={styles.modalbox} onPress={handledeleteCard}>
                <Text style={styles.modalText2}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalbox} onPress={() => setVisibleModal(false)}>
                <Text style={styles.modalText2}>No</Text>
            </TouchableOpacity>
        </>
    );

    return (
        <View
            style={[styles.viewstyle, { backgroundColor: assignedColor }]}
        >
            <View style={styles.headerRow}>
                <Text style={styles.cardName}>{candidateName}</Text>
                <TouchableOpacity onPress={handledeletePress}>
                    <MaterialCommunityIcons
                        color="black"
                        style={styles.deleteIcon}
                        name="delete-outline"
                        size={24}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.cardEmail}>{candidateEmail}</Text>
            <View style={styles.row}>
                <MaterialCommunityIcons
                    style={styles.icon}
                    color="black"
                    name="clock-time-nine-outline"
                    size={18}
                />
                {
                    !inteviewTime ? <Text style={styles.cardtext3}>

                        {new Date(interviewDate).toISOString().split('T')[0]} {new Date(interviewDate).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                        })}
                    </Text> : <Text style={styles.cardtext3}>
                        {interviewDate} {inteviewTime}
                    </Text>

                }

            </View>
            <Text style={styles.cardtext}>{paperType}</Text>
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
        color: color.black,
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(2.1),
        marginTop: rh(2),
        marginLeft: rw(1)

    },
    cardEmail: {
        color: color.black,
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(1.4),
        marginTop: rh(0.8),
        marginLeft: rw(1)

    },
    cardName: {
        color: color.black,
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(1.8),
        marginTop: rh(1),
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
        marginTop: rh(1),
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
        marginTop: rh(0.9),
        fontFamily: 'Montserrat-Bold',
        color: color.black,
        marginLeft: rw(1.5),
        fontSize: rf(1.4),
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
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        fontSize: rf(2.4),
        paddingHorizontal: rw(4),
        color: color.primaryRed,
        lineHeight: rh(3)
    },
    modalText2: {
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        fontSize: rf(2.2),
        color: color.white,
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
