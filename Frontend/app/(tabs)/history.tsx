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

    try {
      const token = await AsyncStorage.getItem('token');
      const request = await axios.post(`${baseUrl}/history`, { token });


      if (request.data.message.length > 0) {
        setRequests(request.data.message)
        setTextType(request.data.text)
      }
      else if (request.data.message.length < 1) {
        setError('No request found')
      }

    } catch (error: any) {

      setError(error.response.data.err)

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
            <View style={style.eachRequestsBox1}>
              <Text style={[style.eachRequestsData3,{fontWeight:'bold'}]}>{new Date(item.date).toLocaleTimeString()}</Text>
              <Text style={[style.eachRequestsData3,{}]}>{new Date(item.date).toLocaleDateString()}</Text>
            </View>
            <View style={style.eachRequestsBox2}>
              <Text style={style.eachRequestsData1}>{item.first_name}</Text>
              <Text style={style.eachRequestsData2}>Track Id : {item.id}</Text>
              <Text style={style.eachRequestsData2}>{textType}  → {item.organ_name}</Text>

              <View style={style.eachRequestsData4}>
                {item.status === "Pending" ? (<Text style={style.pendingMessage}>Pending</Text>) : (<Text style={[style.pendingMessage, {backgroundColor:'red'}]}><Entypo name="dot-single" size={28} color="green" />{item.status}</Text>)}
              </View>
            </View>

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
    height: 120,
    width: '70%',
    backgroundColor: 'white',
    opacity: 1.9,
    margin: 10,
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderRadius: 10
  },
  eachRequestsBox1: {
    backgroundColor: '#4259c1',
    width: '38%',
    height: 120,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    justifyContent: 'center'
  },
  eachRequestsBox2: {
    backgroundColor: '#faebd7',
    width: '100%',
    height: '100%',
    borderRadius: 10
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
  },
  eachRequestsData4: {
    // backgroundColor: 'blue',
    width: '45%',
    height: '20%',
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginTop: '5%',
    textAlign: 'center',
    alignItems: 'center'
  },
  pendingMessage: {
    backgroundColor: 'green',
    height: '100%',
    width: "80%",
    textAlign: 'center',
    borderRadius: 18,
    fontSize: 15
  }
})