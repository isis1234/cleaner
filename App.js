// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import Constants from 'expo-constants';

import Main from './screens/Main';
import Dashboard from './screens/Dashboard';

export default function App() {
  const Stack = createStackNavigator()
  return (<NavigationContainer>
    <Stack.Navigator  initialRouteName="Main">
      <Stack.Screen 
        name="Main" 
        component={Main} 
        options={{
          title: 'Main', //Set Header Title
          headerStyle: {
            backgroundColor: '#3498DB', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: styles.screen_header_title,
        }}
      />
      <Stack.Screen 
        name="Dashboard" 
        component={Dashboard}
        options={{
          title: 'Dashboard', //Set Header Title
          headerStyle: {
            backgroundColor: '#3498DB', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: styles.screen_header_title,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>);
}

const styles = StyleSheet.create({
  screen_header_title: {
    fontWeight: 'bold',
    fontFamily: 'Sinhala Sangam MN',
    fontSize: 20,
  },
});