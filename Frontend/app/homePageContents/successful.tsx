import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import React from 'react'
import { router } from 'expo-router'

export default function successful() {
  return (
    <View style={style.box1}>
      <View style={style.allItemBox}>
        <View style={style.imageBox}>
          <Feather name="check-circle" size={80} color="#f8b518" />
        </View>
        <Text style={style.success}>Success!</Text>
        <Text style={style.text}>Your Request was completed successfully.The System will display matched organ</Text>
        <TouchableOpacity style={style.btn} onPress={() => {
          router.push('/(tabs)/home')
        }}>
          <Text style={style.btnText}>Finsihed</Text>
        </TouchableOpacity>
      </View>

    </View >
  )
}

const style = StyleSheet.create({
  box1: {
    backgroundColor: '#cdcfdb',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  allItemBox: {
    backgroundColor: 'whitesmoke',
    overflow: 'hidden',
    width: '90%',
    height: '45%',
    boxShadow: '0px 0px 10px 1px black'
  },
  imageBox: {
    // backgroundColor: 'red',
    width: '100%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',

  },
  success: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold'
    // backgroundColor: 'red'
  },
  text: {
    color: 'black',
    fontSize: 14,
    fontWeight: '300',
    // backgroundColor: 'green',
    width: '85%',
    alignSelf: 'center',
    padding: '1%',
  },
  btn: {
    width: '90%',
    height: '13%',
    backgroundColor: '#f8b518',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  btnText: {

  },

})