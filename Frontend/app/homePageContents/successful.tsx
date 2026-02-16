import { View, ImageBackground, StyleSheet, TouchableOpacity ,Text} from 'react-native'
import React from 'react'
import { router } from 'expo-router'

export default function successful() {
  return (
    <View style={style.box1}>
      <View style={style.imageBox}>
        <ImageBackground source={require('../../Desgin Templete and Docmentation/check.png')} style={style.image}></ImageBackground>
      </View>
      <TouchableOpacity onPress={()=>{
        router.push('/(tabs)/home')
      }}>
        <Text style={style.text}>Finsihed</Text>
      </TouchableOpacity>
    </View >
  )
}

const style = StyleSheet.create({
  box1: {
    flex: 1,
    width: '100%',
    alignItems:'center',
    justifyContent:'center'
  },
  imageBox:{
    // backgroundColor:'red',
    width:'53%',
    height:'31%',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:'3%'
  },
  image: {
    width: '90%',
    height: '80%'
  },
  text:{
    color:'white',
    fontSize:20,
    fontWeight:'bold',
    backgroundColor:'green',
    padding:'5%',
  }
})