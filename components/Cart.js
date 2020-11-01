import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';
import * as firebase from 'firebase';
import { auth } from '../firebase';


export default function Cart(props) {

    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        const database = firebase.database();
        database.ref(`orders/${auth.currentUser.uid}/`).on('value', (data) => {
            // console.log(data.val());
            if (data && data.exists()) {
                console.log(data.val());
                let data_ = Object.entries(data.val());
                console.log(data_)
                setOrderItems(data_);

            } else {
                setOrderItems([]);
            }
        });

    }, [])

    const displayOrders = () => {
        return orderItems.map((element) => {
            return (
                <List.Item
                    key={element[0]}
                    title={element[1].name}
                    description={"Rs." + element[1].quantity * element[1].price}
                    right={props => (<TouchableOpacity onPress={() => {
                        firebase.database().ref(`orders/${auth.currentUser.uid}/${element[0]}`).remove();
                    }}><List.Icon icon='delete' /></TouchableOpacity>)}
                />
            );
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.upcheckout}>
                <Text style={{ fontSize: 27, fontWeight: '600', color: 'rgba(44, 62, 80,1.0)', textAlign: 'center', padding: 15, paddingTop: 40, textDecorationLine: 'underline', letterSpacing: 2 }}>
                    Your Basket
               </Text>
                <View style={{ flex: 1, paddingBottom: 3 }}>
                    <ScrollView>
                        <List.Section>
                            {displayOrders()}
                        </List.Section>
                    </ScrollView>
                </View>
            </View>
            <View style={styles.checkout}>
                <TouchableOpacity style={styles.checkoutbt}>
                    <Text style={{ fontWeight: '600', color: 'rgba(236, 240, 241,1.0)', fontSize: 21, textAlign: 'center' }}>
                        Checkout
                    </Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="none" />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dfe6e9'
    },
    upcheckout: {
        flex: 15,
        backgroundColor: 'rgba(236, 240, 241,0.7)'
    },
    checkout: {
        flex: 1,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        backgroundColor: 'white',
        padding: 5,
        position: 'relative',
        bottom: 0,
        width: '100%'
    },
    checkoutbt: {
        height: 40,
        backgroundColor: 'rgba(26, 188, 156,1.0)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});