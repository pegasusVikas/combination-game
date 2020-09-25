import React,{Component} from 'react';
import {TextInput,StyleSheet} from 'react-native';

class Input extends Component{

    render(){
    return <TextInput keyboardType="number-pad" {...this.props} style={{...styles.input,...this.props.myStyle}} />
    }
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