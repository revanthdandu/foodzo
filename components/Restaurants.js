import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { List, Searchbar, Appbar } from "react-native-paper";
import ListItems from "./ListItems";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { Header } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import Swiper from "react-native-swiper";
import * as firebase from "firebase";
import Scan from './Scan';

export default function Restaurants(props) {
  const [items, setItems] = useState([]);
  const database = firebase.database();

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
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flex: 6,
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: 9,
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
            paddingTop: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity>
            <AntDesign name="search1" size={22} color={"#2c3e50"} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            paddingTop: 13,
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
          <List.Section>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => props.navigation.navigate("ListItems")}
            >
              <List.Item
                style={styles.listres}
                title="SVR Restaurant"
                titleStyle={styles.restitle}
                description="Item description"
                left={(props) => (
                  <Image
                    source={{
                      uri:
                        "https://www.sundayguardianlive.com/wp-content/uploads/2020/07/3-Dib-restaurant-losses-edited.jpg",
                    }}
                    /*alt="no image"*/ style={{
                      width: 100,
                      height: 100,
                      borderRadius: 5,
                    }}
                  />
                )}
              />
            </TouchableOpacity>
          </List.Section>
        </ScrollView>
      </View>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  listres: {
    borderColor: "#dfe6e9",
    borderTopWidth: 1,
    borderBottomWidth: 1,
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
  },
});
