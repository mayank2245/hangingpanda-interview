import { FlatList, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Skeleton } from 'moti/skeleton';

import Card from '../../components/Card';
import { color } from '../../constant/color';
import SkeletonCard from '../../helpers/skeletonData';
import { BackgroundImage } from '../../assests/images';
import { ApiService } from '../../api/apiCalls/ApiCalls';
import { rf, rh, rw } from '../../helpers/responsivedimention';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackArrow from '../../components/BackArrow';

export default function AllQuestionPaper() {
    const [questionList, setQuestionList] = useState<any>([]);
    const [filteredQuestions, setFilteredQuestions] = useState<any>([]);
    const [questiontype] = useState<string[]>(["All", "Javascript", "Python", "Java", "DSA"]);
    const [selectedtype, setSelectedtype] = useState<string>('All');
    const navigation = useNavigation();



    const handlegetallQues = async () => {
        const token = await AsyncStorage.getItem('MYtoken');
        if (token) {
            const res = await ApiService.questionPaper(token);
            return res;
        }
    };

    const { data, isLoading } = useQuery({
        queryKey: ['querry123'],
        queryFn: handlegetallQues,
    });

    useEffect(() => {
        if (data?.data?.questionPapers) {
            const questions = data.data.questionPapers;
            setQuestionList(questions);
            if (selectedtype === 'All') {
                setFilteredQuestions(questions);
            } else {
                setFilteredQuestions(
                    questions.filter((q: any) =>
                        q.questionPaperType.toLowerCase() === selectedtype.toLowerCase()
                    )
                );
            }
        }
    }, [data, selectedtype]);

    const handleselecttype = (item: string) => {
        setSelectedtype(item);
    };

    return (
        <>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <ImageBackground style={styles.backgroundImages} source={BackgroundImage} resizeMode="cover">
                <View style={styles.overlay}>
                    <View style={styles.backarrow}>
                        <BackArrow />
                        <Text style={styles.paperList}>List of Question Paper</Text>
                    </View>

                    {isLoading ? (
                        <>
                            <View style={styles.viewheader}>
                                <View style={styles.viewsubheaders}>
                                    <Skeleton colorMode="dark" colors={[color.white + '20', color.black + '20']} radius="round" height={rh(3)} width={rw(80)} />
                                </View>
                                <View style={styles.viewsubheader}>
                                    <Skeleton colorMode="dark" colors={[color.white + '20', color.black + '20']} radius="round" height={rh(4)} width={rw(80)} />
                                </View>
                            </View>
                            <FlatList
                                style={styles.flatliststyle}
                                data={[1, 2, 3, 4, 5, 6, 7, 8]}
                                renderItem={() => <SkeletonCard />}
                                numColumns={2}
                            />
                        </>
                    ) : (
                        <>
                            <View style={styles.headerbox}>
                                <View style={styles.headerview}>
                                    <View style={styles.viewsubheaderbox}>
                                        <Text style={styles.headertext}>Total</Text>
                                        <Text style={styles.headertext}>Question</Text>
                                    </View>
                                    <Text style={styles.headertextno}>{filteredQuestions.length}</Text>
                                </View>
                                <View style={styles.headerboxflat}>
                                    <FlatList
                                        data={questiontype}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                onPress={() => handleselecttype(item)}
                                                style={[
                                                    styles.itemtype,
                                                    selectedtype === item
                                                        ? { backgroundColor: color.white }
                                                        : { borderWidth: rw(0.4), borderColor: color.white }
                                                ]}
                                            >
                                                <Text style={[styles.textheaderbox, selectedtype === item ? { color: color.black, } : { color: color.white }]}>{item}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                            </View>
                            <View style={styles.viewflatlist}>
                                <FlatList
                                    style={styles.flatliststyle}
                                    data={filteredQuestions}
                                    renderItem={({ item }: any) => (
                                        <Card paperId={item.paperId} papertype={item.questionPaperType} timeLimit={item.timeLimit} />
                                    )}
                                    numColumns={2}
                                />
                            </View>
                        </>
                    )}
                </View>
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({
    backgroundImages: {
        height: '100%',
        width: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: color.black,
        opacity: 0.9,
    },
    paperList: {
        marginTop: rh(3.4),
        marginBottom: rh(1),
        marginLeft: rh(2),
        color: color.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(3),
    },
    flatliststyle: {
        marginBottom: rh(6),
    },
    viewflatlist: {
        marginBottom: rh(28),
    },
    headerbox: {
        backgroundColor: color.primaryRed,
        borderWidth: rw(0.3),
        paddingHorizontal: rw(5),
        marginHorizontal: 16,
        height: rh(20),
        borderRadius: 30,
        marginTop: rh(1),
        marginBottom: rh(0.8)
    },
    headerview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headertext: {
        color: color.white,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(3),
    },
    headertextno: {
        color: color.white,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(10),
    },
    itemtype: {
        marginRight: 10,
        borderRadius: 18,
        padding: rw(1),
    },
    viewheader: {
        backgroundColor: '#D9D9D930',
        borderWidth: rw(0.3),
        padding: 20,
        marginHorizontal: 16,
        height: rh(20),
        borderRadius: 30,
        marginTop: 10,
        color: color.lightWhite
    },
    viewsubheader: {
        marginTop: rh(4)
    },
    viewsubheaders: {
        marginTop: rh(2.4)
    },
    headerboxflat: {
        marginTop: rh(1),

    },
    textheaderbox: {
        paddingHorizontal: rh(0.8),
        fontFamily: "Montserrat-SemiBold"
    },
    backarrow: {
        flexDirection: 'row',
        marginTop: rh(2.2)
    },
    viewsubheaderbox: {
        justifyContent: 'center'
    }
});
