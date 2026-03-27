/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
                <View style={style.organBox1}>

                    <View style={style.boxHeaderIcon}>
                        <FontAwesome5 name="briefcase-medical" size={24} color="black" />
                    </View>
                    <View style={style.boxHeaderText}>
                        <Text style={style.boxHeaderText1}>Information about donate organ</Text>
                        {/* {checkRequest ? (<Text style={style.boxHeaderText2}>Request not Sent</Text>) : (<Text style={style.boxHeaderText2}>Request sent</Text>)} */}
                    </View>

                </View>

                <ScrollView style={{ flex: 1, marginBottom:'5%' }}>
                    <View style={style.organBoxText}>
                        <Text style={style.organBoxText1}>First Name </Text><Text style={style.datas}>{organs.first_name}</Text>
                        <Text style={style.organBoxText1}>Age  </Text><Text style={style.datas}>{organs.age}</Text>
                        <Text style={style.organBoxText1}>Donate Organ </Text><Text style={style.datas}>{organs.organ_name}</Text>
                        <Text style={style.organBoxText1}>Location </Text><Text style={style.datas}>{organs.location}</Text>
                        <Text style={style.organBoxText1}>Phone Number  </Text><Text style={style.datas}>{organs.phone_numbers}</Text>
                        <Text style={style.organBoxText1}>Gender </Text><Text style={style.datas}>{organs.gender}</Text>
                        <Text style={style.organBoxText1}>Blood Type </Text><Text style={style.datas}>{organs.blood_type}</Text>
                        <View style={style.updateAndRemoveBtn}>
                        </View>
                    </View>
                </ScrollView>
            </View>
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
        // backgroundColor: 'blue',
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
    eachReqError: {
        width: '100%',
        // backgroundColor: 'blue',
        height: 20,
        justifyContent: 'flex-start',
        alignContent: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        color: 'red'
    },
    box3: {
        // backgroundColor:'red',
        flex: 1
    },

    organBox: {
        backgroundColor: '#bebaae',
        height: 300,
        margin: '3%',
        marginTop: '2%',
        borderRadius: 8,
        alignContent: 'center',
        overflow: 'hidden'
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
    organBox1: {
        backgroundColor: '#b9ccec',
        height: 75,
        flexDirection: 'row'
    },
    organBoxText: {
        backgroundColor: '#bebaae',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 0
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