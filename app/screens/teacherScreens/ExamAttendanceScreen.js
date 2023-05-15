import { Alert, Button, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import StatusBarExcludedArea from '../../components/StatusBarExcludedArea'
import Colors from '../../constants/Colors'
import { addToAttendance, checkIfStudentIsAttending, getInvigilationFromSlNo, getStudentsFromBatch, registerAttendance } from '../../database/DbHelper'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import LottieView from 'lottie-react-native'

const ExamAttendanceScreen = ({ navigation, route }) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [qrdata, setQrdata] = useState('');
    const [scannerVisible, setScannerVisible] = useState(false);
    const [studentList, setStudentList] = useState([]);
    const [reportVisible, setReportVisible] = useState(false);
    const [entrySuccess, setEntrySuccess] = useState(false)
    const [reportItem, setReportItem] = useState(null);


    const requestCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted');
        })()
    }

    const [data, setData] = useState(undefined);
    useEffect(() => {
        getInvigilationFromSlNo(route.params.slno, (data) => {
            if (data.length > 0) {
                setData(data[0])
            }
        });
        requestCameraPermission();
        reloadStudents();
    }, [])

    const reloadStudents = () => getStudentsFromBatch(route.params.batch, (data) => {
        setStudentList(data);
        console.log("LISSSSttt ===========================================================");
        console.log(data);
        console.log("LISSSSttt ===========================================================");

    });

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setQrdata(data);
        console.log(data);
        checkIfStudentIsAttending(data, route.params.batch, (attending) => {
            if (attending) {
                registerAttendance(data, route.params.slno, 'present',
                    () => {
                        setEntrySuccess(true);
                        reloadStudents();
                    },
                    (msg) => {
                        console.log(msg);
                        Alert.alert('Attendance Alert', msg, [
                            {
                                text: 'OK',
                                onPress: () => {
                                    setScannerVisible(false);
                                    setScanned(false);
                                }
                            }
                        ]);
                    }
                )
            } else {
                Alert.alert('Attendance Alert', 'User not registered with the system', [
                    {
                        text: 'OK',
                        onPress: () => {
                            setScannerVisible(false);
                            setScanned(false);
                        }
                    }
                ]);
            }
        })
    }

    const renderQuickAttendance = (item) => {
        addToAttendance(item.stud_id, route.params.slno)
        return (
            item.exam_id == route.params.slno && item.status == null && <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, width: '100%' }
            }>
                <View >
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.first_name + ' ' + item.second_name}</Text>
                    <Text>{item.stud_id}</Text>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', height: '100%' }}>
                    <Ionicons
                        onPress={() => {
                            registerAttendance(item.stud_id, route.params.slno, 'present', () => reloadStudents())
                        }} style={{ marginStart: 10 }} name="ios-checkmark-circle-sharp" size={30} color="green" />
                    <Ionicons onPress={() => {
                        registerAttendance(item.stud_id, route.params.slno, 'absent', () => reloadStudents())
                    }} style={{ marginStart: 30 }} name="close-circle-sharp" size={30} color="red" />
                </View>
            </View >
        );

    }

    const handleOnSelectItem = (item) => {
        setReportItem(item);
    };

    const renderReportList = (item) => {

        return (
            item.exam_id == route.params.slno && <View style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, width: '90%', marginHorizontal: 20 }}>
                <View >
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.first_name + ' ' + item.second_name}</Text>
                    <Text>{item.stud_id}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <FontAwesome onPress={() => { handleOnSelectItem(item) }} style={{ marginTop: 5, marginEnd: 10 }} name="edit" size={30} color="dodgerblue" />
                    {
                        item.exam_id == route.params.slno && item.status != null && item.status == 'present' ?
                            <Image style={{ height: 30, width: 30 }} source={require('../../../assets/present.png')} />
                            :
                            <Image style={{ height: 30, width: 30 }} source={require('../../../assets/absent.png')} />
                    }


                </View>
            </View>
        );

    }
    return (
        <View style={{ backgroundColor: Colors.bgGrey, flex: 1 }}>
            <StatusBarExcludedArea style={{ height: 1 }} />
            <View style={{ backgroundColor: Colors.white, paddingHorizontal: 10, width: "100%" }}>
                <Text style={{ fontSize: 25, marginVertical: 10 }}>{route.params.batch}</Text>
            </View>

            <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 10, width: "100%", }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{data && data.semester + ' Semester'}</Text>
                <Text style={{ fontSize: 20 }}>{data && 'Total students' + data.total_student}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity onPress={() => setScannerVisible(true)} style={styles.button}>
                        <Text style={{ color: Colors.black, fontSize: 20, }}>Scan QR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setReportVisible(true)} style={styles.button}>
                        <Text style={{ color: Colors.black, fontSize: 20, }}>Report</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    contentContainerStyle={{ marginTop: 30 }}
                    data={studentList}
                    keyExtractor={(item, index) => 'key_' + index}
                    renderItem={(itemData) => renderQuickAttendance(itemData.item)}
                />
            </View>

            <Modal visible={scannerVisible} animationType='slide' transparent={true} onRequestClose={() => {
                setScannerVisible(false);
                setScanned(false)
            }}>
                <View style={{ alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', flex: 1, justifyContent: 'center' }}>
                    {
                        entrySuccess == false ?
                            <BarCodeScanner
                                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                style={{ height: '70%', width: '70%' }}
                            />
                            :
                            <View style={{ height: 200, width: 200 }}>
                                <LottieView
                                    autoPlay
                                    loop={false}
                                    style={{ flex: 1 }}
                                    onAnimationFinish={() => {
                                        setEntrySuccess(false);
                                        setScannerVisible(false);
                                        setScanned(false);
                                    }}
                                    source={require('../../../assets/success.json')}
                                />
                            </View>
                    }
                </View>
            </Modal>


            <Modal visible={reportVisible} animationType='slide' onRequestClose={() => setReportVisible(false)}>
                <View style={{ backgroundColor: Colors.bgGrey, flex: 1 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: Colors.white, justifyContent: 'center', paddingVertical: 10 }}>
                        <Ionicons onPress={() => setReportVisible(false)} style={{ alignSelf: 'center', left: 10, position: "absolute", }} name="close" size={30} color="black" />
                        <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>{data && data.exam_date}</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 20, paddingHorizontal: 20, }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'dodgerblue', fontSize: 20, fontWeight: '600' }}>Subject:  </Text>
                            <Text style={{ fontSize: 20 }}>{data && data.subject}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ color: 'dodgerblue', fontSize: 20, fontWeight: '600' }}>Class:  </Text>
                            <Text style={{ fontSize: 20, }}>{data && data.batch}</Text>
                        </View>

                        <FlatList
                            style={{ flexDirection: 'row' }}
                            contentContainerStyle={{ width: "100%", marginTop: 30, }}
                            keyExtractor={(item, index) => 'key_' + index}
                            data={studentList}
                            renderItem={(itemData) => renderReportList(itemData.item)}
                        />
                    </View>

                </View>
            </Modal>

            <Modal visible={reportItem != null} animationType='slide' transparent={true} onRequestClose={() => {
                setReportItem(null);
            }}>
                <View style={{ alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)', flex: 1, justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center', borderRadius: 10, backgroundColor: Colors.white, paddingVertical: 30, width: '70%' }}>
                        <View style={{ alignItems: 'center', }} >
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{reportItem && reportItem.first_name + ' ' + reportItem.second_name}</Text>
                            <Text>{reportItem && reportItem.stud_id}</Text>
                        </View>
                        <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 30 }}>
                            <Ionicons
                                onPress={() => {
                                    registerAttendance(reportItem && reportItem.stud_id, route.params.slno, 'present', () => {
                                        reloadStudents();
                                        setReportItem(null);
                                    })
                                }} style={{ marginStart: 10 }} name="ios-checkmark-circle-sharp" size={60} color="green" />
                            <Ionicons onPress={() => {
                                registerAttendance(reportItem && reportItem.stud_id, route.params.slno, 'absent', () => {
                                    reloadStudents()
                                    setReportItem(null);
                                })
                            }} style={{ marginStart: 30 }} name="close-circle-sharp" size={60} color="red" />
                        </View>
                    </View>
                </View>

            </Modal>

        </View>


    )
}

export default ExamAttendanceScreen

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 12,
        elevation: 2,
        height: 56,
        justifyContent: 'center',
        marginTop: 20,
        shadowColor: Colors.white,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: .25,
        shadowRadius: 4,
        width: 147,
    },
})