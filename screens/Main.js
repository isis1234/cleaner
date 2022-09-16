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
    requestPermission()
    if(status.accessPrivileges == "none") return;
    
    MediaLibrary.getAssetsAsync({ 
      first: 100000,
      mediaType: "photo"
    })
    .then(async (x) => { 
      setImage({ total:x.totalCount, processed:0 })
      console.log("============", x.totalCount, x.assets[0]) 
      // for(let i=0; i<10; i++){
      for(let i=0; i<x.totalCount; i++){
        const dirInfo = await FileSystem.getInfoAsync(x.assets[i].uri)
        if(dirInfo.size) console.log(dirInfo)
        x.assets[0].size="A"
        setImage({ total:x.totalCount, processed:i+1 })
      }
      navigation.navigate('Dashboard', { asset: x })
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
