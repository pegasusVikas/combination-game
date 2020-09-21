import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

import Constants from '../constants/colors'

const ModeContainer =(props)=>{
    return (
        <View style={{...styles.container, ...props.myStyle}}>
            {props.children}
        </View>
    );
};

const styles= StyleSheet.create({
    container:{
        borderWidth:2,
        borderColor:Constants.click,
        borderRadius:10,
        marginVertical:10,
        padding:10,
        justifyContent:"center",
        alignItems:"center"
    }
});

export default ModeContainer;