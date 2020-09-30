import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'

import Card from './Card'
import constants from '../constants/colors'

export default (props)=>{
    return(
        <TouchableOpacity activeOpacity={0.75} style={{alignSelf:"center"}}>
                <Card myStyle={styles.guessCard}>
                    <View style={{ flexDirection: "row" }}>
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
                            <Text style={{fontSize:12}}>{props.correct + " digits"}</Text>
                            <Text style={styles.text}>{"correct\nposition"}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center",marginHorizontal:5 }}>
                        <View style={{...styles.redDot,backgroundColor:constants.primary}}></View>
                        <View style={{marginLeft:3}}>
                            <Text style={{fontSize:12}}>{props.present + " digits"}</Text>
                            <Text style={styles.text}>{"present in\nthe number"}</Text>
                        </View>
                    </View>

                </Card>
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    digit: {
        height: 30,
        width: 30,
        borderBottomColor: "grey",
        borderBottomWidth: 2,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 20,
        fontWeight: "bold"
    },
    digitCard: {
        padding: 1,
        elevation: 2,
        marginHorizontal: 2,
        borderRadius:0
    },
    guessCard: {
        width:"auto",
        maxWidth:"95%",
        elevation: 2,
        borderRadius: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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
        fontSize: 10,
        flexWrap:"wrap",
        flexShrink:1
    }
})