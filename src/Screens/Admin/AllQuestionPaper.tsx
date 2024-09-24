import { FlatList, ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { rf, rh, rw } from '../../Helpers/Responsivedimention';
import Card from '../../Components/card'
import { useQueries, useQuery } from '@tanstack/react-query';
import { ApiService } from '../../API/apiCalls/apiCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'moti';
const bgImage = require('../../Assests/HeaderImage.png');

export default function AllQuestionPaper() {
    const [questionList, setQuestionList] = useState<any>()
    const handlegetallQues = async () => {
        const token = await AsyncStorage.getItem('MYtoken')
        if (token) {
            console.log("add question papaer call")
            const res = token && await ApiService.questionPaper(token)
            return res
        }
    }

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['querryke123y'],
        queryFn: handlegetallQues,
    });


    useEffect(() => {
        if (data) {
            setQuestionList(data?.data?.questionPapers || []);
        }
    }, [data]);


    return (
        <View>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
            />
            <ImageBackground
                style={styles.backgroundImages}
                source={bgImage}
                resizeMode="cover">
                <View style={styles.overlay}>

                    <Text style={styles.paperList}>List of Question Paper :- </Text>
                    {/* <View style={{
                        backgroundColor: '#fede68', borderWidth: rw(0.3),
                        padding: 20,
                        marginHorizontal: 16,
                        height: rh(20),
                        borderRadius: 30,
                        marginTop: 10,
                    }}>
                        <Text style={{
                            color: '#000000',
                            fontFamily: 'Montserrat-SemiBold',
                            fontSize: rf(2),
                        }}>Data</Text>
                    </View> */}

                    <FlatList
                        style={{ marginBottom: rh(4) }}
                        data={questionList}
                        renderItem={({ item }) => (
                            <Card paperId={item.paperId} papertype={item.questionPaperType} timeLimit={item.timeLimit} />
                        )}
                        numColumns={2}
                    />
                </View>

            </ImageBackground>
        </View >
    )
}

const styles = StyleSheet.create({
    backgroundImages: {
        height: '100%',
        width: '100%',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',

        height: rh(100),
    },
    paperList: {
        marginTop: rh(4),
        marginBottom: rh(1),
        marginLeft: rh(2.8),
        color: '#FFFFFF',
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(3),
    }
})

