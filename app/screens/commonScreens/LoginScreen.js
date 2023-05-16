import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../../constants/Colors'
import { TextInput } from 'react-native'
import Checkbox from 'expo-checkbox';
import StatusBarExcludedArea from '../../components/StatusBarExcludedArea'
import { checkLogin } from '../../database/DbHelper'
import AuthContext from '../../utils/context'

const LoginScreen = ({ navigation }) => {
  const [checked, setChecked] = useState(false)
  const [username, setUsername] = useState('teacher.101');
  const [password, setPassword] = useState('pass');
  const authContext = useContext(AuthContext);


  const handleLogin = (data) => {
    if (data.length == 0) {
      alert("Invalid credetials");
    } else {
      authContext.setUser(data[0].id)
      if (data[0].role == 'teacher') {
        navigation.navigate('teacherLanding');
      } else if (data[0].role == 'student') {
        navigation.navigate('studentLanding');
      }
    }

  }

  return (
    <ScrollView style={{ backgroundColor: Colors.white, flex: 1 }}>

      <StatusBarExcludedArea style={{ width: '100%' }}>
        <Text style={{ color: Colors.white, fontSize: 34, marginHorizontal: 30, marginTop: 20, }}>Login</Text>
        <Text style={{ color: Colors.white, fontSize: 15, marginHorizontal: 33, marginTop: 28, }} >Username</Text>
        <TextInput style={styles.input} onChangeText={setUsername} />
        <Text style={{ color: Colors.white, fontSize: 15, marginHorizontal: 33, marginTop: 15, }}>Password</Text>
        <TextInput style={styles.input} secureTextEntry onChangeText={setPassword} />
        <View style={{ alignItems: 'center', flexDirection: 'row', marginBottom: 100, marginHorizontal: 33, marginTop: 30 }}>
          <Checkbox
            style={{ borderColor: '#F2F2F2', borderWidth: 1, height: 25, width: 25, }}
            value={checked}
            onValueChange={setChecked}
            color={checked ? 'noColor' : undefined}
          />
          <Text style={{ color: Colors.white, fontSize: 20, marginStart: 10 }}>Remember Me</Text>
        </View>

        <View style={{ bottom: -40, end: 0, flexDirection: 'row', position: 'absolute' }}>
          <View style={{ backgroundColor: Colors.white, borderRadius: 40, height: 80, width: 80, }}>
            <Image style={{ alignSelf: 'center', height: 26, marginTop: 15, transform: [{ rotate: '180deg' }], width: 30 }} source={require('../../../assets/arrow_up.png')} />
          </View>
          <TouchableOpacity onPress={() => checkLogin(username, password, (data) => handleLogin(data))} style={{ backgroundColor: '#D00846', borderRadius: 40, height: 80, width: 80, }}>
            <Image style={{ alignSelf: 'center', height: 27, marginTop: 35, width: 28 }} source={require('../../../assets/arrow_down.png')} />
          </TouchableOpacity>
        </View>
      </StatusBarExcludedArea>


      <View style={{ flex: 1, marginHorizontal: 30, marginTop: 30 }}>
        <View style={{ backgroundColor: '#F2C94C', borderRadius: 4, height: 5, width: 65 }} />
        <Text style={{ color: '#B10F56', fontSize: 20, fontWeight: 'bold' }}>Contact Us</Text>
        <Text style={{ color: Colors.greyColorText, fontSize: 12, marginVertical: 2 }}>How can we help you ?</Text>
        <Text style={{ color: '#333', fontSize: 13, fontWeight: '700' }}>Amrita School of Arts and Science </Text>
        <Text style={{ color: Colors.greyColorText, fontSize: 12, marginTop: 5 }}>{'Brahmasthanam,\nEdappally North P.O.\nKochi – 682 024, KERALA'}</Text>
        <Text style={{ color: '#B10F56', fontSize: 13, fontWeight: '700', marginTop: 2 }}>Phone:</Text>
        <Text style={{ color: Colors.greyColorText, fontSize: 12, marginTop: 5 }}>{'0484-2858383, 8349, \n8166, 8167, 8153 and 6147'}</Text>
        <Text style={{ alignSelf: 'center', color: '#1A39DC', fontSize: 12, marginBottom: 50, marginTop: 30 }}>Can’t access your account ?</Text>
      </View>

    </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    backgroundColor: '#D00846',
    borderRadius: 15,
    borderWidth: 0,
    color: Colors.white,
    elevation: 5,
    height: 50,
    marginHorizontal: 30,
    marginVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    width: '90%',
  },

})
