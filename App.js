import React, { useEffect, useState } from "react";
import { FAB } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "./screens/Home/Home";
import Profile from "./screens/Profile/Profile";
import MyLeaning from "./screens/MyLearning/MyLearning";

const Tab = createMaterialBottomTabNavigator();

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
// import {API, graphqlOperation} from 'aws-amplify';
// import {createTodo} from './src/graphql/mutations';
// import {listTodos} from './src/graphql/queries';
import {
  withAuthenticator,
  useAuthenticator,
} from "@aws-amplify/ui-react-native";

import { Amplify } from "aws-amplify";
import awsExports from "./src/aws-exports";
Amplify.configure(awsExports);

// retrieves only the current value of 'user' from 'useAuthenticator'
const userSelector = (context) => [context.user];

const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
      {/* Add your content here */}
    </View>
  );
};

const SettingsScreen = () => {
  return (
    <View>
      <Text>Settings Screen</Text>
      {/* Add your content here */}
    </View>
  );
};

const SignOutButton = () => {
  const { user, signOut } = useAuthenticator(userSelector);

  return (
    <Pressable onPress={signOut} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>
        Hello, {user.username}! Click here to sign out!
      </Text>
    </Pressable>
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Tab.Navigator>
            <Tab.Screen
              name="My Learning"
              component={MyLeaning}
              options={{
                tabBarIcon: ({ color }) => (
                  <Icon name="book" color={color} size={24} />
                ),
              }}
            />
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: ({ color }) => (
                  <Icon name="home" color={color} size={24} />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={() => <Profile SignOut={SignOutButton} />}
              options={{
                tabBarIcon: ({ color }) => (
                  <Icon name="account" color={color} size={24} />
                ),
              }}
            />
          </Tab.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>

      <FAB
        icon="forum"
        style={styles.fab}
        onPress={() => console.log("Pressed")}
      />
    </SafeAreaView>
  );
};

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: { width: 400, flex: 1, padding: 20, alignSelf: "center" },
  todo: { marginBottom: 15 },
  input: {
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: "bold" },
  buttonContainer: {
    alignSelf: "center",
    backgroundColor: "black",
    paddingHorizontal: 8,
  },
  buttonText: { color: "white", padding: 16, fontSize: 18 },
  fab: {
    position: "absolute",
    margin: 16,
    right: 16,
    bottom: 100,
  },
});
