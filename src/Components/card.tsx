import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomModal from './Modal';
import { color } from '../constant/color';
import { randomColor } from '../helpers/randomColor';
import { ApiService } from '../api/apicalls/ApiCalls';
import { rf, rh, rw } from '../helpers/responsivedimention'

interface CardProps {
    paperId: number,
    papertype: string,
    timeLimit: string | number,
}

const Card: React.FC<CardProps> = ({ paperId, papertype, timeLimit }) => {
    const navigation = useNavigation();
    const [singlePaperid, setSinglePaperid] = useState<any>()
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [assignedColor, setAssignedColor] = useState();



    if (!assignedColor) {
        const newColor = randomColor({ luminosity: 'light' });
        setAssignedColor(newColor);
    }

    const handledeletePress = () => {
        setVisibleModal(true)
    }

    const handlegetallQues = async () => {
        const token = await AsyncStorage.getItem('MYtoken');
        if (token && singlePaperid) {
            const res = await ApiService.singleQuestionPaper(token, singlePaperid);
            return res;
        }
        return { data: null };
    };

    const { data, isSuccess, refetch } = useQuery({
        queryKey: ['singleQuestionPaper', singlePaperid],
        queryFn: handlegetallQues,
        enabled: !!singlePaperid,
    });

    if (isSuccess && data?.data?.questionPapers?.questions) {
        navigation.navigate('ShowData', { questionData: data?.data?.questionPapers?.questions });
    }

    const handleSingleQues = (paperId: number) => {
        if (paperId) {
            setSinglePaperid(paperId);
            refetch();
        }
    };

    const modal = () => (
        <>
            <Text style={styles.modalText}>
                Are you sure you want to delete this Question Paper?
            </Text>
            <Pressable style={styles.modalbox}>
                <Text style={styles.modalText2}>Yes</Text>
            </Pressable>
            <Pressable style={styles.modalbox} onPress={() => setVisibleModal(false)}>
                <Text style={styles.modalText2}>No</Text>
            </Pressable>
        </>
    );

    return (
        <TouchableOpacity
            style={[styles.viewstyle, { backgroundColor: assignedColor }]}
            onPress={() => handleSingleQues(paperId)}
        >
            <View style={styles.headerRow}>
                <Text style={styles.cardtext}>{papertype}</Text>
                <TouchableOpacity onPress={handledeletePress}>
                    <MaterialCommunityIcons
                        color="black"
                        style={styles.deleteIcon}
                        name="delete-outline"
                        size={24}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <MaterialCommunityIcons
                    style={styles.icon}
                    color="black"
                    name="clock-time-nine-outline"
                    size={35}
                />
                <Text style={styles.cardtext3}>
                    {timeLimit}
                </Text>
                <Text style={styles.cardtext}> min</Text>
            </View>

            <CustomModal
                visible={visibleModal}
                onClose={() => setVisibleModal(false)}
                content={modal()}
                modaloverlaycss={styles.modaloverlayCss}
                contentcss={styles.modalcss}
            />
        </TouchableOpacity>
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
        marginTop: rh(0.7),
        fontFamily: 'Montserrat-Bold',
        color: color.black,
        marginLeft: rw(2.5),
        fontSize: rf(3.6),
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

export default Card;
