import React, { useState, useEffect } from 'react';
import { Button, View, Text, ImageBackground, ScrollView, StyleSheet, Image, TouchableHighlight } from 'react-native';
import ImageViewer from '../components/ImageViewer';

const ImageDetail = ({ route, navigation }) => {
  let { params } = route
  const [image, setImage] = useState({})
  useEffect(()=>{ 
    setImage({
      ...(params.img),
      creationTime: (new Date(params.img.creationTime)).toString()
    }) 
  }, [ params.img ])

  return (<View style={styles.image_view}>
    <ImageViewer image={image}/>
    <Text style={{ paddingLeft:20, fontSize:10, color:'grey' }}>{image.uri}</Text>
    <Text style={{ paddingLeft:20, fontSize:16, color:'grey' }}>{image.size}Byte ≈ {image.size/1000000}MB</Text>
    <Text style={{ paddingLeft:20, fontSize:16, color:'grey' }}>{image.creationTime}</Text>
    <Text style={{ paddingLeft:20, fontSize:16, color:'grey' }}></Text>
  </View>);
};

export default ImageDetail;
const styles = StyleSheet.create({
  image_view: {
    flex: 1,
    borderBottomWidth: 2,
    borderColor: '#999999',
  }
})