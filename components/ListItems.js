import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { List, Searchbar, Card } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import * as firebase from 'firebase';
import { useStateValue } from "../StateProvider";
import { auth } from '../firebase';





export default function ListItems(props) {

    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [{ restname }, dispatch] = useStateValue();

    const onChangeSearch = (text) => {
        setSearchQuery(text);

        const database = firebase.database();
        database.ref(`Restaurants/${restname}/items`).on('value', (data) => {
            // console.log(data.val());
            if (data && data.exists()) {
                console.log(data.val());
                let data_ = Object.entries(data.val());
                if (text !== '' || text !== null || text !== undefined) {
                    data_ = data_.filter((element) => {
                        return element[1].name.includes(text);
                    })
                }
                data_ = data_.map(((element) => {
                    element[1].quantity = 0;
                    return element;
                }));
                console.log(data_)
                setItems(data_);

            }
        });
    }


    const addOrdersDatabase = (el) => {
        const database = firebase.database();
        database.ref(`orders/${auth.currentUser.uid}/`).push(el);
    }


    const placeOrders = () => {
        const items_ = items.filter((element) => {
            return element[1].quantity > 0;
        });

        items_.forEach((element) => {
            addOrdersDatabase(element[1])

        });

        const items1 = items.map((element) => {
            element[1].quantity = 0;
            return element;
        });
        setItems(items1);
        props.navigation.navigate('Cart');
    }
    //   const [orderedItems, setOrderedItems] = useState([]);


    useEffect(() => {

        const database = firebase.database();
        database.ref(`Restaurants/${restname}/items`).on('value', (data) => {
            // console.log(data.val());
            if (data && data.exists()) {
                console.log(data.val());
                let data_ = Object.entries(data.val());
                data_ = data_.map(((element) => {
                    element[1].quantity = 0;
                    return element;
                }));
                console.log(data_)
                setItems(data_);

            }
        });


    }, [])

    /*  const subtractItem = (event) => {
          const id = event.target.dataset.id;
          const items_ = items.map((element)=>{
              if(element[0] === id){
                  if(element[1].quantity !== 0){
                      element[1].quantity -= 1;
                  }
              }
  
              return element;
          });
  
          setItems(items_);
      }
  
  
      const addItem = (event) => {
          const id = event.target.dataset.id;
          const items_ = items.map((element)=>{
              if(element[0] === id){
                  element[1].quantity += 1;
              }
  
              return element;
          });
  
          setItems(items_);
      }
      */

    const displayItems = () => {
        return items.map((element) => {
            return (
                <List.Item
                    key={element[0]}
                    style={styles.listres}
                    title={element[1].name}
                    titleStyle={styles.restitle}
                    description={"Rs." + element[1].price}
                    left={props => <Image source={{ uri: element[1].image.url }} /*alt="no image"*/ style={{ width: 80, height: 80, borderRadius: 5 }} />}
                    right={(props) => (
                        <View style={styles.adder}>
                            <TouchableOpacity onPress={() => {
                                const items_ = items.map((el) => {
                                    if (el[0] === element[0]) {
                                        if (el[1].quantity !== 0) {
                                            el[1].quantity -= 1;
                                        }
                                    }

                                    return el;
                                });

                                setItems(items_);
                            }}
                                style={{ backgroundColor: 'white', flex: 3, alignItems: 'center', justifyContent: 'center' }}><Feather name="minus" color="black" size={18} /></TouchableOpacity>
                            <Text style={{ backgroundColor: 'white', flex: 3, fontSize: 17, textAlign: 'center', textAlign: 'center' }}>{element[1].quantity}</Text>
                            <TouchableOpacity onPress={() => {
                                const items_ = items.map((el) => {
                                    if (el[0] === element[0]) {
                                        el[1].quantity += 1;

                                    }

                                    return el;
                                });

                                setItems(items_);
                            }}
                                style={{ backgroundColor: 'white', flex: 3, alignItems: 'center', justifyContent: 'center' }}><Feather name="plus" color="black" size={18} /></TouchableOpacity>

                        </View>
                    )}
                />
            );
        })
    }


    return (
        <View style={styles.container}>
            <View style={{ padding: 9, flex: 9 }}>
                <Text style={{ fontSize: 25, fontWeight: '600' }}>{restname} Restaurant</Text>
                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
                <ScrollView contentContainerStyle={{ paddingBottom: 50, paddingTop: 10 }} showsVerticalScrollIndicator={false}>

                    <List.Section>
                        {displayItems()}
                    </List.Section>

                </ScrollView>

            </View>
            <View style={{ flex: 0.6, flexDirection: 'column', backgroundColor: 'rgba(46, 213, 115,1.0)', justifyContent: 'center', padding: 8, position: 'relative', bottom: 0, width: '100%' }}>

                <TouchableOpacity onPress={placeOrders} style={{ backgroundColor: 'white', flex: 3, padding: 8, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }} ><Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'black' }}>View Cart</Text></TouchableOpacity>
            </View>

            <StatusBar style="none" />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    // listItem: {
    //     borderWidth: 0.3,
    //     borderColor: '#b2bec3',
    //     marginBottom: 7,
    //     borderRadius: 10,
    //     backgroundColor: 'white',
    //     elevation: 5,
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0, height: 0 },
    //     shadowOpacity: 0.7,
    //     shadowRadius: 5
    // },
    adder: {
        height: 27,
        width: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#636e72',
        borderRadius: 5,
        backgroundColor: 'rgba(236, 240, 241,1.0)',
        flex: 0.3,
        flexDirection: 'row',
        overflow: 'hidden'
    },
    listres: {
        paddingBottom: 22
    },
    restitle: {
        fontWeight: "600",
        fontSize: 18,
        marginTop: -30
    }
});