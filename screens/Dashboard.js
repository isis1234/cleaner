// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import * as React from 'react';
import { Button, View, Text, StyleSheet, Image } from 'react-native';

const Dashboard = ({ route, navigation }) => {
  let { params } = route
  // console.log(params)

  return (
    <View style={styles.overview}>
      <View style={styles.container}>
        {/*<Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            marginBottom: 16,
          }}>
          Dashboard
        </Text>*/}
        {/*<Button
          title="Go to Third Page"
          onPress={() => navigation.navigate('ThirdPage')}
        />*/}
        <Image style={{ width: 250, height: 250 }} source={params.asset.assets[0]} />

      </View>
      <View>
        <Text style={styles.footerText}>
          Custom React Navigate Drawer
        </Text>
        <Text style={styles.footerText}>
          www.aboutreact.com
        </Text>
      </View>
    </View>
  );
};

export default Dashboard;
const styles = StyleSheet.create({
  overview: {
    flex: 1, padding: 16
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 18, 
    textAlign: 'center', 
    color: 'grey'
  },
  logo: {
    height: 200,
    width: 200,
  },
});
