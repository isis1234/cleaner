import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

let s = require('../js/scan_image.js')

export default function Main() {
  const [BTNstart, setBTNstart] = useState(false)
  const onPress = () => setBTNstart(!BTNstart)

  return renderView();
  
  function renderView(){
    return (
      <Card>
        { (BTNstart)?
            (<View style={styles.container}>
              <Text style={styles.paragraph}>Scanning...</Text>
              {s.a()}
              <ActivityIndicator
                animating = {BTNstart}
                color = '#bc2b78'
                size = "large"
                style = {styles.activityIndicator}
              />
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
