import { View, Text, Pressable } from "react-native";
import React from "react";
import {
  withAuthenticator,
  useAuthenticator,
  Authenticator,
} from "@aws-amplify/ui-react-native";

const Profile = ({ SignOut }) => {
  const SignOutButton = SignOut();

  return (
    <View>
      <Text>Profile</Text>
      { SignOutButton }
    </View>
  );
};

export default withAuthenticator(Profile);
