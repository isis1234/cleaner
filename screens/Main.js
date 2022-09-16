import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import { Card } from 'react-native-paper';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export default function Main({ route, navigation }) {
  const [BTNstart, setBTNstart] = useState(false)
  const [image, setImage] = useState({ total:0, processed:0 })
  const onPress = () => setBTNstart(!BTNstart)
  const [status, requestPermission] = MediaLibrary.usePermissions();


  // Start process
  useEffect(() => { if(BTNstart){
    console.log("Start Process", new Date()*1)
    setImage({ total:0, processed:0 })
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
      (x.assets).sort((a, b) => { return a.size - b.size })
      console.log("============", x.totalCount, x.assets[0]) 
      console.log("End Process", new Date()*1)
      navigation.navigate('Dashboard', { 
        lowest_size: (x.assets).sort((a, b) => { return a.size - b.size }).slice(0,100),
        largest_size: (x.assets).sort((a, b) => { return b.size - a.size }).slice(0,100),
        screenshot: (x.assets).filter((x) => { return x.mediaSubtypes.includes("screenshot") })
      })
      setBTNstart(false)
    })
  } }, [ BTNstart ])
  return renderView()
  
  function renderView(){
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Card>
          { (BTNstart)?
              (<View style={styles.container}>
                <Text style={styles.paragraph}>Scanning...</Text>
                <ActivityIndicator
                  animating = {BTNstart}
                  color = '#bc2b78'
                  size = "large"
                  style = {styles.activityIndicator}
                />
                <Text style={styles.paragraph}>{image.processed} / {image.total}</Text>
                <Button onPress={()=>{setBTNstart(!BTNstart)}} title="Cancel"/>
              </View>)
            :
              (<View style={styles.container}>
                <Text style={styles.paragraph}>Press Image to Start Scanning</Text>
                <TouchableOpacity onPress={onPress}>
                  <Image style={styles.logo} source={require('../assets/TJ276.png')} />
                </TouchableOpacity>
              </View>)
          }
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 200,
    width: 200,
  },
  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
