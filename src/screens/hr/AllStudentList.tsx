import {
    ImageBackground,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    FlatList
} from "react-native";

import { Skeleton } from "moti/skeleton";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { color } from "../../constant/color";
import Addques from '../../assests/svg/addQues';
import BackArrow from "../../components/BackArrow";
import SkeletonCard from "../../helpers/skeletonData";
import { BackgroundImage } from "../../assests/images";
import CandidateCard from "../../components/CandidateCard";
import { rf, rh, rw } from "../../helpers/responsivedimention";

const questionType = ["All", "Javascript", "Python", "Java", "DSA"];

export default function AddQuestion({ route }: any) {
    const { candidateData } = route.params;
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [filteredQuestions, setFilteredQuestions] = useState<any[]>([{ email: "Hanging@gmail.com", interviewDate: "2024-09-10T10:00:00Z", name: "Hanging", questionPaperType: "DSA" }]);
    const [selectedType, setSelectedType] = useState<string>('All');
    const [questionList, setQuestionList] = useState<any[]>([{ email: "Hanging@gmail.com", interviewDate: "2024-09-10T10:00:00Z", name: "Hanging", questionPaperType: "DSA" }]);

    const handleSelectType = (item: string) => {
        setSelectedType(item);
    };
    useEffect(() => {
        const questions = [candidateData, ...questionList];
        setQuestionList(questions);
        if (selectedType === 'All') {
            if (questions.length !== 1) {
                setFilteredQuestions(questions);
            }
        } else {
            setFilteredQuestions(
                questions.filter((q: any) =>
                    q.questionPaperType.toLowerCase() === selectedType.toLowerCase()
                )
            );
        }
    }, [candidateData, selectedType]);

    const handleDeleteCard = (candidateEmail: string) => {
        const updatedCandidate = filteredQuestions.filter((fli) => fli.email === candidateEmail)
        setFilteredQuestions(updatedCandidate)
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
                        <Text style={styles.paperList}>Candidate's List</Text>
                    </View>
                    <View style={styles.allcandidate}>
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
                                    <View style={styles.viewheaderbox}>
                                        <View style={styles.viewsubheaderbox}>
                                            <Text style={styles.headertext}>Total</Text>
                                            <Text style={styles.headertext}>candidate</Text>
                                        </View>

                                        <Text style={[styles.headertext, {
                                            fontSize: rf(10),
                                        }]}>{questionList.length}</Text>
                                    </View>
                                    <View style={styles.headerboxflat}>
                                        <FlatList
                                            data={questionType}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity
                                                    onPress={() => handleSelectType(item)}
                                                    style={[
                                                        styles.itemtype,
                                                        selectedType === item
                                                            ? { backgroundColor: color.white }
                                                            : { borderWidth: rw(0.4), borderColor: color.white }
                                                    ]}
                                                >
                                                    <Text style={[styles.textheaderbox, selectedType === item ? { color: color.black } : { color: color.white }]}>{item}</Text>
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
                                            <CandidateCard candidateName={item.name} interviewDate={item.interviewDate} candidateEmail={item.email} paperType={item.questionPaperType} onDelete={handleDeleteCard} />
                                        )}
                                        numColumns={2}
                                    />
                                </View>
                            </>
                        )}
                    </View>
                    <View style={styles.addstudent}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.addquescss}
                            onPress={() => navigation.navigate("AddStudent")}
                        >
                            <View style={styles.addquessubmit}>
                                <Addques />
                                <Text style={styles.addquesText}>Add Candidate</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </ImageBackground>
        </View>
    );
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
        flexDirection: 'row'
    },
    paperList: {
        marginTop: rh(3.5),
        marginBottom: rh(1),
        marginLeft: rh(2),
        color: color.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(3),
    },
    itemtype: {
        marginRight: 10,
        borderRadius: 18,
        padding: rw(1),
    },
    viewflatlist: {
        marginBottom: rh(24),
    },
    enterQues: {
        fontFamily: 'Montserrat-Bold',
        color: color.green,
        fontSize: rf(2.3),
        marginTop: rh(2),
        marginHorizontal: rh(3.2)
    },
    addquessubmit: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: rw(2)
    },
    addquescss: {
        justifyContent: 'center',
        alignItems: "center",
        height: rh(8),
        backgroundColor: color.primaryRed,
        borderTopRightRadius: 25,
    },
    addquesText: {
        fontFamily: 'Montserrat-Bold',
        color: color.white,
        fontSize: rf(2.4),
        textAlign: 'center',
    },
    addstudent: {
        flex: 1,
        justifyContent: 'flex-end'
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
        marginTop: rh(1),
        width: rw(80)
    },
    textheaderbox: {
        paddingHorizontal: rh(0.8),
        fontFamily: "Montserrat-SemiBold"
    },
    flatliststyle: {
        marginBottom: rh(6),
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
    headertext: {
        color: color.white,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: rf(3),
    },
    allcandidate: {
        height: rh(89)
    },
    viewheaderbox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    viewsubheaderbox: {
        justifyContent: 'center'
    }
});
