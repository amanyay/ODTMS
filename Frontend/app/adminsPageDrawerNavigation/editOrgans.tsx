/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function organs() {

  const [organ, setOrgans] = useState<any>([]);
  const [error, setError] = useState('')
  // type Organ = {
  //   id: number;
  //   type: string;
  //   dateAdded: string;
  // };


  async function getOrgansdata() {
    try {

      const token = await AsyncStorage.getItem("token");
      const request = await axios.post(`${baseUrl}/adminOrgansData`, { token });
      setOrgans(request.data.message);

    } catch (error: any) {

      setError(error.response.data.err)

    }




  }

  useEffect(() => {
    getOrgansdata();

  }, [])




  return (
    <ImageBackground style={style.box}
      source={require('../../Desgin Templete and Docmentation/background 3.jpg')}
    >

      <View style={style.box2}>
        <TouchableOpacity style={style.box2Btn} onPress={() => { router.push('/profilePageContents/adminAddOrgans') }}>
          <Text style={style.box2BtnText}>ADD</Text>
        </TouchableOpacity>
        <Text>{error}</Text>
        <TouchableOpacity style={style.box2BtnRefresh} onPress={(getOrgansdata)}>
          <Text><AntDesign name="reload" size={30} color="black" /></Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={organ}
        keyExtractor={(item) => item.organ_id.toString()}
        //organ is an object inside array
        //item represent one object at a time from the array tha recive from database 
        renderItem={({ item }) => (
          <View style={style.organBox}>
            <Text style={style.organBoxText1}>Organ ID - <Text style={style.datas}>{item.organ_id}</Text></Text>
            <Text style={style.organBoxText2}>Organ Type  -  <Text style={style.datas}>{item.organ_name}</Text></Text>
            <Text style={style.organBoxText3}>Date - <Text style={style.datas}>{item.organ_date}</Text></Text>
            <Text style={style.organBoxText4}>Status -  <Text style={style.datas}>{item.status}</Text></Text>
            <View style={style.updateAndRemoveBtn}>
              <TouchableOpacity style={style.updateBtnBox}>
                <Text style={style.updateBtnText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.removeBtnBox}>
                <Text style={style.removeBtnText}>Remove</Text>
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
    marginBottom: '7%',
    marginTop: '7%',
    marginRight: '5%'
  },
  box2Btn: {
    marginRight: '5%',
    backgroundColor: "rgba(42, 146, 201, 0.7)",
    width: '20%',
    marginLeft: '5%',
    justifyContent: 'center',
  },
  box2BtnText: {
    // backgroundColor:'red',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  box2BtnRefresh: {
    marginRight: '5%',
    // backgroundColor: "rgba(42, 146, 201, 0.7)",
    width: '8%',
    marginLeft: '1%',
    justifyContent: 'center',
  },
  box2Input: {
    fontSize: 19,
    width: '50%',
    backgroundColor: "rgba(42, 146, 201, 0.2)",
    marginRight: '5%',
    borderRadius: 5
  },
  box3: {
    // backgroundColor:'red',
    flex: 1
  },
  organBox: {
    backgroundColor: 'rgba(36, 36, 36 , 0.9)',
    height: 300,
    margin: '3%',
    marginTop: '2%',
    borderRadius: 8,
    alignContent: 'center'
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
  removeBtnBox: {
    backgroundColor: "red",
    margin: '7%',
    width: '30%',
    alignItems: 'center',
    padding: '2%'
  },
  removeBtnText: {
    fontFamily: 'arial',
    fontWeight: 'bold',
    fontSize: 17
  }

})