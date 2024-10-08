import csv from 'csvtojson';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, DataTable } from 'react-native-paper';
import { Alert, Linking, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Platform, PermissionsAndroid } from 'react-native';
import { color } from "../../constant/color";
import { rf, rh, rw } from "../../helpers/responsivedimention";
import BackArrow from '../../components/BackArrow';
import Icon from 'react-native-vector-icons/Feather';
import ReactNativeBlobUtil from 'react-native-blob-util'

export default function ModalScreen({ navigation }: any) {

    const csvFileUrl = "https://docs.google.com/spreadsheets/d/1b8yY_OQYzJ5xBhys9k8FFl5yHZg-wbJJq7A2X4hBQPk/export?format=csv&gid=402345587"; // Modified CSV URL
    const [state, setState] = useState({
        tableHead: [],
        tableData: [],
        currentPageData: [],
        numberOfPages: 1
    });
    const [page, setPage] = useState(0);
    const [loader, setLoader] = useState(true)
    const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(10);

    const setTableData = async (csvFileUrl: string | URL | Request) => {
        try {
            const response = await fetch(csvFileUrl);
            const resp = await response.text();
            const csvRow = await csv({
                noheader: false,
                output: "csv"
            }).fromString(resp);

            let pages = Math.ceil((csvRow.length - 1) / numberOfItemsPerPage);
            const currentPageData = csvRow.slice(
                page * numberOfItemsPerPage + 1,
                (page + 1) * numberOfItemsPerPage + 1
            );

            setState({
                tableHead: csvRow[0],
                tableData: csvRow.slice(1),
                currentPageData,
                numberOfPages: pages
            });
            setLoader(false)
        } catch (error) {
            console.error("Error fetching the CSV data", error);
        }
    };

    useEffect(() => {
        setLoader(true)
        setTableData(csvFileUrl);
    }, [page, numberOfItemsPerPage]);

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            try {
                if (Platform.Version >= 31) {
                    const granted = await PermissionsAndroid.requestMultiple([
                        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    ]);
                    const allPermissionsGranted = Object.values(granted).every(
                        status => status === PermissionsAndroid.RESULTS.GRANTED
                    );
                    if (allPermissionsGranted) {
                        console.log('All permissions granted');
                    } else {
                        console.log('Some permissions denied');
                    }
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

    const handleDownloadReports = async () => {
        const fileUrl = 'https://docs.google.com/spreadsheets/d/1wGTjbeAXM5_Dy9Xme6ks51qdjo9bHv8RN9mPseLtzm4/export?format=csv'; // Updated link
        await requestPermissions();  // Make sure permissions are requested before download

        try {
            const res = await ReactNativeBlobUtil.config({
                fileCache: true,
                appendExt: 'csv',
                path: Platform.OS === 'android'
                    ? ReactNativeBlobUtil.fs.dirs.DownloadDir + '/question_paper.csv'
                    : ReactNativeBlobUtil.fs.dirs.DocumentDir + '/question_paper.csv',
            }).fetch('GET', fileUrl);

            const filePath = res.path();
            console.log('File downloaded successfully at:', filePath);
        } catch (error) {
            console.error('Error downloading the CSV file:', error);
        }
    };


    return (
        <View>
            <StatusBar backgroundColor="transparent" translucent={true} />

            <View style={styles.overlay}>
                <View style={styles.headerview}>
                    <BackArrow />
                    <Text style={styles.questionformatetext}>Question paper format </Text>
                    <TouchableOpacity style={styles.uploadPromptIcon} onPress={handleDownloadReports}>
                        <Icon

                            name="download-cloud"
                            size={28}
                            color={color.lightRed}
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal={true} style={styles.container} >
                    {
                        loader === true ? <ActivityIndicator size={"large"} style={styles.loadercss} animating={true} color={color.primaryRed} />
                            : <DataTable style={styles.datatable}>
                                <DataTable.Header style={styles.headerRow}>
                                    {state.tableHead.map((headerData, index) => (
                                        <DataTable.Title key={index} style={styles.cellWithBorder}>
                                            <View style={{
                                                backgroundColor: '#FF385680',
                                                paddingHorizontal: rh(0.4),
                                                borderRadius: 12,
                                            }}>
                                                <Text style={styles.conatinertextheader}>{headerData}</Text>
                                            </View>
                                        </DataTable.Title>
                                    ))}
                                </DataTable.Header>
                                //use Cell Index to give col and row particular height
                                {state.currentPageData.map((rowData, rowIndex) => (
                                    <DataTable.Row key={rowIndex} style={[styles.rowWithBorder, rowIndex === state.currentPageData.length - 1 ? styles.lastRow : {}]}>
                                        {rowData && rowData?.map((cellData: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, cellIndex: React.Key | null | undefined) => (
                                            <DataTable.Cell key={cellIndex} style={[styles.cellWithBorder, cellIndex === rowData.length - 1 ? styles.lastCell : {}]}>

                                                {


                                                }
                                                <Text style={styles.conatinertext}>{cellData}</Text>
                                            </DataTable.Cell>
                                        ))}
                                    </DataTable.Row>
                                ))}
                            </DataTable>
                    }
                </ScrollView>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundImages: {
        height: '100%',
        width: '100%',
    },
    overlay: {
        backgroundColor: color.black,
        height: '100%',
    },
    questionformatetext: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: rf(2.2),
        marginTop: rh(4),
        marginLeft: rw(2),
        color: color.primaryRed
    },
    datatable: {
        borderWidth: rh(0.2),
        borderColor: color.white,
        borderRadius: 12,
        marginBottom: rh(3), // Space for footer or other UI components
    },
    headerview: {
        flexDirection: 'row',
    },
    container: {
        margin: rw(6),
        marginTop: rh(3),
    },
    headerRow: {
        backgroundColor: '#333333',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        flexDirection: 'row', // Ensure the header rows are aligned horizontally
    },
    conatinertextheader: {
        color: color.white,
        fontFamily: "Montserrat-Bold",
        fontSize: rf(1.3),
        paddingVertical: rh(1), // Vertical padding for better alignment
        paddingHorizontal: rw(2), // Horizontal padding for balanced spacing
        textAlign: 'center', // Ensures the text is centered in the header
    },
    conatinertext: {
        color: color.white,
        fontFamily: "Montserrat-SemiBold",
        fontSize: rf(1.1),
        padding: rw(2),
        textAlign: 'center',
    },
    loadercss: {
        marginLeft: rw(35),
        marginTop: rh(-20)
    },
    rowWithBorder: {
        borderBottomWidth: 1,
        borderBottomColor: color.white,
        borderLeftWidth: 1,
        borderLeftColor: color.white,
        flexDirection: 'row', // Ensure the row content aligns horizontally
    },
    lastRow: {
        borderBottomWidth: 1,
    },
    cellWithBorder: {
        borderRightWidth: 1,
        borderRightColor: color.white,
        paddingVertical: rh(1), // Vertical padding for cells
        paddingHorizontal: rw(2), // Horizontal padding for cells
        justifyContent: 'center', // Ensure content is vertically aligned
        alignItems: 'center', // Horizontally center the content inside cells
    },
    lastCell: {
        borderRightWidth: 0,
    },
    uploadPromptIcon: {
        alignSelf: 'flex-end',
        marginLeft: rw(17.5)
    }
});


