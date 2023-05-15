import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import StatusBarExcludedArea from '../../components/StatusBarExcludedArea'
import Colors from '../../constants/Colors'
import AuthContext from '../../utils/context'
import { getStudentsTimeTable } from '../../database/DbHelper'

const StudentTimeTable = () => {
    const authContext = useContext(AuthContext);
    const [timeTable, setTimeTable] = useState([]);

    useEffect(() => {
        getStudentsTimeTable(authContext.user, (data) => setTimeTable(data))
    }, [])

    const renderTimeTable = (item) => {
        return (
            <View style={styles.box} >
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'dodgerblue', fontSize: 16, fontWeight: '600' }}>Date:  </Text>
                    <Text style={{ fontSize: 16 }}>{item.exam_date}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ color: 'dodgerblue', fontSize: 20, fontWeight: '600' }}>Subject:  </Text>
                    <Text style={{ fontSize: 20 }}>{item.subject}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'dodgerblue', fontSize: 18, fontWeight: '600' }}>Class:  </Text>
                    <Text style={{ fontSize: 18 }}>{item.batch}</Text>
                </View>
            </View>
        );
    }
    return (
        <View style={{ backgroundColor: Colors.bgGrey, flex: 1 }}>
            <StatusBarExcludedArea style={{ height: 1 }} />
            <View style={{ backgroundColor: Colors.bgGrey, paddingHorizontal: 10, width: "100%" }}>
                <Text style={{ alignSelf: 'center', fontSize: 25, marginVertical: 10 }}>TimeTable</Text>
            </View>
            <FlatList
                data={timeTable}
                keyExtractor={(item, index) => 'key_' + index}
                renderItem={(itemData) => renderTimeTable(itemData.item)}
            />
        </View>
    )
}

export default StudentTimeTable

const styles = StyleSheet.create({
    box: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 5,
        padding: 10,

    }
})