import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants';

const StatusBarExcludedArea = (props) => {
    return (
        <LinearGradient
            useAngle={true} angle={90} angleCenter={{ x: 0.5, y: 0.5 }}
            colors={['#B10F56', '#D00846']} style={{ width: '100%', flex: props.fullFlex && 1, ...props.parentStyle }} locations={[0, .71]}
        >
            <SafeAreaView style={{ ...styles.safe, ...props.style }}>
                {props.children}
            </SafeAreaView>
        </LinearGradient>
    )
}

export default StatusBarExcludedArea

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : Constants.statusBarHeight,
    }
})