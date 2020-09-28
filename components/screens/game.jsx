import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Button,
    Alert,
    FlatList,
    TouchableNativeFeedback,
    TouchableOpacity
} from 'react-native'
import uuid from 'uuid-random'

import Card from '../Card';
import constants from '../../constants/colors'
import GuessCard from '../GuessCard'
import GuessCardsm from '../GuessCardsm'

export default (props) => {
    const [guessNum, setGuessNum] = useState(0);
    const [digits, setDigits] = useState(0);
    const [tries, setTries] = useState(0);
    const [history, setHistory] = useState([]);
    const digitArr = useRef([])

    useEffect(() => {
        for (var i = 0; i < props.digits; i++)
            digitArr.current[i] = parseInt(props.number / Math.pow(10, props.digits - (i + 1))) % 10;
    }, [])

    useEffect(() => {
        if (digits >= props.digits) {
            Keyboard.dismiss();
        }
    }, [digits])

    const onChange = (text) => {
        if (digits < props.digits) {
            if (text.match(/^[0-9]$/)) {
                let num = guessNum;
                num = num * 10 + parseInt(text);
                setGuessNum(() => num);
                setDigits((dig) => dig + 1);
            }
        }
    }

    const backspace = ({ nativeEvent }) => {
        if (nativeEvent.key == "Backspace") {
            console.log("hello")
            if (digits > 0) {
                setGuessNum((num) => parseInt(num / 10))
                setDigits((dig) => dig - 1);
            }
            else {
                Keyboard.dismiss();
            }
        }
    }

    const onCheck = () => {
        if (digits === props.digits) {
            var arr = [];
            var presentArr = [];
            const num = digits;
            const val = guessNum;
            //initialize
            for (var i = 0; i < 10; i++)
                presentArr[i] = false

            for (var i = 0; i < num; i++) {
                arr[i] = parseInt(val / Math.pow(10, num - (i + 1))) % 10;
                presentArr[digitArr.current[i]] = true;
            }


            //checking
            var crtPos = 0;
            var present = 0;
            for (var i = 0; i < num; i++) {
                if (arr[i] == digitArr.current[i])
                    crtPos++;
                if (presentArr[arr[i]]) {
                    presentArr[arr[i]] = false;
                    present++;
                }
            }
            console.log(presentArr);
            if (crtPos != num) {
                var hist = history;
                hist.unshift({ correct: crtPos, present: present, arr: arr })
                setHistory(() => hist)
                setTries(() => tries + 1)
                setDigits(() => 0)
                setGuessNum(() => 0)
            }
            else {
                console.log("congo")
                props.setTries(tries)
            }

        } else {
            Alert.alert("Invalid number😠", "Please enter a valid number", [{ text: "Okie👍", style: "cancel" }])
        }

    }

    const inputs = () => {
        var inputs = []
        for (var i = 0; i < props.digits; i++) {
            inputs.push(
                (<Card key={i} myStyle={{ ...styles.digitCard, backgroundColor: i + 1 > digits ? "white" : constants.digits }}>
                    <Text style={{ ...styles.digit, borderBottomColor: i + 1 > digits ? "grey" : constants.digits }}>{i + 1 > digits ? "" : "" + (parseInt(guessNum / Math.pow(10, digits - (i + 1))) % 10)}</Text>
                </Card>)
            )

        }
        console.log(history, "\n\n\n")
        return inputs
    }

    return (
        <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.screen}>
                <View style={styles.digitContainer}>
                    {inputs()}
                    <TextInput
                        caretHidden={true}
                        maxLength={5}
                        value={""}
                        onChangeText={onChange}
                        onKeyPress={backspace}
                        keyboardType="number-pad"
                        style={{ position: "absolute", width: "100%", height: "100%", zIndex: 10, marginLeft: 5 }}
                    />
                </View>
                <View style={styles.button}><Button color={constants.secondary} title="Check" onPress={() => onCheck()} /></View>
                <Text style={{ fontSize: 15 }}>Tries  <Text style={{ fontSize: 20, fontWeight: "bold", color: constants.primary }}>{tries}</Text></Text>
                <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ flex: 1, width: "100%" }}
                        keyExtractor={(item, index) => { return uuid() }}
                        data={history}
                        renderItem={(obj) => {
                            console.log(obj, "heyyyyyyyy")
                            const { item } = obj;
                            if(obj.index==0)
                            return <GuessCard correct={item.correct} present={item.present} arr={item.arr} />
                            return <GuessCardsm correct={item.correct} present={item.present} arr={item.arr} />
                        }}
                    />
                </View>


            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    digit: {
        height: 40,
        width: 40,
        borderBottomColor: "grey",
        borderBottomWidth: 3,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 25,
        fontWeight: "bold"
    },
    digitCard: {
        padding: 10,
        elevation: 2,
        marginHorizontal: 4,
    },
    digitContainer: {
        marginVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        marginVertical: 0,
    },
    

})