import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import * as MediaLibrary from 'expo-media-library';
import EditableImage from '../components/EditableImage';

const Lowest = ({ route, navigation }) => {
  let { params } = route
  const [imageTable, setImageTable] = useState([[]])
  const [index, setIndex] = useState(0)
  // const [page, setPage] = useState(1)

  function renderNextPage(page){
    let current_index = (page-1) * 8
    let table = []
    for(let row=0; row<25; row++){
    // for(let row=0; row<4; row++){
      let r = []
      if(current_index < params.img.length)
        r.push(params.img[current_index++])

      if(current_index < params.img.length)
        r.push(params.img[current_index++])
      table.push(r)
    }
    // setPage(page+1)
    console.log({page, current_index})

    return table.map((row) => {
      return (
        <View style={styles.image_row}>
          {row.map((img) => {
            return (<EditableImage image_id={img.id} style={styles.iamge_duration}/>)
          })}
        </View>
      )
    })
    return (<View><Text style={styles.footer}>{page}</Text></View>)
  }

  return (
    <View style={styles.overview}>
      <ScrollView style={styles.content}>
        {renderNextPage(1)}
      </ScrollView>
      <Text style={styles.footer}>{params.img.length} Photos | 0 Selected</Text>
    </View>
  );
};
export default Lowest;

const styles = StyleSheet.create({
  overview: {
    flex: 1, 
  },
  content: {
    flex: 1,
  },
  image_row: {
    marginTop: 5,
    flexDirection: 'row',
  },
  iamge_duration: {
    paddingLeft: 5,
  },
  footer: {
    fontSize: 18, 
    textAlign: 'center', 
    color: 'grey'
  }
})