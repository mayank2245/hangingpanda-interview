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
import { rf, rh, rw } from "../../Helpers/Responsivedimention";

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
        width: '85%',
        margin: 'auto',
        height: rh(7.8),
        marginTop: rh(8),
        borderRadius: 15,
        fontSize: rf(2.3),
        paddingHorizontal: rw(3.6),
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
