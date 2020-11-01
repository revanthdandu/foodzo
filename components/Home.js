import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from './Cart';
import Restaurants from './Restaurants';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Profile from './Profile';





export default function Home() {

  const Tab = createBottomTabNavigator();



  return (


    <Tab.Navigator>
      <Tab.Screen options={{
        tabBarIcon: ({ focused, color, size }) => {
          if (focused) {
            return (<AntDesign name='home' size={30} color={'#2c3e50'} />)
          } else {
            return (<AntDesign name='home' size={size} color={color} />)
          }
        },
      }} name="Restaurants" component={Restaurants} />
      <Tab.Screen options={{
        tabBarIcon: ({ focused, color, size }) => {
          if (focused) {
            return (<AntDesign name='shoppingcart' size={30} color={'#2c3e50'} />)
          } else {
            return (<AntDesign name='shoppingcart' size={size} color={color} />)
          }
        },
      }} name="Cart" component={Cart} />
      <Tab.Screen options={{
        tabBarIcon: ({ focused, color, size }) => {
          if (focused) {
            return (<AntDesign name='profile' size={30} color={'#2c3e50'} />)
          } else {
            return (<AntDesign name='profile' size={size} color={color} />)
          }
        },
      }} name="Profile" component={Profile} />
    </Tab.Navigator>

  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});