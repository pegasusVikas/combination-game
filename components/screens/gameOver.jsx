import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from "@expo/vector-icons"

import Card from "../Card"
import constants from "../../constants/colors"
import InfoModal from "../infoModal"


export default (props) => {

    const rating = {
        1: { try: 50, review: "Noob" },
        2: { try: 25, review: "Not Bad" },
        3: { try: 15, review: "Good" },
        4: { try: 7, review: "Excellent" },
        5: { try: 1, review: "Hacker" }
    }
    
    const [star, setStar] = useState(5)
    const [info, setInfo] = useState(false)

    const Answer = () => {
       
        var push = []
        for (var i = 0; i < props.digits; i++)
            push.push(
                <Card myStyle={styles.digitCard} key={i}>
                    <Text style={{ fontSize: 25, fontWeight: "bold" }}>{parseInt(props.number / Math.pow(10, props.digits - (i + 1))) % 10}</Text>
                </Card>
            )

        return <View style={styles.digitContainer}>{push}</View>;
    }
    const setVisible=()=>{
        setInfo(()=>false)
    }

    const Stars = () => {
        const push = []
        var j = 0
        for (var i = 1; i <= 5; i++) {
            var color = "grey"
            var bool = false
            if (props.try <= rating[i].try) {
                color = constants.primary
                bool = true
                j++;
            }
            push.push(
                <FontAwesome5
                    key={i}
                    name={"star"}
                    size={20}
                    color={color}
                    solid={bool}
                />
            )
        }
        setStar(() => j)
        return <View style={styles.starContainer}>{push}</View>
    }


    

    return (
        <View style={styles.screen}>
            <InfoModal rating={rating} visible={info} setVisible={setVisible} />
            { !info && <Card myStyle={styles.card}>
                <View style={styles.head}>
                    <Text style={styles.title}>You Guessed It</Text>
                    <FontAwesome5
                        name={"info-circle"}
                        size={30}
                        color={constants.digits}
                        solid={false}
                        onPress={() => setInfo(() => true)}
                    />
                </View>
                <View style={styles.body}>
                    <View style={{ alignItems: "center" }}>
                        <Answer />
                        <Stars />
                        <Text style={styles.review}>{rating[star].review}</Text>
                    </View>
                    <TouchableOpacity style={styles.reload} activeOpacity={0.75} onPress={() => props.reset()}>
                        <FontAwesome5
                            name={"redo-alt"}
                            color={"white"}
                            size={35}
                        />
                    </TouchableOpacity>
                </View>
            </Card>}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: constants.primary
    },
    head: {
        flexDirection: "row",
        alignItems: "center",

    },
    card: {
        alignItems: "center",
        paddingTop: 20
    },
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 20,
        marginHorizontal: 20
    },
    body: {
        width: 250,
        height: 250,
        maxWidth: "80%",
        maxHeight: "80%",
        borderTopColor: "grey",
        borderTopWidth: 5,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    starContainer: {
        flexDirection: "row"
    },
    review: {
        color: constants.secondary,
        fontWeight: "bold",
        fontSize: 15
    },
    digitCard: {
        elevation: 0,
        paddingHorizontal: 6
    },
    digitContainer: {
        flexDirection: "row"
    },
    reload: {
        backgroundColor: constants.secondary,
        padding: 10,
        borderRadius: 10
    }

})