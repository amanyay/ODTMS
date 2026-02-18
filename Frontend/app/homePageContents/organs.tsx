/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function organs() {

  const [organs, setOrgans] = useState<any>([]);
  const [notFound, setNotFound] = useState('');
  const [eachReqError, setEachReqError] = useState('')


  async function getOrganForRecs() {


    const token = await AsyncStorage.getItem('token');
    const recAge = await AsyncStorage.getItem('recAge');
    const userOrgan = await AsyncStorage.getItem('userOrgan');
    const recBloodType = await AsyncStorage.getItem('recBloodType');
    const request = await axios.post(`${baseUrl}/recOrgans`, { token, recAge, recBloodType, userOrgan });

    if (request.status === 201) {
      setNotFound('No match found');
    }
    else if (request.status !== 201) {
      setOrgans(request.data.message);
      // console.log(organs)
      // console.log(request.data.message)
    }
  }
  useEffect(() => {
    getOrganForRecs()
  }, [])

  async function sendRequest(item: any) {

    const token = await AsyncStorage.getItem('token');
    const request = await axios.post(`${baseUrl}/recRequests`, { token, donorPhoneNumber: item.phone_numbers, organId: item.organ_id });

    if (request.status === 201) {
      router.replace('/homePageContents/successful');
    }
    else if (request.status === 200) {
      setEachReqError("Request already sent try to send another request !!!")
    } else {
      setNotFound("Server Error please try again")
    }

  }





  return (
    <ImageBackground style={style.box}
      source={require('../../Desgin Templete and Docmentation/background 3.jpg')}
    >

      <View style={style.box2}>
        <TouchableOpacity style={style.updateRecord}
          onPress={() => {
            router.push('/homePageContents/recipentsForm')
          }}
        >
          <Text style={style.box2BtnText}>Update My Record</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.box2Btn} onPress={getOrganForRecs}>
          <Text style={style.box2BtnText}><AntDesign name="reload" size={30} color="black" /></Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 70, marginBottom: 20 }}>
        <Text style={{ textAlign: 'center', fontSize: 21, color: 'blue' }}>{notFound}</Text>
        <Text style={style.eachReqError}>{eachReqError}</Text>
      </View>


      <FlatList
        data={organs}
        keyExtractor={(item) => item.phone_numbers.toString()}
        renderItem={({ item }) => (
          <View style={style.organBox}>
            <Text style={style.organBoxText1}>Donor Name - <Text style={style.datas}>{item.first_name}</Text></Text>
            <Text style={style.organBoxText2}>Donor age  -  <Text style={style.datas}>{item.age}</Text></Text>
            <Text style={style.organBoxText4}>Donate Organ -  <Text style={style.datas}>{item.organ_name}</Text></Text>
            <Text style={style.organBoxText3}>Location - <Text style={style.datas}>{item.location}</Text></Text>
            <Text style={style.organBoxText4}>Phone Number -  <Text style={style.datas}>{item.phone_numbers}</Text></Text>
            <Text style={style.organBoxText4}>Gender -  <Text style={style.datas}>{item.gender}</Text></Text>
            <Text style={style.organBoxText4}>Blood Type -  <Text style={style.datas}>{item.blood_type}</Text></Text>
            <View style={style.updateAndRemoveBtn}>
              <TouchableOpacity style={style.requestBtnBox} onPress={() => sendRequest(item)}>
                <Text style={style.requestBtnText}>Send Request</Text>
              </TouchableOpacity>
            </View>

          </View>
        )}

      />
    </ImageBackground >
  )
}

const style = StyleSheet.create({
  box: {
    flex: 1,
    // backgroundColor: 'red'
  },
  box2: {
    flexDirection: 'row',
    width: '100%',
    // backgroundColor:'blue',
    justifyContent: 'space-between',
    marginBottom: '2%',
    marginTop: '7%',
    marginRight: '5%'
  },
  box2Btn: {
    marginRight: '7%',
    backgroundColor: "rgba(42, 146, 201, 0.7)",
    width: '20%',
    marginLeft: '2%',
    justifyContent: 'center',
    height: 45
  },
  box2BtnText: {
    // backgroundColor:'red',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  box2Input: {
    fontSize: 19,
    width: '65%',
    backgroundColor: "rgba(42, 146, 201, 0.2)",
    marginRight: '5%',
    marginLeft: '3%',
    borderRadius: 5
  },
  updateRecord: {
    width: '65%',
    marginRight: '5%',
    marginBottom: '3%',
    backgroundColor: "rgba(42, 146, 201, 0.7)",
    marginLeft: '5%',
    justifyContent: 'center',
    padding: '3%'
  },
  box3: {
    // backgroundColor:'red',
    flex: 1
  },
  organBox: {
    backgroundColor: 'rgba(36, 36, 36 , 0.9)',
    height: 450,
    margin: '3%',
    marginTop: '2%',
    borderRadius: 8,
    alignContent: 'center',
    overflow: 'hidden'
  },
  organBoxText1: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: '5%',
    marginTop: '5%',
  },
  organBoxText2: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: '5%',
    marginTop: '5%',
  },
  organBoxText3: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: '5%',
    marginTop: '5%',
  },
  organBoxText4: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: '5%',
    marginTop: '5%',
  },
  datas: {
    color: 'white',
    fontWeight: '400'
  },
  updateAndRemoveBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  updateBtnBox: {
    backgroundColor: "rgba(42, 146, 201, 0.7)",
    margin: '7%',
    width: '30%',
    alignItems: 'center',
    padding: '2%'
  },
  updateBtnText: {
    fontFamily: 'arial',
    fontWeight: 'bold',
    fontSize: 17
  },
  requestBtnBox: {
    backgroundColor: "red",
    marginRight: '7%',
    marginBottom: '2%',
    marginLeft: '7%',
    marginTop: '7%',
    width: '40%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  requestBtnText: {
    fontFamily: 'arial',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 1,
  },
  eachReqError: {
    width: '100%',
    // backgroundColor:'blue',
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    color: 'black'
  }

})