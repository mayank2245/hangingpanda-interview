import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { rf, rh, rw } from '../helpers/Responsivedimention'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiService } from '../api/apicalls/ApiCalls';
import { useQuery } from '@tanstack/react-query';
import { RandomColor } from '../helpers/RandomColor';

interface CardProps {
    paperId: number,
    papertype: string,
    timeLimit: string | number,
}

const Card: React.FC<CardProps> = ({ paperId, papertype, timeLimit }) => {
    const [singlePaperid, setSinglePaperid] = useState<any>()
    const navigation = useNavigation();


    const handledeletePress = () => {
        // Your delete logic here
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


    return (
        <TouchableOpacity
            style={[styles.viewstyle, { backgroundColor: RandomColor, opacity: 0.8 }]}
            onPress={() => handleSingleQues(paperId)}
        >
            <View style={styles.headerRow}>
                <Text style={[styles.cardtext, { marginTop: rh(1) }]}>{papertype}</Text>
                <TouchableOpacity onPress={handledeletePress}>
                    <MaterialCommunityIcons
                        color="black"
                        style={[styles.deleteIcon, { marginTop: rh(0.6) }]}
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
                <Text style={[styles.cardtext2, {
                    marginTop: rh(0.7), fontFamily: 'Montserrat-Bold',
                    marginLeft: rw(2.5),
                    fontSize: rf(3.6),
                }]}>
                    {timeLimit}
                </Text>
                <Text style={[styles.cardtext, { marginTop: rh(1) }]}> min</Text>
            </View>

            <View style={{ marginTop: rh(1) }}>
                <Text style={styles.cardtext2}>{paperId}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewstyle: {
        width: rw(45),
        height: rh(20),
        borderWidth: rw(0.3),
        padding: 10,
        paddingLeft: 16,
        marginLeft: 15,
        borderRadius: 30,
        marginTop: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardtext: {
        color: '#000000',
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(2.1),
    },
    deleteIcon: {
        borderRadius: 12,
        padding: 3,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        opacity: 0.8,
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
        color: '#000000',
        fontSize: rf(2),
    },
});

export default Card;
