import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';
import * as firebase from 'firebase';
import { auth } from '../firebase';
import AntDesign from 'react-native-vector-icons/AntDesign';



export default function Cart({ navigation }) {

    const [orderItems, setOrderItems] = useState([]);
    const [total, setTotal] = useState(0);

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

    const getTotal = () => {
        let total = 0;
        orderItems.forEach((element) => {
            total += element[1].quantity * element[1].price;
        })

        return total
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
            {/* <View style={{ flex: 2 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 25, alignSelf: 'center', letterSpacing: 1 }}>TOTAL:</Text>
            </View> */}
            <View style={styles.checkout}>
                <TouchableOpacity onPress={() => console.log("pressed checkout")} style={styles.checkoutbt}>
                    <View style={{ alignItems: 'flex-start', flex: 3, paddingLeft: 15, justifyContent: 'center' }}>
                        <Text style={{ fontWeight: '600', color: 'rgba(236, 240, 241,1.0)', fontSize: 25, }}>
                            Total:₹ {getTotal()}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', flex: 3, justifyContent: 'center' }}>
                        <Text style={{ fontWeight: '600', color: 'rgba(236, 240, 241,1.0)', fontSize: 21, textAlign: 'right' }}>
                            Checkout
                    </Text>

                    </View>
                    <View style={{ alignItems: "center", flex: 0.7, justifyContent: 'center' }}>
                        <AntDesign name='right' size={30} color={'#2c3e50'} />
                    </View>
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
        flexDirection: 'row'

    }
});