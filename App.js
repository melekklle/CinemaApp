import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import DownloadScreen from './components/DownloadScreen';
import ProfileScreen from './components/ProfileScreen';
import MovieDetail from './components/MovieDetail';
import FilmDetail from './components/FilmDetail';
import Wishlist from './components/Wishlist';
import FavoriteDetail from './components/FavoriteDetail';


import { Provider } from 'react-redux';
import { store } from './store/store';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: { backgroundColor: '#1F1D2B' },
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
      <Stack.Screen name="Favorite" component={FavoriteDetail}/>
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
         animation: 'fade',
        contentStyle: { backgroundColor: '#1F1D2B' },
      }}
    >
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  );
}

function DownloadStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
         animation: 'fade',
        contentStyle: { backgroundColor: '#1F1D2B' },
      }}
    >
      <Stack.Screen name="Download" component={DownloadScreen} />
      <Stack.Screen name="FilmDetail" component={FilmDetail} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
         animation: 'fade',
        contentStyle: { backgroundColor: '#1F1D2B' },
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#1F1D2B',
    card: '#1F1D2B',
    text: '#fff',
    primary: '#00C2FF',
    border: 'transparent',
    notification: '#00C2FF',
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer theme={MyTheme}>
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
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Search" component={SearchStack} />
            <Tab.Screen name="Download" component={DownloadStack} />
            <Tab.Screen name="Profile" component={ProfileStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1F1D2B',
  },
});
