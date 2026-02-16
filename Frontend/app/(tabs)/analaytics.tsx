import EvilIcons from '@expo/vector-icons/EvilIcons';
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function analytics() {
    return (
        <View style={style.box}>
            <ImageBackground
                source={require('../../Desgin Templete and Docmentation/background 3.jpg')}
                style={{ flex: 1 }} >
                <View style={style.box1}>
                    <Text style={style.title}>Statistics</Text>
                    <Text style={style.title}><EvilIcons name="user" size={34} color="black" /></Text>
                </View>
                <View style={style.box2}>
                    <View style={style.dataBox}>
                        <Text>asdasd</Text>
                    </View>
                    <View style={style.dataBox}>
                        <Text>asdsasad</Text>
                    </View>
                    <View style={style.dataBox}>
                        <Text>bcvbnvnb</Text>
                    </View>
                    <View style={style.dataBox}>
                        <Text>ertre</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
const style = StyleSheet.create({
    box: {
        flex: 1,
    },
    box1: {
        width: '100%',
        marginLeft: '0%',
        height: '15%',
        // backgroundColor: 'red',
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 23,
        marginLeft: '7%',
        fontFamily: 'arial',
        fontWeight: 'bold',
        marginTop: '7%',
        marginRight: '7%'
    },
    box2: {
        flex: 1,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    dataBox: {
        backgroundColor: 'rgba(255, 244, 244, 0.86)',
        width:'37%',
        margin:'5%',
        marginLeft:'7%',
        marginTop:'15%',
        height:'30%',
        alignItems:'center',
        justifyContent:"center",
        borderRadius:8,
    }
})