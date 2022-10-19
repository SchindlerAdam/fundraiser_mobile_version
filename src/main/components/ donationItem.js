import React from "react";
import {View, Text, Image, StyleSheet} from "react-native";
import { block } from "react-native-reanimated";


const DonationItem = (props) => {
    return (

        <View style = {styles.mainContainer}>

            <View style = {styles.subContainerOne}>
                <Image style = {styles.logo} source={require("../../assets/logo/angler-fish.png")} />
                <Text style = {styles.name}>{props.data.userName}</Text>
            </View>

            <View style = {styles.subContainerTwo}>
                <Text style = {styles.amountAndCurrency}>{props.data.initialAmount} {props.data.initialCurrencyType},-</Text>
                <Text style = {styles.date}>{props.data.date}</Text>
            </View>

            <View style = {styles.subContainerThree}>
                <Text>{props.data.message}</Text>
            </View>


        </View>

        
    )
};


const styles = StyleSheet.create({

    mainContainer: {
        width: 350,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        alignSelf: "center",
        marginVertical: 20

    },


    subContainerOne: {
        width: 350,
        flexDirection: "row",
        alignItems: "center",

    },
    logo: {
        width: 70,
        height: 70
    },
    name: {
        left: 100,
        fontWeight: "bold",
        fontSize: 16,
    },



    subContainerTwo: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    amountAndCurrency: {
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 20
    },
    date: {
        fontSize: 12,
        marginRight: 50
    },



    subContainerThree: {
        
        marginTop: 10,
        alignItems: "flex-start",
        padding: 10
    }



});


export default DonationItem;