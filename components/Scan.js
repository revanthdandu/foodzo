import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import QRCamera from './QRCamera';
import ListItems from './ListItems';

const window = Dimensions.get("window");

export default function Scan({ navigation }) {

    const afterScan = (type, data) => {
        console.log(data);
        if (data === 'svr-restaurant') {
            navigation.navigate("ListItems")
        }
    }

    return (
        <View>
            <QRCamera height={window.height / 1.5} width={window.width} onScan={afterScan} />
        </View>
    );
} 