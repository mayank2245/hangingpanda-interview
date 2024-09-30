import csv from 'csvtojson';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, DataTable } from 'react-native-paper';
import { Button, ImageBackground, StatusBar, StyleSheet, Text, View } from "react-native";

import { BackgroundImage } from "../../assests/images";
import { color } from "../../constant/color";
import { rf, rh } from "../../helpers/responsivedimention";


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

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <ImageBackground
                style={styles.backgroundImages}
                source={BackgroundImage}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        {
                            loader === true ? <ActivityIndicator size={"large"} style={styles.loadercss} animating={true} color={color.primaryRed} />
                                : <DataTable>
                                    <DataTable.Header style={styles.headerRow}>
                                        {state.tableHead.map((headerData, index) => (
                                            <DataTable.Title key={index} style={styles.cellWithBorder}>
                                                <Text style={styles.conatinertextheader}>{headerData}</Text>
                                            </DataTable.Title>
                                        ))}
                                    </DataTable.Header>
                                    {state.currentPageData.map((rowData, rowIndex) => (
                                        <DataTable.Row key={rowIndex} style={styles.rowWithBorder}>
                                            {rowData.map((cellData, cellIndex) => (
                                                <DataTable.Cell key={cellIndex} style={styles.cellWithBorder}>
                                                    <Text style={styles.conatinertext}>{cellData}</Text>
                                                </DataTable.Cell>
                                            ))}
                                        </DataTable.Row>
                                    ))}
                                </DataTable>
                        }
                    </View>
                </View>
            </ImageBackground>
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
        opacity: 0.8,
        height: '100%',
    },
    container: {
        flex: 1,
        padding: 16,
        marginTop: rh(3)
    },
    headerRow: {
        backgroundColor: '#333333',
    },
    rowWithBorder: {
        borderBottomWidth: 1,
        borderBottomColor: color.white,
    },
    cellWithBorder: {
        borderLeftWidth: 1,
        borderLeftColor: color.white,
        padding: 8,
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
        marginTop: rh(2)
    }
});
