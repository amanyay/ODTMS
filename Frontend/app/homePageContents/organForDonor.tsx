/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function organs() {

    const [organs, setOrgans] = useState<any>([]);
    const [notFound, setNotFound] = useState('');

    async function getOrganForDon() {


        try {
            const token = await AsyncStorage.getItem('token');
            const donAge = await AsyncStorage.getItem('donAge');
            const donBloodType = await AsyncStorage.getItem('donBloodType');
            const request = await axios.post(`${baseUrl}/donOrgans`, { token, donAge, donBloodType });

            if (request.data.message === '404') {
                setNotFound('No match found');
            }
            else if (request.data.message !== '404') {
                setOrgans(request.data.message);
            }
        } catch (error: any) {
            setNotFound(error.response.data.err)

        }


    }

    // async function sendRequest(item: any) {

    //     const token = await AsyncStorage.getItem('token');
    //     const request = await axios.post(`${baseUrl}/donRequest`, { token, recPhoneNumber: item.phone_number, organId: item.organ_id });

    //     if (request.data.status === 'ok') {
    //         router.replace('/homePageContents/successful');
    //     }

    // }



    useEffect(() => {
        getOrganForDon();
    }, [])

    return (
        <ImageBackground style={style.box}
            source={require('../../Desgin Templete and Docmentation/background 3.jpg')}
        >

            <View style={style.box2}>
                <TouchableOpacity style={{ width: '65%', marginRight: '5%', backgroundColor: "rgba(42, 146, 201, 0.7)", marginLeft: '5%', justifyContent: 'center', padding: '3%' }}
                    onPress={() => {
                        router.push('/homePageContents/donarForm')
                    }}
                >
                    <Text style={style.box2BtnText}>Update My Record</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.box2Btn} onPress={getOrganForDon}>
                    <Text style={style.box2BtnText}><AntDesign name="reload" size={30} color="black" /></Text>
                </TouchableOpacity>
            </View>

            <View style={{ height: 30 }}>
                <Text style={{ textAlign: 'center', fontSize: 21, color: 'blue' }}>{notFound}</Text>
            </View>



            <View style={style.organBox}>
                <Text style={style.organBoxText1}>First Name - <Text style={style.datas}>{organs.first_name}</Text></Text>
                <Text style={style.organBoxText2}>Age  -  <Text style={style.datas}>{organs.age}</Text></Text>
                <Text style={style.organBoxText4}>Donate Organ -  <Text style={style.datas}>{organs.organ_name}</Text></Text>
                <Text style={style.organBoxText3}>Location - <Text style={style.datas}>{organs.location}</Text></Text>
                <Text style={style.organBoxText4}>Phone Number -  <Text style={style.datas}>{organs.phone_numbers}</Text></Text>
                <Text style={style.organBoxText4}>Gender -  <Text style={style.datas}>{organs.gender}</Text></Text>
                <Text style={style.organBoxText4}>Blood Type -  <Text style={style.datas}>{organs.blood_type}</Text></Text>
                <View style={style.updateAndRemoveBtn}>
                    {/* <TouchableOpacity style={style.requestBtnBox} >
                                <Text style={style.requestBtnText}> Update Record </Text>
                            </TouchableOpacity> */}
                </View>
            </View>



            {/* <FlatList
                data={organs}
                keyExtractor={(item) => item.phone_number.toString()}
                renderItem={({ item }) => (
                    <View style={style.organBox}>
                        <Text style={style.organBoxText1}>Recipent Name - <Text style={style.datas}>{item.first_name}</Text></Text>
                        <Text style={style.organBoxText2}>Recipent age  -  <Text style={style.datas}>{item.age}</Text></Text>
                        <Text style={style.organBoxText4}>Recive Organ -  <Text style={style.datas}>{item.organ_name}</Text></Text>
                        <Text style={style.organBoxText3}>Location - <Text style={style.datas}>{item.location}</Text></Text>
                        <Text style={style.organBoxText4}>Phone Number -  <Text style={style.datas}>{item.phone_number}</Text></Text>
                        <Text style={style.organBoxText4}>Gender -  <Text style={style.datas}>{item.gender}</Text></Text>
                        <Text style={style.organBoxText4}>Blood Type -  <Text style={style.datas}>{item.blood_type}</Text></Text>
                        <Text style={style.organBoxText4}>Status -  <Text style={style.datas}>{item.status}</Text></Text>
                        <View style={style.updateAndRemoveBtn}>
                            <TouchableOpacity style={style.requestBtnBox} onPress={() => { sendRequest(item) }}>
                                <Text style={style.requestBtnText}>Send Request</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            /> */}

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
        marginTop: '15%',
        marginRight: '5%'
    },
    box2Btn: {
        marginRight: '7%',
        backgroundColor: "rgba(42, 146, 201, 0.7)",
        width: '20%',
        marginLeft: '2%',
        justifyContent: 'center',
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
    box3: {
        // backgroundColor:'red',
        flex: 1
    },
    organBox: {
        backgroundColor: 'rgba(36, 36, 36 , 0.9)',
        height: 400,
        margin: '3%',
        marginTop: '9%',
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
    requestBtnBox: {
        backgroundColor: "red",
        margin: '7%',
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
    }

})