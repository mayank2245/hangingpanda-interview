import csv from 'csvtojson';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, DataTable } from 'react-native-paper';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Table, TableWrapper, Row } from 'react-native-reanimated-table';
import { color } from "../../constant/color";
import { rf, rh, rw } from "../../helpers/responsivedimention";
import BackArrow from '../../components/BackArrow';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';


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


    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });

    const handleDownloadReports = () => {
        const url = 'https://docs.google.com/spreadsheets/d/1b8yY_OQYzJ5xBhys9k8FFl5yHZg-wbJJq7A2X4hBQPk/edit?usp=sharing'
        axiosInstance(url)
            .then(
                (response: { data: string | Blob; }) => {
                    console.log("response", response)
                    const url = window.URL.createObjectURL(new Blob([response.data]))
                    const link = document.createElement('a')
                    link.href = url
                    const fileName = `downloaded Report ${moment(new Date()).format("DD MMM YY")}.csv`;
                    link.setAttribute('download', fileName)
                    document.body.appendChild(link)
                    link.click()
                    link.remove()
                },
                console.log("first")
            ).catch(
                (error: any) => {
                    console.log(error)
                }
            )
    }

    return (
        <View>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <View style={styles.overlay}>
                <View style={styles.headerview}>
                    <BackArrow />
                    <Text style={styles.questionformatetext}>Add Student format </Text>
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
                                            <View style={styles.viewheadercss}>
                                                <Text style={styles.conatinertextheader}>{headerData}</Text>
                                            </View>
                                        </DataTable.Title>
                                    ))}
                                </DataTable.Header>
                                {state.currentPageData.map((rowData, rowIndex) => (
                                    <DataTable.Row key={rowIndex} style={[styles.rowWithBorder, rowIndex === state.currentPageData.length - 1 ? styles.lastRow : {}]}>
                                        {rowData.map((cellData: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, cellIndex: React.Key | null | undefined) => (
                                            <DataTable.Cell key={cellIndex} style={[styles.cellWithBorder, cellIndex === rowData.length - 1 ? styles.lastCell : {}]}>
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
        borderRadius: 12
    },
    headerview: {
        flexDirection: 'row'
    },
    container: {
        margin: 26,
        marginTop: rh(3)
    },
    headerRow: {
        backgroundColor: '#333333',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
    },
    conatinertextheader: {
        color: color.white,
        fontFamily: "Montserrat-Bold",
        fontSize: rf(1.3),
    },
    conatinertext: {
        color: color.white,
        fontFamily: "Montserrat-SemiBold",
        fontSize: rf(1.1),
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
    },
    lastRow: {
        borderBottomWidth: 1,
    },
    cellWithBorder: {
        borderRightWidth: 1,
        borderRightColor: color.white,
        padding: 8,
    },
    lastCell: {
        borderRightWidth: 0,
    },
    uploadPromptIcon: {
        alignSelf: 'flex-end',
        marginLeft: rw(24.5)
    },
    viewheadercss: {
        backgroundColor: '#FF385680',
        paddingHorizontal: rh(0.4),
        borderRadius: 12,
    }
});

