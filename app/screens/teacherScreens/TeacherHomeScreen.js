import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import StatusBarExcludedArea from '../../components/StatusBarExcludedArea'
import Colors from '../../constants/Colors'
import AuthContext from '../../utils/context'
import { getInvigilationSchedule } from '../../database/DbHelper'



const TeacherHomeScreen = ({ navigation }) => {
    const authContext = useContext(AuthContext);
    const [listData, setListData] = useState([]);
    useEffect(() => {
        getInvigilationSchedule(authContext.user, (data) => {
            setListData(data);
            console.log(listData);
        })
    }, [])

    const renderExamBox = (item) => {
        console.log(item)
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('examAttendance', {
                    slno: item.slno,
                    batch: item.batch,
                })
                }
                style={styles.cardStyle}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{item.batch}</Text>
                <Text style={{ marginTop: 5 }}>{item.subject}</Text>
                <Text style={{ marginTop: 20 }}>{'students:  ' + item.total_student}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ backgroundColor: Colors.bgGrey, flex: 1 }}>
            <StatusBarExcludedArea style={{ height: 1 }} />
            <Text style={{ alignSelf: 'center', fontSize: 35, marginBottom: 20, marginTop: 10 }}>Invigilation Schedule</Text>
            <FlatList
                columnWrapperStyle={{
                    flex: 1,
                    justifyContent: 'flex-start'
                }}
                data={listData}
                numColumns={2}
                keyExtractor={(item, index) => 'key_' + index}
                renderItem={(itemData) => renderExamBox(itemData.item)}
            />
        </View>
    )
}

export default TeacherHomeScreen

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        flex: 0.5,
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 20,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    }
})