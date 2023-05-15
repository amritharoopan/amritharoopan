import React from 'react'
import { Header, createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from '../screens/commonScreens/WelcomeScreen';
import LoginScreen from '../screens/commonScreens/LoginScreen';
import QRLoginScreen from '../screens/commonScreens/QRLoginScreen';
import StudentLanding from '../screens/commonScreens/StudentLanding';
import TeacherLanding from '../screens/commonScreens/TeacherLanding';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='welcome' component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name='login' component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name='qrlogin' component={QRLoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name='studentLanding' component={StudentLanding} options={{ headerShown: false }} />
      <Stack.Screen name='teacherLanding' component={TeacherLanding} options={{ headerShown: false }} />
    </Stack.Navigator>

  )
}

export default AuthNavigation
