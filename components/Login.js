import React, { useEffect } from "react";
import { View, StyleSheet, Text, Button, Image, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import PhnumberLogin from "./PhnumberLogin";
import { SocialIcon } from 'react-native-elements';
import { auth } from "../firebase"


export default function Login({ navigation }) {

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser !== null) {
                console.log(authUser.uid);
                if (authUser.uid) {
                    navigation.navigate("Home")
                }
            }

        })
    }, [])




    return (
        <ImageBackground source={{ uri: 'https://ak.picdn.net/shutterstock/videos/17703349/thumb/1.jpg' }} style={styles.images}>

            <View style={styles.login__logo}>

            </View>
            <View style={{ flex: 0.8, backgroundColor: "white", borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 15 }}>
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
                <View style={{ flex: 0.8, flexDirection: "row" }}>
                    <View
                        style={{
                            flex: 1,
                            padding: 10,
                            justifyContent: "center",
                        }}
                    >
                        <TouchableOpacity onPress={() => navigation.navigate("Signup")}
                            style={{
                                height: 45, width: "100%", backgroundColor: "#ff6348", alignItems: "center", justifyContent: "center", borderRadius: 5, marginTop: 20,
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
                                SIGN UP
          </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Loginnml")}
                            style={{
                                height: 45, width: "100%", backgroundColor: "#00b894", alignItems: "center", justifyContent: "center", borderRadius: 5, marginTop: 20,
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
                                LOG IN
          </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    images: {
        flex: 1,
        resizeMode: 'cover'
    },
    login__logo: {
        flex: 2.5,
        alignItems: "center",
        justifyContent: "center",
    },
});
