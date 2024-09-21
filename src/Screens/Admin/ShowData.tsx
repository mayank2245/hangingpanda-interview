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
import Upload from '../../Assests/svgs/upload'
import Add from '../../Assests/svgs/add'
import CrossIcon from '../../Assests/svgs/cuticon';
import CustomModal from '../../Components/modal';
import { useNavigation } from '@react-navigation/native';
import { rf, rh, rw } from '../../Helpers/Responsivedimention';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Addques from '../../Assests/svgs/addQues';
import { ApiService } from '../../API/apiCalls/apiCalls';
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
const bgImage = require('../../Assests/HeaderImage.png')




export default function Showdata({ route }: any) {
  const { data } = route.params;
  const { data2, selectedmcq } = route.params;
  const [quesData, setQuesData] = useState(data)
  const [index, setIndex] = useState<number>()
  const [openmodal2, setOpenmodal2] = useState(false)
  const [openmodal, setOpenmodal] = useState(false)
  const [value, setValue] = useState(null);
  const [timeduration, setTimeduration] = useState<number>()
  const [papertype, setPapertype] = useState<string>('')
  const [handleapi, setHandleapi] = useState(false)
  useEffect(() => {
    if (data2 !== undefined) {
      setQuesData(data2)
    }
  })
  const dataDropdown = [
    { label: 'JavaScript', value: '1' },
    { label: 'Python', value: '2' },
    { label: 'Item 3', value: '3' },
  ];
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

  console.log(timeduration)
  console.log(papertype)
  const addqueshandle = async () => {
    const payload = {
      paperId: "Q1aaaa110065",
      timeLimit: timeduration,
      questionPaperType: papertype,
      questions: [
        {
          type: "MCQ",
          question: "what is correct option ?",
          options: {
            a: "3",
            b: "4",
            c: "5"
          },
          correctOption: "b"
        },
        {
          type: "Input",
          question: "This is my question?",
          answer: "It is my answer"
        }
      ]
    }
    const token = await AsyncStorage.getItem('MYtoken')
    console.log(token, "-------------token token")
    if (token) {
      const res = await ApiService.addquestionPaper(payload, token)
      return res
    }


  }
  const { data: dataofQuestion, isLoading, isSuccess, error, refetch } = useQuery({
    queryKey: ['querrykey'],
    queryFn: addqueshandle,
    enabled: false
  })
  console.log(error)
  if (isSuccess) {
    console.log(isSuccess, "successfull")
  }

  const handleAddmcq = () => {
    refetch();
  }

  const handleUpload = () => {
    setOpenmodal2(true)
  }


  const handleCol = (i: number) => {
    setIndex(i);
    setOpenmodal(false)
    setOpenmodal2(false)
    navigation.navigate("AddQuestion", { data: quesData, Id: i })
  }

  const navigation = useNavigation();
  const modalData = () => {
    return (
      <View style={style.modalcss}>
        <CrossIcon style={style.crosscut} onPress={() => { setOpenmodal(false) }} />
        {dataText?.map((ei, i) => {
          return (
            <Pressable key={i} onPress={() => handleCol(i)} style={[index === i ? { backgroundColor: '#FF3856' } : '', style.modalbox]}>
              <Text style={[style.modalText, index === i ? { color: '#FFFFFF' } : { color: '#FF3856' }]}>{ei.title}</Text>
            </Pressable>
          )
        })}
      </View>
    )
  }

  const renderItem = (item: any) => {
    return (
      <View style={style.item}>
        <Text style={style.textItem}>{item.label}</Text>
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
      <>
        <View>
          <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'Montserrat-Bold', marginTop: rh(3), fontSize: rf(2.4) }}>Enter Paper Duration and Type</Text>
        </View>
        <View style={{ flexDirection: 'row', alignContent: 'center', marginVertical: rh(3) }}>
          <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: rf(2), color: '#06D001', marginTop: rh(2), marginLeft: rw(12) }}>Enter the Time:  </Text>
          <TextInput value={timeduration} onChangeText={setTimeduration} keyboardType="numeric" style={{ fontFamily: 'Montserrat-Bold', fontSize: rf(2.2), paddingLeft: rw(4), backgroundColor: 'white', width: rw(15), height: rh(5), marginTop: rh(1), borderRadius: 10 }} />
          <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: rf(2), color: '#06D001', marginTop: rh(2), marginLeft: rw(2) }}>min</Text>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: rh(3) }}>
          <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: rf(2), color: '#06D001', marginTop: rh(3), marginLeft: rw(12) }}>Paper Type:</Text>
          <Dropdown
            style={style.dropdown}
            dropdownPosition='top'
            placeholderStyle={style.placeholderStyle}
            selectedTextStyle={style.selectedTextStyle}
            iconStyle={style.iconStyle}
            data={dataDropdown}
            containerStyle={{ marginBottom: rh(0.5), borderRadius: 10 }}
            itemContainerStyle={{ borderRadius: 10 }}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Paper Type"
            value={value}
            onChange={item => {
              setValue(item?.value)
              setPapertype(item?.table);
            }}
            renderLeftIcon={() => (
              <AntDesign style={style.icon} color="black" name="Safety" size={20} />
            )}
            renderItem={renderItem}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[style.addquescss]}
          onPress={handleAddmcq}
        >
          <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10 }}>
            <Addques />
            <Text style={style.addquesText}>Add</Text>
          </View>
        </TouchableOpacity>
      </>
    )
  }



  return (
    <SafeAreaView>
      <ImageBackground
        style={style.backgroundImage}
        source={bgImage}
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
                    typeof (item.ans) === "string" ?
                      <Text style={style.FlatListans}>{item.ans}</Text>
                      :
                      item.ans.map((ei: any, i: number) => {
                        return <Text style={[style.FlatListans, selectedmcq === i ? { color: '#06D001' } : { color: 'white' }, { marginBottom: rh(1), marginHorizontal: rw(2) }]}>{String.fromCharCode(65 + (i))}. {ei}</Text>
                      })

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
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: rf(1.9),
    marginBottom: rh(1.6),
    marginTop: rh(2.6)
  },
  FlatListans: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#06D001',
    fontSize: rf(1.9),
    // marginBottom: rh(2.6)
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    opacity: 0.9,
  },
  uploadcss: {
    height: rh(8),
    backgroundColor: '#FF3856',
    borderTopRightRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 12,
  },
  uploadText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFFFFF',
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
    backgroundColor: "#FF3856",
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
    color: "#D9D9D9",
    marginLeft: rh(-4.8),
    fontSize: rf(1.5),
    textAlign: 'center',
    transform: [{ rotate: '270deg' }],
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
  dropdown: {
    margin: 16,
    height: 50,
    width: rw(50),
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 12,
    // shadowColor: '#000',
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
    backgroundColor: '#FF3856',
    borderTopRightRadius: 25,
  },
  addquesText: {
    fontFamily: 'Montserrat-Bold',
    color: '#FFFFFF',
    fontSize: rf(2.4),
    textAlign: 'center',
  },
});

