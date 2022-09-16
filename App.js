import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import Constants from 'expo-constants';

import Main from './screens/Main';
import Dashboard from './screens/Dashboard';

export default function App() {
  const Stack = createStackNavigator()
  return (
    <View  style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator  initialRouteName="Main">
          <Stack.Screen 
            name="Main" 
            component={Main} 
            options={{
              title: 'Main', //Set Header Title
              // headerLeft: () => (
              //   <NavigationDrawerStructure navigationProps={navigation} />
              // ),
              headerStyle: {
                backgroundColor: '#3498DB', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }}
          />
          <Stack.Screen 
            name="Dashboard" 
            component={Dashboard}
            options={{
              title: 'Dashboard', //Set Header Title
              // headerLeft: () => (
              //   <NavigationDrawerStructure navigationProps={navigation} />
              // ),
              headerStyle: {
                backgroundColor: '#3498DB', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});