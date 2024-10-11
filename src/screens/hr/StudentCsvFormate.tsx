import csv from 'csvtojson';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, DataTable } from 'react-native-paper';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Platform, PermissionsAndroid } from 'react-native';
import { color } from "../../constant/color";
import { rf, rh, rw } from "../../helpers/responsivedimention";
import BackArrow from '../../components/BackArrow';
import Icon from 'react-native-vector-icons/Feather';
import ReactNativeBlobUtil from 'react-native-blob-util'

export default function ModalScreen({ navigation }: any) {

    const columnWidths = {
        0: { width: rw(13.3), height: rh(6.5), borderRightWidth: 1, borderRightColor: color.white, },
        1: { width: rw(29.4), height: rh(6.5), borderRightWidth: 1, borderRightColor: color.white, },
        2: { width: rw(43.4), height: rh(6.5), borderRightWidth: 1, borderRightColor: color.white, },
        3: { width: rw(45.3), height: rh(6.5), borderRightWidth: 1, borderRightColor: color.white, },
        4: { width: rw(29), height: rh(6.5) },
    };

    const cellWidths = {
        0: { width: rw(12), height: rh(6.3), borderRightWidth: 1, borderRightColor: color.white, },
        1: { width: rw(29), height: rh(6.3), borderRightWidth: 1, borderRightColor: color.white, },
        2: { width: rw(43), height: rh(6.3), borderRightWidth: 1, borderRightColor: color.white, },
        3: { width: rw(45), height: rh(6.3), borderRightWidth: 1, borderRightColor: color.white, },
        4: { width: rw(29), height: rh(6.3) },
    };


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

    // const requestPermissions = async () => {
    //     if (Platform.OS === 'android') {
    //         try {
    //             if (Platform.Version >= 31) {
    //                 const granted = await PermissionsAndroid.requestMultiple([
    //                     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //                     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //                 ]);
    //                 const allPermissionsGranted = Object.values(granted).every(
    //                     status => status === PermissionsAndroid.RESULTS.GRANTED
    //                 );
    //                 if (allPermissionsGranted) {
    //                     console.log('All permissions granted');
    //                 } else {
    //                     console.log('Some permissions denied');
    //                 }
    //             }
    //         } catch (err) {
    //             console.warn(err);
    //         }
    //     }
    // };

    // const handleDownloadReports = async () => {
    //     const fileUrl = 'https://docs.google.com/spreadsheets/d/1wGTjbeAXM5_Dy9Xme6ks51qdjo9bHv8RN9mPseLtzm4/export?format=csv'; // Updated link
    //     await requestPermissions();  // Make sure permissions are requested before download

    //     try {
    //         const res = await ReactNativeBlobUtil.config({
    //             fileCache: true,
    //             appendExt: 'csv',
    //             path: Platform.OS === 'android'
    //                 ? ReactNativeBlobUtil.fs.dirs.DownloadDir + '/question_paper.csv'
    //                 : ReactNativeBlobUtil.fs.dirs.DocumentDir + '/question_paper.csv',
    //         }).fetch('GET', fileUrl);

    //         const filePath = res.path();
    //         console.log('File downloaded successfully at:', filePath);
    //     } catch (error) {
    //         console.error('Error downloading the CSV file:', error);
    //     }
    // };


    return (
        <View>
            <StatusBar backgroundColor="transparent" translucent={true} />

            <View style={styles.overlay}>
                <View style={styles.headerview}>
                    <BackArrow />
                    <Text style={styles.questionformatetext}>Question paper format </Text>
                    <TouchableOpacity style={styles.uploadPromptIcon} >
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
                                        <DataTable.Title
                                            key={index}
                                            style={[
                                                styles.cellWithBorder,
                                                index === state.currentPageData.length - 1 ? { borderLeftWidth: 0 } : {},
                                                { margin: rw(0.6) },
                                                columnWidths[index] || {}
                                            ]}
                                        >
                                            <View >
                                                <Text style={styles.conatinertextheader}>{headerData}</Text>
                                            </View>
                                        </DataTable.Title>
                                    ))}
                                </DataTable.Header>
                                {state.currentPageData.map((rowData, rowIndex) => (
                                    <DataTable.Row key={rowIndex} style={[styles.rowWithBorder, rowIndex === state.currentPageData.length - 1 ? styles.lastRow : { borderRightWidth: 1, borderRightColor: color.white, }]}>
                                        {rowData && rowData?.map((cellData, cellIndex) => (
                                            <DataTable.Cell
                                                key={cellIndex}
                                                style={[
                                                    styles.cellWithBorder,
                                                    cellWidths[cellIndex] || {}
                                                ]}
                                            >
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
        borderWidth: rh(0),
        borderColor: color.white,
        borderRadius: 12,
        marginVertical: rh(3)
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
        borderWidth: rw(0.3),
        borderColor: color.white,
        flexDirection: 'row',
    },
    conatinertextheader: {
        color: color.white,
        fontFamily: "Montserrat-Bold",
        fontSize: rf(1.3),
        backgroundColor: '#FF385680',
        paddingHorizontal: rh(1.2),
        paddingVertical: rh(0.5),
        borderRadius: 12,
        textAlign: 'center',
    },
    conatinertext: {
        color: color.white,
        fontFamily: "Montserrat-SemiBold",
        fontSize: rf(1.1),
        padding: rw(1),
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
        flexDirection: 'row',
    },
    lastRow: {
        borderRightWidth: 1,
        borderRightColor: color.white,
        // borderBottomWidth: 1,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
    },
    cellWithBorder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    lastCell: {
        borderRightWidth: 0,
    },
    uploadPromptIcon: {
        alignSelf: 'flex-end',
        marginLeft: rw(17.5)
    }
});