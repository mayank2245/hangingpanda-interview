import { FlatList, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Skeleton } from 'moti/skeleton';

import Card from '../../components/Card';
import { color } from '../../constant/color';
import SkeletonCard from '../../helpers/skeletonData';
import { BackgroundImage } from '../../assests/images';
import { ApiService } from '../../api/apicalls/ApiCalls';
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
                    <View style={{ flexDirection: 'row' }}>
                        <BackArrow></BackArrow>
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
                        <View style={styles.viewflatlist}>
                            <View style={styles.headerbox}>
                                <View style={styles.headerview}>
                                    <Text style={styles.headertext}>Total Question Paper:</Text>
                                    <Text style={styles.headertext}>{filteredQuestions.length}</Text>
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
                                                        ? { backgroundColor: color.primaryRed, borderWidth: 1 }
                                                        : {}
                                                ]}
                                            >
                                                <Text style={[styles.textheaderbox, selectedtype === item ? { color: color.white, } : {}]}>{item}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                            </View>
                            <FlatList
                                style={styles.flatliststyle}
                                data={filteredQuestions}
                                renderItem={({ item }: any) => (
                                    <Card paperId={item.paperId} papertype={item.questionPaperType} timeLimit={item.timeLimit} />
                                )}
                                numColumns={2}
                            />
                        </View>
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
        backgroundColor: color.black,
        height: rh(100),
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
        marginBottom: rh(8),
    },
    headerbox: {
        backgroundColor: '#fede68',
        borderWidth: rw(0.3),
        padding: 20,
        marginHorizontal: 16,
        height: rh(20),
        borderRadius: 30,
        marginTop: 10,
        marginBottom: rh(0.8)
    },
    headerview: {
        flexDirection: 'row',
        gap: 8,
    },
    headertext: {
        marginTop: rh(2),
        color: color.black,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(3),
    },
    itemtype: {
        marginRight: 10,
        borderWidth: rw(0.4),
        borderRadius: 18,
        padding: rw(1.8),
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
        marginLeft: rw(1),
        marginTop: rh(4),
        width: rw(80)
    },
    textheaderbox: {
        paddingHorizontal: rh(0.8),
        fontFamily: "Montserrat-SemiBold"
    }
});
