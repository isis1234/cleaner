import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export default function EditableImage(props) {
  const [ImageSource, setImageScourse] = useState([])

  useEffect(() => { 
    MediaLibrary.getAssetInfoAsync(props.image_id).then((x) => {
      setImageScourse(x)
    })
  }, [ props.image_id ])
  return (
    <View style={styles.overview}>
      <Image source={ImageSource} style={styles.image} key={props.image_id}/>
    </View>
  );
}
const styles = StyleSheet.create({
  overview: {
    backgroundColor: "#FFFFFF",
    width: (Dimensions.get('window').width/2),
    height: (Dimensions.get('window').width/2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: (Dimensions.get('window').width/2),
    height: (Dimensions.get('window').width/2),
  }
});
