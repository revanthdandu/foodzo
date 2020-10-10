import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRCamera({ width, height, onScan }) {

    const [hasPermission, setPermission] = useState(null);
    const type = Camera.Constants.Type.back;

    useEffect(() => {

        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setPermission(status === 'granted');
        })();

    }, [])

    if (hasPermission === null) {
        return <View />
    }

    if (hasPermission === false) {
        return <View><Text>please allow permission for camera</Text></View>
    }

    const getData = ({ type, data }) => {
        onScan(type, data);
        // console.log(data);
    }

    return (
        <Camera
            style={{ height: height, width: width }}
            type={type}
            barCodeScannerSettings={{
                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}
            onBarCodeScanned={getData}
        >

        </Camera>
    );
}