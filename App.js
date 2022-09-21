// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/
import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'

import Main from './screens/Main';
import Dashboard from './screens/Dashboard';
import SimpleImageSelector from './screens/SimpleImageSelector';
import ImageDetail from './screens/ImageDetail';

export default function App() {
  const Stack = createStackNavigator()
  return (
    <NavigationContainer>
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
      <Stack.Screen 
        name="SimpleImageSelector" 
        component={SimpleImageSelector}
        options={({route}) => { 
          return {
          title: route.params && route.params.screen_title?route.params.screen_title : "Photo Selector", //Set Header Title
          headerStyle: {
            backgroundColor: '#3498DB', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: styles.screen_header_title,
        }}}
      />
      <Stack.Screen 
        name="ImageDetail" 
        component={ImageDetail}
        options={({route}) => { 
          return {
          title: route.params && route.params.screen_title?route.params.screen_title : "Preview", //Set Header Title
          headerStyle: {
            backgroundColor: '#3498DB', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: styles.screen_header_title,
        }}}
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