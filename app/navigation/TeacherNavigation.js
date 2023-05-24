import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CustomTabBar from '../components/CustomTabBar';
import TeacherHomeScreen from '../screens/teacherScreens/TeacherHomeScreen';
import TeacherInnerNavigation from './TeacherInnerNavigation';
import TeacherTimeTable from '../screens/teacherScreens/TeacherTimeTable';
import TeacherProfileScreen from '../screens/teacherScreens/TeacherProfileScreen';

const Tab = createBottomTabNavigator();
const TeacherNavigation = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen
                name='StudentHome'
                component={TeacherInnerNavigation}
                options={{
                    headerShown: false,
                }}

            />

            <Tab.Screen
                name='StudentTimeTable'
                component={TeacherTimeTable}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name='StudentProfile'
                component={TeacherProfileScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    )
}

export default TeacherNavigation

