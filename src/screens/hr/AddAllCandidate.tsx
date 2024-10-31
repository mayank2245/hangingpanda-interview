import { FlatList, ImageBackground, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
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
import RNText from '../../components/RNText';

export default function AddAllCandidate({ route }: any) {
    const { candidateData } = route.params || {};
    const [candidateList, setCandidateList] = useState(candidateData)
    const Navigation = useNavigation();
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setCandidateList(candidateData);
    }, [candidateData]);

    const handleaddCandidate = async () => {
        const token = await AsyncStorage.getItem('HrLogintoken');
        if (token && candidateList) {
            const payload = { interviews: candidateList }
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
        onError: (err) => { setLoader(false), console.log(err) }
    })

    const handleUpload = () => {
        setLoader(true)
        mutation.mutate();
    }
    const handleDelete = (email) => {
        setCandidateList(prevData => prevData.filter(candidate => candidate.email !== email));
    };
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
                        <RNText style={styles.paperList} type="navigationSize" font='MontserratBold' colortype="white">Add Candidate</RNText>
                    </View>
                    <TouchableOpacity onPress={() => Navigation.navigate("AddStudent", { candidatedata: candidateList })} style={styles.addQues}>
                        <Add style={styles.addQuesLogo} />
                        <RNText style={styles.addQuesText} font='MontserratSemiBold' colortype="lightWhite">Add Candidate</RNText>
                    </TouchableOpacity>
                    <FlatList
                        style={styles.flatliststyle}
                        data={candidateList}
                        renderItem={({ item }) => (<>
                            <CandidateCard
                                candidateName={item.name}
                                interviewDate={item.interviewDate}
                                candidateEmail={item.email}
                                paperType={item.questionPaperType}
                                onDelete={(email: string) => { handleDelete(email) }}
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
                            style={[styles.uploadcss, !loader ? "" : { opacity: 0.5 }]}>
                            <Upload />
                            <RNText type="subHeading" font='MontserratSemiBold' colortype="white">{!loader ? "Upload" : "Uploading"}</RNText>
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
    },
    uploadcss: {
        height: rh(8),
        backgroundColor: color.primaryRed,
        borderTopRightRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: rw(2),
    },
    flatliststyle: {
        marginBottom: rh(6),
    },
    addQues: {
        position: 'absolute',
        elevation: 2,
        zIndex: 10,
        width: rw(7),
        height: rh(17),
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
        marginLeft: rh(1),
    },
    addQuesText: {
        fontSize: rf(1.7),
        width: rw(28),
        marginTop: rh(5.8),
        marginLeft: rh(-4.6),
        textAlign: 'center',
        transform: [{ rotate: '270deg' }],
    },
})
