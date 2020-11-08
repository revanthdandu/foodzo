import React, { useRef } from 'react';
import { View, StyleSheet, Text, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Avatar, TextInput, TouchableRipple } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import RBSheet from "react-native-raw-bottom-sheet";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { auth } from '../firebase';
import { useStateValue } from '../StateProvider';


export default function Profile({ navigation }) {

  const [{ favorites }, dispatch] = useStateValue();

  const rendereditproContent = () => (

    <View style={{ padding: 20, paddingTop: 28, height: 370, backgroundColor: 'white' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10, letterSpacing: 1 }}>EDIT PROFILE</Text>
      <Text style={{ marginBottom: 6, letterSpacing: 1 }}>NAME</Text>
      <KeyboardAvoidingView>
        <TextInput style={{ height: 45, backgroundColor: 'white', marginBottom: 6 }} />
        <Text style={{ marginBottom: 6, letterSpacing: 1 }}>PHONE NUMBER</Text>
        <TextInput style={{ height: 45, backgroundColor: 'white', marginBottom: 6 }} />
        <Text style={{ marginBottom: 6, letterSpacing: 1 }}>EMAIL ADDRESS</Text>
        <TextInput style={{ height: 45, backgroundColor: 'white', marginBottom: 25 }} />
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={{ height: 44, backgroundColor: 'rgba(18, 137, 167,1.0)', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
        onPress={() => editproref.current.snapTo(2)}

      >
        <Text style={{ fontWeight: '700', letterSpacing: 0.5 }}>UPDATE</Text>
      </TouchableOpacity>
    </View>

  );

  const rendereditphotoContent = () => (
    <View style={{ padding: 20, paddingTop: 15, height: 250, backgroundColor: 'white' }}>
      <TouchableOpacity
        style={{ height: 44, backgroundColor: 'rgba(18, 137, 167,1.0)', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontWeight: '700', letterSpacing: 0.5 }}>SHOW PHOTO</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ height: 44, backgroundColor: 'rgba(18, 137, 167,1.0)', borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
        <Text style={{ fontWeight: '700', letterSpacing: 0.5 }}>UPLOAD PHOTO</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => editphotoref.current.snapTo(2)}
        style={{ height: 44, backgroundColor: '#e74c3c', borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
        <Text style={{ fontWeight: '700', letterSpacing: 0.5, color: '#ecf0f1' }}>CANCEL</Text>
      </TouchableOpacity>
    </View>

  );


  const Logoutuser = () => {
    auth.signOut();
    navigation.navigate("Login");
  }


  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );



  const editproref = React.useRef(null);
  const editphotoref = React.useRef(null);

  return (
    <View style={styles.container}>

      <View style={{ flex: 1, flexDirection: 'row', padding: 20, paddingBottom: 10, borderBottomWidth: 1.6, borderBottomStartRadius: 20, borderBottomEndRadius: 20 }}>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 10 }}>
          <TouchableOpacity onPress={() => editphotoref.current.snapTo(0)}>
            <Avatar.Image size={70} source={{ uri: 'https://i.telegraph.co.uk/multimedia/archive/03029/Becks1_5_3029072b.jpg' }} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 5, paddingLeft: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, letterSpacing: 1, paddingTop: 10, color: '#2d3436' }}>Revanth</Text>
          <Text style={{ color: '#636e72' }}>+918790588214</Text>
          <Text style={{ color: '#636e72' }}>revanthdandu99@gmail.com</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => editproref.current.snapTo(0)}>
            <Feather name="edit" size={30} color={'#353b48'} />
          </TouchableOpacity>
        </View>





      </View>

      <BottomSheet
        ref={editproref}
        snapPoints={[400, '100%', 0]}
        borderRadius={10}
        renderContent={rendereditproContent}
        renderHeader={renderHeader}
        enabledGestureInteraction={true}
        enabledBottomInitialAnimation={true}
      />
      <BottomSheet
        ref={editphotoref}
        snapPoints={[250, 200, 0]}
        borderRadius={10}
        renderContent={rendereditphotoContent}
        renderHeader={renderHeader}
        enabledGestureInteraction={true}
        enabledBottomInitialAnimation={true}
      />

      {/* <View style={{ flex: 6, padding: 10 }}>

        <TouchableOpacity style={{ height: 40, marginBottom: 3, justifyContent: 'center', paddingLeft: 10 }}>
          <AntDesign name='shoppingcart' size={30} color={'#2c3e50'} style={{ flexWrap: 'wrap' }} />
          <Text style={{ fontSize: 16, letterSpacing: 0.5 }}>Cart</Text>
        </TouchableOpacity>
        <Button title="LOGOUT" onPress={Logoutuser} />
      </View> */}
      <View style={{ flex: 6, padding: 10 }}>


        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .10)"
          style={{ padding: 8 }}
          onPress={() => console.log('Pressed')}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: 10 }}>
            <MaterialCommunityIcon name='food' size={30} color={'#2c3e50'} />
            <Text style={{ fontSize: 16, letterSpacing: 0.5, color: '#2c3e50', fontWeight: '900', alignSelf: 'center', paddingLeft: 20 }}>Your Orders</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .10)"
          style={{ padding: 8 }}
          onPress={() => navigation.navigate('Favorite')}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: 10 }}>
            <MaterialIcon name='favorite-border' size={30} color={'#2c3e50'} />
            <Text style={{ fontSize: 16, letterSpacing: 0.5, color: '#2c3e50', fontWeight: '900', alignSelf: 'center', paddingLeft: 20 }}>Favorite restaurants</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .10)"
          style={{ padding: 8 }}
          onPress={() => console.log('Pressed')}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: 10 }}>
            <FontAwesome name='address-book-o' size={30} color={'#2c3e50'} />
            <Text style={{ fontSize: 16, letterSpacing: 0.5, color: '#2c3e50', fontWeight: '900', alignSelf: 'center', paddingLeft: 20 }}>Address Book</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .10)"
          style={{ padding: 8 }}
          onPress={Logoutuser}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: 10 }}>
            <FontAwesome name='power-off' size={30} color={'#2c3e50'} />
            <Text style={{ fontSize: 16, letterSpacing: 0.5, color: '#2c3e50', fontWeight: '900', alignSelf: 'center', paddingLeft: 20 }}>Log Out</Text>
          </View>
        </TouchableRipple>




      </View>
    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  header: {
    backgroundColor: 'rgba(236, 240, 241,0.3)',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
});