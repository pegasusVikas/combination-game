import React, { useState,useRef,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import Card from '../Card'
import constants from '../../constants/colors'
import Input from '../Input'
import ModeContainer from '../modeContainer'


export default function Begin(props) {
    const [digits, setDigits] = useState(3);
    const [confirm, setConfirm] = useState(false);
    const [selected, setSelected] = useState(3);
    const [numbers,setNumbers] = useState([]);
    const [focus,setFocus] = useState(0);
    const [editable,setEditable]=useState(false);

    const upperlimit = 5;
    const lowerlimit = 2;
    var num=[]

    useEffect(() => {
        for(var i=0;i<upperlimit;i++)
        num[i]=editable?"":"X";
        setNumbers(()=>num)
        setFocus(()=>0)   
    }, [editable,selected])

    useEffect(() => {
        if(focus<0)
        setFocus(()=>0)
        else if(focus>=selected)
        {
            setFocus(()=>selected-1);

        }
        else if(focus==selected-1)
        {
            if(numbers[selected-1]!="")
            Keyboard.dismiss();
        }   
    }, [focus])

    

    const change = (i) => {
        console.log(i)
        if ((digits + i >= lowerlimit) && (digits + i <= upperlimit))
            setDigits(digit => digit + i)
    }

    const reset = () => {
        setDigits(() => 3);
        setConfirm(()=>false);
        setFocus(()=>0);
        setNumbers([])
    }

    const select = () => {
        if (digits === NaN || digits < lowerlimit || digits > upperlimit) {
            Alert.alert('invalid number', 'please enter number within the range', [{ text: 'OK', style: 'destructive', onPress: reset }]);//this wont be executed in normal cases
            //reset();
            return;
        }
        setSelected(() => digits);
        setConfirm(() => true);
        setEditable(()=>editable)
    }

    const inputHandler=(nativeEvent)=>{
        nativeEvent=nativeEvent.nativeEvent ;
        if(nativeEvent.key==='Backspace'){
            console.log(focus,"backspace")
            if(focus==0&&numbers[0]==""){
                Keyboard.dismiss();
            }
            else if(focus>=0){
                var num =numbers;
                num[focus]="";
                setFocus((focus)=>focus-1);
                setNumbers(()=>num);
            }
        }
    }

    const onChange=(text)=>{
        if(text.match(/^[0-9]+$/)){
            
            var num =numbers;
            num[focus]=text.charAt(text.length-1);
            console.log(focus,"text")
            setNumbers(()=>num);
            setFocus(focus=>focus+1);
        }
    }

    const gameMode=(is2player)=>{
        setEditable(()=>is2player);
    }

    const random=()=>{
        var num=Math.random()
        if(num==1)
        return random()
        return parseInt(num*Math.pow(10,selected));
    }
    const startGame=(e)=>{
        var num=0;
        if(!editable)
            num=random()
        else
        {for(var i =0;i<selected;i++)
            if(!numbers[i].match(/^[0-9]/)){
                Alert.alert("Invalid number😠","Please enter a valid number",[{text:"Okie👍",style:"cancel"}])
                return;
            }
            else{
                num=num*10+parseInt(numbers[i])
            }
        }
        console.log("congo",numbers)
        props.setNumber({num:num,digits:selected})
    }

    const Inputs =(props)=>{
        const push=[];
        const n=selected;
        var i=0;
        for(i=0;i<n;i++){
            var color =i==focus?constants.secondary:"grey";
            push.push(
                <Input  
                key={i}
                myStyle={{...styles.input,marginVertical:0,marginHorizontal:4,borderBottomWidth:3,borderBottomColor:color}} 
                maxLength={2} 
                autoFocus={i==focus} 
                onKeyPress={(e)=>inputHandler(e)} 
                onChangeText={(e)=>onChange(e)}
                value={numbers[i]}
                editable={i==focus&&editable}
                />
                
                )
        }
        return <View style={styles.inputContainer}>{push}</View>;
    }

    //console.log(numbers);

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
                    <Card myStyle={{...styles.container,width:400,alignItems:"center"}}>
                       
                            <Text>you have selected <Text style={{fontSize:20,fontWeight:"bold",color:constants.primary}}>{selected}</Text></Text>
                            <ModeContainer style={styles.inputContainer}>
                                <Inputs/>
                            </ModeContainer>
                                {!editable?
                                    <View style={styles.buttonContainer}>
                                    <Button title="2 Player" style={styles.button} onPress={()=>gameMode(true)}/>
                                    <Button title="Random" style={styles.button} onPress={startGame}/>
                                    </View>
                                    :
                                    <View style={styles.buttonContainer}>
                                    <Button title="Back" style={styles.button} onPress={()=>gameMode(false)}/>
                                    <Button title="Play" style={styles.button} onPress={startGame}/>
                                    </View>
                                }
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
        fontFamily:"open-sans",
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