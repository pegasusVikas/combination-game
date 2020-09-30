import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'

import Card from './Card'
import constants from '../constants/colors'

export default (props)=>{
    return(
        <TouchableOpacity activeOpacity={0.75} style={{alignSelf:"center",marginVertical:10}}>
                <Card myStyle={styles.guessCard}>
                    <View style={{ flexDirection: "row", }}>
                        {props.arr.map((val, i) =>
                            <Card key={i} myStyle={styles.digitCard}>
                                <Text style={styles.digit }>{val} </Text>
                            </Card>
                        )
                        }
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center",marginHorizontal:5 }}>
                        <View style={styles.redDot}></View>
                        <View style={{marginLeft:3}}>
                            <Text>{props.correct}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center",marginHorizontal:5 }}>
                        <View style={{...styles.redDot,backgroundColor:constants.primary}}></View>
                        <View style={{marginLeft:3}}>
                            <Text>{props.present}</Text>
                        </View>
                    </View>

                </Card>
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    digit: {
        height: 20,
        width: 20,
        borderBottomColor: "grey",
        borderBottomWidth: 2,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 15,
        fontWeight: "bold"
    },
    digitCard: {
        padding: 5,
        paddingHorizontal:2,
        elevation: 0,
        marginHorizontal: "2%",
    },
    guessCard: {
        width: "auto",
        maxWidth:"80%",
        elevation: 2,
        borderRadius: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding:10
    },
    redDot: {
        backgroundColor: "#00C851",
        height: 10,
        width: 10,
        borderRadius: 5
    },
    text: {
        fontFamily: "open-sans",
        marginHorizontal: 2,
        fontSize: 11
    }
})