/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function changeProfile() {

  const optionsLocation = ['Addis Ababa', 'Tigray', 'Oromia'];
  const optionsGender = ['male', 'female'];
  const optionsBlood = ['A+', 'A-', 'AB+', 'AB-', 'B', 'B+', 'O+', 'O-',]
  // const optionsrole = ['recipents', 'donor']
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [gender, setGender] = useState('');
  // const [role, setRole] = useState('');
  const [error, setError] = useState('')





  async function updateProfile() {



    try {
      if (firstName === "" || lastName === "" || age === "" || location === "" || gender === "" || email === "" || bloodType === "") {
        setError('Please fill all field !!!');
      }

      else {
        if (firstName !== "" || lastName !== "" || age !== "" || location !== "" || gender !== "" || email !== "" || bloodType !== "") {

          const token = await AsyncStorage.getItem("token");
          const request = await axios.post(`${baseUrl}/updateProfile`, { token, firstName, lastName, email, age, location, gender, bloodType })
          if (request.status === 200) {
            router.replace('/homePageContents/successful')
          } else {
            setError(request.data.message)
          }
        }

      }
    } catch (error: any) {

      setError(error.response.data.err)

    }






  }

  return (
    <ImageBackground
      source={require('../../Desgin Templete and Docmentation/background 3.jpg')}
      style={{ flex: 1 }} >
      <View style={style.header}><Text>CHANGE PROFILE</Text></View>
      <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
      <ScrollView style={{ flex: 1, paddingBottom: 80 }}>
        <View style={style.box3}>
          <Text style={style.box3Text}>First Name</Text>
          <TextInput style={style.input} onChangeText={setFirstName} />

          <Text style={style.box3Text}>Last Name</Text>
          <TextInput style={style.input} onChangeText={setLastName} />

          <Text style={style.box3Text}>Email Address</Text>
          <TextInput style={style.input} onChangeText={setEmail} />

          <Text style={style.box3Text}>Age</Text>
          <TextInput style={style.input} onChangeText={setAge} />

          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={[style.box3Text, { width: '80%' }]}
          >
            <Picker.Item label="Gender" value="" />
            {optionsGender.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
          <Picker
            selectedValue={bloodType}
            onValueChange={(itemValue) => setBloodType(itemValue)}
            style={[style.box3Text, { width: '80%' }]}
          >
            <Picker.Item label="Blood Type" value="" />
            {optionsBlood.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>

          <Picker
            selectedValue={location}
            onValueChange={(itemValue) => setLocation(itemValue)}
            style={[style.box3Text, { width: '80%' }]}
          >
            <Picker.Item label="Location" value="" />
            {optionsLocation.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>






          <View style={style.profileBtns}>
            <TouchableOpacity style={style.saveBtnBox} onPress={updateProfile}>
              <Text style={style.saveBtn}>Update Profile</Text>
            </TouchableOpacity>


          </View>
        </View>
      </ScrollView>

    </ImageBackground >


  )
}

const style = StyleSheet.create({
  box: {
    flex: 1,
    // backgroundColor: 'red'
  },
  header: {
    // backgroundColor:'red',
    marginTop: '13%',
    height: '5%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  box1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // backgroundColor:'red',
    height: '15%',
    alignItems: 'flex-end',
    paddingLeft: '5%'
  },
  title: {
    marginLeft: '24%',
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold'
  },
  profileImageBox: {
    // backgroundColor:'blue',
    width: '100%',
    height: '30%',
    marginTop: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2%'
  },
  profileImage: {
    width: 150,
    height: 150,
    backgroundColor: 'yellow',
    borderRadius: 90
  },
  changeProfile: {
    // backgroundColor:'blue',
    marginTop: '3%',
  },
  changeProfileText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    // backgroundColor: 'blue',
  },
  toAdminPanel: {
    // backgroundColor: 'red',
    alignItems: 'center',
    padding: '3%'
  },

  toAdminPanelText: {
    backgroundColor: 'red',
    color: 'black',
    padding: 7,
    fontFamily: 'arial',
    fontWeight: 'bold',
    fontSize: 15
  },
  box3: {
    // backgroundColor:'blue'
  },
  box3Text: {
    marginLeft: '6%',
    fontSize: 20,
    marginBottom: '2%',
    marginTop: '3%'
  },
  input: {
    height: 50,
    width: '90%',
    backgroundColor: "rgba(42, 146, 201, 0.3)",
    opacity: 1,
    marginTop: '2%',
    marginLeft: '5%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 2,
    fontWeight: 'bold',
    fontSize: 17
  },
  commonInput: {
    backgroundColor: "rgba(42, 146, 201, 0.2)",
    color: 'white'
  },
  eachDataTexts: {
    fontSize: 20,
    color: '#51515f',
    marginLeft: '2%'
    // font
  },
  profileBtns: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: '3%'
  },
  saveBtnBox: {
    // backgroundColor:'gray',
    marginTop: '5%',
    alignItems: 'center',
  },
  saveBtn: {
    backgroundColor: 'blue',
    color: 'white',
    padding: '3%'
  }

})