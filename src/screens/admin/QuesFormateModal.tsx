import csv from 'csvtojson';
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, DataTable } from 'react-native-paper';
import { Share, StatusBar, StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert } from "react-native";
import { Platform, PermissionsAndroid } from 'react-native';
import { color } from "../../constant/color";
import { rf, rh, rw } from "../../helpers/responsivedimention";
import BackArrow from '../../components/BackArrow';
import Icon from 'react-native-vector-icons/Feather';
import ReactNativeBlobUtil from 'react-native-blob-util';

export default function ModalScreen({ navigation }) {

    const columnWidths = {
        0: { width: rw(13.3), height: rh(6.5), borderRightWidth: 1, borderRightColor: color.white },
        1: { width: rw(29.4), height: rh(6.5), borderRightWidth: 1, borderRightColor: color.white },
        2: { width: rw(43.4), height: rh(6.5), borderRightWidth: 1, borderRightColor: color.white },
        3: { width: rw(45.3), height: rh(6.5), borderRightWidth: 1, borderRightColor: color.white },
        4: { width: rw(29), height: rh(6.5) },
    };

    const [state, setState] = useState({
        tableHead: [],
        tableData: [],
        currentPageData: [],
        numberOfPages: 1
    });
    const [page, setPage] = useState(0);
    const [loader, setLoader] = useState(true);
    const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(10);

    const csvFileUrl = "https://docs.google.com/spreadsheets/d/1b8yY_OQYzJ5xBhys9k8FFl5yHZg-wbJJq7A2X4hBQPk/export?format=csv&gid=402345587";

    const setTableData = async (csvFileUrl) => {
        try {
            const response = await fetch(csvFileUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const resp = await response.text();
            const csvRow = await csv().fromString(resp);

            let pages = Math.ceil((csvRow.length - 1) / numberOfItemsPerPage);
            const currentPageData = csvRow.slice(
                page * numberOfItemsPerPage + 1,
                (page + 1) * numberOfItemsPerPage + 1
            );

            setState({
                tableHead: csvRow[0] || [],
                tableData: csvRow.slice(1),
                currentPageData,
                numberOfPages: pages
            });
            setLoader(false);
        } catch (error) {
            console.error("Error fetching the CSV data", error);
            Alert.alert("Error", error.message); // Show alert on error
            setLoader(false);
        }
    };


    useEffect(() => {
        setLoader(true);
        setTableData(csvFileUrl);
    }, [page, numberOfItemsPerPage]);

    const requestStoragePermission = async () => {
        try {
            if (Platform.OS === 'android' && Number(Platform.Version) < 33) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Storage Permission",
                        message: "This app needs access to your storage to download files.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK",
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            }
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const onDownloadPress = useCallback(async ({ fileName, url }) => {
        try {
            if (Platform.OS === 'android') {
                const hasPermission = await requestStoragePermission();
                if (!hasPermission) return;
            }
            await downloadFile({ fileName, fileUrl: url });
        } catch (error) {
            console.error("Download error", error);
        }
    }, []);

    const downloadFile = ({ fileName, fileUrl }) => {
        return new Promise((resolve) => {
            let dirs = ReactNativeBlobUtil.fs.dirs;
            ReactNativeBlobUtil.config({
                fileCache: true,
                appendExt: 'pdf',
                path: `${dirs.DocumentDir}/${fileName}`,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    title: fileName,
                    description: 'File downloaded by download manager.',
                    mime: 'application/csv',
                },
            })
                .fetch('GET', fileUrl)
                .then((res) => {
                    resolve('');
                    if (Platform.OS === 'ios') {
                        const filePath = res.path();
                        let options = {
                            type: 'application/csv',
                            url: filePath,
                            saveToFiles: true,
                        };
                        Share.open(options)
                            .then((resp) => console.log(resp))
                            .catch((err) => console.log(err));
                    }
                })
                .catch((err) => {
                    console.error('BLOB ERROR -> ', err);
                    resolve('');
                });
        });
    };

    return (
        <View style={styles.overlay}>
            <StatusBar backgroundColor="transparent" translucent={true} />

            <View style={styles.headerview}>
                <BackArrow />
                <Text style={styles.questionformatetext}>Question paper format</Text>
                <TouchableOpacity
                    style={styles.uploadPromptIcon}
                    activeOpacity={0.8}
                    onPress={() => onDownloadPress({
                        fileName: 'QuestionFormate.csv',
                        url: csvFileUrl
                    })}
                >
                    <Icon name="download-cloud" size={28} color={color.lightRed} />
                </TouchableOpacity>
            </View>

            <ScrollView horizontal={true} style={styles.container}>
                {loader ? (
                    <ActivityIndicator size={"large"} style={styles.loadercss} animating={true} color={color.primaryRed} />
                ) : (
                    <DataTable style={styles.datatable}>
                        <DataTable.Header style={styles.headerRow}>
                            {Array.isArray(state.tableHead) && state.tableHead.map((headerData, index) => (
                                <DataTable.Title
                                    key={index}
                                    style={[
                                        styles.cellWithBorder,
                                        index === state.currentPageData.length - 1 ? { borderLeftWidth: 0 } : {},
                                        { margin: rw(0.6) },
                                        columnWidths[index] || {}
                                    ]}
                                >
                                    <Text style={styles.conatinertextheader}>{headerData}</Text>
                                </DataTable.Title>
                            ))}
                        </DataTable.Header>
                        {/* {state.currentPageData.map((rowData, rowIndex) => (
                            <DataTable.Row key={rowIndex} style={[styles.rowWithBorder, rowIndex === state.currentPageData.length - 1 ? styles.lastRow : {}]}>
                                {rowData.map((cellData, cellIndex) => (
                                    <DataTable.Cell
                                        key={cellIndex}
                                        style={[styles.cellWithBorder, columnWidths[cellIndex] || {}]}
                                    >
                                        <Text style={styles.conatinertext}>{cellData}</Text>
                                    </DataTable.Cell>
                                ))}
                            </DataTable.Row>
                        ))} */}
                    </DataTable>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
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
        marginTop: rh(2.2),
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
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
    },
    cellWithBorder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadPromptIcon: {
        alignSelf: 'flex-end',
        marginLeft: rw(17.5)
    }
});
