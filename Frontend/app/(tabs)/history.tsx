/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function history() {

  const [requests, setRequests] = useState<any>([])
  const [textType, setTextType] = useState('');
  const [error, setError] = useState('')

  async function allhistory() {

    const token = await AsyncStorage.getItem('token');
    const request = await axios.post(`${baseUrl}/history`, { token });


    if (request.data.message.length > 0) {
      setRequests(request.data.message)
      setTextType(request.data.text)
    }
    else if (request.data.message.length < 1) {
      setError('No request found')
    }


  }

  useEffect(() => {
    allhistory()
  }, [])




  return (
    <ImageBackground
      source={require('../../Desgin Templete and Docmentation/background 3.jpg')}
      style={{ flex: 1 }} >

      <View style={style.box1}>

      </View>
      <TouchableOpacity style={style.header} onPress={history}>
        <Text style={{ fontSize: 20, marginRight: '25%' }}>History</Text>
        <Text style={{ marginRight: '8%' }}><AntDesign name="reload" size={30} color="black" onPress={allhistory} /></Text>
      </TouchableOpacity>
      <Text style={style.box1}>{error}</Text>

          <FlatList
            data={requests}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={style.eachRequests}>
                <Text style={style.eachRequestsData1}>{item.first_name}</Text>
                <Text style={style.eachRequestsData2}>Track Id : {item.id}</Text>
                <Text style={style.eachRequestsData2}>{textType}  → {item.organ_name}</Text>
                <Text style={style.eachRequestsData3}>Date : {item.date}</Text>
                <Text style={style.eachRequestsData3}>Status : {item.status === "Pending" ? (<Text><Entypo name="dot-single" size={23} color="red" />Pending</Text>) : (<Text><Entypo name="dot-single" size={28} color="green" />Approved</Text>)}</Text>

              </View>
            )}
          />
       







    </ImageBackground >
  )
}


const style = StyleSheet.create({
  box1: {
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    color: 'blue',
    marginTop: 8
  },
  header: {
    width: '100%',
    alignItems: 'center',
    height: 50,
    justifyContent: 'flex-end',
    borderBottomWidth: 2,
    marginTop: '10%',
    flexDirection: 'row',

  },
  box2: {
    height: 700,
    // backgroundColor:'blue',
    width: '100%'
  },
  eachRequests: {
    height: 130,
    width: '95%',
    backgroundColor: "rgba(255, 255, 255, 0.35)",
    opacity: 1.9,
    margin: 7,
    alignItems: 'flex-start',
    // justifyContent: 'center',
    borderRadius: 7
  },
  eachRequestsData1: {
    padding: 2,
    paddingLeft: 15,
    fontWeight: 'bold',
    fontSize: 17
  },
  eachRequestsData2: {
    fontSize: 15,
    padding: 2,
    paddingLeft: 15,
  },
  eachRequestsData3: {
    padding: 2,
    paddingLeft: 15,
  }
})