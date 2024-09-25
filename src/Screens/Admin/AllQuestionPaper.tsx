import { FlatList, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { rf, rh, rw } from '../../helpers/Responsivedimention';
import Card from '../../components/Card'
import { useQuery } from '@tanstack/react-query';
import { ApiService } from '../../api/apicalls/ApiCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackgroundImage } from '../../assests/images';
import { Color } from '../../constant/Color';

export default function AllQuestionPaper() {
    const [questionList, setQuestionList] = useState<any>()

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
        <View>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
            />
            <ImageBackground
                style={styles.backgroundImages}
                source={BackgroundImage}
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
        backgroundColor: Color.black,

        height: rh(100),
    },
    paperList: {
        marginTop: rh(4),
        marginBottom: rh(1),
        marginLeft: rh(2.8),
        color: Color.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(3),
    }
})

