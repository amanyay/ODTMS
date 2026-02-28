/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import { Picker } from '@react-native-picker/picker';

import axios from 'axios';
import { router } from 'expo-router';
import { useState } from "react";
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';



const login = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [gender, setGender] = useState('');
  const optionsLocation = ['Addis Ababa', 'Tigray', 'Oromia'];
  const optionsGender = ['male', 'female'];
  const optionsBlood = ['A+', 'A-', 'AB+', 'AB-', 'B', 'B+', 'O+', 'O-',]




  // function toSignInPage() {
  //     router.replace("/login");
  // }

  const submit = async () => {

    const phoneNumberRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /[0-9A-Za-z]{2,}/

    try {

      if (firstName === "" || phoneNumber === "" || email === "" || password === "") {

        setError("Please fill all field !!!");

      }
      else if (!phoneNumberRegex.test(phoneNumber)) {
        setError("Invalid phone number");
      }
      else if (!emailRegex.test(email)) {
        setError("Invalid email");
      }
      else if (!passwordRegex.test(password)) {
        setError("Invalid password");
      }
      else if (phoneNumberRegex.test(phoneNumber) || emailRegex.test(email) || passwordRegex.test(password)) {


        const response = await axios.post(`${baseUrl}/adminAddNewAdmin`, { firstName, lastName, age, phoneNumber, email, password, location, gender, bloodType });

        if (response.status === 200) {
          setError(response.data.message);
          router.push('/homePageContents/successful')
        }
        else if (response.status === 500) {
          setError(response.data.message)
        }




      }
    } catch (error: any) {

      setError(error.response.data.err)

    }




  }



  return (
    <ImageBackground
      source={require('../../Desgin Templete and Docmentation/background 1.jpg')}
      style={styles.box}
      resizeMode="cover"
    >
      <View style={styles.box1}>
        <Text style={styles.title}>Add New Admin</Text>
      </View>
      <ScrollView style={styles.box2}>
        <TextInput placeholder='   Enter first name' placeholderTextColor={'white'} style={styles.input} onChangeText={setFirstName} />
        <TextInput placeholder='   Enter last name' placeholderTextColor={'white'} style={styles.input} onChangeText={setLastName} />
        <TextInput placeholder='Age' style={styles.input} placeholderTextColor={'white'} keyboardType='number-pad' onChangeText={setAge} />
        <TextInput placeholder='   Enter email address' placeholderTextColor={'white'} style={styles.input} onChangeText={setEmail} />
        <TextInput placeholder='   Enter password ' placeholderTextColor={'white'} style={styles.input} onChangeText={setPassword} />
        <TextInput placeholder='   Enter phone number' placeholderTextColor={'white'} style={styles.input} keyboardType='numeric' onChangeText={setPhoneNumber} />
        <Picker
          selectedValue={location}
          onValueChange={(itemValue) => setLocation(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Location" value="" />
          {optionsLocation.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>

        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Gender" value="" />
          {optionsGender.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>

        <Picker
          selectedValue={bloodType}
          onValueChange={(itemValue) => setBloodType(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Blood Type" value="" />
          {optionsBlood.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity style={styles.btn} onPress={submit}><Text style={styles.btnText}>Add new admin</Text></TouchableOpacity>
      </ScrollView>
    </ImageBackground>

  )

}

export default login

const styles = StyleSheet.create({

  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  box1: {
    width: '100%',
    height: '8%',
    marginBottom: "2%",
    alignItems: 'center',
    // backgroundColor:'red' 
  },
  box2: {
    width: '100%',
    flex: 1,
    // backgroundColor: 'blue',
    paddingBottom: 150
  },
  title: {
    height: 90,
    fontSize: 30,
    fontWeight: '500',
    marginBottom: '3%',
    marginTop: '7%',
    color: 'red',
    letterSpacing: 1,
    marginLeft: "0%",

  },
  commonText: {
    color: 'blue',
    fontSize: 18
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 3,
    marginTop: '10%',
    marginLeft: '10%',
    width: "80%",
    textAlign: 'left',
    height: 50,
    color: 'white',
    fontSize: 13,
    letterSpacing: 0.5
  },
  picker: {
    height: 50,
    width: '70%',
    marginLeft: '18%',
    marginRight: '5%'
  },
  errorMessage: {
    color: 'red',
    marginTop: '5%',
    alignSelf: 'center',
    fontSize: 15,
    letterSpacing: 1
  },
  btn: {
    backgroundColor: "#231650",
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 8,
    marginTop: '5%',
    marginBottom: '5%',
    marginRight: '10%'
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17
  },
  signUpBox: {
    marginLeft: '11%',
    color: 'black',
    alignSelf: 'center'
  }
})