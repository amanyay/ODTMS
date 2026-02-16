import React from 'react'
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function search() {
    return (
        <ImageBackground style={style.box}
            source={require('../../Desgin Templete and Docmentation/background 3.jpg')}
        >
            <View style={style.box2}>
                <TextInput placeholder='  Search' style={style.box2Input} placeholderTextColor={'white'} />
                <TouchableOpacity style={style.box2Btn}>
                    <Text style={style.box2BtnText}>Search</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
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
        marginTop: '18%',
        marginRight: '2%',
        marginLeft: '2%'
    },
    box2Btn: {
        marginRight: '7%',
        backgroundColor: "rgba(42, 146, 201, 0.7)",
        width: '25%',
        marginLeft: '5%',
        justifyContent: 'center',
        borderRadius: 5,
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
        width: '55%',
        backgroundColor: "rgba(42, 146, 201, 0.2)",
        marginRight: '5%',
        marginLeft: '3%',
        borderRadius: 5
    },
})