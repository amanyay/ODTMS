/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


export default function organs() {

  const [organ, setOrgans] = useState<any>([]);
  const [newOrgan, setNewOrgans] = useState("");
  const [error, setError] = useState('')
  const [errornewOrgan, setnewOrganError] = useState('')
  const [expanded, setExpanded] = useState(false);
  const organRegex = /[A-Za-z]{2,}/



  async function getOrgansdata() {
    try {

      const token = await AsyncStorage.getItem("token");
      const request = await axios.post(`${baseUrl}/kidneyOrganAdmin`, { token });
      setOrgans(request.data.message);

    } catch (error: any) {

      setError(error.response.data.err)

    }




  }
  async function addNewOrgan() {
    try {

      if (newOrgan === "") {
        setnewOrganError("Please fill the input")
      }
      else if (!organRegex.test(newOrgan)) {
        setnewOrganError("Please insert only letters")
      }
      else if (organRegex.test(newOrgan)) {
        const token = await AsyncStorage.getItem("token");
        const request = await axios.post(`${baseUrl}/adminAddOrgan`, { token, newOrgan });
        if (request.status === 200) {
          setnewOrganError(request.data.message);
        }

      }


    } catch (error: any) {

      setnewOrganError(error.response.data.err)

    }
  }

  const toggleExpand = () => {
    // Animate the transition for smooth expand/collapse
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };



  useEffect(() => {
    getOrgansdata();
  }, [])




  return (
    <ImageBackground style={style.box}
      source={require('../../Desgin Templete and Docmentation/background 1.jpg')}
    >

      <View style={style.box2}>
        <TouchableOpacity style={style.box2Btn} onPress={toggleExpand}>
          <Text style={style.box2BtnText}>ADD</Text>
        </TouchableOpacity>
        <Text>{error}</Text>
        <TouchableOpacity style={style.box2BtnRefresh} onPress={getOrgansdata}>
          <Text><AntDesign name="reload" size={30} color="white" /></Text>
        </TouchableOpacity>
      </View>
      <View style={style.container}>

        {/* - {expanded && (...)}
        This is a conditional rendering expression.
        - If expanded is true, the code inside the parentheses will render.
        - If expanded is false, nothing will render.
        This is a common React pattern for showing/hiding UI sections. */}

        {expanded && (
          <ScrollView style={style.scrollView}>
            <View>
              <Text style={style.titles}>Enter organ name to add </Text>
              <View style={style.boxs}>
                <TextInput placeholder='  Enter organ name' placeholderTextColor={'white'} style={style.box2Input} onChangeText={setNewOrgans} />
                <TouchableOpacity style={style.btn} onPress={addNewOrgan}>
                  <Text>Add Organ</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ color: 'red', textAlign: 'center', width: '100%' }}>{errornewOrgan}</Text>
            </View>

          </ScrollView>


        )}
      </View>


     
      <FlatList
        data={organ}
        keyExtractor={(item) => item.organ_id.toString()}
        renderItem={({ item }) => (
          <View style={style.organBox}>

            <View style={style.organBox1}>

              <View style={style.boxHeaderIcon}>
                <FontAwesome5 name="briefcase-medical" size={24} color="black" />
              </View>
              <View style={style.boxHeaderText}>
                <Text style={style.boxHeaderText1}>Information about eye donors</Text>
                {/* {checkRequest ? (<Text style={style.boxHeaderText2}>Request not Sent</Text>) : (<Text style={style.boxHeaderText2}>Request sent</Text>)} */}
              </View>

            </View>
            <ScrollView style={{ flex: 1 }}>
              <View style={style.organBoxText}>
                <Text style={style.organBoxText1}>Organ ID  </Text><Text style={style.datas}>{item.organ_id}</Text>
                <Text style={style.organBoxText1}>Organ Name   </Text><Text style={style.datas}>{item.organ_name}</Text>
                <Text style={style.organBoxText1}>Organ Amount </Text><Text style={style.datas}>{item.amount}</Text>
              </View>
            </ScrollView>
            <View style={style.updateAndRemoveBtn}>
              <TouchableOpacity style={style.requestBtnBox}>
                {/* <Text style={style.requestBtnText}>Send Request <FontAwesome name="send" size={20} color="black" /></Text> */}
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
  scrollView: {
    paddingBottom: 80,
    height: 150,
    borderWidth: 2,
    padding: 10,
    flexDirection: 'row',
    borderColor: 'white'
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
    fontSize: 10,
    width: 180,
    backgroundColor: "rgba(42, 146, 201, 0.2)",
    margin: '5%',
    borderRadius: 5
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  boxAddorgan: {
    width: 200,
    height: 100,
    backgroundColor: '#ffa07a',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  box3: {
    // backgroundColor:'red',
    flex: 1
  },
  boxHeaderIcon: {
    // backgroundColor: 'red',
    width: '18%',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },
  boxHeaderText: {
    // backgroundColor: 'blue',
    width: '100%'
  },
  boxHeaderText1: {
    // backgroundColor:'red',
    fontSize: 16,
    padding: '1%',
    fontWeight: 'bold',
    marginTop: '4%',
    marginLeft: '3%',
  },
  boxHeaderText2: {
    // backgroundColor: 'blue',
    marginLeft: '5%',
    marginTop: '1%',
    backgroundColor: 'red',
    width: '35%',
    textAlign: 'center',
    borderRadius: 10
  },
  organBox: {
    backgroundColor: 'rgba(36, 36, 36 , 0.9)',
    height: 250,
    margin: '3%',
    marginTop: '2%',
    borderRadius: 8,
    alignContent: 'center',
    overflow:'hidden'
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
  updateBtnBox: {
    backgroundColor: "rgba(42, 146, 201, 0.7)",
    margin: '7%',
    width: '30%',
    alignItems: 'center',
    padding: '2%'
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

organBox1: {
    backgroundColor: '#b9ccec',
    height: 75,
    flexDirection: 'row'
  },
  organBoxText: {
    backgroundColor: '#bebaae',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 0,
    height:120
  },
  organBoxText1: {
    // backgroundColor: 'red',
    color: '#77746d',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: '7%',
    marginTop: '5%',
    width: '33%',

  },
  // organBoxText3: {
  //   color: 'red',
  //   fontWeight: 'bold',
  //   fontSize: 22,
  //   marginLeft: '5%',
  //   marginTop: '5%',
  // },
  // organBoxText4: {
  //   color: 'red',
  //   fontWeight: 'bold',
  //   fontSize: 22,
  //   marginLeft: '5%',
  //   marginTop: '5%',
  // },
  datas: {
    // backgroundColor: 'yellow',
    color: '#302e2c',
    fontSize: 15,
    fontWeight: 'bold',
    width: '50%',
    alignSelf: 'flex-end'

  },
  updateAndRemoveBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#bebaae',
    borderWidth: 0,
    marginTop: '0%'
  },
  // updateBtnBox: {
  //   backgroundColor: "rgba(42, 146, 201, 0.7)",
  //   margin: '7%',
  //   width: '30%',
  //   alignItems: 'center',
  //   padding: '2%'
  // },
  updateBtnText: {
    fontFamily: 'arial',
    fontWeight: 'bold',
    fontSize: 17
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