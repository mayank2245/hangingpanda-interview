import {
    ImageBackground,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useEffect, useState } from 'react';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import IconArrow from 'react-native-vector-icons/AntDesign';
import IconCsv from 'react-native-vector-icons/FontAwesome5';

import CustomModal from '../../components/Modal';
import { color } from '../../constant/color';
import { csvToJson, csvToJsonStudent } from '../../helpers/csvToJson';
import { dataText } from '../../constant/staticData';
import { BackgroundImage } from '../../assests/images';
import { AddQues, CrossIcon, Logo } from '../../assests/svg';
import { rf, rh, rw } from '../../helpers/responsivedimention';


export default function App(): React.JSX.Element {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [parsedData, setParsedData] = useState<any>(null);
    const [fileName, setFileName] = useState('');
    const navigation = useNavigation();
    const [visiblemodal, setVisiblemodal] = useState(false);
    const [Index, setIndex] = useState<number>()
    const [showdata, setShowdata] = useState([])

    const pickDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setSelectedFile(res);
            const fileContent = await RNFS.readFile(res[0].uri, 'utf8');
            const parsedResult = csvToJsonStudent(fileContent);
            setParsedData(parsedResult);
        } catch (err: any) {
            console.log('Error:', err.message);
        }
    };

    const removeFile = () => {
        setParsedData(null);
    };

    const handleaddonebyone = () => {
        setVisiblemodal(true);
    }

    const handleCol = (i: number) => {
        setIndex(i);
        setVisiblemodal(false)

    }

    useEffect(() => {
        if (parsedData && selectedFile) {
            const { name } = selectedFile[0];
            setFileName(name);
        }
    }, [parsedData]);

    const modalData = () => {
        return (
            <View style={styles.modalcss}>
                <CrossIcon style={styles.crosscut} onPress={() => { setVisiblemodal(false) }} />
                {dataText?.map((ei, i) => {
                    return (
                        <Pressable key={i} onPress={() => handleCol(i)} style={[styles.modalbox, Index === i ? { backgroundColor: color.primaryRed } : '']}>
                            <Text style={[styles.modalText, Index === i ? { color: color.white } : { color: color.primaryRed }]}>{ei.title}</Text>
                        </Pressable>
                    )
                })}
            </View>
        )
    }

    return (
        <SafeAreaView>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
            />
            <ImageBackground
                style={styles.backgroundImage}
                source={BackgroundImage}
                resizeMode="cover">
                <View style={styles.overlay}>
                    <ScrollView>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.quesformatePress}
                            onPress={() => navigation.navigate('StudentCsvFormate')}>
                            <Text style={styles.quesformate}>Add Student Formate</Text>
                        </TouchableOpacity>
                        <Pressable
                            style={styles.filePickerContainer}
                            onPress={pickDocument}>
                            <View style={styles.fileInfoContainer}>
                                {parsedData ? (
                                    <>
                                        <Pressable
                                            style={styles.removeFileButton}
                                            onPress={removeFile}>
                                            <CrossIcon />
                                        </Pressable>
                                        <IconCsv
                                            style={styles.uploadPromptIcon2}
                                            name="file-csv"
                                            size={36}
                                            color={color.lightBlue}
                                        />
                                        <Text style={styles.uploadPromptTitle}>{fileName}</Text>
                                        <Text style={styles.uploadPromptTitle2}>
                                            Click next button to preview
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        <Icon
                                            style={styles.uploadPromptIcon}
                                            name="upload-cloud"
                                            size={48}
                                            color={color.lightRed}
                                        />
                                        <Text style={styles.uploadPromptTitle}>
                                            Import questions Excel or CSV
                                        </Text>
                                        <Text style={styles.uploadPromptTitle2}>
                                            Drag or click to upload
                                        </Text>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={[styles.addquestion]}
                                            onPress={() => navigation.navigate("AllStudentList", { candidateData: { email: "Hanging@gmail.com", interviewDate: "2024-09-10T10:00:00Z", name: "Hanging", questionPaperType: "DSA" } })}
                                        >
                                            <View style={styles.addquesManually}>
                                                <AddQues />
                                                <Text style={styles.addquestiontext}>Add Candidate Manually</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <CustomModal visible={visiblemodal} onClose={() => setVisiblemodal(false)} content={modalData()} modaloverlaycss={{}} contentcss={{}} />
                                    </>
                                )}
                            </View>
                        </Pressable>
                        {parsedData && (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.nextButton}
                                onPress={() => {
                                    navigation.navigate('AllStudentList', { candidateData: parsedData });
                                }}>
                                <Text style={styles.nextButtonText}>Next</Text>
                                <IconArrow name="arrowright" size={24} color={color.white} />
                            </TouchableOpacity>
                        )}
                        <Logo style={styles.logoImage} />
                        <Text style={styles.logoText}>HANGING PANDA PRODUCTS</Text>
                    </ScrollView>
                </View>
            </ImageBackground>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        height: '100%',
        width: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: color.black,
        opacity: 0.85,
    },
    filePickerContainer: {
        marginTop: rh(3),
        borderRadius: 19,
        paddingBottom: rh(4),
        height: rh(21.8),
        width: "90%",
        margin: 'auto',
        backgroundColor: color.lightWhite,
    },
    fileInfoContainer: {
        borderRadius: 19,
        borderWidth: rw(0.6),
        height: rh(21.8),
        width: '100%',
        margin: 'auto',
        borderStyle: 'dashed',
        borderColor: color.lightBlue,
    },
    removeFileButton: {
        position: 'absolute',
        marginTop: rh(1.6),
        marginLeft: rw(81)
    },
    fileNameText: {
        fontFamily: 'NunitoSans_7pt-SemiBold',
        color: color.lightBlue,
        fontSize: rf(2),
        textAlign: 'center',
        marginTop: rh(4),
    },
    uploadPromptIcon: {
        marginTop: rh(4),
        marginLeft: rw(38),
    },
    uploadPromptIcon2: {
        marginTop: rh(4),
        marginLeft: rw(40),
    },
    uploadPromptTitle: {
        fontFamily: 'NunitoSans_7pt-SemiBold',
        fontSize: rf(2),
        textAlign: 'center',
        color: color.lightRed,
        paddingHorizontal: rw(2),
        marginTop: rh(1),
    },
    uploadPromptTitle2: {
        fontFamily: 'NunitoSans_7pt-SemiBold',
        fontSize: rf(1.8),
        textAlign: 'center',
        color: color.lightBlue,
        marginTop: rh(0.4),
    },
    nextButton: {
        backgroundColor: color.primaryRed,
        borderRadius: 10,
        height: rh(4.5),
        width: rw(29),
        justifyContent: 'center',
        gap: rw(2),
        paddingHorizontal: rh(3),
        paddingTop: rh(1),
        flexDirection: 'row',
        marginTop: rh(4),
        marginLeft: rw(34)
    },
    nextButtonText: {
        fontFamily: 'NunitoSans_7pt-SemiBold',
        color: color.white,
        fontSize: rf(2),
    },
    logoImage: {
        position: 'absolute',
        marginTop: rh(63),
        width: rw(3),
        height: rh(4),
        marginLeft: rw(4)
    },
    logoText: {
        fontFamily: 'Montserrat-SemiBold',
        position: 'absolute',
        opacity: 0.7,
        color: color.lightWhite,
        fontSize: rf(4.4),
        height: rh(18),
        width: rw(55),
        marginTop: rh(78),
        marginLeft: rw(5),
    },
    modalcss: {
        backgroundColor: color.black,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        width: rw(100),
        margin: "auto",
        zIndex: 20

    },
    modalbox: {
        borderWidth: rw(0.8),
        borderColor: color.primaryRed,
        borderRadius: 15,
        width: rw(90),
        margin: 'auto',
        height: rh(8),
        marginTop: rh(1.5),
        paddingTop: rh(2),
        marginBottom: rh(1),
    },
    modalText: {
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        fontSize: rf(2.7),
    },
    crosscut: {
        marginTop: rh(2.3),
        marginLeft: rh(41),
        marginBottom: rh(1)
    },
    addquestion: {
        marginTop: rh(12),
        backgroundColor: color.primaryRed,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: rh(1.3),
    },
    addquestion2: {
        marginTop: rh(3),
        backgroundColor: color.primaryRed,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: rh(1.3),
    },
    addquestiontext: {
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        color: color.white,
        fontSize: rf(1.9),
    },
    seeAllQues: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: rw(2)
    },
    addquesManually: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: rw(2)
    },
    quesformate: {
        fontFamily: 'Montserrat-SemiBold',
        color: color.white,
        fontSize: rf(1.3),
        textAlign: 'center',
    },
    quesformatePress: {
        marginTop: rh(6),
        height: rh(2.5),
        width: rw(36),
        marginLeft: rw(59),
        backgroundColor: color.primaryRed,
        borderRadius: 8,
        justifyContent: 'center'
    }
});

