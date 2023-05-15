import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import StatusBarExcludedArea from '../../components/StatusBarExcludedArea'
import Colors from '../../constants/Colors'
import { Image } from 'react-native'
import AuthContext from '../../utils/context'
import { getStudentInfo } from '../../database/DbHelper'

const StudentsHomeScreen = (props) => {
  const authContext = useContext(AuthContext);
  const [student, setStudent] = useState([]);
  useEffect(() => {
    getStudentInfo(authContext.user, (data) => setStudent(data[0]))
  }, []);

  return (
    <View style={{ backgroundColor: Colors.bgGrey, flex: 1 }}>
      <StatusBarExcludedArea style={{ height: 1 }} />
      <View style={{ ...styles.contentContainer, flexDirection: 'row' }}>
        <Image style={{ height: 45, width: 45 }} source={require('../../../assets/wave.png')} />
        <View style={{ marginStart: 20 }}>
          <Text style={{ color: '#4F4F4F', fontSize: 12, }} >Name :</Text>
          <Text style={{ color: '#4F4F4F', fontSize: 12, marginTop: 5 }} >Roll no :</Text>
          <Text style={{ color: '#4F4F4F', fontSize: 12, marginTop: 5 }} >Batch :</Text>
          <Text style={{ color: '#4F4F4F', fontSize: 12, marginTop: 5 }} >Semester :</Text>
        </View>
        <View style={{ marginStart: 20 }}>
          <Text style={{ color: '#4F4F4F', fontSize: 12, }} >{student && student.first_name + ' ' + student.second_name}</Text>
          <Text style={{ color: '#4F4F4F', fontSize: 12, marginTop: 5 }} >{authContext.user}</Text>
          <Text style={{ color: '#4F4F4F', fontSize: 12, marginTop: 5 }} >{student && student.stud_batch}</Text>
          <Text style={{ color: '#4F4F4F', fontSize: 12, marginTop: 5 }} >{student && student.semester}</Text>
        </View>
      </View>

      <View style={{ flex: 1, marginBottom: 20, }}>
        <ScrollView style={styles.contentContainer} contentContainerStyle={{ alignItems: 'center', }} >
          <View>
            <Text style={{ color: '#B10F56', fontSize: 17, fontWeight: 'bold' }}>Announcements </Text>
            <View style={{ alignSelf: 'center', backgroundColor: '#F2C94C', borderRadius: 4, height: 5, width: 65 }} />
          </View>

          <Text style={{ color: '#00397B', fontSize: 10, fontWeight: 'bold', marginTop: 20 }}>• P1 for odd semester will start from 3 oct </Text>
          <Text style={{ color: '#00397B', fontSize: 10, fontWeight: 'bold', marginTop: 20 }}>• Supplymentry exam are scheduled. </Text>
          <Text style={{ color: '#00397B', fontSize: 10, fontWeight: 'bold', marginTop: 20 }}>• P1 for odd semester will start from 3 oct </Text>
          <Text style={{ color: '#00397B', fontSize: 10, fontWeight: 'bold', marginTop: 20 }}>• Supplymentry exam are scheduled. </Text>
          <Text style={{ color: '#00397B', fontSize: 10, fontWeight: 'bold', marginTop: 20 }}>• P1 for odd semester will start from 3 oct </Text>
          <Text style={{ color: '#00397B', fontSize: 10, fontWeight: 'bold', marginTop: 20 }}>• Supplymentry exam are scheduled. </Text>
          <Text style={{ color: '#00397B', fontSize: 10, fontWeight: 'bold', marginTop: 20 }}>• P1 for odd semester will start from 3 oct </Text>
          <Text style={{ color: '#00397B', fontSize: 10, fontWeight: 'bold', marginTop: 20 }}>• Supplymentry exam are scheduled. </Text>
          <Text style={{ color: '#00397B', fontSize: 10, fontWeight: 'bold', marginTop: 20 }}>• P1 for odd semester will start from 3 oct </Text>
          <Text style={{ color: '#00397B', fontSize: 10, fontWeight: 'bold', marginTop: 20 }}>• Supplymentry exam are scheduled. </Text>
          <Text style={{ color: '#00397B', fontSize: 10, fontWeight: 'bold', marginTop: 20 }}>• P1 for odd semester will start from 3 oct </Text>
          <Text style={{ color: '#00397B', fontSize: 10, fontWeight: 'bold', marginTop: 20 }}>• Supplymentry exam are scheduled. </Text>
          <Text style={{ color: '#00397B', fontSize: 10, fontWeight: 'bold', marginTop: 20 }}>• P1 for odd semester will start from 3 oct </Text>
          <Text style={{ color: '#00397B', fontSize: 10, fontWeight: 'bold', marginTop: 20 }}>• Supplymentry exam are scheduled. </Text>
          <Text style={{ color: '#00397B', fontSize: 10, fontWeight: 'bold', marginTop: 20 }}>• P1 for odd semester will start from 3 oct </Text>
          <Text style={{ color: '#00397B', fontSize: 10, fontWeight: 'bold', marginTop: 20 }}>• Supplymentry exam are scheduled. </Text>
        </ScrollView>
      </View>

    </View>
  )
}

export default StudentsHomeScreen

const styles = StyleSheet.create({
  contentContainer: {

    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginTop: 40,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: '90%',
  }
})