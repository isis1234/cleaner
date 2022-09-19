import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
import { Card } from 'react-native-paper';
import * as MediaLibrary from 'expo-media-library';

const Dashboard = ({ route, navigation }) => {
  let { params } = route
  const [lowestImage, setLowestImage] = useState([])
  const [largestImage, setLargestImage] = useState([])
  const [screenshotImage, setScreenshotImage] = useState([])

  function routeLowest(){ navigation.navigate('Lowest', { img: params.lowest_size }) }
  function routeLargest(){ navigation.navigate('Largest', { img: params.largest_size }) }
  function routeScreenshots(){ navigation.navigate('Screenshots', { img: params.screenshot }) }
  useEffect(() => { 
    Promise.all([
      MediaLibrary.getAssetInfoAsync(params.lowest_size[0].id), 
      MediaLibrary.getAssetInfoAsync(params.lowest_size[1].id), 
      MediaLibrary.getAssetInfoAsync(params.lowest_size[2].id),
      MediaLibrary.getAssetInfoAsync(params.lowest_size[3].id),
    ]).then((arr) => {
      let temp = []
      arr.forEach((img) => { temp.push(img) })
      setLowestImage(temp)
    });
  }, [ params.lowest_size ])

  useEffect(() => { 
    Promise.all([
      MediaLibrary.getAssetInfoAsync(params.largest_size[0].id), 
      MediaLibrary.getAssetInfoAsync(params.largest_size[1].id), 
      MediaLibrary.getAssetInfoAsync(params.largest_size[2].id),
      MediaLibrary.getAssetInfoAsync(params.largest_size[3].id),
    ]).then((arr) => {
      let temp = []
      arr.forEach((img) => { temp.push(img) })
      setLargestImage(temp)
    });
  }, [ params.largest_size ])

  useEffect(() => { 
    Promise.all([
      MediaLibrary.getAssetInfoAsync(params.screenshot[0].id), 
      MediaLibrary.getAssetInfoAsync(params.screenshot[1].id), 
      MediaLibrary.getAssetInfoAsync(params.screenshot[2].id),
      MediaLibrary.getAssetInfoAsync(params.screenshot[3].id),
    ]).then((arr) => {
      let temp = []
      arr.forEach((img) => { temp.push(img) })
      setScreenshotImage(temp)
    });
  }, [ params.screenshot ])

  return (<View>
    <ScrollView>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#999999"
        onPress={routeLowest}
        style={styles.card_touchable}
      >
        <Card style={styles.card_container}>
          <Text style={styles.card_title}>Top 100 Lowest</Text>
          <View style={styles.card_image_preview}>
            <Image style={{ width: 90, height: 90 }} source={lowestImage[0]} />
            <Image style={{ width: 90, height: 90 }} source={lowestImage[1]} />
            <Image style={{ width: 90, height: 90 }} source={lowestImage[2]} />
            <Image style={{ width: 90, height: 90 }} source={lowestImage[3]} />
          </View>
        </Card>
      </TouchableHighlight>

      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#999999"
        onPress={routeLargest}
        style={styles.card_touchable}
      >
        <Card style={styles.card_container}>
          <Text style={styles.card_title}>Top 100 Largest</Text>
          <View style={styles.card_image_preview}>
            <Image style={{ width: 90, height: 90 }} source={largestImage[0]} />
            <Image style={{ width: 90, height: 90 }} source={largestImage[1]} />
            <Image style={{ width: 90, height: 90 }} source={largestImage[2]} />
            <Image style={{ width: 90, height: 90 }} source={largestImage[3]} />
          </View>
        </Card>
      </TouchableHighlight>

      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#999999"
        onPress={routeScreenshots}
        style={styles.card_touchable}
      >
        <Card style={styles.card_container}>
          <Text style={styles.card_title}>Screenshots ({params.screenshot.length})</Text>
          <View style={styles.card_image_preview}>
            <Image style={{ width: 90, height: 90 }} source={screenshotImage[0]} />
            <Image style={{ width: 90, height: 90 }} source={screenshotImage[1]} />
            <Image style={{ width: 90, height: 90 }} source={screenshotImage[2]} />
            <Image style={{ width: 90, height: 90 }} source={screenshotImage[3]} />
          </View>
        </Card>
      </TouchableHighlight>

      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#999999"
        onPress={() => {}}
        style={styles.card_touchable}
      >
        <Card style={styles.card_container}>
          <Text style={styles.card_title}>Duplicates</Text>
          <View style={styles.card_image_preview}>
            <Text style={styles.card_tbc}>TBC</Text>
            {/*<Image style={{ width: 90, height: 90 }} source={screenshotImage[0]} />
            <Image style={{ width: 90, height: 90 }} source={screenshotImage[1]} />
            <Image style={{ width: 90, height: 90 }} source={screenshotImage[2]} />
            <Image style={{ width: 90, height: 90 }} source={screenshotImage[3]} />*/}
          </View>
        </Card>
      </TouchableHighlight>

      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#999999"
        onPress={() => {}}
        style={styles.card_touchable}
      >
        <Card style={styles.card_container}>
          <Text style={styles.card_title}>75% Similar</Text>
          <View style={styles.card_image_preview}>
            <Text style={styles.card_tbc}>TBC</Text>
            {/*<Image style={{ width: 90, height: 90 }} source={screenshotImage[0]} />
            <Image style={{ width: 90, height: 90 }} source={screenshotImage[1]} />
            <Image style={{ width: 90, height: 90 }} source={screenshotImage[2]} />
            <Image style={{ width: 90, height: 90 }} source={screenshotImage[3]} />*/}
          </View>
        </Card>
      </TouchableHighlight>
    </ScrollView>
  </View>);
};

export default Dashboard;
const styles = StyleSheet.create({
  overview: {
    flex: 1, 
    padding: 16,
  },
  card_touchable: {
    marginTop: 10,
  },
  card_container: {
    padding: 24,
    flex: 1,
  },
  card_title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  card_tbc: {
    fontSize: 25,
    textAlign: 'center', 
    color: 'grey',
    paddingLeft: 24,
  },
  card_image_preview: {
    marginTop: 10,
    flexDirection: 'row',
  },
});
