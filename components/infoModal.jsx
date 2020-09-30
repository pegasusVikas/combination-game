import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import constants from "../constants/colors"

export default (props) => {
    const Stars = () => {
        var group = [];
        for (var i = 1; i <= 5; i++) {
            var stars = [];
            for (var j = 1; j <= i; j++) {
                stars.push(
                    <FontAwesome5
                        key={j}
                        name={"star"}
                        size={20}
                        color={constants.primary}
                        solid={true}
                    />
                )
            }
            group.push(
                <View key={i} style={styles.row}>
                    <View style={styles.stars}>{stars}</View>
                    <View><Text>{props.rating[i].review}</Text></View>
                </View>
            )
        }
        return <View style={styles.card}>{group}</View>
    }

    return (
        <Modal animationType="fade" visible={props.visible} transparent={true} >
            <View style={styles.modal}>
                <View >
                    <View style={{ flexDirection: "row-reverse", }}>
                        <FontAwesome5
                            name={"times"}
                            size={23}
                            color={constants.secondary}
                            solid={true}
                            onPress={()=>props.setVisible()}
                            style={styles.font}
                        />
                    </View>
                    <Stars />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    card: {
        backgroundColor: "white",
        padding:20,
        borderRadius:10
    },
    row: {
        flexDirection: "row",
        borderBottomColor: "grey",
        padding: 10
    },
    stars: {
        flexDirection: "row",
        width: 100,
        justifyContent: "flex-end",
        marginRight:10
        
    },
    font:{ 
        backgroundColor: "white",
        borderRadius:10,
        padding:5,
        borderColor:"black",
        borderWidth:2,
        paddingLeft:8,
        paddingBottom:2
    }

})