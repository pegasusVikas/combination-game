import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import Constants from 'expo-constants'

export default function Header(props){
    return(
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
}

const styles=StyleSheet.create({
    header:{
        width:"100%",
        backgroundColor:"rgb(255, 193, 23)",
        justifyContent:"center",
        alignItems:"center",
        paddingTop:Constants.statusBarHeight,
        paddingBottom:15 
    
    },
    headerTitle:{
        color:"black",
        fontSize:20
    }
})