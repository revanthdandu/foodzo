import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import * as firebase from "firebase";
import ListItems from "./components/ListItems";
import Cart from "./components/Cart";
import Home from "./components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./components/Profile";
import Login from "./components/Login";
import PhnumberLogin from "./components/PhnumberLogin";

var firebaseConfig = {
  apiKey: "AIzaSyDNQqJa7oSecfALBzaInCw2x0z7AUH1hOA",
  authDomain: "foodzo-49e26.firebaseapp.com",
  databaseURL: "https://foodzo-49e26.firebaseio.com",
  projectId: "foodzo-49e26",
  storageBucket: "foodzo-49e26.appspot.com",
  messagingSenderId: "1098668614569",
  appId: "1:1098668614569:web:ecb5b96839026640f3dab8",
};
firebase.initializeApp(firebaseConfig);

export default function App({ navigation }) {
  const Stack = createStackNavigator();

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Login"}>
          <Stack.Screen name="ListItems" component={ListItems} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={Home}
          />
          <Stack.Screen
            name="Profile"
            options={{ headerShown: false }}
            component={Profile}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          />
          <Stack.Screen
            name="PhnumberLogin"
            options={{ headerShown: false }}
            component={PhnumberLogin}
          />
          {/* <Stack.Screen name="PhoneAuth" component={PhoneAuth} /> */}
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dfe6e9",
  },
});
