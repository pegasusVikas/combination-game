import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from "./components/header"
import Begin from "./components/screens/begin"

export default function App() {
  return (
    <View style={styles.container}>
      <Header title="Guess a Number"/>
      <Begin/>
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
