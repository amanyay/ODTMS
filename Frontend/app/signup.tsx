/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet, Text, TextInput,
    TouchableOpacity, View
} from "react-native";



const signup = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [loading, setIsLoading] = useState(false);
    const options = ['donor', 'recipents'];



    function toSignInPage() {
        router.replace("/login");
    }

    const submit = async () => {

        const phoneNumberRegex = /^[0-9]{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^[A-Za-z0-9?]{4,}$/;
        const IntAge = parseInt(age)
        try {

            if (firstName === "" || lastName === "" || phoneNumber === "" || email === "" || password === "" || selectedValue === "") {

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
            else if (IntAge < 18) {
                setError("Age must be > 18");
            }
            else if (phoneNumberRegex.test(phoneNumber) || emailRegex.test(email) || passwordRegex.test(password)) {

                setIsLoading(true);

                const response = await axios.post(`${baseUrl}/signUp`, { firstName, lastName, phoneNumber, email, password, selectedValue });

                if (response.status === 200) {
                    setIsLoading(false);
                    setError(response.data.message);
                    // router.push('/login')
                }
                else if (response.status === 201) {
                    setError(response.data.message)
                }
                else if (response.status === 500) {
                    setError(response.data.message)
                }




            }
        } catch (error: any) {

            if (error) {
                setError("Network error")
                setIsLoading(false)
            } else if (error.response.data.err) {

                setError(error.response.data.err)
                setIsLoading(false)
            }

        }




    }



    return (
        <ImageBackground
            source={require('../Desgin Templete and Docmentation/background 3.jpg')}
            style={styles.box}
            resizeMode="cover"
        >


            <KeyboardAvoidingView
                style={{ flex: 1, width: '100%', alignItems: 'center' }}
                behavior="padding"
            >

                <ScrollView style={{ flex: 1, width: '90%' }}>
                    <View style={styles.box1}>
                        <Text style={styles.title}>Sign Up</Text>
                    </View>
                    <View style={styles.box2}>
                        <TextInput placeholder='   Enter your first name' placeholderTextColor={'white'} style={styles.input} onChangeText={setFirstName} />
                        <TextInput placeholder='   Enter your last name' placeholderTextColor={'white'} style={styles.input} onChangeText={setLastName} />
                        <TextInput placeholder='   Enter your phone number' placeholderTextColor={'white'} style={styles.input} onChangeText={setPhoneNumber} />
                        <TextInput placeholder='   Enter your age' placeholderTextColor={'white'} style={styles.input} onChangeText={setAge} />
                        <TextInput placeholder='   Enter your email address' placeholderTextColor={'white'} style={styles.input} onChangeText={setEmail} />
                        <TextInput placeholder='   Enter your password' placeholderTextColor={'white'} style={styles.input} onChangeText={setPassword} />
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue) => setSelectedValue(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select an option..." value="" />
                            {options.map((option, index) => (
                                <Picker.Item key={index} label={option} value={option} />
                            ))}
                        </Picker>
                        {loading && (<ActivityIndicator size="large" color="#0000ff" />)}
                        <Text style={styles.errorMessage}>{error}</Text>
                        <TouchableOpacity style={styles.btn} onPress={submit}><Text style={styles.btnText}>Sign Up</Text></TouchableOpacity>
                        <Text style={styles.signUpBox}>Already have an account ? <TouchableOpacity onPress={toSignInPage}><Text style={styles.commonText}>sign in</Text></TouchableOpacity></Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        </ImageBackground>

    )

}

export default signup

const styles = StyleSheet.create({

    box: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    box1: {
        width: '100%',
        height: 70,
        marginBottom: "2%",
        marginTop: '25%',
        justifyContent: 'flex-start',
        // backgroundColor: 'red'
    },
    box2: {
        width: '100%',
        // backgroundColor:'blue',
        marginBottom: '10%'
    },
    title: {
        fontSize: 35,
        fontWeight: '500',
        marginBottom: '3%',
        color: 'black',
        letterSpacing: 1,
        marginLeft: "10%",

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
        marginLeft: '5%',
        width: "90%",
        textAlign: 'left',
        height: 55,
        color: 'white',
        fontSize: 13,
        letterSpacing: 0.5
    },
    picker: {
        height: 80,
        width: '70%',
        marginLeft: '18%',
        marginRight: '5%'
    },
    errorMessage: {
        color: 'red',
        marginTop: '2%',
        alignSelf: 'center',
        fontSize: 15,
        letterSpacing: 1
    },
    btn: {
        backgroundColor: "#231650",
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderRadius: 8,
        marginTop: '5%',
        marginBottom: '5%',
        marginRight: '5%'
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