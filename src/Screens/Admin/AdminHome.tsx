import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/Feather';
import IconCsv from 'react-native-vector-icons/FontAwesome5';
import IconArrow from 'react-native-vector-icons/AntDesign';
import { csvToJson } from '../../Helpers/csvToJson';
import { useNavigation } from '@react-navigation/native';
import CrossIcon from '../../Assests/svgs/cuticon';
import LogoIcon from '../../Assests/svgs/logo';
import { rf, rh, rw } from '../../Helpers/Responsivedimention';


const bgImage = require('../../Assests/HeaderImage.png');

function App(): React.JSX.Element {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [parsedData, setParsedData] = useState<any>(null);
  const [fileName, setFileName] = useState('');
  const navigation = useNavigation();

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.csv],
      });
      setSelectedFile(res);
      const fileContent = await RNFS.readFile(res[0].uri, 'utf8');
      const parsedResult = csvToJson(fileContent);
      setParsedData(parsedResult);
    } catch (err: any) {
      console.log('Error:', err.message);
    }
  };

  const removeFile = () => {
    setParsedData(null);
  };

  useEffect(() => {
    if (parsedData && selectedFile) {
      const { name } = selectedFile[0];
      setFileName(name);
    }
  }, [parsedData]);
  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
      />
      <ImageBackground
        style={styles.backgroundImage}
        source={bgImage}
        resizeMode="cover">
        <View style={styles.overlay}>
          <ScrollView>
            <Pressable
              style={styles.filePickerContainer}
              onPress={pickDocument}>
              <View style={styles.fileInfoContainer}>
                {parsedData ? (
                  <>
                    <Pressable
                      style={styles.removeFileButton}
                      onPress={removeFile}>
                      <CrossIcon />
                    </Pressable>
                    <IconCsv
                      style={styles.uploadPromptIcon2}
                      name="file-csv"
                      size={36}
                      color="#125B9A"
                    />
                    <Text style={styles.uploadPromptTitle}>{fileName}</Text>
                    <Text style={styles.uploadPromptTitle2}>
                      Click next button to preview
                    </Text>
                  </>
                ) : (
                  <>
                    <Icon
                      style={styles.uploadPromptIcon}
                      name="upload-cloud"
                      size={48}
                      color="#FF575B"
                    />
                    <Text style={styles.uploadPromptTitle}>
                      Import questions Excel or CSV
                    </Text>
                    <Text style={styles.uploadPromptTitle2}>
                      Drag or click to upload
                    </Text>
                  </>
                )}
              </View>
            </Pressable>
            {parsedData && (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.nextButton}
                onPress={() => {
                  navigation.navigate('ShowData', { data: parsedData });
                }}>
                <Text style={styles.nextButtonText}>Next</Text>
                <IconArrow name="arrowright" size={24} color="white" />
              </TouchableOpacity>
            )}

            <LogoIcon style={styles.logoImage} />
            <Text style={[styles.logoText]}>HANGING PANDA PRODUCTS</Text>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    opacity: 0.8,
    height: rh(100),
  },
  filePickerContainer: {
    marginTop: rh(13),
    borderRadius: 19,
    paddingBottom: rh(4),
    height: rh(21.8),
    width: "90%",
    margin: 'auto',
    backgroundColor: '#D9D9D9',
  },
  fileInfoContainer: {
    borderRadius: 19,
    borderWidth: 2.5,
    height: rh(21.8),
    width: '100%',
    margin: 'auto',
    borderStyle: 'dashed',
    borderColor: '#125B9A',
  },
  removeFileButton: {
    position: 'absolute',
    marginTop: rh(1.6),
    marginLeft: rw(81)
  },
  fileNameText: {
    fontFamily: 'NunitoSans_7pt-SemiBold',
    color: '#125B9A',
    fontSize: rf(2),
    textAlign: 'center',
    marginTop: rh(4),
  },
  uploadPromptIcon: {
    marginTop: rh(4),
    marginLeft: rw(38),
  },
  uploadPromptIcon2: {
    marginTop: rh(4),
    marginLeft: rw(40),
  },
  uploadPromptTitle: {
    fontFamily: 'NunitoSans_7pt-SemiBold',
    fontSize: rf(2),
    textAlign: 'center',
    color: '#FF575B',
    marginTop: rh(1),
  },
  uploadPromptTitle2: {
    fontFamily: 'NunitoSans_7pt-SemiBold',
    fontSize: rf(1.8),
    textAlign: 'center',
    color: '#125B9A',
    marginTop: rh(0.4),
  },
  nextButton: {
    backgroundColor: '#FF3856',
    borderRadius: 10,
    height: rh(4.5),
    width: rw(29),
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: rh(3),
    paddingTop: rh(1),
    flexDirection: 'row',
    marginTop: rh(4),
    marginLeft: rw(34)
  },
  nextButtonText: {
    fontFamily: 'NunitoSans_7pt-SemiBold',
    color: 'white',
    fontSize: rf(2),
  },
  logoImage: {
    position: 'absolute',
    marginTop: rh(63),
    width: rw(3),
    height: rh(4),
    marginLeft: rw(4)
  },
  logoText: {
    fontFamily: 'Montserrat-SemiBold',
    position: 'absolute',
    opacity: 0.7,
    color: '#D9D9D9',
    fontSize: rf(4.4),
    height: rh(18),
    width: rw(55),
    marginTop: rh(78),
    marginLeft: rw(5),
  },
});

export default App;
