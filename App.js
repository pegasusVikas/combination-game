import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font'
import {AppLoading} from 'expo'

import Header from "./components/header"
import Begin from "./components/screens/begin"
import Game from "./components/screens/game"
import GameOver from "./components/screens/gameOver"

export default function App() {
  const [number,setnumber]=useState("");
  const [loading,setLoading]=useState(true);
  const [tries,settries]=useState(2);


  const fetchFonts=()=>{
    return Font.loadAsync({
      "open-sans-bold":require('./assets/fonts/OpenSans-Bold.ttf'),
      "open-sans":require('./assets/fonts/OpenSans-Regular.ttf')
    })
  }

  const setNumber=(num)=>{
    setnumber(()=>num);
  }

  const setTries = (Try)=>{
    console.log(Try)
    settries(()=>Try)
  }


  if(loading)
  return <AppLoading startAsync={fetchFonts} onFinish={()=>setLoading(false)}/>

  var screen=<Begin setNumber={setNumber}/>;

  if(tries!=="")
  screen=<GameOver number={number.num} digits={number.digits} try={tries}/>
  else if(number!="")
  screen=(<Game number={number.num} digits={number.digits} setTries={setTries}/>);

  return (
    <View style={styles.container}>
      <Header title="Guess The Number"/>
      {screen}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
