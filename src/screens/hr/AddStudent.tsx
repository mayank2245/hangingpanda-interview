import {
    ImageBackground,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

import { color } from "../../constant/color";
import Addques from '../../assests/svg/addQues';
import { BackgroundImage } from "../../assests/images";
import { rf, rh, rw } from "../../helpers/responsivedimention";
import BackArrow from "../../components/BackArrow";
import { Dropdown } from "react-native-element-dropdown";
import { ShowToast } from "../../helpers/toast";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiService } from "../../api/apiCalls/ApiCalls";

export default function AddQuestion({ route }: any) {
    const { candidatedata } = route.params;
    const [candidateName, setcandidateName] = useState<string>("")
    const [candidateEmail, setcandidateEmail] = useState<string>("")
    const [papertype, setPapertype] = useState<string>("")
    const [value, setValue] = useState(null);
    const navigation = useNavigation();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [questionfocus, setQuestionfocus] = useState<"Name" | "Email" | "PaperType" | "Date" | "Time" | "">("")
    const [date, setDate] = useState<Date>(new Date('2024-10-18T00:00:00'));
    const [time, setTime] = useState<Date>(new Date('2024-10-18T00:00:00'));

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
        if (candidateName === "") {
            const type = "error";
            const text1 = "Please fill the Candidate Name";
            ShowToast(type, text1);
        }
        else if (candidateEmail === "") {
            const type = "error";
            const text1 = "Please fill the Candidate Email";
            ShowToast(type, text1);
        }
        else if (papertype === "") {
            const type = "error";
            const text1 = "Please fill the Candidate Paper Type";
            ShowToast(type, text1);
        }
        else if (date.getTime() === new Date('2024-10-18T00:00:00').getTime()) {
            const type = "error";
            const text1 = "Please fill the Candidate date";
            ShowToast(type, text1);
        }
        else if (time.getTime() === new Date('2024-10-18T00:00:00').getTime()) {
            const type = "error";
            const text1 = "Please fill the Candidate time";
            ShowToast(type, text1);
        }
        else {
            let dateTimeString = `${moment(date).format('MM/DD/YYYY')} ${moment(time).format('h:mm:ss A')}`;
            let momentObj = moment(dateTimeString, 'MM/DD/YYYY h:mm:ss A');
            let dateTime = momentObj.format('YYYY-MM-DDTHH:mm:ss');
            if (candidatedata) {
                const candidate = [
                    ...candidatedata, {
                        name: candidateName,
                        email: candidateEmail,
                        questionPaperType: papertype,
                        interviewDate: dateTime
                    }]
                navigation.navigate("AddAllCandidate", { candidateData: candidate })
            }
            else {
                const candidate = [{
                    name: candidateName,
                    email: candidateEmail,
                    questionPaperType: papertype,
                    interviewDate: dateTime
                }]
                navigation.navigate("AddAllCandidate", { candidateData: candidate })
            }

            setcandidateName("");
            setcandidateEmail("");
            setPapertype("")
            setValue(null)
            setDate(new Date('2024-10-18T00:00:00'))
            setTime(new Date('2024-10-18T00:00:00'))
        }
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

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
        setTimePickerVisibility(false)
    };

    const handleConfirm = (date) => {
        setDate(date)
        setDatePickerVisibility(false);
        setTimePickerVisibility(false)
    };
    const handleConfirm2 = (time) => {
        setTime(time)
        setDatePickerVisibility(false);
        setTimePickerVisibility(false)
    };

    const showDatepicker = () => {
        setDatePickerVisibility(true);
    };

    const showTimepicker = () => {
        setTimePickerVisibility(true);
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
                    <Text style={styles.paperListSub}>Candidate:</Text>
                    <TextInput onChangeText={setcandidateName} value={candidateName} onFocus={() => setQuestionfocus("Name")} onBlur={() => setQuestionfocus("")} style={[styles.textQues, questionfocus === "Name" ? { borderColor: color.timebarRed, } : { borderColor: color.primaryRed }]} placeholder="Candidate Name" placeholderTextColor={questionfocus === "Name" ? color.timebarRed : color.primaryRed} cursorColor="#FF3856"></TextInput>
                    <TextInput onChangeText={setcandidateEmail} value={candidateEmail} onFocus={() => setQuestionfocus("Email")} onBlur={() => setQuestionfocus("")} style={[styles.textQues, questionfocus === "Email" ? { borderColor: color.timebarRed, } : { borderColor: color.primaryRed }]} placeholder="Candidate Email" placeholderTextColor={questionfocus === "Email" ? color.timebarRed : color.primaryRed} cursorColor="#FF3856"></TextInput>
                    <View style={styles.papertypeview}>
                        <Dropdown
                            onFocus={() => setQuestionfocus("PaperType")}
                            style={[styles.dropdown, questionfocus === "PaperType" ? { borderColor: color.timebarRed } : { borderColor: color.primaryRed }]}
                            dropdownPosition='bottom'
                            placeholderStyle={[styles.placeholderStyle, questionfocus === "PaperType" ? { color: color.timebarRed } : { color: color.primaryRed }]}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            data={PaperTypeDropDown}
                            containerStyle={styles.containerStyle}
                            itemContainerStyle={styles.itemcontainer}
                            maxHeight={300}
                            labelField="name"
                            valueField="name"
                            placeholder="Select Paper Type"
                            iconColor={questionfocus === "PaperType" ? color.timebarRed : color.primaryRed}
                            value={value}
                            onChange={item => {
                                setPapertype(item.name);
                                setValue(item.name)
                            }}
                            renderItem={renderItem}
                        />
                    </View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        minimumDate={new Date()}
                        isDarkModeEnabled={true}

                        themeVariant="dark"
                    />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirm2}
                        onCancel={hideDatePicker}
                        themeVariant={'dark'}
                        is24Hour={false}
                    />

                    <View style={[styles.timepicker, questionfocus === "Date" ? { borderColor: color.timebarRed } : { borderColor: color.primaryRed }]}>
                        <View style={styles.timepickersub}>
                            {date.getTime() === new Date('2024-10-18T00:00:00').getTime() ? <Text style={styles.ShowcandidateSub2}>Interview Date</Text> : <Text style={styles.ShowcandidateSub}>{date?.toLocaleDateString()}</Text>}
                        </View>
                        <TouchableOpacity onPress={showDatepicker}>
                            <EvilIcons
                                style={styles.icon}
                                color={questionfocus === "Date" ? color.timebarRed : color.primaryRed}
                                name="calendar"
                                size={35}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.timepicker, questionfocus === "Time" ? { borderColor: color.timebarRed } : { borderColor: color.primaryRed }]}>
                        <View style={styles.timepickersub}>
                            {time.getTime() === new Date('2024-10-18T00:00:00').getTime() ? <Text style={styles.ShowcandidateSub2}>Interview Time</Text> : <Text style={styles.ShowcandidateSub}>{time?.toLocaleTimeString()}</Text>}
                        </View>
                        <TouchableOpacity onPress={showTimepicker} >
                            <MaterialCommunityIcons
                                style={styles.icon2}
                                color={questionfocus === 'Time' ? color.timebarRed : color.primaryRed}
                                name="clock-time-nine-outline"
                                size={27}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.addbutton}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.addquescss}
                            onPress={handleadd}
                        >
                            <View style={styles.addquessubmit}>
                                <Addques />
                                <Text style={styles.addquesText}>Submit</Text>
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
        flexDirection: 'row',
        marginTop: rh(1.2)
    },
    paperList: {
        marginTop: rh(3.5),
        marginBottom: rh(1),
        marginLeft: rh(2),
        color: color.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(3),
    },
    paperListSub: {
        marginTop: rh(1.5),
        marginBottom: rh(2),
        marginLeft: rh(2),
        color: color.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(3),
    },
    Showcandidate: {
        marginTop: rh(1.5),
        marginBottom: rh(1),
        color: color.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(2),
    },
    ShowcandidateSub: {
        marginTop: rh(1.5),
        marginBottom: rh(1),
        marginLeft: rh(1),
        color: color.lightWhite,
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(2),
    },
    ShowcandidateSub2: {
        marginTop: rh(1.5),
        marginBottom: rh(1),
        marginLeft: rh(1),
        color: color.primaryRed,
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(2),
    },
    textQues: {
        fontFamily: 'Montserrat-Bold',
        color: color.lightWhite,
        borderWidth: rw(0.7),
        width: '85%',
        margin: 'auto',
        height: rh(6.5),
        marginTop: rh(1.8),
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
    enterQues2: {
        fontFamily: 'Montserrat-SemiBold',
        color: color.white,
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
    },
    dropdown: {
        height: rh(6.5),
        width: '85%',
        paddingHorizontal: rw(5),
        borderWidth: rh(0.3),
        marginTop: rh(1.8),
        borderRadius: 15,
    },
    placeholderStyle: {
        fontSize: rf(2.2),
        fontFamily: 'Montserrat-Bold',
    },
    selectedTextStyle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: rf(2.2),
        color: color.lightWhite
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
        marginTop: rh(0.7),
    },
    icon2: {
        marginTop: rh(1),
    },
    item: {
        padding: rh(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        color: color.bacgroundlightblack,
        flex: 1,
        fontSize: rf(2),
        fontFamily: 'Montserrat-SemiBold'
    },
    timepicker: {
        marginTop: rh(1.8),
        height: rh(6.5),
        width: '85%',
        paddingHorizontal: rw(5),
        borderWidth: rh(0.3),
        borderRadius: 15,
        marginLeft: rw(8),
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    timepickersub: {
        flexDirection: 'row'
    }
})
