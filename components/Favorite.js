import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Image,
    RefreshControl,
    BackHandler,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import { List, Searchbar, Appbar, Card, Title, IconButton } from "react-native-paper";
import ListItems from "./ListItems";
import { ScrollView } from "react-native-gesture-handler";
import { Rating } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Swiper from "react-native-swiper";
import * as firebase from "firebase";
import Scan from './Scan';
import Constants from 'expo-constants';
import { useStateValue } from "../StateProvider";
import CardItem from "./CardItem";
import { auth } from '../firebase';




export default function Favorite(props) {
    const [{ restname }, dispatch] = useStateValue();
    const [items, setItems] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const database = firebase.database();
    const [refreshing, setRefreshing] = React.useState(false);
    const [bookmk, setBookmk] = useState('bookmark-o');






    useEffect(() => {

        database.ref(`orders/${auth.currentUser.uid}/favorites`).on("value", (data) => {
            if (data && data.exists()) {
                let data_ = Object.entries(data.val());
                data_ = data_.map((element) => {
                    return {
                        name: element[1].name,
                        restprofile: element[1].restprofile,
                        id: element[0]
                    }
                })
                console.log(data_);
                setRestaurants(data_);
            }

        })

        database.ref("items/").on("value", (data) => {
            // console.log(data.val());
            if (data && data.exists()) {
                // console.log(data.val());
                let data_ = Object.entries(data.val());
                data_ = data_.map((element) => {
                    return element[1].image.url;
                });
                console.log(data_);
                setItems(data_);
            }
        });
    }, []);



    const renderRestaurants = () => {
        return restaurants.map((item, index) => {
            return (

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        dispatch({
                            type: 'SET_RESTAURANT',
                            restname: item.name
                        })
                        props.navigation.navigate("ListItems")
                    }}
                    key={index}
                >
                    <CardItem id={item.id} deletes={true} item={item} index={index} />
                </TouchableOpacity>

            );
        })
    }



    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.centerview}>
                    <ScrollView>
                        <Text style={{ fontWeight: 'bold', fontSize: 23, letterSpacing: 1, padding: 10, paddingTop: 20 }}>Favorites</Text>
                        <Card>
                            {renderRestaurants()}
                        </Card>
                    </ScrollView>
                </View>
                <StatusBar />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        marginTop: Constants.statusBarHeight,
    },
    listres: {
        borderColor: "#dfe6e9",
        borderTopWidth: 1,
        borderBottomWidth: 0.5,
    },
    restitle: {
        marginTop: -60,
        fontWeight: "600",
        fontSize: 18,
    },
    centerview: {
        backgroundColor: "white",
        padding: 10,
        flex: 7,
    },
    header: {
        flex: 1,
        flexDirection: "row",
        borderWidth: 0.3,
        borderColor: "#b2bec3",
        marginBottom: 7,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: "white",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 5,
        height: 60
    },
    cstyle: {
        borderRadius: 9,
        borderWidth: 0.8,
        borderColor: "#b2bec3",
        marginBottom: 20,
        backgroundColor: "white",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 5,
    },

});
