/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
export const options = {
    headerShown: true,
    title: "Home Content",   // optional custom title
};

export default function donarForm() {

    // const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    // const [email, setEmail] = useState("");
    const [age, setAge] = useState('');
    const [location, setLocation] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [gender, setGender] = useState('');
    const [organs, setOrgans] = useState("");
    const [error, setError] = useState('');
    const [file, setFile] = useState<any>(null);
    const optionsLocation = ['Addis Ababa', 'Tigray', 'Oromia'];
    const optionsGender = ['male', 'female'];
    const optionsBlood = ['A+', 'A-', 'AB+', 'AB-', 'B', 'B+', 'O+', 'O-',]

    async function docUpload() {

        const documentImage = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1]
        })
        if (!documentImage.canceled) {
            setFile(documentImage.assets[0])
        } else {
            setFile(null)
        }

    }


    async function submit() {





        try {
            if (age === "" || location === "" || gender === "" || lastName === "") {
                setError('Please fill all field');
            }

            else {
                if (age !== "" || location !== "" || gender !== "" || lastName !== "") {


                    const formData = new FormData();
                    const tokenToBackEnd = await AsyncStorage.getItem("token");
                    if (tokenToBackEnd) {
                        formData.append('token', tokenToBackEnd)
                    }
                    formData.append('lastName', lastName)
                    formData.append('age', age)
                    formData.append('location', location)
                    formData.append('bloodType', bloodType)
                    formData.append('gender', gender)
                    formData.append('organs', organs)

                    formData.append('DocumentImage', {
                        name: file.fileName,
                        uri: file.uri,
                        type: file.mimeType
                    } as any)

                    const request = await axios.post(`${baseUrl}/recForm`, formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    })
                    const status = request.status;


                    if (status === 200) {
                        setError(request.data.message)
                        router.push('/homePageContents/successful')
                    }
                    else if (status !== 200) {
                        setError(request.data.err)
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
            style={style.imageBox}
            resizeMode="cover"
        >
            <ScrollView>
                <View style={style.box1}>
                    <Text style={style.title}>Recipents Form</Text>
                </View>

                <View style={style.secondInput}>
                    <Text style={style.inputIcon}><Fontisto name="email" size={24} color="black" /></Text>
                    <Text style={[style.commonInput, { width: '32%' }]} >Filled</Text>
                    <Text style={style.inputIcon}><AntDesign style={style.icon} name="user" size={30} color="black" /></Text>
                    <TextInput style={[style.commonInput, { width: '32%' }]} placeholderTextColor={'white'} placeholder='Last name' onChangeText={setLastName} />
                </View>
                <View style={style.secondInput}>
                    <Text style={style.inputIcon}><Fontisto name="email" size={24} color="black" /></Text>
                    <Text style={[style.commonInput, { width: '32%' }]} >Filled</Text>
                    <Text style={style.inputIcon}><AntDesign style={style.icon} name="number" size={30} color="black" /></Text>
                    <TextInput style={[style.commonInput, { width: '32%' }]} placeholderTextColor={'white'} placeholder='Age' onChangeText={setAge} />
                </View>
                <View style={style.firstInput}>
                    <Text style={style.inputIcon}><Fontisto style={style.icon} name="area-chart" size={24} color="black" /></Text>
                    <Picker
                        selectedValue={location}
                        onValueChange={(itemValue) => setLocation(itemValue)}
                        style={[style.commonInput, { width: '80%' }]}
                    >
                        <Picker.Item label="Location" value="" />
                        {optionsLocation.map((option, index) => (
                            <Picker.Item key={index} label={option} value={option} />
                        ))}
                    </Picker>
                </View>
                <View style={style.secondInput}>
                    <Text style={style.inputIcon}><Fontisto style={style.icon} name="blood-drop" size={30} color="black" /></Text>
                    <Picker
                        selectedValue={bloodType}
                        onValueChange={(itemValue) => setBloodType(itemValue)}
                        style={[style.commonInput, { width: '36%' }]}
                    >
                        <Picker.Item label="Blood Type" value="" />
                        {optionsBlood.map((option, index) => (
                            <Picker.Item key={index} label={option} value={option} />
                        ))}
                    </Picker>
                    <Text style={style.inputIcon}><AntDesign style={style.icon} name="user" size={30} color="black" /></Text>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue) => setGender(itemValue)}
                        style={[style.commonInput, { width: '30%' }]}
                    >
                        <Picker.Item label="Gender" value="" />
                        {optionsGender.map((option, index) => (
                            <Picker.Item key={index} label={option} value={option} />
                        ))}
                    </Picker>
                </View>
                <View style={style.firstInput}>
                    <Text style={style.inputIcon}><AntDesign style={style.icon} name="user" size={30} color="black" /></Text>
                    <Picker
                        selectedValue={organs}
                        onValueChange={(itemValue) => setOrgans(itemValue)}
                        style={[style.commonInput, { width: '80%' }]}
                    >
                        <Picker.Item label="1.Kidney" value="1" />
                        <Picker.Item label="2.Liver" value="2" />
                        <Picker.Item label="3.Eye" value="3" />
                    </Picker>
                </View>
                <TouchableOpacity style={style.firstInput} onPress={() => {

                }}>
                    <Text style={style.inputIcon}><AntDesign style={style.icon} name="file-add" size={30} color="black" /></Text>
                    <TouchableOpacity style={style.fileUploadBtn}
                        onPress={docUpload}
                    >
                        <Text style={{ color: 'white' }}>UPLOAD</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                <Text style={style.error}>{error}</Text>
                <View style={style.btnBox}>
                    <TouchableOpacity style={style.btn} onPress={submit}>
                        <Text style={style.btnText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>

    )
}

const style = StyleSheet.create({
    box: {
        // backgroundColor: 'red',
        flex: 1,
        justifyContent: 'center'
    },
    imageBox: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'red',
    },
    box1: {
        // backgroundColor: 'blue',
        alignItems: 'center',
        marginTop: '10%'
    },
    title: {
        fontSize: 30,
        fontFamily: 'arial',
        fontWeight: 'bold',
        color: 'black'
    },
    firstInput: {
        flexDirection: 'row',
        marginTop: '8%'
    },
    inputIcon: {
        marginRight: '1%',
        width: '15%',
        textAlign: 'center'
    },
    icon: {
        marginRight: '5%'
    },
    commonInput: {
        backgroundColor: "rgba(42, 146, 201, 0.2)",
        color: 'white'
    },
    fileUploadBtn: {
        width: '70%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(42, 146, 201, 0.2)",
    },
    input: {
        width: '16%',
        backgroundColor: "rgba(42, 146, 201, 0.2)",
        // borderWidth: 1,
        borderColor: 'none',
        borderRadius: 3,
        color: 'white'
    },
    secondInput: {
        flexDirection: 'row',
        marginTop: '8%',
        flexWrap: 'wrap'
    },
    btnBox: {
        margin: '8%',
        marginLeft: '0%',
        marginTop: '3%',
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // backgroundColor:'blue'

    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "rgba(42, 146, 201, 0.7)",
        width: '50%',
        alignItems: 'center',
        borderRadius: '10%'
    },
    btnText: {
        height: 30,
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        // backgroundColor:'blue'
    },
    error: {
        margin: '5%',
        textAlign: 'center',
        color: 'red',
        fontSize: 20
    }

})