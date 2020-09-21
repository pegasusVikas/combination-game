import React, { useState,useRef,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import Card from '../Card'
import constants from '../../constants/colors'
import Input from '../Input'
import ModeContainer from '../modeContainer'


export default function Begin() {
    const [digits, setDigits] = useState(3);
    const [confirm, setConfirm] = useState(false);
    const [selected, setSelected] = useState(3);
    const [numbers,setNumbers] = useState([]);
    const [focus,setFocus] = useState(3);

    const upperlimit = 5;
    const lowerlimit = 2;

    const inputRef={}
    for(var j=0;j<upperlimit;j++){
     inputRef[""+j]=useRef(null);
    }

    useEffect(() => {
        for(var j=0;j<upperlimit;j++){
            console.log(inputRef[""+j])
           }
    }, [])

    const change = (i) => {
        console.log(i)
        if ((digits + i >= lowerlimit) && (digits + i <= upperlimit))
            setDigits(digit => digit + i)
    }

    const reset = () => {
        setDigits(() => 3);
        setConfirm(()=>false);
    }

    const select = () => {
        if (digits === NaN || digits < lowerlimit || digits > upperlimit) {
            Alert.alert('invalid number', 'please enter number within the range', [{ text: 'OK', style: 'destructive', onPress: reset }]);//this wont be executed in normal cases
            //reset();
            return;
        }
        setSelected(() => digits);
        setConfirm(() => true);
    }

    const inputHandler=(nativeEvent)=>{
        nativeEvent=nativeEvent.nativeEvent;
        if(nativeEvent.key==='Backspace'){
            console.log(focus,"backspace")
            if(focus>=0){
            setFocus(focus=>focus-1);
            var num =numbers;
            num[focus]="";
            setNumbers(()=>num);
            }
            
        }
    }

    const onChange=(text)=>{
        if(text.match(/^[0-9]$/)){
            var num =numbers;
            num[focus]=text;
            console.log(focus,"text")
            setNumbers(()=>num);
            setFocus(focus=>focus+1);
        }
    }

    const Inputs =(props)=>{
        const push=[];
        const n=selected;
        var i=0;
        for(i=0;i<n;i++){
            push.push(
                <Input  
                key={i}
                myStyle={{...styles.input,marginVertical:0,marginHorizontal:4,borderBottomWidth:3}} 
                maxLength={1} 
                autoFocus={i==focus} 
                onKeyPress={(e)=>inputHandler(e)} 
                onChangeText={(e)=>onChange(e)}
                value={numbers[i]}
                ref={inputRef[""+i]}
                />
                
                )
        }
        return <View style={styles.inputContainer}>{push}</View>;
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a Game!</Text>
                <Card myStyle={styles.container}>
                    <Text>Choose number of Digits</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <FontAwesome5 name={'angle-left'} 
                        style={{ ...styles.font, backgroundColor: digits <= lowerlimit ? "grey" : constants.click }} 
                        size={25} 
                        onPress={() => { change(-1) }} 
                        />
                        <Input placeholder="Number" 
                        myStyle={{...styles.input,width:40}} 
                        editable={false}  
                        value={""+digits} 
                        />
                        <FontAwesome5 name={'angle-right'} 
                        style={{ ...styles.font, backgroundColor: digits >= upperlimit ? "grey" : constants.click }} 
                        size={25} 
                        onPress={() => { change(1) }} 
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title="reset" onPress={() => { reset() }} color={constants.secondary} /></View>
                        <View style={styles.button}><Button title="select" onPress={() => { select() }} color={constants.primary} /></View>
                    </View>
                </Card>
                {confirm &&
                    <Card myStyle={{...styles.container,width:"auto",alignItems:"center"}}>
                        <View>
                            <Text>you have selected <Text style={{fontSize:20,fontWeight:"bold",color:constants.primary}}>{selected}</Text></Text>
                            <ModeContainer style={styles.inputContainer}>
                                <Inputs/>
                            </ModeContainer>
                        </View>
                    </Card>
                }
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",

    },
    container: {
        backgroundColor: 'white',
        marginVertical: 10,
        padding: 10,
        alignItems: "center",
        width: 300,
        maxWidth: "80%",
        elevation: 6,
        borderRadius: 20
    },
    input: {
        textAlign: "center",
        fontSize: 30,
        justifyContent:"center"
    },
    buttonContainer: {
        //backgroundColor:"black",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        padding: 10
    },
    title: {
        fontSize: 20,
        paddingTop: 10,
    },
    button: {
        width: 80
    },
    font: {
        color: "white",
        backgroundColor: constants.click,
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginHorizontal: 10,
    },
    inputContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    }
})