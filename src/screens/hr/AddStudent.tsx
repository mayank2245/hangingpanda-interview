import {
    ImageBackground,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    View
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { color } from "../../constant/color";
import Addques from '../../assests/svg/addQues';
import { BackgroundImage } from "../../assests/images";
import { rf, rh, rw } from "../../helpers/responsivedimention";
import BackArrow from "../../components/BackArrow";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dropdown } from "react-native-element-dropdown";
import Entypo from "react-native-vector-icons/Entypo";

export default function AddQuestion() {
    const [candidateName, setcandidateName] = useState("")
    const [candidateEmail, setcandidateEmail] = useState("")
    const [candidateDate, setcandidateDate] = useState()
    const [papertype, setPapertype] = useState<string>('')
    const [value, setValue] = useState(null);
    const navigation = useNavigation();

    const PaperTypeDropDown = [
        {
            "_id": "66f16a96cc05fc10bc3a62d7",
            "name": "python",
            "__v": 0,
            "description": "null"
        },
        {
            "_id": "66f16b61cc05fc10bc3a62de",
            "name": "DSA",
            "__v": 0
        },
        {
            "_id": "66f16c72efea085790d68af5",
            "name": "java",
            "__v": 0
        },
        {
            "_id": "66f2c22d0b7580006f846246",
            "name": null,
            "__v": 0,
            "description": "aptitude type"
        },
        {
            "_id": "66f3dea4e9bb4c005d03abe7",
            "name": "javascript",
            "__v": 0
        },
        {
            "_id": "66f67c9f957ecd2660e4ce37",
            "name": "python1",
            "description": null,
            "__v": 0
        }
    ]


    const handleadd = () => {
        const candidateData = {
            name: candidateName,
            email: candidateEmail,
            questionPaperType: papertype,
            interviewDate: "2024-09-10T10:00:00Z"
        }
        navigation.navigate("AllStudentList", { candidateData: candidateData })
    }

    const renderItem = (item: any) => {
        return (
            <View style={styles.item}>
                <Text style={[styles.textItem, item.name === value && { color: color.primaryRed }]}>{item.name ? String(item.name) : item.description}</Text>
                {item.name === value && (
                    <Entypo
                        style={styles.icon}
                        color={color.primaryRed}
                        name="check"
                        size={20}
                    />
                )}
            </View>
        );
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
                        <Text style={styles.paperList}>Add Candidate</Text>
                    </View>
                    <View style={{ marginBottom: rh(1) }}>
                        <Text style={styles.enterQues}>Enter Candidate Name:</Text>
                        <TextInput onChangeText={setcandidateName} value={candidateName} style={styles.textQues} placeholder="Enter Candidate Name" placeholderTextColor="#FF3856" cursorColor="#FF3856"></TextInput>
                    </View>
                    <View style={{ marginBottom: rh(1) }}>
                        <Text style={styles.enterQues}>Enter Candidate Email:</Text>
                        <TextInput onChangeText={setcandidateEmail} value={candidateEmail} style={styles.textQues} placeholder="Enter Candidate Email" placeholderTextColor="#FF3856" cursorColor="#FF3856"></TextInput>
                    </View>
                    <View>

                        <Text style={styles.enterQues}>Select Candidate Paper Type:</Text>
                        <View style={styles.papertypeview}>
                            <Dropdown
                                style={styles.dropdown}
                                dropdownPosition='bottom'
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                iconStyle={styles.iconStyle}
                                data={PaperTypeDropDown}
                                containerStyle={styles.containerStyle}
                                itemContainerStyle={styles.itemcontainer}
                                maxHeight={300}
                                labelField="name"
                                valueField="name"
                                placeholder="Select Paper Type"
                                iconColor={'red'}
                                value={value}
                                onChange={item => {
                                    setPapertype(item.name);
                                    setValue(item.name)
                                }}
                                renderItem={renderItem}
                            />
                        </View>
                    </View>


                    <View style={styles.addbutton}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.addquescss}
                            onPress={handleadd}
                        >
                            <View style={styles.addquessubmit}>
                                <Addques />
                                <Text style={styles.addquesText}>Add</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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
        height: rh(6.5),
        marginTop: rh(1),
        borderRadius: 15,
        fontSize: rf(2.3),
        paddingHorizontal: rw(3.6),
    },
    enterQues: {
        fontFamily: 'Montserrat-SemiBold',
        color: color.green,
        fontSize: rf(2.3),
        marginTop: rh(2),
        marginHorizontal: rh(3.8)
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

    addquessubmit: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: rw(2)
    },
    addbutton: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    papertypeview: {
        flexDirection: 'row',
        marginVertical: rh(1.8),
        alignSelf: 'center',
        marginTop: rh(1),
        marginBottom: rh(6)
    },
    dropdown: {
        height: rh(6.5),
        width: '85%',
        paddingHorizontal: rw(5),
        borderWidth: rh(0.3),
        borderColor: color.primaryRed,
        borderRadius: 15,
    },
    placeholderStyle: {
        fontSize: rf(2.2),
        color: color.primaryRed,
        fontFamily: 'Montserrat-Bold',
    },
    selectedTextStyle: {
        color: color.primaryRed,
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(2.2),
    },
    iconStyle: {
        width: rw(4),
        height: rh(4),
    },
    containerStyle: {
        marginBottom: rh(-1),
        borderRadius: 10
    },
    itemcontainer: {
        borderRadius: 10
    },
    icon: {
        marginRight: rw(2),
    },
    item: {
        padding: rh(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: rf(2),
        fontFamily: 'Montserrat-SemiBold'
    },
})
