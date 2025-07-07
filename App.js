import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import DownloadScreen from './components/DownloadScreen';
import ProfileScreen from './components/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar 
        style="light" 
        translucent={true}
        backgroundColor="transparent"
      />
      <SafeAreaView style={styles.safeArea} />

      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: '#1F1D2B',
              borderTopWidth: 0,
              height: 65,
              paddingTop: 10,
              paddingHorizontal: 45,
              
            },
            tabBarIcon: ({ focused }) => {
              let iconName = '';
              let label = '';

              if (route.name === 'Home') {
                iconName = 'home';
                label = 'Home';
              } else if (route.name === 'Search') {
                iconName = 'search';
                label = 'Search';
              } else if (route.name === 'Download') {
                iconName = 'download';
                label = 'Download';
              } else if (route.name === 'Profile') {
                iconName = 'person';
                label = 'Profile';
              }

              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: focused ? '#252836' : 'transparent',
                    borderRadius: 20,
                    width: 100,
                    height: 38,
                  }}
                >
                  <Ionicons
                    name={iconName}
                    size={25}
                    color={focused ? '#00C2FF' : 'gray'}
                  />
                  {focused && (
                    <Text
                      style={{
                        color: '#00C2FF',
                        marginLeft: 2,
                        fontSize: 15,
                        fontFamily: 'montserrat-regular',
                      }}
                    >
                      {label}
                    </Text>
                  )}
                </View>
              );
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Download" component={DownloadScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#1F1D2B',
  },
});
