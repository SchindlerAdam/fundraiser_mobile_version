import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/homeScreen";
import LoginScreen from "../screens/loginScreen";
import ProfileScreen from "../screens/profileScreen";

const Stack = createStackNavigator();


const HomeScreenStack = () => {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    );
};


const LoginScreenStack = () => {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  };

const ProfileScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  )
}




export {HomeScreenStack, LoginScreenStack, ProfileScreenStack};