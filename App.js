import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import "./firebase"
import { auth } from "./firebase";
import ListItems from "./components/ListItems";
import Cart from "./components/Cart";
import Home from "./components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./components/Profile";
import Login from "./components/Login";
import PhnumberLogin from "./components/PhnumberLogin";
import Scan from "./components/Scan";
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";
import Loginnml from "./components/Loginnml";
import Signup from "./components/Signup";
import Favorite from "./components/Favorite";



export default function App({ navigation }) {
  const Stack = createStackNavigator();


  return (
    <StateProvider initialState={initialState} reducer={reducer}>
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
            <Stack.Screen
              name="Scan"
              options={{ headerShown: false }}
              component={Scan}
            />
            <Stack.Screen
              name="Loginnml"
              options={{ headerShown: false }}
              component={Loginnml}
            />
            <Stack.Screen
              name="Signup"
              options={{ headerShown: false }}
              component={Signup}
            />
            <Stack.Screen
              name="Favorite"
              options={{ headerShown: false }}
              component={Favorite}
            />
          </Stack.Navigator>
        </NavigationContainer>

        <StatusBar style="none" />
      </View>
    </StateProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dfe6e9",
  },
});
