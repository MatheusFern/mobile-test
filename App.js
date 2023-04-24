import "react-native-gesture-handler";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "./src/screens/Login/login";
import TokenValidator from "./src/screens/Login/tokenValidator";
import MyAccount from "./src/screens/Account/perfil";
import Drawner from "./src/components/Drawner";
import HomeScreen from "./src/screens/Home/HomeScreen";
import RestrictedScreen from "./src/screens/Restricted/RestrictedScreen";
import SignIn from "./src/screens/Login/SignIn";
import EmailValidator from "./src/screens/Account/EmailValidator";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();



function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HomeScreen") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "RestrictScreen") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="RestrictScreen"
        component={RestrictedScreen}
        options={{ tabBarLabel: "Restrito" }}
      />
    </Tab.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Meu Perfil" component={MyAccount} />
      <Drawer.Screen name="Validar Email" component={EmailValidator} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false, gestureEnabled: false }}
          initialRouteName="tokenValidator"
        >
          <Stack.Screen name="tokenValidator" component={TokenValidator} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Start" component={MyDrawer} />
          <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
