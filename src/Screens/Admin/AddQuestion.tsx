import { useState } from "react";
import { ImageBackground, Pressable, StatusBar, StyleSheet, TextInput, TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { rf, rh, rw } from "../../helpers/Responsivedimention";
import WheelPicker from '@quidone/react-native-wheel-picker';
import Addques from '../../assests/svg/AddQues';
import CrossIcon from "../../assests/svg/CrossIcon";
import Add from "../../assests/svg/Add";
import CustomModal from "../../components/Modal";
import { dataText, alphabet } from '../../constant/StaticData'
import { BackgroundImage } from "../../assests/images";
import { Color } from "../../constant/Color";

const datawheel = [...Array(6).keys()].map((index) => ({
    value: index,
    label: index.toString(),
}))

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

    const navigate = useNavigation();


    const handleNext = () => {
        setDisplayedData(inputans)
        if (currentInputIndex < value) {
            setCurrentInputIndex(currentInputIndex + 1);
        }
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

    const handleSubmit2 = () => {
        setCurrentInputIndex(currentInputIndex + 1);
        setDisplayedData(inputans)
        setOpenmodal3(true)
    }

    const handleCol = (i: number) => {
        setIndex(i);
        navigate.navigate("AddQuestion")
    }

    const handleInputChange = (text: string, i: number) => {
        const updatedInputs = { ...inputans };
        const letterKey = alphabet[i];
        updatedInputs[letterKey] = text;
        setInputAns(updatedInputs);
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
                        <Pressable key={i} onPress={() => { handleCol(i) }} style={[index === i ? { backgroundColor: Color.red } : '', styles.modalbox]}>
                            <Text style={[styles.modalText, index === i ? { color: Color.white } : { color: Color.red }]}>{ei.title}</Text>
                        </Pressable>
                    )
                })}
            </View>
        )
    }

    const modalData2 = () => {
        return (
            <>
                <View>
                    <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'Montserrat-Bold', marginTop: rh(3), fontSize: rf(2.4) }}>How much option do you want?</Text>
                </View>
                <View style={{ flexDirection: 'row', borderRadius: 20, columnGap: 6 }}>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: rf(2), color: Color.green, marginTop: rh(12), marginLeft: rw(14) }}>Enter the Option:  </Text>
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
                    <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10 }}>
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
                <View>
                    <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'Montserrat-Bold', marginTop: rh(3), fontSize: rf(2.4) }}>Select the correct option</Text>
                </View>
                <View style={{ marginBottom: 20 }}>
                    {
                        Object.entries(inputans).map(([i, value]) => (
                            <Pressable key={i} onPress={() => handleSelectmcq(i)} style={[styles.selectmcq, selected === i ? { backgroundColor: '#06D001' } : { backgroundColor: 'white' }]}>
                                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: rf(2), textAlign: 'center', color: 'black', }}>{value}</Text>
                            </Pressable>
                        ))
                    }
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.addquescss]}
                    onPress={handleselectmcq}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10 }}>
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
                    {
                        queswrite === true ?
                            <>
                                <Text style={styles.enterQues}>Q. {data.length + 1}</Text>
                                <TextInput onChangeText={setQues} value={ques} style={styles.textQues} placeholder="Enter your queestion here" placeholderTextColor="#FF3856" cursorColor="#FF3856"></TextInput>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.addquescss}
                                    onPress={handleAddques}
                                >
                                    <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10 }}>
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
                                                                <Text style={{
                                                                    fontFamily: 'Montserrat-Bold',
                                                                    color: Color.white,
                                                                    fontSize: rf(2.3),
                                                                    marginTop: rh(2),
                                                                    marginHorizontal: rh(4.5)
                                                                }} key={key}>{key}.{value}</Text>
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
                                                        >

                                                            <View style={styles.viewsubmit}>
                                                                <Addques />
                                                                <Text style={styles.addquesText}>Next</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                            :
                                                            <>
                                                                <CustomModal content={modalData3()} visible={openmodal3} onClose={() => { setOpenmodal3(false); }} modaloverlaycss={{}} contentcss={{}} />
                                                                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
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
        backgroundColor: 'black',
        opacity: 0.85,
    },
    textQues: {
        fontFamily: 'Montserrat-Bold',
        color: Color.white,
        borderWidth: 3,
        borderColor: Color.red,
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
        color: Color.green,
        fontSize: rf(2.3),
        marginTop: rh(8),
        marginHorizontal: rh(3.2)
    },
    addquescss: {
        justifyContent: 'center',
        alignItems: "center",
        height: rh(8),
        backgroundColor: Color.red,
        borderTopRightRadius: 25,
    },
    addquesText: {
        fontFamily: 'Montserrat-Bold',
        color: Color.white,
        fontSize: rf(2.4),
        textAlign: 'center',
    },
    showques: {
        fontFamily: 'Montserrat-Bold',
        color: 'white',
        marginTop: rh(6),
        marginHorizontal: rh(3),
        fontSize: rf(2.3),
    },
    textAns: {
        borderColor: Color.green,
        fontFamily: 'Montserrat-Bold',
        color: Color.white,
        borderWidth: 3,
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
        columnGap: 14,
    },
    addanscss: {
        justifyContent: 'center',
        alignItems: "center",
        height: rh(7.6),
        backgroundColor: Color.red,
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
        borderWidth: 3,
        borderColor: Color.red,
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
        height: rh(14.2),
        width: rw(7),
        top: 350,
        marginLeft: rh(41.9),
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: Color.red,
    },
    addQuesLogo: {
        marginTop: rh(1.2),
        marginLeft: rh(0.9),
    },
    addQuesText: {
        fontFamily: 'Montserrat-Bold',
        width: rw(22),
        marginTop: rh(4.8),
        color: Color.red,
        marginLeft: rh(-3.4),
        fontSize: rf(1.4),
        textAlign: 'center',
        transform: [{ rotate: '270deg' }],
    },
    selectmcq: {
        marginTop: 20,
        marginHorizontal: 30,
        height: rh(6),
        paddingTop: rh(1.4),
        borderRadius: 15
    },
})
