import { Button, FlatList, ImageBackground, Modal, Pressable, StatusBar, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Addques from '../../Assests/svgs/addQues';
import { useEffect, useState } from "react";
import CrossIcon from "../../Assests/svgs/cuticon";
import Add from "../../Assests/svgs/add";
import CustomModal from "../../Components/modal";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useNavigation } from "@react-navigation/native";
import { rf, rh, rw } from "../../Helpers/Responsivedimention";
const bgImage = require('../../Assests/HeaderImage.png');
import NumberPlease from 'react-native-number-please';
import WheelPicker from '@quidone/react-native-wheel-picker';


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
    const [mcqInput, setMcqInput] = useState('')
    const [value, setValue] = useState(0);
    const [inputans, setInputAns] = useState(Array(2).fill(''));
    const [currentInputIndex, setCurrentInputIndex] = useState(1);
    const [openmodal2, setOpenmodal2] = useState(true)
    const [openmodal3, setOpenmodal3] = useState(false)
    const [selected, setSelected] = useState(false)

    const handleAddques = () => {
        if (ques !== "") {
            setQueswrite(false)
        }
    }

    const handleAddmcq = () => {
        setMcqInput("0")
    }

    const handleSubmit = () => {
        setOpenmodal3(true)
    }

    const dataText = [{
        col: false,
        title: 'Input'
    },
    {
        col: false,
        title: 'MCQ’s'
    },
    {
        col: false,
        title: 'Blank Space'
    },
    {
        col: false,
        title: 'Program'
    },
    ]

    const handleCol = (i: number) => {
        setIndex(i);
        navigate.navigate("AddQuestion")
    }

    const navigate = useNavigation();

    const handleselectmcq = () => {
        const sendData = [...data, {
            sn: data.length + 1,
            question: ques,
            ans: inputans,
            data: 123,
            category: 'pyton',

        }]
        navigate.navigate("ShowData", {
            data2: sendData
        })
    }

    const modalData = () => {
        return (
            <View style={styles.modalcss}>
                <CrossIcon style={styles.crosscut} onPress={() => { setOpenmodal(false) }} />
                {dataText?.map((ei, i) => {
                    return (
                        <Pressable key={i} onPress={() => { handleCol(i) }} style={[index === i ? { backgroundColor: '#FF3856' } : '', styles.modalbox]}>
                            <Text style={[styles.modalText, index === i ? { color: '#FFFFFF' } : { color: '#FF3856' }]}>{ei.title}</Text>
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
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: rf(2), color: '#06D001', marginTop: rh(12), marginLeft: rw(14) }}>Enter the Option:  </Text>
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
                        inputans.map((ei: any, i) => (
                            <Pressable onPress={() => setSelected(!selected)} key={i} style={{ backgroundColor: selected ? "#06D001" : "white", marginTop: 20, marginHorizontal: 30, height: rh(6), paddingTop: rh(1.4), borderRadius: 15 }}><Text style={{ fontFamily: 'Montserrat-Bold', fontSize: rf(2), textAlign: 'center', color: 'black', }}>{ei}</Text></Pressable>
                            // <Pressable key={i} onPress={() => handleCol(i)} style={[index === i ? { backgroundColor: '#FF3856' } : '', ]}>
                            //     <Text style={[styles.modalText, index === i ? { color: '#FFFFFF' } : { color: '#FF3856' }]}>{ei}</Text>
                            // </Pressable>
                        )
                        )
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

    const handleInputChange = (text: string, i: number) => {
        const updatedInputs = [...inputans];
        updatedInputs[i] = text;
        setInputAns(updatedInputs);

    }

    function handleNext() {
        if (currentInputIndex < value) {
            setCurrentInputIndex(currentInputIndex + 1);
        }
    }

    return (
        <View>
            <StatusBar backgroundColor={'transparent'} translucent={true} />
            <ImageBackground
                style={styles.backgroundImage}
                source={bgImage}
                resizeMode="cover">
                <View style={styles.safearea}>
                    {
                        queswrite === true ?
                            <>
                                <Text style={styles.enterQues}>Question No. {data.length + 1}</Text>
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
                                        <TextInput onChangeText={(text) => handleInputChange(text, 1)} value={inputans} style={styles.textAns} placeholder="Enter Answer" placeholderTextColor="#06D001" cursorColor="#06D001"></TextInput>
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
                                                        <CustomModal title='' content={modalData2()} visible={openmodal2} onClose={() => { setOpenmodal2(false); }} />
                                                    </>
                                                    :
                                                    <>
                                                        <TextInput onChangeText={(text) => handleInputChange(text, currentInputIndex)} value={inputans} style={styles.textAns} placeholder={`Enter Option ${currentInputIndex}`} placeholderTextColor="#06D001" cursorColor="#06D001"></TextInput>
                                                        {currentInputIndex < value ? <TouchableOpacity
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
                                                                <CustomModal title='' content={modalData3()} visible={openmodal3} onClose={() => { setOpenmodal3(false); }} />
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
                    <CustomModal content={modalData()} visible={openmodal} onClose={() => { setOpenmodal(false) }} title={""} />
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
        color: '#FFFFFF',
        borderWidth: 3,
        borderColor: '#FF3856',
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
        color: '#06D001',
        fontSize: rf(2.3),
        marginTop: rh(8),
        marginHorizontal: rh(3.2)
    },
    addquescss: {
        justifyContent: 'center',
        alignItems: "center",
        height: rh(8),
        backgroundColor: '#FF3856',
        borderTopRightRadius: 25,
    },
    addquesText: {
        fontFamily: 'Montserrat-Bold',
        color: '#FFFFFF',
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
        borderColor: '#06D001',
        fontFamily: 'Montserrat-Bold',
        color: '#FFFFFF',
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
        backgroundColor: '#FF3856',
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
        borderColor: '#FF3856',
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
        backgroundColor: "#FF3856",
    },
    addQuesLogo: {
        marginTop: rh(1.2),
        marginLeft: rh(0.9),
    },
    addQuesText: {
        fontFamily: 'Montserrat-Bold',
        width: rw(22),
        marginTop: rh(4.8),
        color: "#D9D9D9",
        marginLeft: rh(-3.4),
        fontSize: rf(1.4),
        textAlign: 'center',
        transform: [{ rotate: '270deg' }],
    },
})
