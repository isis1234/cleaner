// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import * as React from 'react';
import { Button, View, Text, StyleSheet, Image, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Card } from 'react-native-paper';

const Dashboard = ({ route, navigation }) => {
  let { params } = route

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.overview}>
          <Card>
            <View style={styles.container}>
              <Text
                style={{
                  fontSize: 25,
                  marginBottom: 16,
                  margin: 24,
                  marginTop: 0,
                  fontWeight: 'bold',
                }}>
                Top 100 Lowest
              </Text>
              <Image style={{ width: 250, height: 250 }} source={params.lowest_size[0]} />
            </View>
          </Card>

          <Card>
            <View style={styles.container}>
              <Text
                style={{
                  fontSize: 25,
                  marginBottom: 16,
                  margin: 24,
                  marginTop: 0,
                  fontWeight: 'bold',
                }}>
                Top 100 Largest
              </Text>
              <Image style={{ width: 250, height: 250 }} source={params.largest_size[0]} />
            </View>
          </Card>

          <Card>
            <View style={styles.container}>
              <Text
                style={{
                  fontSize: 25,
                  marginBottom: 16,
                  margin: 24,
                  marginTop: 0,
                  fontWeight: 'bold',
                }}>
                Screenshot ({params.screenshot.length})
              </Text>
              <Image style={{ width: 250, height: 250 }} source={params.screenshot[0]} />
            </View>
          </Card>
        </View>
      </ScrollView>
      <View>
        <Text style={styles.footerText}>
          © 2022 - Made with ❤️ by Yu.
        </Text>
        <Text style={styles.footerText}>
          https://isis1234.github.io/isis1234_portfolio
        </Text>
      </View>
    </SafeAreaView>
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
    padding: 24,
    paddingTop: StatusBar.currentHeight,
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
