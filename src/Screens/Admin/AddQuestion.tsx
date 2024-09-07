import { FlatList, ImageBackground, Pressable, StatusBar, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Addques from '../../Assests/svgs/addQues';
import { useState } from "react";
import CrossIcon from "../../Assests/svgs/cuticon";
import Add from "../../Assests/svgs/add";
import CustomModal from "../../Components/modal";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useNavigation } from "@react-navigation/native";

const bgImage = require('../../Assests/HeaderImage.png');

export default function AddQuestion() {
    const [ques, setQues] = useState("")
    const [ans, setAns] = useState("")
    const [queswrite, setQueswrite] = useState(true)

    const handleAddques = () => {
        if (ques !== "") {
            setQueswrite(false)
        }
    }
    const [ind, setInd] = useState<number>()
    const [openmodal, setOpenmodal] = useState(false)
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
        setInd(i);
    }
    const navigate = useNavigation();
    const modalData = () => {
        return (
            <View style={styles.modalcss}>
                <CrossIcon style={styles.crosscut} onPress={() => { setOpenmodal(false) }} />
                {dataText?.map((ei, i) => {
                    return (
                        <Pressable key={i} onPress={() => { handleCol(i), navigate.navigate("AddQuestion") }} style={[ind === i ? { backgroundColor: '#FF3856' } : '', styles.modalbox]}>
                            <Text style={[styles.modalText, ind === i ? { color: '#FFFFFF' } : { color: '#FF3856' }]}>{ei.title}</Text>
                        </Pressable>
                    )
                })}

            </View>
        )
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
                                <TextInput onChangeText={setQues} value={ques} style={styles.textQues} placeholder="    Enter your queestion here" placeholderTextColor="#FF3856" cursorColor="#FF3856"></TextInput>
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
                                <Text style={styles.showques}>Q1. {ques}</Text>
                                <TextInput onChangeText={setAns} value={ans} style={styles.textAns} placeholder="               Enter Answer" placeholderTextColor="#06D001" cursorColor="#06D001"></TextInput>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.addanscss}
                                    onPress={handleAddques}
                                >
                                    <View style={styles.viewsubmit}>
                                        <Addques />
                                        <Text style={styles.addquesText}>Submit</Text>
                                    </View>
                                </TouchableOpacity>
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
                    <CustomModal content={modalData()} visible={openmodal} onClose={() => { setOpenmodal(false); }} title={""} />
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
        backgroundColor: 'black',
        opacity: 0.85,
    },
    textQues: {
        fontFamily: 'Montserrat-Bold',
        color: '#FFFFFF',
        borderWidth: 3,
        borderColor: '#FF3856',
        width: '80%',
        margin: 'auto',
        height: 67,
        marginTop: 60,
        borderRadius: 15,
        fontSize: 18,
        paddingStart: 13,
        paddingEnd: 13,
    },
    addquescss: {
        justifyContent: 'center',
        alignItems: "center",
        height: 71,
        backgroundColor: '#FF3856',
        borderTopRightRadius: 25,
    },
    addquesText: {
        fontFamily: 'Montserrat-Bold',
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
    },
    showques: {
        fontFamily: 'Montserrat-Bold',
        color: 'white',
        marginTop: 58,
        marginLeft: 30,
        fontSize: 17,
        marginRight: 30,
    },
    textAns: {
        borderColor: '#06D001',
        fontFamily: 'Montserrat-Bold',
        color: '#FFFFFF',
        borderWidth: 3,
        width: '85%',
        margin: 'auto',
        height: 67,
        marginTop: 30,
        borderRadius: 15,
        fontSize: 20,
        paddingStart: 13,
        paddingEnd: 13
    },
    viewsubmit: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 14,
    },
    addanscss: {
        justifyContent: 'center',
        alignItems: "center",
        height: 71,
        backgroundColor: '#FF3856',
        borderTopRightRadius: 25,
        flexDirection: 'row'
    },
    modalcss: {
        marginTop: 402,
        backgroundColor: 'black',
        borderTopLeftRadius: 55,
        borderTopRightRadius: 55,
        borderWidth: 4,
    },
    modalbox: {
        borderWidth: 3,
        borderColor: '#FF3856',
        borderRadius: 15,
        width: 369,
        height: 67,
        marginTop: 15,
        lineHeight: 22,
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 16,
        marginBottom: 15,
    },
    modalText: {
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 20,

    },
    crosscut: {
        marginTop: 22,
        marginLeft: 370,
        marginBottom: 10
    },
    addQues: {
        position: 'absolute',
        elevation: 3,
        height: 124,
        top: 350,
        marginLeft: 383,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: "#FF3856",
    },
    addQuesLogo: {
        marginTop: 9,
        marginLeft: 8,
    },
    addQuesText: {
        fontFamily: "Montserrat-SemiBold",
        width: 90,
        marginTop: 40,
        color: "#D9D9D9",
        marginLeft: -31,
        fontSize: 11,
        textAlign: 'center',
        transform: [{ rotate: '270deg' }],
    },


})
