import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import TeacherHomeScreen from '../screens/teacherScreens/TeacherHomeScreen'
import ExamAttendanceScreen from '../screens/teacherScreens/ExamAttendanceScreen'

const Stack = createStackNavigator();
const TeacherInnerNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='teacherHome'
                component={TeacherHomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='examAttendance'
                component={ExamAttendanceScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default TeacherInnerNavigation

