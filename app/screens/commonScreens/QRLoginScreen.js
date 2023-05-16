import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import StatusBarExcludedArea from '../../components/StatusBarExcludedArea';
import { LinearGradient } from 'expo-linear-gradient';
import { checkUserForQrLogin } from '../../database/DbHelper';
import AuthContext from '../../utils/context';

const QRLoginScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [data, setData] = useState('');
    const authContext = useContext(AuthContext);
    const [scanAgain, setScanAgain] = useState(false);

    const requestCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted');
        })()
    }

    useEffect(() => {
        requestCameraPermission();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setData(data);
        checkUserForQrLogin(data, (item) => handleLogin(item))
    }

    const handleLogin = (item) => {
        if (item.length == 0) {
            alert("User not registered with the system");
        } else {
            authContext.setUser(item[0].id)
            if (item[0].role == 'teacher') {
                navigation.navigate('teacherLanding');
            } else if (item[0].role == 'student') {
                navigation.navigate('studentLanding');
            }
        }
        setScanAgain(true)
    }



    return (
        <StatusBarExcludedArea fullFlex style={{ alignItems: 'center', }}>
            <BarCodeScanner
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}

                style={{ height: '70%', width: '70%' }}
            />
            {
                scanned &&
                <View style={{ alignItems: 'center', flex: 1, marginTop: 20, width: '100%' }}>
                    <Text>Unrecognisable QR</Text>
                    <TouchableOpacity onPress={() => {
                        setScanned(false)
                        setScanAgain(false)
                    }} style={styles.button}>
                        <Text style={{ color: Colors.white, fontWeight: 'bold' }}>Scan Again</Text>
                    </TouchableOpacity>
                </View>
            }

        </StatusBarExcludedArea>
    )
}

export default QRLoginScreen

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#B10F56',
        borderRadius: 12,
        elevation: 2,
        height: 50,
        justifyContent: 'center',
        marginTop: 5,
        shadowColor: Colors.white,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: .25,
        shadowRadius: 4,
        width: '50%',
    },
})