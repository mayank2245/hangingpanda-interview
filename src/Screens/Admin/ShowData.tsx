import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { useMutation, useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { color } from '../../constant/color';
import { ShowToast } from '../../helpers/toast';
import { dataText } from '../../constant/staticData';
import { BackgroundImage } from '../../assests/images';
import { ApiService } from '../../api/apiCalls/ApiCalls';
import { rf, rh, rw } from '../../helpers/responsivedimention';
import { Add, AddQues, CrossIcon, Upload } from '../../assests/svg';
import BackArrow from '../../components/BackArrow';
import CustomModal from '../../components/Modal';
import RNText from '../../components/RNText';

export default function Showdata({ route }: any) {
  const { data, data2, questionData } = route.params;
  const [quesData, setQuesData] = useState(data)
  const [index, setIndex] = useState<number>()
  const [openmodal2, setOpenmodal2] = useState(false)
  const [openmodal, setOpenmodal] = useState(false)
  const [value, setValue] = useState(null);
  const [timeduration, setTimeduration] = useState<number>()
  const [papertype, setPapertype] = useState<string>('')
  const [PaperTypeDropDown, setPaperTypeDropDown] = useState([])

  const navigation = useNavigation();

  const addquestypehandle = async () => {
    const res = await ApiService.QuestionPaperType()
    return res
  }

  const { data: questionPaperType, refetch } = useQuery({
    queryKey: ['querryPaperType'],
    queryFn: addquestypehandle,
    enabled: false
  });

  useEffect(() => {
    if (data2 !== undefined) {
      setQuesData(data2)
    }
    if (questionData !== undefined) {
      setQuesData(questionData)
    }
    if (questionPaperType?.data) {
      setPaperTypeDropDown(questionPaperType?.data)
    }
  })

  const addqueshandle = async () => {
    const payload = {
      timeLimit: timeduration,
      questionPaperType: papertype,
      questions: quesData
    }
    const token = await AsyncStorage.getItem('MYtoken')
    if (token) {
      const res = payload && await ApiService.addquestionPaper(payload, token)
      return res
    }
  }

  const mutation = useMutation({
    mutationFn: addqueshandle,
    onSuccess: () => {
      const type = "success";
      const text1 = "Upload Successfully";
      ShowToast(type, text1);
      setOpenmodal2(false)
    }
  })

  const handleAddmcq = () => {
    mutation.mutate()
  }

  const handleUpload = () => {
    setOpenmodal2(true)
    refetch()
  }

  const handleCol = (i: number) => {
    setIndex(i);
    setOpenmodal(false)
    setOpenmodal2(false)
    navigation.navigate("AddQuestion", { data: quesData, Id: i })
  }

  const modalData = () => {
    return (
      <View style={styles.modalcss}>
        <CrossIcon style={styles.crosscut} onPress={() => { setOpenmodal(false) }} />
        {dataText?.map((ei, i) => {
          return (
            <TouchableOpacity key={i} style={[index === i ? { backgroundColor: color.primaryRed } : '', styles.modalbox]} onPress={() => handleCol(i)}>
              <RNText style={[styles.modalText, index === i ? { color: color.white } : { color: color.primaryRed }]} type="subHeading" font='MontserratSemiBold'>{ei.title}</RNText>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <RNText style={[styles.textItem, item.name === value ? { color: color.primaryRed } : { color: color.bacgroundlightblack }]} type="subHeading" font='MontserratSemiBold'>{item.name ? String(item.name) : item.description}</RNText>
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

  const modalData2 = () => {
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}>
        <RNText style={styles.headingstyle} type="subHeading" font='MontserratBold' colortype="whitePlaceholder">Enter Paper Duration & Type</RNText>
        <View style={styles.viewmodal2}>
          <RNText style={styles.modal2Text} type="subHeading" font='MontserratBold' colortype="red">Enter the Time</RNText>
          <TextInput value={timeduration} cursorColor={color.primaryRed} onChangeText={setTimeduration} keyboardType="numeric" style={style.textinputmodal2} />
          <RNText style={styles.modal2Text2} type="subHeading" font='MontserratBold' colortype="red">min</RNText>
        </View>
        <View style={styles.papertypeview}>
          <Dropdown
            style={styles.dropdown}
            dropdownPosition='top'
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
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.addquescss]}
          onPress={handleAddmcq}
        >
          <View style={styles.viewaddmodal2}>
            <AddQues />
            <RNText style={styles.addquesText} type="subHeading" font='MontserratBold' colortype="white">Add</RNText>
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    )
  }


  return (
    <SafeAreaView>
      <ImageBackground
        style={styles.backgroundImage}
        source={BackgroundImage}
        resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.headerview}>
            <BackArrow />
            <RNText style={styles.paperList} type="heading" font='MontserratBold' colortype="white">All Questions</RNText>
          </View>
          <View style={styles.flatviewcss}>
            <View style={styles.flatviewcss2}>
              <FlatList
                data={quesData}
                renderItem={({ item }) => (
                  <>
                    <RNText style={styles.flatListques} font='MontserratSemiBold' colortype="red">Q {item.sn}. {item.question}</RNText>
                    {
                      typeof (item.answer) === "string" ?
                        <RNText style={styles.flatListans} font='MontserratSemiBold' colortype="green">{item.answer}</RNText>
                        :
                        Object.entries(item.options).map(([key, value]) => (
                          <RNText style={[styles.flatListans2, item.correctOption === key ? { color: color.green } : { color: color.white }]} font='NunitoSans'>{key}. {value}</RNText>
                        ))
                    }
                  </>
                )}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.sn}
              />
            </View>
            <TouchableOpacity onPress={() => { setOpenmodal(true); setIndex(-1) }} style={style.addQues}>
              <Add style={styles.addQuesLogo} />
              <RNText style={styles.addquesText} type="subHeading" font='MontserratBold' colortype="white">Add questions</RNText>
            </TouchableOpacity>
          </View>
          <CustomModal content={modalData2()} visible={openmodal2} onClose={() => { setOpenmodal2(false); }} modaloverlaycss={{}} contentcss={{}} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleUpload}
            style={styles.uploadcss}>
            <Upload />
            <RNText type="subHeading" font='MontserratSemiBold' colortype="white">Upload</RNText>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <CustomModal content={modalData()} visible={openmodal} onClose={() => { setOpenmodal(false); }} modaloverlaycss={{}} contentcss={{}} />
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  flatviewcss: {
    zIndex: 0,
    flex: 1,
    marginLeft: rw(5),
    marginRight: rh(4),
  },
  flatviewcss2: {
    flexDirection: "row",
    alignItems: "center",
  },
  flatListques: {
    marginBottom: rh(1.6),
    marginTop: rh(2.6)
  },
  flatListans: {
    marginHorizontal: rw(2)
  },
  flatListans2: {
    marginBottom: rh(1),
    marginHorizontal: rw(2)
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: color.black,
    opacity: 0.9,
  },
  headerview: {
    flexDirection: 'row',
    marginTop: rh(1.2)
  },
  uploadcss: {
    height: rh(8),
    backgroundColor: color.primaryRed,
    borderTopRightRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: rw(2),
  },
  addQues: {
    position: 'absolute',
    elevation: 2,
    zIndex: 10,
    width: rw(7),
    height: rh(15),
    marginTop: rh(35),
    marginLeft: rw(88),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: color.primaryRed,
  },
  addQuesLogo: {
    height: rh(4),
    width: rw(4),
    marginTop: rh(1),
    marginLeft: rh(0.8),
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
  modalcss: {
    backgroundColor: color.black,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    width: rw(100),
    margin: "auto",
    zIndex: 20,
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
    textAlign: 'center',
  },
  crosscut: {
    marginTop: rh(2.3),
    marginLeft: rh(41),
    marginBottom: rh(1)
  },
  dropdown: {
    height: rh(8),
    width: '92%',
    paddingHorizontal: rw(5),
    borderWidth: rh(0.3),
    borderColor: color.primaryRed,
    borderRadius: 15,
  },
  paperList: {
    marginTop: rh(3.4),
    marginBottom: rh(1),
    marginLeft: rh(2),
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
  containerStyle: {
    marginBottom: rh(-1),
    borderRadius: 10
  },
  itemcontainer: {
    borderRadius: 10
  },
  iconStyle: {
    width: rw(4),
    height: rh(4),
  },
  addquescss: {
    justifyContent: 'center',
    alignItems: "center",
    height: rh(8),
    backgroundColor: color.primaryRed,
    borderTopRightRadius: 25,
  },
  addquesText: {
    textAlign: 'center',
  },
  headingstyle: {
    textAlign: 'center',
    marginTop: rh(3),
  },
  viewmodal2: {
    marginTop: rh(2),
  },
  modal2Text: {
    marginTop: rh(2),
    marginLeft: rw(5)
  },
  modal2Text2: {
    marginTop: rh(2),
    position: 'absolute',
    top: rh(6.2),
    right: rw(10)
  },
  textinputmodal2: {
    fontFamily: 'Montserrat-Bold',
    fontSize: rf(2.2),
    height: rh(8),
    width: '92%',
    paddingHorizontal: rw(5),
    borderWidth: rw(0.6),
    borderColor: color.primaryRed,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: rh(1),
    color: color.primaryRed
  },
  textpapertype: {
    fontFamily: 'Montserrat-Bold',
    fontSize: rf(2),
    color: color.primaryRed,
    marginTop: rh(3),
    marginLeft: rw(12)
  },
  papertypeview: {
    flexDirection: 'row',
    marginVertical: rh(1.8),
    alignSelf: 'center',
    marginTop: rh(3),
    marginBottom: rh(6)
  },
  viewaddmodal2: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: rw(2.5)
  }
});

