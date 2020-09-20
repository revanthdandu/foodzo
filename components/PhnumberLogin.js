import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Feather from "react-native-vector-icons/Feather";

export default function PhnumberLogin({ navigation }) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={styles.container}>
                <Text style={styles.Lmobileh}>Please enter your mobile number</Text>
                <TextInput
                    placeholder="enter your number"
                    placeholderTextColor="rgba(255,255,255,1)"
                    defaultValue="+91"
                    keyboardType="number-pad"
                    style={styles.numberinput}
                />
                <Text style={styles.mustt}>*country code is must</Text>
                <View>
                    <Text style={styles.conftext}>
                        By clicking here you will get a sms OTP
          </Text>
                    <TouchableOpacity style={{ alignItems: 'flex-end', alignSelf: 'flex-end', marginTop: -30 }} onPress={() => navigation.navigate("Home")}>
                        <Feather
                            name="arrow-right-circle"
                            color="black"
                            size={45}
                        />
                    </TouchableOpacity>
                </View>
                <StatusBar style="auto" />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20
    },
    Lmobileh: {
        fontSize: 22,
        marginTop: 50,
        textAlign: 'center'
    },
    numberinput: {
        height: 50,
        width: 380,
        backgroundColor: "rrgba(223, 230, 233,0.8)",
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 30,
        fontSize: 20,
    },
    mustt: {
        marginLeft: 200,
        marginTop: 10,
        color: "rgba(45, 52, 54,0.5)",
    },
    logo: {
        width: 110,
        height: 70,
        alignItems: "center",
        marginTop: 50,
        justifyContent: "center",
    },
    fab: {
        marginLeft: 300,
        marginTop: -37,
    },
    conftext: {
        color: "rgba(45, 52, 54,0.5)",
        marginTop: 25,
    },
});
