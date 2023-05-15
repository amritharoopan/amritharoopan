import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import StatusBarExcludedArea from '../../components/StatusBarExcludedArea';
import { LinearGradient } from 'expo-linear-gradient';

const QRLoginScreen = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [data, setData] = useState('');

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
        console.log(data);
    }

    if (hasPermission == null) {
        return (
            <View>

            </View>
        )
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
                    <TouchableOpacity onPress={() => setScanned(false)} style={styles.button}>
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