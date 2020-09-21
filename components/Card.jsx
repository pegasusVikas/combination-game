import React from 'react';
import {View,StyleSheet} from 'react-native';

export default function Card(props){
    return(
        <View style={{...styles.card,...props.myStyle}}>
        {props.children}
        </View>
    );
}

const styles =StyleSheet.create({
    card:{
        backgroundColor:'white',
        padding:10,
        elevation:6,
        borderRadius:20,
        alignItems:"center",
    }
})