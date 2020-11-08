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

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}



export default function Restaurants(props) {
  const [{ restname }, dispatch] = useStateValue();
  const [items, setItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const database = firebase.database();
  const [refreshing, setRefreshing] = React.useState(false);
  const [bookmk, setBookmk] = useState('bookmark-o');


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);




  useEffect(() => {

    database.ref("Restaurants/").on("value", (data) => {
      if (data && data.exists()) {
        let data_ = Object.entries(data.val());
        data_ = data_.map((element) => {
          return {
            name: element[0],
            restprofile: element[1].restprofile
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
          <CardItem item={item} index={index} />
        </TouchableOpacity>

      );
    })
  }

  const renderSwipeImages = () => {
    return items.map((url, i) => {
      return (
        <View key={i}>
          <View>
            <Image
              style={{ height: 200, width: "100%", borderRadius: 10 }}
              source={{ uri: url }}
            />
          </View>
        </View>
      );
    });
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} enabled={true} />
      }
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View
            style={{
              flex: 6,
              alignItems: "flex-start",
              justifyContent: "center",
              paddingLeft: 20,
            }}
          >
            <TouchableOpacity>
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Home</Text>
                <Text>Location will be here!</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity>
              <AntDesign name="search1" size={24} color={"#2c3e50"} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => props.navigation.navigate("Scan")}>
              <AntDesign name="scan1" size={30} color={"#2c3e50"} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.centerview}>
          <ScrollView>
            <View style={{ borderRadius: 10 }}>
              <Swiper height={200} autoplay={true} horizontal={false} >
                {renderSwipeImages()}
              </Swiper>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 23, letterSpacing: 1, padding: 10, paddingTop: 20 }}>Restaurants</Text>
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
