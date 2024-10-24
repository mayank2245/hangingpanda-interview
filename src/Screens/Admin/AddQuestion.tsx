import {
    ImageBackground,
    Pressable,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    View
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import WheelPicker from '@quidone/react-native-wheel-picker';

import Add from "../../assests/svg/add";
import { color } from "../../constant/color";
import Addques from '../../assests/svg/addQues';
import CrossIcon from "../../assests/svg/crossIcon";
import { BackgroundImage } from "../../assests/images";
import { dataText, alphabet } from '../../constant/staticData'
import { rf, rh, rw } from "../../helpers/responsivedimention";
import BackArrow from "../../components/BackArrow";
import CustomModal from "../../components/Modal";



const datawheel = [...Array(5).keys()].map((index) => ({
    value: index + 2,
    label: (index + 2).toString(),
}));

export default function AddQuestion({ route }: any) {
    const { data, Id } = route.params;
    const [ques, setQues] = useState("")
    const [index, setIndex] = useState<number>()
    const [openmodal, setOpenmodal] = useState(false)
    const [queswrite, setQueswrite] = useState(true)
    const [mcqInput, setMcqInput] = useState("")
    const [value, setValue] = useState(0);
    const [answer, setAnswer] = useState("")
    const [inputans, setInputAns] = useState({});
    const [currentInputIndex, setCurrentInputIndex] = useState(0);
    const [openmodal2, setOpenmodal2] = useState(true)
    const [openmodal3, setOpenmodal3] = useState(false)
    const [selected, setSelected] = useState<number>()
    const [displayedData, setDisplayedData] = useState<any>([]);
    const [nextOption, setNextOption] = useState<boolean>(true)

    const navigate = useNavigation();

    const handleNext = () => {
        setDisplayedData(inputans)
        if (currentInputIndex < value) {
            setCurrentInputIndex(currentInputIndex + 1);
        }
        setNextOption(true)
    }

    const handleAddques = () => {
        if (ques !== "") {
            setQueswrite(false)
        }
    }

    const handleAddmcq = () => {
        setMcqInput("0")
    }

    const handleSubmit = () => {
        if (answer !== "") {
            setQueswrite(true)
            const sendData = [...data, {
                sn: data.length + 1,
                question: ques,
                answer: answer,
                type: 'Input',
            }]
            setQues("")
            setAnswer("")
            navigate.navigate("ShowData", { data2: sendData })
        }
    }

    const handleSubmit2 = () => {
        setCurrentInputIndex(currentInputIndex + 1);
        setDisplayedData(inputans)
        setOpenmodal3(true)
    }

    const handleCol = (i: number) => {
        setOpenmodal(false)
    }

    const handleInputChange = (text: string, i: number) => {
        if (text === "") {
            setNextOption(true)
        }
        else {
            setNextOption(false)
            const updatedInputs = { ...inputans };
            const letterKey = alphabet[i];
            updatedInputs[letterKey] = text;
            setInputAns(updatedInputs);
        }

    }

    const handleSelectmcq = (i: number) => {
        setSelected(i)
    }

    const handleselectmcq = () => {
        const sendData = [...data, {
            sn: data.length + 1,
            question: ques,
            options: inputans,
            type: 'MCQ',
            correctOption: selected,
        }]
        navigate.navigate("ShowData", { data2: sendData })
        setQueswrite(true)
        setQues("")
        setInputAns({})
        setDisplayedData({})
        setMcqInput("")
        setCurrentInputIndex(0)
        setSelected(-1)
        setOpenmodal3(false)
    }

    const modalData = () => {
        return (
            <View style={styles.modalcss}>
                <CrossIcon style={styles.crosscut} onPress={() => { setOpenmodal(false) }} />
                {dataText?.map((ei, i) => {
                    return (
                        <Pressable key={i} onPress={() => { handleCol(i) }} style={[styles.modalbox, index === i ? { backgroundColor: color.primaryRed } : '']}>
                            <Text style={[styles.modalText, index === i ? { color: color.white } : { color: color.primaryRed }]}>{ei.title}</Text>
                        </Pressable>
                    )
                })}
            </View>
        )
    }

    const modalData2 = () => {
        return (
            <>
                <Text style={styles.optionrequire}>How much option do you want?</Text>
                <View style={styles.viewenteroption}>
                    <Text style={styles.enteroption}>Enter the Option</Text>
                    <WheelPicker
                        itemTextStyle={{ color: 'white', borderRadius: 20 }}
                        width={50}
                        data={datawheel}
                        onValueChanged={({ item: { value } }) => setValue(value)}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.addquescss]}
                    onPress={handleAddmcq}
                >
                    <View style={styles.addquessubmit}>
                        <Addques />
                        <Text style={styles.addquesText}>Add</Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    const modalData3 = () => {
        return (
            <>
                <Text style={styles.selectcorrect}>Select the correct option</Text>
                <View style={styles.viewmodal3}>
                    {
                        Object.entries(inputans).map(([i, value]) => (
                            <Pressable key={i} onPress={() => handleSelectmcq(i)} style={[styles.selectmcq, selected === i ? { backgroundColor: color.green } : { backgroundColor: color.white }]}>
                                <Text style={styles.mapvalue}>{value}</Text>
                            </Pressable>
                        ))
                    }
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.addquescss]}
                    onPress={handleselectmcq}
                >
                    <View style={styles.addquessubmit}>
                        <Addques />
                        <Text style={styles.addquesText}>Submit</Text>
                    </View>
                </TouchableOpacity>
            </>
        )
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
                        <Text style={styles.paperList}>Add Question</Text>
                    </View>
                    {
                        queswrite === true ?
                            <>
                                <Text style={styles.enterQues}>Q. {data.length + 1}</Text>
                                <TextInput onChangeText={setQues} value={ques} style={styles.textQues} placeholder="Enter your question here" placeholderTextColor="#FF3856" cursorColor="#FF3856"></TextInput>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.addquescss}
                                    onPress={handleAddques}
                                >
                                    <View style={styles.addquessubmit}>
                                        <Addques />
                                        <Text style={styles.addquesText}>Add</Text>
                                    </View>
                                </TouchableOpacity>
                            </>
                            :
                            <>
                                {Id === 0 ? (
                                    <>
                                        <Text style={styles.showques}>Q{data.length + 1}. {ques}</Text>
                                        <TextInput onChangeText={setAnswer} value={answer} style={styles.textAns} placeholder="Enter Answer" placeholderTextColor="#06D001" cursorColor="#06D001"></TextInput>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={styles.addanscss}
                                            onPress={handleSubmit}
                                        >
                                            <View style={styles.viewsubmit}>
                                                <Addques />
                                                <Text style={styles.addquesText}>Submit</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                ) :
                                    Id === 1 ? (
                                        <>
                                            <Text style={styles.showques}>Q{data.length + 1}. {ques}</Text>
                                            {
                                                mcqInput === "" ?
                                                    <>
                                                        <CustomModal content={modalData2()} visible={openmodal2} onClose={() => { setOpenmodal2(false); }} modaloverlaycss={{}} contentcss={{}} />
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            Object.entries(displayedData).map(([key, value]) => (
                                                                <Text style={styles.displayoption} key={key}>{key}. {value}</Text>
                                                            ))
                                                        }
                                                        {
                                                            currentInputIndex < value ?
                                                                <TextInput onChangeText={(text) => handleInputChange(text, currentInputIndex)} style={styles.textQues} placeholder={`Enter Option ${currentInputIndex + 1}`} placeholderTextColor="#FF3856" cursorColor="#FF3856"></TextInput>
                                                                :
                                                                ""
                                                        }
                                                        {currentInputIndex + 1 < value ? <TouchableOpacity
                                                            activeOpacity={0.8}
                                                            style={styles.addanscss}
                                                            onPress={handleNext}
                                                            disabled={nextOption}
                                                        >
                                                            <View style={styles.viewsubmit}>
                                                                <Addques />
                                                                <Text style={styles.addquesText}>Next</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                            :
                                                            <>
                                                                <CustomModal content={modalData3()} visible={openmodal3} onClose={() => { setOpenmodal3(false); }} modaloverlaycss={{}} contentcss={{}} />
                                                                <View style={styles.viewsubmitmodal}>
                                                                    <TouchableOpacity
                                                                        activeOpacity={0.8}
                                                                        style={styles.addanscss}
                                                                        onPress={handleSubmit2}
                                                                    >
                                                                        <View style={styles.viewsubmit}>
                                                                            <Addques />
                                                                            <Text style={styles.addquesText}>Submit</Text>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </>
                                                        }
                                                    </>
                                            }
                                        </>
                                    ) :
                                        Id === 2 ? (<Text style={styles.showques}>Q{data.length + 1}. {ques}</Text>) :
                                            (<Text style={styles.showques}>Q{data.length + 1}. {ques}</Text>)
                                }
                            </>
                    }
                    {
                        !openmodal && (
                            <TouchableOpacity onPress={() => { setOpenmodal(true) }} style={styles.addQues}>
                                <Add style={styles.addQuesLogo} />
                                <Text style={[styles.addQuesText]}>Add questions</Text>
                            </TouchableOpacity>
                        )
                    }
                    <CustomModal content={modalData()} visible={openmodal} onClose={() => setOpenmodal(false)} modaloverlaycss={{}} contentcss={{}} />
                </View>
            </ImageBackground >
        </View >
    )
}
const styles = StyleSheet.create({
    backgroundImage: {
        height: '100%'
    },
    safearea: {
        flex: 1,
        backgroundColor: color.black,
        opacity: 0.85,
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
    textQues: {
        fontFamily: 'Montserrat-Bold',
        color: color.white,
        borderWidth: 3,
        borderColor: color.primaryRed,
        width: '85%',
        margin: 'auto',
        height: rh(7.8),
        marginTop: rh(4),
        borderRadius: 15,
        fontSize: rf(2.3),
        paddingHorizontal: rw(3.6),
    },
    enterQues: {
        fontFamily: 'Montserrat-Bold',
        color: color.green,
        fontSize: rf(2.3),
        marginTop: rh(2),
        marginHorizontal: rh(3.2)
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
    showques: {
        fontFamily: 'Montserrat-Bold',
        color: color.white,
        marginTop: rh(2),
        marginHorizontal: rh(3),
        fontSize: rf(2.3),
    },
    textAns: {
        borderColor: color.green,
        fontFamily: 'Montserrat-Bold',
        color: color.white,
        borderWidth: rw(0.6),
        width: '85%',
        margin: 'auto',
        height: rh(7.6),
        marginTop: rh(3),
        borderRadius: 15,
        fontSize: rf(2.4),
        paddingHorizontal: rh(2.4),
    },
    viewsubmit: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: rw(3),
    },
    addanscss: {
        justifyContent: 'center',
        alignItems: "center",
        height: rh(7.6),
        backgroundColor: color.primaryRed,
        borderTopRightRadius: 25,
        flexDirection: 'row'
    },
    modalcss: {
        backgroundColor: 'black',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        width: rw(100),
        margin: "auto",
        zIndex: 20
    },
    modalbox: {
        borderWidth: rw(0.6),
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
    addQues: {
        position: 'absolute',
        elevation: 2,
        zIndex: 10,
        width: rw(7),
        height: rh(15),
        marginTop: rh(38),
        marginLeft: rw(93),
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: color.primaryRed,
    },
    addQuesLogo: {
        marginTop: rh(1.2),
        marginLeft: rh(0.9),
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
    selectmcq: {
        marginTop: rh(2),
        marginHorizontal: rw(4),
        height: rh(6),
        paddingTop: rh(1.4),
        borderRadius: 15
    },
    optionrequire: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        marginTop: rh(3),
        fontSize: rf(2.4)
    },
    viewenteroption: {
        flexDirection: 'row',
        borderRadius: 20,
        columnGap: rw(2)
    },
    enteroption: {
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(2),
        color: color.green,
        marginTop: rh(12),
        marginLeft: rw(14)
    },
    selectcorrect: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        marginTop: rh(3),
        fontSize: rf(2.4)
    },
    viewmodal3: {
        marginBottom: rh(2)
    },
    mapvalue: {
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(2),
        textAlign: 'center',
        color: 'black'
    },
    addquessubmit: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: rw(2)
    },
    displayoption: {
        fontFamily: 'Montserrat-Bold',
        color: color.white,
        fontSize: rf(2.3),
        marginTop: rh(2),
        marginHorizontal: rh(4.5)
    },
    viewsubmitmodal: {
        flex: 1,
        justifyContent: 'flex-end'
    }
})
