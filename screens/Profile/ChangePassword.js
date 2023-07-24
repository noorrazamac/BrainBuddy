import { View, Text, Pressable, Image,TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, {useState} from "react";
import {
  withAuthenticator,
  useAuthenticator,
  Authenticator,
} from "@aws-amplify/ui-react-native";
import { Auth } from 'aws-amplify';

const ChangePassword = () => {
    const [old, onChangeOld] = useState('');
    
    const [newp, onChangeNew] = useState('');
    
    const [message, changeMsg] = useState('');

    
  return (
    
    <View style={styles.container}>
      
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={onChangeOld}
        value={old}
        placeholder="Old password"
        keyboardType="default"
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={onChangeNew}
        value={newp}
        placeholder="New password"
        keyboardType="default"
      />
      <Text>{message}</Text>
      <TouchableOpacity style={styles.button2} onPress={()=>{
        console.log(old);
        console.log(newp);
        // Auth.signOut();
        // console.log("SignOut");
        if(old==newp){
            changeMsg('Passwords are same');
        }else{
            
                const user =  Auth.currentAuthenticatedUser().then(user => {
                    Auth.changePassword(user, old, newp)
                    .then(data => {console.log(data)
                        changeMsg('Password changed successfully');})
                    .catch(err => { 
                        console.log(err.message)
                        changeMsg(err.message);
                    });
                }   
                );

            
        }
      }}>
        
        <Text style={styles.buttonText2}>Change Password</Text>
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

export default ChangePassword;