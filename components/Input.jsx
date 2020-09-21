import React from 'react';
import {TextInput,StyleSheet} from 'react-native';

const Input = props =>{
    return <TextInput keyboardType="number-pad" {...props} style={{...styles.input,...props.myStyle}} on/>
}

const styles =StyleSheet.create({
    input:{
        height:50,
        borderBottomColor:'grey',
        borderBottomWidth:5,
        marginVertical:10
    }
})

export default Input;