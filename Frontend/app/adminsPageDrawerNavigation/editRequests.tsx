/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function editDonors() {



    const [donors, setDonors] = useState<any>([])
    const [error, setError] = useState("")

    async function getRequest() {
        try {
            const token = await AsyncStorage.getItem('token');
            const request = await axios.post(`${baseUrl}/adminRequestData`, { token });
            if (request.status === 200) {
                setDonors(request.data.message)
            }
            else if (request.status === 201) {
                setError(request.data.message)
            }

        } catch (error: any) {

            setError(error.response.data.err)

        }


    }

    async function approve(item: any) {
        try {
            const token = await AsyncStorage.getItem('token');
            const request = await axios.post(`${baseUrl}/adminRequestApp`, { token, requestId: item.id, status: item.status });
            if (request.status === 200) {
                setError(request.data.message)
            }
            else if (request.status === 201) {
                setError(request.data.message)
            }
        } catch (error: any) {

            setError(error.response.data.err)

        }



    }

    useEffect(() => {
        getRequest();
    }, [])




    return (
        <ImageBackground style={style.box}
            source={require('../../Desgin Templete and Docmentation/background 1.jpg')}
        >

            <View style={style.box2}>

                <Text style={style.box2Btn}>{error}</Text>
                <TouchableOpacity style={style.box2BtnRefresh} onPress={(getRequest)}>
                    <Text style={style.box2BtnText}><AntDesign name="reload" size={30} color="white" /></Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={donors}
                keyExtractor={(item) => item.id.toString()}
                //organ is an object inside array
                //item represent one object at a time from the array tha recive from database 
                renderItem={({ item }) => (
                    <View style={style.organBox}>
                        <Text style={style.organBoxText1}>Request Id - <Text style={style.datas}>{item.id}</Text></Text>
                        <Text style={style.organBoxText1}>Recipent Name - <Text style={style.datas}>{item.first_name}</Text></Text>
                        <Text style={style.organBoxText2}>Recipent age  -  <Text style={style.datas}>{item.age}</Text></Text>
                        <Text style={style.organBoxText4}>Requested Organ -  <Text style={style.datas}>{item.organ_name}</Text></Text>
                        <Text style={style.organBoxText4}>Organ code -  <Text style={style.datas}>{item.organ_id}</Text></Text>
                        <Text style={style.organBoxText3}>Location - <Text style={style.datas}>{item.location}</Text></Text>
                        <Text style={style.organBoxText4}>Phone Number -  <Text style={style.datas}>{item.rec_phone_number}</Text></Text>
                        <Text style={style.organBoxText4}>Gender -  <Text style={style.datas}>{item.gender}</Text></Text>
                        <Text style={style.organBoxText4}>Recipent Blood Type -  <Text style={style.datas}>{item.blood_type}</Text></Text>
                        <Text style={style.organBoxText4}>Date -  <Text style={style.datas}>{item.date}</Text></Text>
                        <Text style={style.organBoxText4}>Ask Organs -  <Text style={style.datas}>{item.don_phone_number}</Text></Text>
                        <Text style={style.organBoxText4}>Status -  <Text style={style.datas}>{item.status}</Text></Text>
                        <View style={style.updateAndRemoveBtn}>
                            <TouchableOpacity style={style.removeBtnBox} onPress={() => approve(item)}>
                                <Text style={style.removeBtnText}>Approve</Text>
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
        color: 'red',
        marginLeft: '25%',
        marginTop: '5%'
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
        width: '50%',
        backgroundColor: "rgba(42, 146, 201, 0.2)",
        marginRight: '5%',
        borderRadius: 5
    },
    box2BtnRefresh: {
        marginRight: '5%',
        // backgroundColor: "rgba(42, 146, 201, 0.7)",
        width: '8%',
        marginLeft: '1%',
        justifyContent: 'center',
    },
    box3: {
        // backgroundColor:'red',
        flex: 1
    },
    organBox: {
        backgroundColor: 'rgba(36, 36, 36 , 0.9)',
        height: 670,
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