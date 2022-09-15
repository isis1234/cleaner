import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { Card } from 'react-native-paper';

export default function Main() {
  const [BTNstart, setBTNstart] = useState(false)

  return (
    <View>
      { renderView() }
    </View>
  );
  
  function renderView(){
    return (
      <View>
        <Card>
          <View style={styles.container}>
            <Text style={styles.paragraph}>
              Access to Start Scanning
            </Text>

            <Image style={styles.logo} source={require('../assets/TJ276.png')} />
            <Button
              onPress={() => {
                setBTNstart(!BTNstart)
                alert(BTNstart);
              }}
              title="Start"
            />
          </View>
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
    height: 128,
    width: 128,
  },
});
