/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function home() {
    const [userNameDisplay, setUserNameDisplay] = useState('');
    const [bloodType, setBloodType] = useState('')
    const [role, setRole] = useState('');
    const [organs, setOrgans] = useState<any>([]);
    const [hidden, setHidden] = useState(true);
    const [error, setError] = useState("")


    async function getData() {


        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                router.push('/login')
            } else {
                const request = await axios.post(`${baseUrl}/home`, { token });



                setUserNameDisplay(request.data.message.first_name)
                setBloodType(request.data.message.blood_type)
                setRole(request.data.message.role);
                if (request.data.joinMessage.length > 0) {
                    setOrgans(request.data.joinMessage[0].organ_name);
                } else if (request.data.joinMessage.length < 1) {
                    setOrgans('')
                }


            }
        } catch (error: any) {

            setError(error.response.data.err)

        }



    }

    useEffect(() => {
        getData();
    }, []);


    // page to page functions 

    function toNotification() {
        router.push('/homePageContents/notification')
    }

    async function toDonorForm() {

        try {
            const token = await AsyncStorage.getItem('token');
            const request = await axios.post(`${baseUrl}/home`, { token });
            const userRole = request.data.message.role;
            const length = request.data.joinMessage;
            const userBloodType = request.data.message.blood_type;

            // console.log(recAge)

            if (userRole === 'recipents') {

                Alert.alert("You are recipents not allowed")

            }
            else {
                if (userBloodType === null || length.length < 1) {
                    router.push('/homePageContents/donarForm')
                }
                else if (userBloodType !== null) {
                    const donAge = request.data.message.age.toString();
                    const userOrgan = request.data.joinMessage[0].organ_id.toString();
                    AsyncStorage.setItem('donAge', donAge)
                    AsyncStorage.setItem('donBloodType', userBloodType)
                    AsyncStorage.setItem('userOrgan', userOrgan);
                    router.push('/homePageContents/organForDonor')
                }

            }
        } catch (error: any) {

            setError(error.response.data.err)

        }



    }

    async function toRecForm() {

        try {
            const token = await AsyncStorage.getItem('token');
            const request = await axios.post(`${baseUrl}/home`, { token });
            const userBloodType = request.data.message.blood_type;
            const userRole = request.data.message.role;
            const length = request.data.joinMessage;

            if (userRole === 'donor') {

                Alert.alert("You are donor not allowed")

            }
            else {

                if (userBloodType === null || length.length < 1) {
                    router.push('/homePageContents/recipentsForm')
                }
                else if (userBloodType !== null) {
                    const recAge = request.data.message.age.toString();
                    const userOrgan = request.data.joinMessage[0].organ_id.toString();
                    AsyncStorage.setItem('recAge', recAge)
                    AsyncStorage.setItem('recBloodType', userBloodType)
                    AsyncStorage.setItem('userOrgan', userOrgan);
                    router.push('/homePageContents/organs')
                }
            }

        } catch (error: any) {

            setError(error.response.data.err)

        }





    }









    return (
        <View style={styless.box}>
            <ImageBackground
                source={require('../../Desgin Templete and Docmentation/background 3.jpg')}
                style={{ flex: 1 }} >

                <View style={styless.box1}>
                    <TouchableOpacity style={styless.headerProfile}>
                        <Text style={styless.headerText}>Hello , {userNameDisplay} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styless.headerIcons} onPress={toNotification}>
                        <Text><Ionicons name="notifications-outline" size={30} color="black" /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styless.headerIcons} >
                        <Text><MaterialIcons name="qr-code-scanner" size={36} color="black" /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styless.headerIcons} onPress={getData}>
                        <Text><AntDesign name="reload" size={30} color="black" /></Text>
                    </TouchableOpacity>
                </View>

                <View style={styless.box2}>
                    <ImageBackground style={styless.boxImage} imageStyle={styless.boxImage}
                        source={require('../../Desgin Templete and Docmentation/home backgorund 1.jpg')}
                    >
                        <Text style={styless.orderNumber}>{hidden ? ('*****') : (bloodType)}  <TouchableOpacity onPress={() => { setHidden(!hidden) }}>
                            <Feather name="eye" size={20} color="white" />
                        </TouchableOpacity>  </Text>
                        <View style={styless.text}>
                            <Text style={styless.statusText}>Name  :  {hidden ? ('*****') : (userNameDisplay)} </Text>
                            <Text style={styless.statusText}>Role    :  {hidden ? ('*****') : (role)} </Text>
                            <Text style={styless.statusText}>Organ :  {hidden ? ('*****') : (organs)}</Text>
                        </View>


                    </ImageBackground>
                </View>
                <View style={styless.error}>
                    <Text style={styless.errorText}>{error}</Text>
                </View>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 50 }}>
                    <View style={styless.box3}>
                        <Text style={styless.box3Title}>Top services</Text>
                        <View style={styless.items}>
                            <TouchableOpacity style={styless.servicesBtn1} onPress={toDonorForm}>
                                <Text><AntDesign name="form" size={24} color="black" /></Text>
                                <Text style={styless.logoTitiles}>Donate</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styless.servicesBtn1} onPress={toRecForm}>
                                <Text><MaterialIcons name="healing" size={24} color="black" /></Text>
                                <Text style={styless.logoTitiles}>Organs</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={styless.servicesBtn} onPress={() => { router.push('/homePageContents/search') }}>
                                <Text><Feather name="search" size={24} color="black" /></Text>
                                <Text style={styless.logoTitiles}>Search</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity style={styless.servicesBtn1} onPress={() => { router.push('/homePageContents/help') }}>
                                <Text><Feather name="help-circle" size={24} color="black" /></Text>
                                <Text style={styless.logoTitiles}>Help</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styless.servicesBtn1} onPress={() => { router.push('/homePageContents/calculator') }}>
                                <Text><AntDesign name="calculator" size={24} color="black" /></Text>
                                <Text style={styless.logoTitiles}>Calculator</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styless.servicesBtn1}>
                                <Text><Ionicons name="chatbubble-ellipses-outline" size={24} color="black" /></Text>
                                <Text style={styless.logoTitiles}>Chat bot</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styless.servicesBtn1} onPress={() => { router.push('/homePageContents/foods') }}>
                                <Text><MaterialCommunityIcons name="food-fork-drink" size={24} color="black" /></Text>
                                <Text style={styless.logoTitiles}>Foods</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styless.box4}>
                        <Text style={styless.box3Title}>What blood type donate and receive</Text>
                        <TouchableOpacity style={styless.box4Btn}>
                            <Text style={styless.text1}><Text style={{ fontWeight: 'bold' }}>🩸 O− Universal Donor </Text>
                                Can donate to everyone because it has no A, B, or Rh antigens.{'\n'}
                                <Text style={{ fontWeight: 'bold' }}>🩸 AB+ Universal Recipient  </Text>
                                Can receive blood from all blood types because it has all antigens. {'\n'}
                                <Text style={{ fontWeight: 'bold' }}>🩸 Rh Factor (+ / −) </Text>
                                Rh positive can receive from both Rh+ and Rh−. Rh negative can receive only from Rh negative.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styless.box4Btn2}>
                            <Text style={styless.text2}>O+ →Donates to O+,A+,B+,AB+| Receives from O+,O−</Text>
                            <Text style={styless.text2}>A− →Donates to A−,A+,AB−,AB+ | Receives from A−,O−</Text>
                            <Text style={styless.text2}>A+ →Donates to A+,AB+ | Receives from A+, A−,O+,O−</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styless.box4Btn2}>
                            <Text style={styless.text2}>B− →Donates to B−,B+,AB−,AB+ | Receives from B−,O−</Text>
                            <Text style={styless.text2}>B+ →Donates to B+,AB+ | Receives from B+,B−,O+,O−</Text>
                            <Text style={styless.text2}>AB− →Donates to AB−,AB+ | Receives from AB−,B−O−</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>

    )
}

