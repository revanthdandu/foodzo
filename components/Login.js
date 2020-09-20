import React from "react";
import { View, StyleSheet, Text, Button, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import logo from "./splash.png";
import PhnumberLogin from "./PhnumberLogin";

export default function Login({ navigation }) {
    return (
        <View style={styles.conatiner}>
            <View style={styles.login__logo}>
                <Image style={{ height: 350, width: 350 }} source={logo} />
            </View>
            <View style={{ flex: 1, backgroundColor: "white", borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 15 }}>
                <Text style={{ fontWeight: "bold", fontSize: 22, letterSpacing: 1, color: "#2c3e50", }}>
                    make your ordering easy!
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("PhnumberLogin")}
                    style={{
                        height: 45, width: "100%", backgroundColor: "rgba(30, 39, 46,1.0)", alignItems: "center", justifyContent: "center", borderRadius: 5, marginTop: 20,
                        elevation: 5,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.7,
                        shadowRadius: 5,
                    }}>
                    <Text
                        style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "#ecf0f1",
                            fontSize: 16,
                        }}
                    >
                        Continue with Phone Number
          </Text>
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View
                        style={{
                            flex: 1,
                            padding: 10,
                            justifyContent: "center",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                height: 45,
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: 5,
                                marginTop: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 0.5,
                                borderColor: "rgba(210, 218, 226,1.0)",
                                elevation: 5,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.7,
                                shadowRadius: 5,
                            }}
                        >


                            <Text
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    color: "rgba(30, 39, 46,1.0)",
                                    fontSize: 20,
                                    alignItems: 'center',
                                }}
                            >
                                Google
                </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <TouchableOpacity
                            style={{
                                height: 45,
                                width: "100%",
                                backgroundColor: "white",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 5,
                                marginTop: 10,
                                borderWidth: 0.5,
                                borderColor: "rgba(210, 218, 226,1.0)",
                                elevation: 5,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.7,
                                shadowRadius: 5,
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    color: "rgba(30, 39, 46,1.0)",
                                    fontSize: 20,
                                }}
                            >
                                Facebook
              </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: '#1B9CFC'
    },
    login__logo: {
        flex: 2.5,
        alignItems: "center",
        justifyContent: "center",
    },
});
