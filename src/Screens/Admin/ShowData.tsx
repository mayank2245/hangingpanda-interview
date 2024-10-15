import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
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
      <View style={style.modalcss}>
        <CrossIcon style={style.crosscut} onPress={() => { setOpenmodal(false) }} />
        {dataText?.map((ei, i) => {
          return (
            <TouchableOpacity key={i} style={[index === i ? { backgroundColor: color.primaryRed } : '', style.modalbox]} onPress={() => handleCol(i)}>
              <Text style={[style.modalText, index === i ? { color: color.white } : { color: color.primaryRed }]}>{ei.title}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  const renderItem = (item: any) => {
    return (
      <View style={style.item}>
        <Text style={[style.textItem, item.name === value && { color: color.primaryRed }]}>{item.name ? String(item.name) : item.description}</Text>
        {item.name === value && (
          <Entypo
            style={style.icon}
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
        <Text style={style.headingstyle}>Enter Paper Duration & Type</Text>
        <View style={style.viewmodal2}>
          <Text style={style.modal2Text}>Enter the Time</Text>
          <TextInput value={timeduration} cursorColor={color.primaryRed} onChangeText={setTimeduration} keyboardType="numeric" style={style.textinputmodal2} />
          <Text style={style.modal2Text2}>min</Text>
        </View>
        <View style={style.papertypeview}>
          <Dropdown
            style={style.dropdown}
            dropdownPosition='top'
            placeholderStyle={style.placeholderStyle}
            selectedTextStyle={style.selectedTextStyle}
            iconStyle={style.iconStyle}
            data={PaperTypeDropDown}
            containerStyle={style.containerStyle}
            itemContainerStyle={style.itemcontainer}
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
          style={[style.addquescss]}
          onPress={handleAddmcq}
        >
          <View style={style.viewaddmodal2}>
            <AddQues />
            <Text style={style.addquesText}>Add</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    )
  }

  return (
    <SafeAreaView>
      <ImageBackground
        style={style.backgroundImage}
        source={BackgroundImage}
        resizeMode="cover">
        <View style={style.overlay}>
          <View style={style.headerview}>
            <BackArrow />
            <Text style={style.paperList}>All Questions</Text>
          </View>
          <View style={style.flatviewcss}>
            <View style={style.flatviewcss2}>
              <FlatList
                data={quesData}
                renderItem={({ item }) => (
                  <>
                    <Text style={style.flatListques}>
                      Q {item.sn}. {item.question}
                    </Text>
                    {
                      typeof (item.answer) === "string" ?
                        <Text style={style.flatListans}>{item.answer}</Text>
                        :
                        Object.entries(item.options).map(([key, value]) => (
                          <Text style={[style.flatListans2, item.correctOption === key ? { color: color.green } : { color: color.white }]}>{key}. {value}</Text>
                        ))
                    }
                  </>
                )}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.sn}
              />
            </View>
            <TouchableOpacity onPress={() => { setOpenmodal(true); setIndex(-1) }} style={style.addQues}>
              <Add style={style.addQuesLogo} />
              <Text style={[style.addQuesText]}>Add questions</Text>
            </TouchableOpacity>
          </View>
          <CustomModal content={modalData2()} visible={openmodal2} onClose={() => { setOpenmodal2(false); }} modaloverlaycss={{}} contentcss={{}} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleUpload}
            style={style.uploadcss}>
            <Upload />
            <Text style={style.uploadText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <CustomModal content={modalData()} visible={openmodal} onClose={() => { setOpenmodal(false); }} modaloverlaycss={{}} contentcss={{}} />
    </SafeAreaView >
  );
}
const style = StyleSheet.create({
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
    color: color.primaryRed,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: rf(1.9),
    marginBottom: rh(1.6),
    marginTop: rh(2.6)
  },
  flatListans: {
    fontFamily: 'Montserrat-SemiBold',
    color: color.green,
    fontSize: rf(1.9),
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
  uploadText: {
    fontFamily: 'Montserrat-SemiBold',
    color: color.white,
    fontSize: rf(2.6),
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
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    fontSize: rf(2.7),
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
    color: color.white,
    fontFamily: 'Montserrat-Bold',
    fontSize: rf(3),
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
    fontFamily: 'Montserrat-Bold',
    color: color.white,
    fontSize: rf(2.4),
    textAlign: 'center',
  },
  headingstyle: {
    textAlign: 'center',
    color: color.whitePlaceholder,
    fontFamily: 'Montserrat-Bold',
    marginTop: rh(3),
    fontSize: rf(2.4)
  },
  viewmodal2: {
    marginTop: rh(2),
  },
  modal2Text: {
    fontFamily: 'Montserrat-Bold',
    fontSize: rf(2.2),
    color: color.primaryRed,
    marginTop: rh(2),
    marginLeft: rw(5)
  },
  modal2Text2: {
    fontFamily: 'Montserrat-Bold',
    fontSize: rf(2.2),
    color: color.primaryRed,
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

