import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import { Card } from 'react-native-paper';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export default function Main({ route, navigation }) {
  const [BTNstart, setBTNstart] = useState(false)
  const [image, setImage] = useState({ total:0, processed:0 })
  const [preview, setPreview] = useState(require('../assets/TJ276.png'))
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const onPress = () => setBTNstart(!BTNstart)
  const cancel = () => {
    setBTNstart(false)
    setPreview(require('../assets/TJ276.png'))
  }
  const startProcess = () => {
    setImage({ total:0, processed:0 })
    setBTNstart(true)
  }

  // Start process
  useEffect(() => { if(BTNstart){
    console.log("Start Process", new Date()*1)
    requestPermission()
    if(status.accessPrivileges == "none") return;
    
    MediaLibrary.getAssetsAsync({ 
      first: 100000,
      mediaType: "photo"
    })
    .then(async (x) => { 
      setImage({ total:x.totalCount, processed:0 })
      // for(let i=0; i<100; i++){
      for(let i=0; i<x.totalCount; i++){
        await FileSystem.copyAsync({ from: x.assets[i].uri, to: FileSystem.cacheDirectory })
        const dirInfo = await FileSystem.getInfoAsync(FileSystem.cacheDirectory)
        x.assets[i].size = dirInfo.size
        setImage({ total:x.totalCount, processed:i+1 })
      }
      x.assets = (x.assets)
        .filter((y) => { return y.size })
        .sort((a, b) => { return a.size - b.size })
        .map((y) => { 
          return {
            size: y.size,
            id: y.id,
            mediaSubtypes: y.mediaSubtypes,
          }
        })
      console.log("============", x.totalCount, x.assets[0]) 
      console.log("End Process", new Date()*1)
      navigation.navigate('Dashboard', { 
        lowest_size: (x.assets).slice(0,100),
        largest_size: (x.assets).sort((a, b) => { return b.size - a.size }).slice(0,100),
        screenshot: (x.assets).filter((y) => { return y.mediaSubtypes.includes("screenshot") })
      })
      setBTNstart(false)
      setPreview(require('../assets/TJ276.png'))
    })
  } }, [ BTNstart ])
  return renderView()
  
  function renderView(){
    return (<SafeAreaView style={styles.overview}>
      <View>
        <View style={styles.logo_container}>
          <TouchableOpacity onPress={onPress}>
            <Image style={styles.logo_image} source={preview} />
          </TouchableOpacity>
        </View>

        <Card style={styles.card_container}>
          {/*<Text style={styles.card_title}>Summary</Text>*/}
          { (BTNstart)?
            (<View>
              <ActivityIndicator
                animating = {BTNstart}
                color = '#bc2b78'
                size = "large"
                style = {styles.activityIndicator}
              />
              <Text style={styles.card_text}>Total: {image.total}</Text>
              <Text style={styles.card_text}>Scanning: {image.processed} / {image.total} ({parseInt(image.processed/image.total*100)}%)</Text>
              <Text style={styles.card_text}>Estimated Time: {image.total*50/(60*1000)}min</Text>
              <Text style={styles.card_text}>Speed: 50ms</Text>
              <Button onPress={cancel} title="Cancel"/>
            </View>)
          : (
            <Text style={styles.card_text}>Press image to start scanning.</Text>
          )}
        </Card>
      </View>

      <View style={styles.footer_container}>
        <Text style={styles.footerText}>© 2022 - Made with ❤️ by Yu.</Text>
        <Text style={styles.footerText}>https://isis1234.github.io/isis1234_portfolio</Text>
      </View>
    </SafeAreaView>)
  }
}

const styles = StyleSheet.create({
  overview: {
    flex: 1, 
    padding: 16
  },
  logo_container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo_image: {
    height: 200,
    width: 200,
  },
  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card_container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card_text: {
    fontSize: 18, 
    color: 'grey',
    fontFamily: 'Sinhala Sangam MN'
  },
  card_title: {
    margin: 24,
    marginTop: 0,
    fontSize: 18, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer_container: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0 
  },
  footerText: {
    fontSize: 14, 
    textAlign: 'center', 
    color: 'grey',
    fontFamily: 'Sinhala Sangam MN'
  },
});