const styless = StyleSheet.create({
    box: {
        flex: 1
    },
    box1: {
        width: '100%',
        height: '15%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        // backgroundColor: 'red'
    },
    headerProfile: {
        marginRight: '13%',
        marginLeft: '4%',
        // backgroundColor: 'blue',
        width: '43%'
    },
    headerIcons: {
        marginRight: '6%',
        // backgroundColor: 'yellow'
    },
    headerText: {
        color: 'black',
        fontSize: 17,
        fontFamily: 'arial',
    },
    box2: {
        width: '97%',
        height: '32%',
        backgroundColor: 'red',
        marginTop: '5%',
        marginLeft: '2%',
        borderRadius: 10
    },
    boxImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    orderNumber: {
        color: '#F3742B',
        letterSpacing: 4,
        margin: '8%',
        marginLeft: '7%',
        fontSize: 25,
        fontFamily: 'monospace',
        fontWeight: 'heavy'
    },
    statusText: {
        color: 'white',
        margin: '0%',
        marginLeft: '-3%',
        marginBottom: '5%',
        fontSize: 15,
        fontFamily: 'monospace',
    },
    text: {
        color: 'white',
        margin: '0%',
        marginLeft: '7%',
        marginBottom: '2%',
        fontSize: 15,
        fontFamily: 'monospace',
        flexDirection: 'column'
    },
    error: {
        // backgroundColor: 'red',
        marginTop: 10,
        marginBottom: '0%',
        alignItems: 'center'
    },
    errorText: {
        color: 'red',
        fontSize: 14
    },
    box3: {
        // backgroundColor: 'yellow',
        marginLeft: '0%',
        marginTop: '0%',
        width: '98%'
    },
    box3Title: {
        fontSize: 20,
        fontFamily: 'arial',
        fontWeight: 'bold',
        margin: '3%',
        marginLeft: '5%',
        letterSpacing: 0.3
    },
    items: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        textAlign: 'center',
        alignItems: 'center',
        marginLeft: '3%',
        // backgroundColor: 'red'
    },
    servicesBtn: {
        height: 90,
        width: '21%',
        backgroundColor: "rgba(42, 146, 201, 0.1)",
        opacity: 1,
        margin: 7,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    servicesBtn1: {
        height: 85,
        width: '29%',
        backgroundColor: "rgba(42, 146, 201, 0.1)",
        opacity: 1,
        margin: 7,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    logoTitiles: {
        marginTop: 8,
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.2,
        color: 'black'
    },
    box4: {
        // backgroundColor: 'red',
        marginLeft: '2%',
        marginTop: '7%',
        width: '97%'
    },
    box4Btn: {
        height: 140,
        // width: '19%',
        backgroundColor: "rgba(42, 146, 201, 0.7)",
        opacity: 1,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    box4Btn2: {
        height: 100,
        // width: '19%',
        backgroundColor: "rgba(42, 146, 201, 0.7)",
        opacity: 1,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    text1: {
        fontSize: 14,
        padding: 10,
        fontFamily: 'arial',
        fontWeight: '500'
    },
    text2: {
        fontSize: 12,
        marginTop: 8,
        fontFamily: 'serif',
        width: '95%',

    }
})