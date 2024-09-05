import React, { useState } from 'react';
import {
  FlatList,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import bgImage from '../../Assests/HeaderImage.png'
import Upload from '../../Assests/svgs/upload'
import Add from '../../Assests/svgs/add'
import CrossIcon from '../../Assests/svgs/cuticon';

export default function showdata({ route }) {
  const { data } = route.params;
  const [openmodal, setOpenmodal] = useState(false)

  return (
    <SafeAreaView>
      <ImageBackground
        style={style.backgroundImage}
        source={bgImage}
        resizeMode="cover">
        <View style={style.overlay}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={style.flatviewcss}>
                <Text style={style.FlatListques}>
                  Q {item.sn}. {item.question}
                </Text>
                <Text style={style.FlatListans}>{item.ans}</Text>
              </View>
            )}
            keyExtractor={item => item.sn}
          />
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
            <Upload style={style.uploadIcon} />
            <Text style={style.uploadText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <Modal
        visible={openmodal}
        animationType='slide'
        transparent={true}>
        <View style={style.modalcss}>
          <CrossIcon style={style.crosscut} onPress={() => { setOpenmodal(false) }} />
          <Text style={style.modalText}>Input</Text>
          <Text style={style.modalText}>MCQ’s</Text>
          <Text style={style.modalText}>Blank Space</Text>
          <Text style={style.modalText}>Program</Text>
        </View>

      </Modal>
    </SafeAreaView >


  );
}
const style = StyleSheet.create({
  flatviewcss: {
    flex: 1,
    width: 380,
    height: 104,
    top: 5,
    left: 3,
    marginBottom: 8,
  },
  FlatListques: {
    color: '#FFFFFF',
    width: 366,
    height: 22,
    top: 45,
    left: 23,
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 22,

  },
  FlatListans: {
    color: '#06D001',
    width: 369,
    height: 66,
    top: 58,
    left: 34,
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 22
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
    flexDirection: 'row'
  },
  uploadIcon: {
    width: 30,
    height: 32,
    top: 18,
    left: 144,
  },
  uploadText: {
    fontWeight: '600',
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 22,
    textAlign: 'center',
    left: 150,
    top: 24,
    height: 22,
    width: 74,
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
    height: 22,
    top: 45,
    color: "#D9D9D9",
    left: -29,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 22,
    textAlign: 'center',
    transform: [{ rotate: '90deg' }],
  },
  modalcss: {
    width: 430,
    height: 467,
    top: 402,
    backgroundColor: 'black',
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    borderWidth: 4,

  },
  modalText: {
    textAlign: 'center',
    color: '#FF3856',
    borderWidth: 3,
    borderColor: '#FF3856',
    width: 369,
    height: 67,
    top: 30,
    left: 30,
    borderRadius: 15,
    fontWeight: '600',
    fontSize: 20,
    marginTop: 15,
    lineHeight: 22,
    paddingTop: 20,
    marginBottom: 15,
  },
  crosscut: {
    width: 369,
    height: 20,
    top: 22,
    left: 370,
    marginBottom: 10
  }
});
