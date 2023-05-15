import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../../constants/Colors'
import StatusBarExcludedArea from '../../components/StatusBarExcludedArea'

const WelcomeScreen = ({ navigation }) => {
    return (
        <LinearGradient
            useAngle={true} angle={90} angleCenter={{ x: 0.5, y: 0.5 }}
            colors={['#B10F56', '#D00846']} style={styles.container} locations={[0, .71]}
        >
            <StatusBarExcludedArea fullFlex>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
                    <Image source={require('../../../assets/amrita_image.png')} style={styles.amritaImage} />
                    <Text style={{ color: Colors.white, fontSize: 20, marginTop: 17 }}>WELCOME TO</Text>
                    <Image source={require('../../../assets/amritaroopn_splash_logo.png')} style={styles.logo} />
                    <Text style={{ color: Colors.white, fontSize: 20, }}>Your exam seat manager.!</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('login')} style={styles.button}>
                        <Text style={{ color: Colors.black, fontSize: 20, }}>Log in</Text>
                    </TouchableOpacity>
                    <Text style={{ color: Colors.white, fontSize: 18, textAlign: 'center', marginTop: 5 }}>{'Or qick login\nScan QR'}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('qrlogin')} style={styles.outerCircle}>
                        <View style={styles.innerCircle}>
                            <Image source={require('../../../assets/scan.png')} style={styles.scan} />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </StatusBarExcludedArea>

        </LinearGradient>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
    },
    amritaImage: {
        height: 47,
        width: 166,
        marginTop: 54,
    },
    logo: {
        height: 148,
        marginTop: 30,
        width: 284,
    },
    button: {
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 12,
        elevation: 2,
        height: 56,
        justifyContent: 'center',
        marginTop: 20,
        shadowColor: Colors.white,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: .25,
        shadowRadius: 4,
        width: 147,
    },
    outerCircle: {
        alignItems: 'center',
        backgroundColor: '#B10F56',
        borderRadius: 80,
        elevation: 2,
        height: 99,
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 50,
        shadowColor: Colors.black,
        shadowOffset: { height: 0, width: 4 },
        shadowOpacity: .25,
        shadowRadius: 45,
        width: 88,

    },
    innerCircle: {
        alignItems: 'center',
        backgroundColor: '#D51066',
        borderRadius: 80,
        elevation: 4,
        height: 75,
        justifyContent: 'center',
        shadowColor: Colors.black,
        shadowOffset: { height: 0, width: 4 },
        shadowOpacity: .25,
        shadowRadius: 4,
        width: 68,
    },
    scan: {
        height: 48,
        width: 39,
    }
})