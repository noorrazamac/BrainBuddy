import { View, Text, Pressable, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import {
  withAuthenticator,
  useAuthenticator,
  Authenticator,
} from "@aws-amplify/ui-react-native";
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';

const Profile = (  ) => {
  const { user } = useAuthenticator();
  const navigate = useNavigation();
  const SubscribeButton = () => {
    const handleSubscribe = () => {
      // Implement the logic for handling the subscription process here
      // For example, navigate to the subscription screen or display a payment gateway
      navigate.navigate('PaymentMethodScreen');
      console.log('Subscribing now...');
    };
  
    return (
      <TouchableOpacity style={styles.button} onPress={handleSubscribe}>
        <Text style={styles.button1}>Subscribe Now</Text>
      </TouchableOpacity>
    );
  };
  return (
    
    <View style={styles.container}>
      <Image
        source={require('../../images/profilepic.png')}
        style={styles.profilePicture}
      />

      <Text style={styles.name}>{user.username}</Text>
      <Text style={styles.email}>{user.attributes.email}</Text>

      <TouchableOpacity style={styles.button1} onPress={() => navigate.navigate('ChangePassword')}>
        <Text style={styles.buttonText1}>Change Password</Text>
      </TouchableOpacity>
      <SubscribeButton/>
      <TouchableOpacity style={styles.button2} onPress={()=>{
        Auth.signOut();
        console.log("SignOut");
      }}>
        <Text style={styles.buttonText2}>LogOut</Text>
      </TouchableOpacity>

      {/* { SignOutButton } */}

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  email: {
    fontSize: 16,
    marginBottom: 10,
  },

  // location: {
  //   fontSize: 16,
  //   marginBottom: 20,
  // },

  button1: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: 'green'
  },

  button2: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: 'red'
  },

  buttonText1: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonText2: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;