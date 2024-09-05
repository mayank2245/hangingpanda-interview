import { ImageBackground, StatusBar, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import bgImage from '../../Assests/HeaderImage.png'
import Addques from '../../Assests/svgs/addQues'
import { useState } from "react";

export default function AddQuestion() {
    const [ques, setQues] = useState("")
    const [ans, setAns] = useState("")
    const [queswrite, setQueswrite] = useState(true)

    const handleAddques = () => {
        if (ques !== "") {
            setQueswrite(false)
        }

        console.log(queswrite)
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
                                <TextInput onChangeText={setQues} value={ques} style={styles.textQues} placeholder="    Enter your queestion here" placeholderTextColor="#FF3856"></TextInput>
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
                                <TextInput onChangeText={setAns} value={ans} style={styles.textAns} placeholder="               Enter Answer" placeholderTextColor="#06D001" ></TextInput>
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
        paddingTop: 20,
        paddingBottom: 20,
        paddingStart: 13,
    },
    addquescss: {
        justifyContent: 'center',
        alignItems: "center",
        height: 71,
        backgroundColor: '#FF3856',
        borderTopRightRadius: 25,
        flexDirection: 'row'
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
        paddingTop: 20,
        paddingBottom: 20,
        paddingStart: 13,
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


})
