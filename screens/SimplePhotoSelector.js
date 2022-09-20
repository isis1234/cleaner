import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import * as MediaLibrary from 'expo-media-library';
import EditableImage from '../components/EditableImage';

const SimplePhotoSelector = ({ route, navigation }) => {
  let { params } = route
  const [imageTable, setImageTable] = useState([[]])
  const [page, setPage] = useState(1)

  // Init Page 1
  useEffect(() => { 
    let table = []
    let index = 0
    for(let row=0; row<4; row++){
      let r = []
      if(index < params.img.length)
        r.push(params.img[index++])

      if(index < params.img.length)
        r.push(params.img[index++])
      table.push(r)
    }
    setImageTable(table)
  }, [ params.img ])

  // On change Page 2~N
  useEffect(()=>{
    let table = []
    let index = (page-1) * 8
    for(let row=0; row<4; row++){
      let r = []
      if(index < params.img.length)
        r.push(params.img[index++])

      if(index < params.img.length)
        r.push(params.img[index++])
      
      if(r.length){ table.push(r) }
    }
    if(table.length>1){ setImageTable(imageTable.concat(table)) }
  }, [ page ])

  function renderNextPage(x){
    return (<View style={styles.image_row} key={x.index}>
      {(x.item).map((img) => {
        return (<EditableImage image_id={img.id} style={styles.iamge_duration} key={img.id}/>)
      })}
    </View>)
  }
  function renderEmpty(){
    return (<View style={styles.image_row} key={0} style={styles.image_empty_container}>
      <Text style={styles.image_view_text}>- No Data at the moment -</Text>
    </View>)
  }
  function renderEnd(){
    if(params.img.length){
      return (<View style={styles.image_row} key={0} style={styles.image_empty_container}>
        <Text style={styles.image_view_text}>- No more articles at the moment -</Text>
      </View>)
    }else{ return null }
  }

  return (
    <View style={styles.overview}>
      <FlatList 
        style={styles.content} 
        data={imageTable}
        renderItem={renderNextPage}
        ListFooterComponent={renderEnd}
        ListEmptyComponent={renderEmpty}
        onEndReachedThreshold={2}
        onEndReached={() => { setPage(page + 1) }}
      />
      <Text style={styles.footer}>{params.img.length} Photos | 0 Selected</Text>
    </View>
  );
};
export default SimplePhotoSelector;

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
  image_empty_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image_view_text: {
    color: 'grey',
  },
  footer: {
    fontSize: 18, 
    textAlign: 'center', 
    color: 'grey'
  }
})