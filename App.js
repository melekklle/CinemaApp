import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';

 const Tab = createBottomTabNavigator();

 export default function App() {
  return(
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown:false,
        tabBarIcon:({ focused,color,size}) => 
        {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused?
          }
        }
      })}
    </NavigationContainer>
  )
 }