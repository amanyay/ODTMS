/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function search() {

    const [textInput1, setTextInput1] = useState("")
    const [textInput2, setTextInput2] = useState("")
    const [bmi, setBmi] = useState<number | null>(null);
    const [category, setCategory] = useState("");

    function Calculate() {

        const height = parseFloat(textInput1)
        const weight = parseFloat(textInput2)

        if (textInput1 !== "" || textInput2 !== "") {
            const BMI = (weight / (height * height)).toFixed(2);
            const roundedBmi = parseFloat(BMI)
            setBmi(roundedBmi);

            if (roundedBmi <= 18.5) setCategory("You're Underweight");
            else if (roundedBmi <= 25) setCategory("You're Normal");
            else if (roundedBmi >= 25) setCategory("You're Overweight");
        } else {
            setCategory('Please fill all field')
        }




    }









    return (
        <ImageBackground style={style.box}
            source={require('../../Desgin Templete and Docmentation/background 3.jpg')}
        >
            <View style={style.boxs}>
                <View style={style.box1}>
                    <Text>{'\n'}BMI (Body Mass Index) is a number calculated from your height and weight to
                        check whether your body weight is healthy.Knowing BMI is Useful,
                        Shows if your weight is healthy
                        Helps prevent diseases
                        Helps plan diet & exercise. </Text>
                    <Text> {'<'} 18.5 Underweight</Text>
                    <Text> 18.5 - 24.9 Normal</Text>
                    <Text> 25 - 29.9  Overweight {'\n'}</Text>
                </View>
                <View>
                    <Text style={style.inputText}>Height</Text>
                    <TextInput style={style.input} placeholder='Height / m' onChangeText={setTextInput1} keyboardType='number-pad' />
                    <Text style={style.inputText}>Weight</Text>
                    <TextInput style={style.input} placeholder='Weight / kg' onChangeText={setTextInput2} keyboardType='number-pad' />
                    <TouchableOpacity style={style.btn} onPress={() => { Calculate() }}>
                        <Text style={style.btnText}>Calculate</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.displayMessage}>
                    <Text>{bmi} </Text>
                    <Text>{category}</Text>
                </View>
            </View>
        </ImageBackground>
    )
}
const style = StyleSheet.create({
    boxs: {

    },
    box: {
        flex: 1,
        // backgroundColor: 'red'
    },
    box1: {
        width: '90%',
        // backgroundColor:'blue',
        justifyContent: 'space-between',
        marginBottom: '7%',
        marginTop: '5%',
        marginRight: '0%',
        marginLeft: '5%',
        fontWeight: '800',
        borderBottomWidth: 1,
        borderTopWidth: 1
    },
    inputText: {
        marginLeft: 30,
        marginTop: 19,
    },
    input: {
        width: '80%',
        marginBottom: 40,
        marginLeft: 30,
        marginTop: 19,
        backgroundColor: "rgba(42, 146, 201, 0.3)",
        color: 'white',
        height: 50
    },
    btn: {
        width: '100%',
        // backgroundColor:'blue',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        backgroundColor: '#2a9df4',
        width: '50%',
        height: 50,
        textAlign: 'center',
        paddingTop: '4%',
        fontWeight: 'bold'
    },
    displayMessage: {
        width: '92%',
        // backgroundColor:'red',
        margin: 15,
        height: 80,
        alignItems: 'center'
    }
})