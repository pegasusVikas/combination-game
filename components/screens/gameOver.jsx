import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import {FontAwesome5} from "@expo/vector-icons"

import Card from "../Card"
import constants from "../../constants/colors"

const Stars=()=>{
    const push =[]
    const rating ={
        1:50,
        2:25,
        3:15,
        4:7,
        5:1
    }
    var tries=6
    for(var i=1;i<=5;i++){
        var color="grey"
        var bool=false
        if(tries<=rating[i])
        {
            color=constants.primary
            bool=true
        }
        push.push(
            <FontAwesome5
            key={i}
            name={"star"}
            size={20}
            color={color}
            solid={bool}
            />
        )
    }
    return <View style={{flexDirection:"row"}}>{push}</View>
}

export default (props) => {

    return (
        <View style={styles.screen}>
            <Card myStyle={styles.card}>
                <View style={styles.head}>
                <Text style={styles.title}>You Guessed It</Text>
                </View>
                <View style={styles.body}>
                <Stars/>
                </View>        
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    head:{
        flexDirection:"row"
    },
    card:{
        alignItems:"center",
        paddingTop:20
    },
    title:{
        fontFamily:"open-sans-bold",
        fontSize:20
    },
    body:{
        width:250,
        height:250,
        maxWidth:"80%",
        maxHeight:"80%",
        borderTopColor:"grey",
        borderTopWidth:5,
        marginTop:20,
        alignItems:"center",
    }
})