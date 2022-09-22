import React, { useState, useEffect } from 'react';
import { ScrollView, Image } from 'react-native';

const ImageDetail = (props) => {
  const [image, setImage] = useState({})
  useEffect(()=>{ 
    setImage({
      uri: props.image.uri,
      width: props.image.width,
      height: props.image.height,
    }) 
  }, [ props.image ])

  return (<ScrollView>
    <ScrollView horizontal={true}>
      <Image source={{ uri:  image.uri, cache: 'only-if-cached' }} style={{ width: image.width, height: image.height }} />
    </ScrollView>
  </ScrollView>);
};

export default ImageDetail;