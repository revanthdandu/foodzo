import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import QRCamera from './QRCamera';
import ListItems from './ListItems';
import { useStateValue } from "../StateProvider";

const window = Dimensions.get("window");

export default function Scan({ navigation }) {
    const [{ restname }, dispatch] = useStateValue();

    const afterScan = (type, data) => {
        console.log(data);
        dispatch({
            type: 'SET_RESTAURANT',
            restname: data
        })
        navigation.navigate("ListItems")

    }

    return (
        <View>
            <QRCamera height={window.height / 1.5} width={window.width} onScan={afterScan} />
        </View>
    );
} 