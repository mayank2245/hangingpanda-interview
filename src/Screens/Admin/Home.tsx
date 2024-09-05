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
import bgImage from '../../Assests/HeaderImage.png';
import { useNavigation } from '@react-navigation/native';
import CrossIcon from '../../Assests/svgs/cuticon';
import LogoIcon from '../../Assests/svgs/logo';

function App(): React.JSX.Element {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [parsedData, setParsedData] = useState<any>(null);
  const [displayData, setDisplayData] = useState('');
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
                      style={styles.uploadPromptIcon}
                      name="file-csv"
                      size={35}
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
                <IconArrow name="arrowright" size={25} color="white" />
              </TouchableOpacity>
            )}

            <LogoIcon style={styles.logoImage} />
            <Text style={styles.logoText}>HANGING PANDA PRODUCTS</Text>
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
    height: 943,
  },
  filePickerContainer: {
    margin: 15,
    top: 98,
    borderRadius: 19,
    paddingBottom: 15,
    height: 200,
    width: 384,
    backgroundColor: '#D9D9D9',
    opacity: 0.8,
  },
  fileInfoContainer: {
    borderRadius: 19,
    borderWidth: 2.5,
    height: 200,
    width: 384,

    borderStyle: 'dashed',
    borderColor: '#125B9A',
  },
  removeFileButton: {
    position: 'absolute',
    width: 20,
    height: 20,
    left: 350,
    top: 5,
  },
  fileNameText: {
    color: '#125B9A',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'center',
    top: 55,
  },
  uploadPromptIcon: {
    top: 38,
    left: 165,
  },
  uploadPromptTitle: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#FF575B',
    top: 55,
  },
  uploadPromptTitle2: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#125B9A',
    top: 65,
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#FF3856',
    borderRadius: 10,
    height: 40,
    width: 140,
    left: 143,
    top: 94,
    justifyContent: 'center',
    gap: 8,
    paddingTop: 8,
    flexDirection: 'row',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  logoImage: {
    position: 'absolute',
    top: 590,
    width: 129,
    height: 129,
    left: 18,
  },
  logoText: {
    position: 'absolute',
    fontWeight: '600',
    opacity: 0.8,
    color: '#D9D9D9',
    fontSize: 40,
    lineHeight: 40,
    width: 243,
    height: 111,
    top: 730,
    left: 18,
  },
});

export default App;
