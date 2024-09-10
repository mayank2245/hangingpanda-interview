import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Upload from '../../Assests/svgs/upload'
import Add from '../../Assests/svgs/add'
import CrossIcon from '../../Assests/svgs/cuticon';
import CustomModal from '../../Components/modal';
import { useNavigation } from '@react-navigation/native';
import { rf, rh, rw } from '../../Helpers/Responsivedimention';
const bgImage = require('../../Assests/HeaderImage.png')


export default function Showdata({ route }: any) {
  const { data } = route.params;
  const { data2 } = route.params;
  const [quesData, setQuesData] = useState(data)
  const [index, setIndex] = useState<number>()
  const [openmodal, setOpenmodal] = useState(false)
  useEffect(() => {
    if (data2 !== undefined) {
      setQuesData(data2)
      setIndex(undefined)
    }
  })
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
    setOpenmodal(false)
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
                  <Text style={style.FlatListans}>{item.ans}</Text>
                </View>
              )}
              keyExtractor={item => item.sn}
            />
            <TouchableOpacity onPress={() => { setOpenmodal(true) }} style={style.addQues}>
              <Add style={style.addQuesLogo} />
              <Text style={[style.addQuesText]}>Add questions</Text>
            </TouchableOpacity>
          </View>


          <TouchableOpacity
            activeOpacity={0.8}
            style={style.uploadcss}>
            <Upload />
            <Text style={style.uploadText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <CustomModal title='' content={modalData()} visible={openmodal} onClose={() => { setOpenmodal(false); }} />
    </SafeAreaView >


  );
}
const style = StyleSheet.create({
  flatviewcss: {
    zIndex: 0,
    flex: 1,
    marginTop: rh(6),
    marginLeft: rw(5),
    marginRight: rh(4),
  },
  FlatListques: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: rf(1.9),
    marginBottom: rh(1.6),
  },
  FlatListans: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#06D001',
    fontSize: rf(1.9),
    marginBottom: rh(2.6)
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
  }
});
