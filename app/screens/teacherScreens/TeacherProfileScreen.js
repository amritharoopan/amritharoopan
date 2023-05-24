import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Colors from '../../constants/Colors'
import StatusBarExcludedArea from '../../components/StatusBarExcludedArea'
import { getStudentInfo, getTeacherInfo } from '../../database/DbHelper'
import AuthContext from '../../utils/context'
import { AntDesign } from '@expo/vector-icons';

const TeacherProfileScreen = ({ navigation }) => {
    const authContext = useContext(AuthContext);
    const [teacher, setTeacher] = useState([]);
    useEffect(() => {
        getTeacherInfo(authContext.user, (data) => setTeacher(data[0]))
    }, [])
    return (
        <View style={{ backgroundColor: Colors.bgGrey, flex: 1 }}>
            <StatusBarExcludedArea style={{ height: 1 }} />
            <View style={{ justifyContent: 'center', backgroundColor: Colors.white, paddingHorizontal: 10, width: "100%" }}>
                <Text style={{ fontSize: 25, marginVertical: 10 }}>Profile</Text>
                <AntDesign
                    onPress={() => {
                        Alert.alert('LOGOUT', 'Do you wish to logout', [
                            {
                                text: "YES",
                                onPress: () => {
                                    authContext.setUser(null);
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'welcome' }],
                                    })
                                }
                            },
                            {
                                text: "No",

                            }
                        ])
                    }}
                    style={{ alignSelf: 'center', position: 'absolute', right: 10 }} name="logout" size={30} color="red" />

            </View>

            <View style={{ flex: 1, flexDirection: 'row', marginTop: 30, paddingHorizontal: 20, width: '100%', }}>
                <View style={{ flex: .8, marginTop: 5 }}>
                    <Text numberOfLines={1} style={styles.firstText}>First Name</Text>
                    <Text numberOfLines={1} style={styles.firstText}>Second Name</Text>
                    <Text numberOfLines={1} style={styles.firstText}>Email</Text>
                    <Text numberOfLines={1} style={styles.firstText}>Gender</Text>
                    <Text numberOfLines={1} style={styles.firstText}>DOB</Text>
                    <Text numberOfLines={1} style={styles.firstText}>Contact</Text>
                    <Text numberOfLines={1} style={styles.firstText}>address</Text>
                </View>

                <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={styles.secondText}>{teacher && teacher.first_name}</Text>
                    <Text numberOfLines={1} style={styles.secondText}>{teacher && teacher.second_name}</Text>
                    <Text numberOfLines={1} style={styles.secondText}>{teacher && teacher.email}</Text>
                    <Text numberOfLines={1} style={styles.secondText}>{teacher && teacher.gender}</Text>
                    <Text numberOfLines={1} style={styles.secondText}>{teacher && teacher.dob}</Text>
                    <Text numberOfLines={1} style={styles.secondText}>{teacher && teacher.contact}</Text>
                    <Text style={styles.secondText}>{teacher && teacher.address}</Text>
                </View>
            </View>
        </View>
    )
}

export default TeacherProfileScreen

const styles = StyleSheet.create({
    firstText: {
        fontSize: 20,
        marginBottom: 30,
    },
    secondText: {
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 20,
        marginBottom: 18,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '100%',


    }
})