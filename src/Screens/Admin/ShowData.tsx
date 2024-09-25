import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomModal from '../../components/Modal';
import { useNavigation } from '@react-navigation/native';
import { rf, rh, rw } from '../../helpers/Responsivedimention';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ApiService } from '../../api/apicalls/ApiCalls';
import { useMutation, useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Add, AddQues, CrossIcon, Upload } from '../../assests/svg';
import { dataText } from '../../constant/StaticData';
import { BackgroundImage } from '../../assests/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Color } from '../../constant/Color';




export default function Showdata({ route }: any) {
  const { data, data2, questionData } = route.params;
  const [quesData, setQuesData] = useState(data)
  const [index, setIndex] = useState<number>()
  const [openmodal2, setOpenmodal2] = useState(false)
  const [openmodal, setOpenmodal] = useState(false)
  const [value, setValue] = useState(null);
  const [timeduration, setTimeduration] = useState<number>()
  const [papertype, setPapertype] = useState<string>('')


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
  })

  const addqueshandle = async () => {
    const payload = {
      paperId: "666646777",
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
      Toast.show({
        type: 'success',
        text1: 'Upload Successfully',
      })
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
            <Pressable key={i} onPress={() => handleCol(i)} style={[index === i ? { backgroundColor: Color.red } : '', style.modalbox]}>
              <Text style={[style.modalText, index === i ? { color: Color.white } : { color: Color.red }]}>{ei.title}</Text>
            </Pressable>
          )
        })}
      </View>
    )
  }

  const renderItem = (item: any) => {
    return (
      <View style={style.item}>
        <Text style={style.textItem}>{item.name ? item.name : item.description}</Text>
        {item.value === value && (
          <AntDesign
            style={style.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  const modalData2 = () => {
    return (
      < KeyboardAwareScrollView
        enableOnAndroid={true}>
        <Text style={style.headingstyle}>Enter Paper Duration and Type</Text>
        <View style={style.viewmodal2}>
          <Text style={[style.modal2Text, { marginLeft: rw(12) }]}>Enter the Time:  </Text>
          <TextInput value={timeduration} onChangeText={setTimeduration} keyboardType="numeric" style={style.textinputmodal2} />
          <Text style={[style.modal2Text, { marginLeft: rw(2) }]}>min</Text>
        </View>


        <View style={style.papertypeview}>
          <Text style={style.textpapertype}>Paper Type:</Text>
          {
            questionPaperType?.data && <Dropdown
              style={style.dropdown}
              dropdownPosition='top'
              placeholderStyle={style.placeholderStyle}
              selectedTextStyle={style.selectedTextStyle}
              iconStyle={style.iconStyle}
              data={questionPaperType?.data}
              containerStyle={{ marginBottom: rh(1.8), borderRadius: 10 }}
              itemContainerStyle={{ borderRadius: 10 }}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Paper Type"
              value={value}
              onChange={item => {
                setPapertype(item.name);
                setValue(item.value)
              }}
              renderLeftIcon={() => (
                <AntDesign style={style.icon} color={Color.black} name="Safety" size={20} />
              )}
              renderItem={renderItem}
            />
          }
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[style.addquescss]}
          onPress={handleAddmcq}
        >
          <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10 }}>
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
          <View style={style.flatviewcss}>
            <FlatList
              data={quesData}
              renderItem={({ item }) => (
                <View>
                  <Text style={style.FlatListques}>
                    Q {item.sn}. {item.question}
                  </Text>
                  {
                    typeof (item.answer) === "string" ?
                      <Text style={style.FlatListans}>{item.answer}</Text>
                      :
                      Object.entries(item.options).map(([key, value]) => (
                        <Text style={[style.FlatListans, item.correctOption === key ? { color: Color.green } : { color: Color.white }, { marginBottom: rh(1), marginHorizontal: rw(2) }]}>{key}. {value}</Text>
                      ))
                  }
                </View>
              )}
              keyExtractor={item => item.sn}
            />
            <TouchableOpacity onPress={() => { setOpenmodal(true) }} style={style.addQues}>
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
    marginTop: rh(4),
    marginLeft: rw(5),
    marginRight: rh(4),
  },
  FlatListques: {
    color: Color.white,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: rf(1.9),
    marginBottom: rh(1.6),
    marginTop: rh(2.6)
  },
  FlatListans: {
    fontFamily: 'Montserrat-SemiBold',
    color: Color.green,
    fontSize: rf(1.9),
    // marginBottom: rh(2.6)
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: Color.black,
    opacity: 0.9,
  },
  uploadcss: {
    height: rh(8),
    backgroundColor: Color.red,
    borderTopRightRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 12,
  },
  uploadText: {
    fontFamily: 'Montserrat-SemiBold',
    color: Color.white,
    fontSize: rf(2.6),
  },
  addQues: {
    position: 'absolute',
    elevation: 2,
    zIndex: 10,
    width: rw(7),
    height: rh(15),
    marginTop: 320,
    marginLeft: rw(88),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: Color.red,
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
    color: Color.lightWhite,
    marginLeft: rh(-4.8),
    fontSize: rf(1.5),
    textAlign: 'center',
    transform: [{ rotate: '270deg' }],
  },
  modalcss: {
    backgroundColor: Color.black,
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
  dropdown: {
    margin: 16,
    height: 50,
    width: rw(50),
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 12,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    // shadowOpacity: 0.6,
    // shadowRadius: 100,
    // elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {

    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
  headingstyle: {
    textAlign: 'center', color: Color.white, fontFamily: 'Montserrat-Bold', marginTop: rh(3), fontSize: rf(2.4)
  },
  viewmodal2: {
    flexDirection: 'row', alignContent: 'center', marginVertical: rh(3)
  },
  modal2Text: {
    fontFamily: 'Montserrat-Bold', fontSize: rf(2), color: Color.green, marginTop: rh(2)
  },
  textinputmodal2: {
    fontFamily: 'Montserrat-Bold', fontSize: rf(2.2), paddingLeft: rw(4), backgroundColor: Color.white, width: rw(15), height: rh(5), marginTop: rh(1), borderRadius: 10
  },
  textpapertype: {
    fontFamily: 'Montserrat-Bold', fontSize: rf(2), color: Color.green, marginTop: rh(3), marginLeft: rw(12)
  },
  papertypeview: {
    flexDirection: 'row', marginBottom: rh(3)
  }
});

