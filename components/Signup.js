import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { auth } from '../firebase';

export default function Signup({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayname, setDisplayname] = useState('');
    const [phonenumber, setPhonenumber] = useState('');

    const signUpUser = () => {
        auth.createUserWithEmailAndPassword(email, password).then(user => {
            user.user.updateProfile({
                displayName: displayname
            }).then(() => { })

            user.user.updateProfile({
                phoneNumber: phonenumber
            }).then(() => { })
            setPassword('');
            setEmail('');
            alert("SIGNED UP SUCESSFULLY")
        })
    }


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <AntDesign name='left' size={28} color={'#e17055'} style={{ marginTop: 20, }} />
                </TouchableOpacity>

                <Text style={{ fontSize: 25, color: '#e17055', fontWeight: 'bold', marginTop: 45 }}>Create new account </Text>

                <TextInput onChangeText={(text) => { setDisplayname(text) }} style={{ height: 55, width: 350, borderWidth: 2, borderColor: '#b2bec3', alignSelf: 'center', marginTop: 50, borderRadius: 25, paddingLeft: 25, fontSize: 20 }} placeholder={"Full name"} />
                <TextInput onChangeText={(text) => { setPhonenumber(text) }} style={{ height: 55, width: 350, borderWidth: 2, borderColor: '#b2bec3', alignSelf: 'center', marginTop: 25, borderRadius: 25, paddingLeft: 25, fontSize: 20 }} placeholder={"Phone number"} />
                <TextInput onChangeText={(text) => { setEmail(text) }} style={{ height: 55, width: 350, borderWidth: 2, borderColor: '#b2bec3', alignSelf: 'center', marginTop: 25, borderRadius: 25, paddingLeft: 25, fontSize: 20 }} placeholder={"Email"} />
                <TextInput onChangeText={(text) => { setPassword(text) }} style={{ height: 55, width: 350, borderWidth: 2, borderColor: '#b2bec3', alignSelf: 'center', marginTop: 25, borderRadius: 25, paddingLeft: 25, fontSize: 20 }} placeholder={"Password"} />

                <TouchableOpacity onPress={signUpUser} style={{ height: 50, width: 300, backgroundColor: '#e17055', borderRadius: 25, marginTop: 50, justifyContent: 'center', alignSelf: 'center' }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>Sign Up</Text>
                </TouchableOpacity>

                <StatusBar style="auto" />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 25
    },
});
