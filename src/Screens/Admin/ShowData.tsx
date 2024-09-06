import React, { useState } from 'react';
import {
  FlatList,
  ImageBackground,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
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
const bgImage = require('../../Assests/HeaderImage.png')

export default function showdata({ route }: any) {
  const { data } = route.params;
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

  const navigation = useNavigation();
  const modalData = () => {
    return (
      <View style={style.modalcss}>
        <CrossIcon style={style.crosscut} onPress={() => { setOpenmodal(false) }} />
        {dataText?.map((ei, i) => {
          return (
            <Pressable key={i} onPress={() => { handleCol(i), navigation.navigate("AddQuestion") }} style={[ind === i ? { backgroundColor: '#FF3856' } : '', style.modalbox]}>
              <Text style={[style.modalText, ind === i ? { color: '#FFFFFF' } : { color: '#FF3856' }]}>{ei.title}</Text>
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
              data={data}
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
          </View>
          {
            !openmodal && (
              <TouchableOpacity onPress={() => { setOpenmodal(true) }} style={style.addQues}>
                <Add style={style.addQuesLogo} />
                <Text style={[style.addQuesText]}>Add questions</Text>
              </TouchableOpacity>
            )
          }
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
    flex: 1,
    marginTop: 45,
    marginLeft: 23,
    marginRight: 23,
  },
  FlatListques: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    marginBottom: 15,
  },
  FlatListans: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#06D001',
    fontSize: 17,
    marginBottom: 22,
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
    height: 71,
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
    fontSize: 20,
    lineHeight: 22,

  },
  addQues: {
    width: 31,
    height: 124,
    top: -300,
    left: 383,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#FF3856",
  },
  addQuesLogo: {
    height: 25,
    width: 25,
    top: 9,
    left: 8,
  },
  addQuesText: {
    width: 90,
    top: 50,
    color: "#D9D9D9",
    marginLeft: -31,
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
    transform: [{ rotate: '270deg' }],
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
  }
});
