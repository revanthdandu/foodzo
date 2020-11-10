import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SocialIcon } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { auth } from '../firebase';

export default function Loginnml({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("Loginnml");
      }
    })
  }, [])


  const loginUser = () => {
    auth.signInWithEmailAndPassword(email, password).then(user => {
      console.log(user);
      setEmail('');
      setPassword('');
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <AntDesign name='left' size={28} color={'#e17055'} style={{ marginTop: 20, }} />
      </TouchableOpacity>

      <Text style={{ fontSize: 25, color: '#e17055', fontWeight: 'bold', marginTop: 45 }}>SIGNIN </Text>

      <TextInput onChangeText={(text) => { setEmail(text) }} value={email} style={{ height: 55, width: 350, borderWidth: 2, borderColor: '#b2bec3', alignSelf: 'center', marginTop: 50, borderRadius: 25, paddingLeft: 25, fontSize: 20 }} placeholder={"Email or Phone number"} />
      <TextInput secureTextEntry={true} onChangeText={(text) => { setPassword(text) }} value={password} style={{ height: 55, width: 350, borderWidth: 2, borderColor: '#b2bec3', alignSelf: 'center', marginTop: 25, borderRadius: 25, paddingLeft: 25, fontSize: 20 }} placeholder={"Password"} />


      <TouchableOpacity onPress={loginUser} style={{ height: 50, width: 300, backgroundColor: '#e17055', borderRadius: 25, marginTop: 50, justifyContent: 'center', alignSelf: 'center' }}>
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>Log In</Text>
      </TouchableOpacity>



      <StatusBar style="auto" />
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
