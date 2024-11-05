import {
    ActivityIndicator,
    FlatList,
    ImageBackground,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Skeleton } from 'moti/skeleton';
import { Switch } from 'react-native-switch';

import { color } from '../../constant/color';
import SkeletonCard from '../../helpers/skeletonData';
import { BackgroundImage } from '../../assests/images';
import { ApiService } from '../../api/apiCalls/ApiCalls';
import { rf, rh, rw } from '../../helpers/responsivedimention';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackArrow from '../../components/BackArrow';
import RNText from '../../components/RNText';
import CandidateCard from '../../components/CandidateCard';
import CustomSwitch from '../../components/CustomSwitch';

export default function AllQuestionPaper() {
    const [questionList, setQuestionList] = useState<any[]>([]);
    const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);
    const [questiontype] = useState<string[]>(["All", "Javascript", "Python", "Java", "DSA"]);
    const [selectedtype, setSelectedtype] = useState<string>('All');
    const [isEnabled, setIsEnabled] = useState(false);
    const [nextPage, setNextPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>()
    const navigation = useNavigation();

    const handleDeleteCard = (candidateEmail: string) => {
        const updatedCandidate = filteredQuestions.filter((candidate) => candidate.email !== candidateEmail);
        setFilteredQuestions(updatedCandidate);
    }

    const handlegetallQues = async () => {
        const token = await AsyncStorage.getItem('HrLogintoken');
        if (token) {
            console.log(nextPage, "next page")
            const res = await ApiService.getAllCandidate(token, nextPage);
            return res;
        }
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['queryGetAllCandidate'],
        queryFn: handlegetallQues,
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage.nextCursor ?? false,
    });

    useEffect(() => {
        if (data) {
            const questions = data.pages.flatMap(page => page.data.candidates);
            if (totalPages === undefined) {
                setTotalPages(data.pages[0]?.data.totalPages)
            }
            setQuestionList(questions);
            let filtered = selectedtype === 'All'
                ? questions
                : questions.filter((q: any) =>
                    q.questionPaperType.toLowerCase() === selectedtype.toLowerCase()
                );

            if (isEnabled) {
                filtered = filtered.filter((q: any) => q.isGiven);
            } else {
                filtered = filtered.filter((q: any) => !q.isGiven);
            }

            setFilteredQuestions(filtered);
        }
    }, [data, selectedtype, isEnabled]);

    const handleselecttype = (item: string) => {
        setSelectedtype(item);
    };

    console.log(nextPage, "next page")
    const loadMore = () => {
        if (hasNextPage && !isFetchingNextPage && (nextPage <= totalPages)) {
            setNextPage(nextPage + 1)
            if (nextPage !== 1) {
                fetchNextPage();
            }
        }
    };

    return (
        <>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <ImageBackground style={styles.backgroundImages} source={BackgroundImage} resizeMode="cover">
                <View style={styles.overlay}>
                    <View style={styles.backarrow}>
                        <BackArrow />
                        <RNText style={styles.paperList} type="navigationSize" font='MontserratBold' colortype="white">Candidate's List</RNText>
                    </View>
                    {false ? (
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
                                        <RNText type="heading" font='MontserratSemiBold' colortype="white">Total</RNText>
                                        <RNText type="heading" font='MontserratSemiBold' colortype="white">Candidate</RNText>
                                    </View>
                                    <RNText style={styles.headertextno} font='MontserratSemiBold' colortype="white">{filteredQuestions.length}</RNText>
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
                                                <RNText style={[styles.textheaderbox, selectedtype === item ? { color: color.black } : { color: color.white }]} font='MontserratSemiBold'>{item}</RNText>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                                <CustomSwitch isEnable={setIsEnabled} />
                            </View>
                            <View style={styles.viewflatlist}>
                                <FlatList
                                    data={filteredQuestions}
                                    onEndReached={loadMore}
                                    renderItem={({ item }) => (
                                        <CandidateCard
                                            candidateName={item.name}
                                            interviewDate={item.interviewDate}
                                            candidateEmail={item.email}
                                            paperType={item.questionPaperType}
                                            onDelete={() => handleDeleteCard(item.email)}
                                        />
                                    )}
                                    ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="large" color={color.primaryRed} /> : null}
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
        marginTop: rh(3.5),
        marginBottom: rh(1),
        marginLeft: rh(2),
    },
    flatliststyle: {
        marginBottom: rh(6),
    },
    viewflatlist: {
        marginBottom: rh(34),
    },
    headerbox: {
        backgroundColor: color.primaryRed,
        borderWidth: rw(0.3),
        paddingHorizontal: rw(5),
        marginHorizontal: rw(3.8),
        height: rh(22),
        borderRadius: 30,
        marginTop: rh(1),
        marginBottom: rh(0.8)
    },
    headerview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headertextno: {
        fontSize: rf(10),
    },
    itemtype: {
        marginRight: 10,
        borderRadius: 18,
        padding: rw(0.6),
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
        marginVertical: rh(0.6),
    },
    textheaderbox: {
        paddingHorizontal: rh(0.8),
    },
    backarrow: {
        flexDirection: 'row',
        marginTop: rh(2.2)
    },
    viewsubheaderbox: {
        justifyContent: 'center'
    }
});
