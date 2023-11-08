import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import {Header} from 'react-native-elements'

const Homepage = () => {
  return (
    <View style = {styles.container}>
    <Header
        leftComponent={{ text: 'Bubble', style: { color: '#93B8DA' }}}
        containerStyle={{
            backgroundColor: 'transparent',
            borderBottomWidth: 0
          }}
  />
  <TouchableOpacity></TouchableOpacity>
    </View>
  )
}

export default Homepage

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#191818",
        padding: 20,
    },

})