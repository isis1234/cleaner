import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Dimensions, TouchableHighlight, Button } from 'react-native';
import { Card } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

const SimpleImageSelector = ({ route, navigation }) => {
  let { params } = route
  const [imageTable, setImageTable] = useState([[]])
  const [page, setPage] = useState(1)

  useEffect(()=>{
    let table = []
    let index = (page-1) * 6

    for(let row=0; row<3; row++){
      let col = []
      if(index < params.imgs.length)
        col.push(params.imgs[index++])

      if(index < params.imgs.length)
        col.push(params.imgs[index++])
      
      if(col.length){ table.push(col) }
    }
    if(table.length>1){ setImageTable(imageTable.concat(table)) }
  }, [ params.imgs, page ])
  function routeImageDetail(img){ navigation.navigate('ImageDetail', { img }) }

  function renderNextPage(x){
    return (<View style={styles.image_row} key={`page${x.index}`}>
      {(x.item).map((img, i) => {
        return (<TouchableHighlight activeOpacity={0.6} underlayColor="#999999" onPress={()=>{ routeImageDetail(img)} } style={{ flex: 1 }} key={`page${x.index}_image${i}`}>
          <ImageBackground source={{ uri: img.uri, cache: 'only-if-cached' }} style={styles.image} key={img.id}>
            { renderBinButton(img) }
          </ImageBackground>
        </TouchableHighlight>)
      })}
    </View>)
  }
  function renderBinButton(img){
    return (
      <TouchableHighlight activeOpacity={0.6} underlayColor="#999999" onPress={()=>{console.log("bin")}} style={{ 
        flex: 1,
        flexDirection:'row',
        position:'absolute',
        bottom:10,
        marginLeft: 10,
        justifyContent: "space-between",
        backgroundColor: "transparent",
        borderWidth: 0.5,
        borderRadius: 20,
      }} >
        <ImageBackground source={require("../assets/bin.png")} style={{ width: 44, height: 44 }} />
      </TouchableHighlight>
    )
  }
  function renderEmpty(){
    return (<View style={styles.image_row} key={0} style={styles.image_empty_container}>
      <Text style={styles.image_view_text}>- No image -</Text>
    </View>)
  }
  function renderEnd(){
    if(params.imgs.length){
      return (<View style={styles.image_row} key={0} style={styles.image_empty_container}>
        <Text style={styles.image_view_text}>- No more images -</Text>
      </View>)
    }else{ return null }
  }

  return (
    <View style={styles.overview}>
      <FlatList 
        style={styles.content} 
        data={imageTable}
        keyExtractor={(item, i) => { return `img_page${page}_row${i}` }}
        renderItem={renderNextPage}
        ListFooterComponent={renderEnd}
        ListEmptyComponent={renderEmpty}
        onEndReachedThreshold={0}
        onEndReached={() => { setPage(page + 1) }}
      />
      <Text style={styles.footer}>{params.imgs.length} Photos | 0 Selected</Text>
    </View>
  );
};
export default SimpleImageSelector;

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
  image: {
    flex: 1,
    width: (Dimensions.get('window').width/2),
    height: (Dimensions.get('window').height/3),
  },
  footer: {
    fontSize: 18, 
    textAlign: 'center', 
    color: 'grey'
  },
})