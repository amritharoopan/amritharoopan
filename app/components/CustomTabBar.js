import { StyleSheet, Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';

const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={{ backgroundColor: Colors.bgGrey }}>
            <LinearGradient
                useAngle={true} angle={90} angleCenter={{ x: 0.5, y: 0.5 }}
                colors={['#B10F56', '#D00846']} locations={[0, .59]}
                style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, flexDirection: 'row', height: 80, }}
            >
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', }}>
                            <TouchableOpacity
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={isFocused ? styles.elevatedButton : styles.button}
                            >

                                {label == 'StudentHome' && <Image style={isFocused ? styles.focusedImage : styles.image} source={require('../../assets/StudentHome.png')} />}
                                {label == 'StudentSeating' && <Image style={isFocused ? styles.focusedImage : styles.image} source={require('../../assets/StudentSeating.png')} />}
                                {label == 'StudentTimeTable' && <Image style={isFocused ? styles.focusedImage : styles.image} source={require('../../assets/StudentTimeTable.png')} />}
                                {label == 'StudentProfile' && <Image style={isFocused ? styles.focusedImage : styles.image} source={require('../../assets/StudentProfile.png')} />}

                            </TouchableOpacity>
                        </View>
                    );
                })}
            </LinearGradient >
        </View>
    )
}

export default CustomTabBar

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        backgroundColor: '#B10F56FA',
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        width: 40,
    },
    elevatedButton: {
        alignSelf: 'center',
        backgroundColor: '#B10F56FA',
        borderRadius: 25,
        elevation: 5,
        height: 50,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        width: 50,
    },
    image: {
        alignSelf: 'center',
        height: 30,
        width: 30,
    },
    focusedImage: {
        alignSelf: 'center',
        tintColor: '#F2C94C',
        height: 35,
        width: 35,

    }
})