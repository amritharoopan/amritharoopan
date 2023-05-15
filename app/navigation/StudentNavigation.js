import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import StudentsHomeScreen from '../screens/studentScreens/StudentsHomeScreen';
import CustomTabBar from '../components/CustomTabBar';
import StudentSeatingScreen from '../screens/studentScreens/StudentSeatingScreen';
import StudentTimeTable from '../screens/studentScreens/StudentTimeTable';
import StudentProfileScreen from '../screens/studentScreens/StudentProfileScreen';

const Tab = createBottomTabNavigator();
const StudentNavigation = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen
                name='StudentHome'
                component={StudentsHomeScreen}
                options={{
                    headerShown: false,
                }}

            />
            <Tab.Screen
                name='StudentSeating'
                component={StudentSeatingScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name='StudentTimeTable'
                component={StudentTimeTable}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name='StudentProfile'
                component={StudentProfileScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    )
}

export default StudentNavigation
