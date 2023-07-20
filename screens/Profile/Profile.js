import { View, Text, Pressable, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import {
  withAuthenticator,
  useAuthenticator,
  Authenticator,
} from "@aws-amplify/ui-react-native";

const Profile = ( SignOut ) => {
  // const SignOutButton = SignOut();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../images/profilepic.png')}
        style={styles.profilePicture}
      />

      <Text style={styles.name}>Ashik</Text>
      <Text style={styles.email}>ashik@gmail.com</Text>

      <TouchableOpacity style={styles.button1}>
        <Text style={styles.buttonText1}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button2}>
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