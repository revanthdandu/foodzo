import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
  RefreshControl,
} from "react-native";
import { List, Searchbar, Appbar, Card, Title } from "react-native-paper";
import ListItems from "./ListItems";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { Rating } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import Swiper from "react-native-swiper";
import * as firebase from "firebase";
import Scan from './Scan';
import Constants from 'expo-constants';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}



export default function Restaurants(props) {
  const [items, setItems] = useState([]);
  const database = firebase.database();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);


  useEffect(() => {
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


              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => props.navigation.navigate("ListItems")}
              >
                <Card style={styles.cstyle}>
                  <View>
                    <Image
                      source={{
                        uri:
                          "https://www.sundayguardianlive.com/wp-content/uploads/2020/07/3-Dib-restaurant-losses-edited.jpg",
                      }}
                    /*alt="no image"*/ style={{
                        width: '100%',
                        height: 180,
                        borderTopLeftRadius: 9,
                        borderTopRightRadius: 9
                      }}
                    />
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', height: 70, padding: 10 }}>
                    <View style={{ flex: 3 }}>
                      <Text style={{ fontWeight: '900', fontSize: 18, letterSpacing: 0.5, color: '#1e272e' }}>SVR Restaurant</Text>
                      <Text style={{ fontSize: 12, letterSpacing: 1, color: '#576574' }}>fast food,italian,pizza</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 2, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                          <Image style={{ height: 18, width: 18 }} source={{ uri: "data:image/png;base64,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" }} />
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                          <Text style={{ fontSize: 12, letterSpacing: 1, color: '#1e272e', fontWeight: 'bold' }}>3.5</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                          <Text style={{ fontSize: 12, letterSpacing: 1, color: '#576574' }}>/5</Text>
                        </View>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 12, letterSpacing: 1, color: '#576574', textAlign: 'right' }}>₹500 for one</Text>
                      </View>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>

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
  }
});
