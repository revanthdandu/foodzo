import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Favorite() {
    return (
        <View style={styles.container}>
            <Text>Favorite restaurants</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 40
    }
});