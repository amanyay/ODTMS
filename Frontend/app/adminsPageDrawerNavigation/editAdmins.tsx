/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import { Picker } from '@react-native-picker/picker';

import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import { FlatList, ImageBackground, LayoutAnimation, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';



const login = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [adminsData, setAdminsData] = useState<any>([]);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState('');
  const [expanded, setExpanded] = useState(true);
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

  async function getAdminsData() {

    const response = await axios.get(`${baseUrl}/getAdminsData`);
    if (response.status === 200) {
      setAdminsData(response.data.message);
    }


  }

  const toggleExpand = () => {
    // Animate the transition for smooth expand/collapse
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };


  useEffect(() => { getAdminsData() }, [])

  return (
    <ImageBackground
      source={require('../../Desgin Templete and Docmentation/background 1.jpg')}
      style={styles.box}
      resizeMode="cover"
    >
      <TouchableOpacity style={styles.box2Btn} onPress={toggleExpand}>
        <Text style={styles.box2BtnText}>Add new admin</Text>
      </TouchableOpacity>
      {expanded ?
        (<FlatList
          data={adminsData}
          keyExtractor={(item) => item.admin_id.toString()}
          //organ is an object inside array
          //item represent one object at a time from the array tha recive from database 
          renderItem={({ item }) => (

            <View style={styles.organBox}>
              <ScrollView >
                <View style={styles.organBox1}>
                  <Text style={styles.organBoxText1}>Admin First Name  </Text><Text style={styles.datas}>{item.first_name}</Text>
                  <Text style={styles.organBoxText1}>Admin Last Name   </Text><Text style={styles.datas}>{item.last_name}</Text>
                  <Text style={styles.organBoxText1}>Admin age  </Text><Text style={styles.datas}>{item.age}</Text>
                  <Text style={styles.organBoxText1}>Phone Number  </Text><Text style={styles.datas}>{item.phone_number}</Text>
                  <Text style={styles.organBoxText1}>Gender  </Text><Text style={styles.datas}>{item.gender}</Text>
                  <Text style={styles.organBoxText1}>Blood Type  </Text><Text style={styles.datas}>{item.blood_type}</Text>
                </View>
              </ScrollView>
              <View style={styles.updateAndRemoveBtn}>
                <TouchableOpacity style={styles.requestBtnBox}>
                  {/* <Text style={styles.requestBtnText}>Send Request</Text> */}
                </TouchableOpacity>
              </View>
            </View>

          )} />) : (<ScrollView style={styles.box2}>
            <View style={styles.box1}>
              <Text style={styles.title}>Add New Admin</Text>
            </View>

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
            <TouchableOpacity style={styles.addNewAdminbtn} onPress={submit}><Text style={styles.btnText}>Add new admin</Text></TouchableOpacity>
          </ScrollView>)}



    </ImageBackground>

  )

}

export default login

const styles = StyleSheet.create({

  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
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
  box2Btn: {
    marginRight: '5%',
    backgroundColor: "rgba(42, 146, 201, 0.7)",
    width: '45%',
    height: 45,
    marginLeft: '5%',
    marginTop: '4%',
    justifyContent: 'center'
  },
  box2BtnText: {
    // backgroundColor:'red',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
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
  addNewAdminbtn: {
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
  },
  organBox1: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: 'gray',


  },
  organBox: {
    backgroundColor: 'rgba(36, 36, 36 , 0.9)',
    height: 300,
    margin: '0%',
    marginTop: '7%',
    borderRadius: 8,
    alignContent: 'center',
    width: 340
  },
  organBoxText1: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: '5%',
    marginTop: '5%',
    width: '50%',
    // backgroundColor: 'red'
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
    fontWeight: '100',
    fontSize: 18,
    marginLeft: '5%',
    marginTop: '5%',
    width: '30%',
  },
  updateAndRemoveBtn: {
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
    width: '70%',
    alignItems: 'center',
    padding: '2%'
  },
  removeBtnText: {
    fontFamily: 'arial',
    fontWeight: 'bold',
    fontSize: 17
  },
  container: {
    padding: 20
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  },
  // box: {
  //   overflow: 'hidden',
  //   borderRadius: 5,
  //   padding: 10,
  // },
  titles: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white'
  },
  collapsed: {
    height: 0
  },
  expanded: {
    minHeight: 60
  },
  text: {
    color: '#333'
  },
  boxs: {
    flexDirection: 'row',
    margin: '3%',
    marginLeft: '3%',
    marginTop: '3%',
  },
  numbers: {
    color: 'white',
    fontWeight: 'bold'
  },
  texts: {
    marginLeft: "2%",
    color: 'white'
  },
  btn: {
    backgroundColor: "#231650",
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 8,
    marginTop: '5%',
    marginBottom: '5%',
    marginRight: '10%'
  },
  requestBtnBox: {
    // backgroundColor: "red",
    marginRight: '7%',
    marginBottom: '2%',
    marginLeft: '7%',
    marginTop: '4%',
    width: '50%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  requestBtnText: {
    fontFamily: 'arial',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 1,
  }
})