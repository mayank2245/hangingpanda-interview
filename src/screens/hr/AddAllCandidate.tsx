import { FlatList, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiService } from '../../api/apiCalls/ApiCalls';
import { useMutation } from '@tanstack/react-query';
import { ShowToast } from '../../helpers/toast';
import { Add, Upload } from '../../assests/svg';
import { rf, rh, rw } from '../../helpers/responsivedimention';
import { color } from '../../constant/color';
import CandidateCard from '../../components/CandidateCard';
import { BackgroundImage } from '../../assests/images';
import BackArrow from '../../components/BackArrow';
import { useNavigation } from '@react-navigation/native';

export default function AddAllCandidate({ route }: any) {
    const { candidateData } = route.params || {};
    const Navigation = useNavigation();
    const [payload, setPayload] = useState({ interviews: candidateData });
    const [loader, setLoader] = useState(false)

    const handleaddCandidate = async () => {
        const token = await AsyncStorage.getItem('HrLogintoken');
        if (token && payload) {
            const res = await ApiService.addCandidate(token, payload);
            return res;
        }
        return { data: null };
    }

    const mutation = useMutation({
        mutationKey: ["handleaddCandidate"],
        mutationFn: handleaddCandidate,
        onSuccess: () => {
            const type = "success";
            const text1 = "Upload Successfully";
            ShowToast(type, text1);
            setLoader(false)
        },
        onError: () => { setLoader(false) }
    })

    const handleUpload = () => {
        setLoader(true)
        mutation.mutate();
    }

    return (
        <View>
            <StatusBar backgroundColor={'transparent'} translucent={true} />
            <ImageBackground
                style={styles.backgroundImage}
                source={BackgroundImage}
                resizeMode="cover">
                <View style={styles.safearea}>
                    <View style={styles.headerview}>
                        <BackArrow />
                        <Text style={styles.paperList}>Add Candidate</Text>
                    </View>
                    <TouchableOpacity onPress={() => Navigation.navigate("AddStudent", { candidatedata: candidateData })} style={styles.addQues}>
                        <Add style={styles.addQuesLogo} />
                        <Text style={[styles.addQuesText]}>Add Candidate</Text>
                    </TouchableOpacity>
                    <FlatList
                        style={styles.flatliststyle}
                        data={candidateData}

                        renderItem={({ item }) => (<>
                            <CandidateCard
                                candidateName={item.name}
                                interviewDate={item.interviewDate}
                                candidateEmail={item.email}
                                paperType={item.questionPaperType}
                                inteviewTime={item.interviewTime}
                                onDelete={(email: string) => {/* implement your onDelete functionality */ }}
                            />
                        </>
                        )}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}  // Ensure unique keys
                    />

                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={handleUpload}
                            style={[styles.uploadcss, !loader ? {} : { opacity: 0.5 }]}>
                            <Upload />
                            <Text style={styles.uploadText}>{!loader ? "Upload" : "Uploading"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        height: '100%'
    },
    safearea: {
        flex: 1,
        backgroundColor: color.black,
    },
    headerview: {
        flexDirection: 'row',
        marginTop: rh(1.2)
    },
    paperList: {
        marginTop: rh(3.5),
        marginBottom: rh(1),
        marginLeft: rh(2),
        color: color.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(3),
    },
    uploadcss: {
        height: rh(8),
        backgroundColor: color.primaryRed,
        borderTopRightRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: rw(2),
    },
    uploadText: {
        fontFamily: 'Montserrat-SemiBold',
        color: color.white,
        fontSize: rf(2.6),
    },
    flatliststyle: {
        marginBottom: rh(6),
    },
    addQues: {
        position: 'absolute',
        elevation: 2,
        zIndex: 10,
        width: rw(7),
        height: rh(15),
        marginTop: rh(40),
        marginLeft: rw(93),
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: color.primaryRed,
    },
    addQuesLogo: {
        height: rh(4),
        width: rw(4),
        marginTop: rh(1),
        marginLeft: rh(0.8),
    },
    addQuesText: {
        fontFamily: "Montserrat-SemiBold",
        width: rw(28),
        marginTop: rh(4.8),
        color: color.lightWhite,
        marginLeft: rh(-4.8),
        fontSize: rf(1.5),
        textAlign: 'center',
        transform: [{ rotate: '270deg' }],
    },
})
