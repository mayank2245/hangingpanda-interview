import { FlatList, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { rf, rh, rw } from '../../helpers/responsivedimention';
import Card from '../../components/Card'
import { useQuery } from '@tanstack/react-query';
import { ApiService } from '../../api/apicalls/ApiCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackgroundImage } from '../../assests/images';
import { color } from '../../constant/color';
import { useNavigation } from '@react-navigation/native';
import SkeletonCard from '../../helpers/skeletonData';

export default function AllQuestionPaper() {
    const [questionList, setQuestionList] = useState<any>([])
    const navigation = useNavigation()

    const handlegetallQues = async () => {
        const token = await AsyncStorage.getItem('MYtoken')
        if (token) {
            const res = await ApiService.questionPaper(token)
            return res
        }
    }

    const { data } = useQuery({
        queryKey: ['querry123'],
        queryFn: handlegetallQues,
    });

    useEffect(() => {
        if (data) {
            setQuestionList(data?.data?.questionPapers || []);
        }
    })

    return (
        <>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
            />
            <ImageBackground
                style={styles.backgroundImages}
                source={BackgroundImage}
                resizeMode="cover">
                <View style={styles.overlay}>
                    <Text style={styles.paperList}>List of Question Paper</Text>
                    {!questionList ?
                        <FlatList
                            style={styles.flatliststyle}
                            data={[1, 2, 3, 4, 5, 6, 7, 8]}
                            renderItem={() => <SkeletonCard />}
                            numColumns={2}
                        />
                        : <View style={styles.viewflatlist}>
                            <View style={styles.headerbox}>
                                <View style={styles.headerview}>
                                    <Text style={styles.headertext}>Total Question Paper :</Text>
                                    <Text style={styles.headertext}>{questionList.length}</Text>
                                </View>
                            </View>
                            <FlatList
                                style={styles.flatliststyle}
                                data={questionList}
                                renderItem={({ item }: any) => (
                                    <Card paperId={item.paperId} papertype={item.questionPaperType} timeLimit={item.timeLimit} />
                                )}
                                numColumns={2}
                            />
                        </View>
                    }
                </View>
            </ImageBackground>
        </>
    )
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
        marginTop: rh(4),
        marginBottom: rh(1),
        marginLeft: rh(2.8),
        color: color.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(3),
    },
    flatliststyle: {
        marginBottom: rh(6)
    },

    viewflatlist: {
        marginBottom: rh(8)
    },
    headerbox: {
        backgroundColor: '#fede68',
        borderWidth: rw(0.3),
        padding: 20,
        marginHorizontal: 16,
        height: rh(20),
        borderRadius: 30,
        marginTop: 10,
    },
    headerview: {
        flexDirection: 'row',
        gap: 8
    },
    headertext: {
        color: color.black,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(2),
    },
})

