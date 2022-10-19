import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList } from "react-native-gesture-handler";
import DonationItem from "../components/ donationItem";
import { AxiosContext } from "../contexts/axiosContext";




const HomeScreen = () => {

    console.log("HOME SCREEN RE-RENDERED!")
    
    const [donations, setDonations] = useState([]);

    const axiosContext = useContext(AxiosContext);

    const onLoadDonations = async () => {
        try {
            const response = await axiosContext.axiosClient.get("/api/donation");
            setDonations(response.data);
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(
        () =>  {onLoadDonations()},
        [donations.length]
    );

    if(!donations) {
        return null;
    } else {
        return (
            <View style = {styles.mainContainer}>
                
                <LinearGradient
                    colors={["#00B4D8","#0077B6","#03045E"]}
                    style = {styles.linearGradient}
                >
                    <Image 
                    source={require("../../assets/logo/hashtagTeamDrops.png")} 
                    style = {styles.logo}
                    />

                    <Text style = {styles.donationsTitle}>DONATIONS</Text>
    
                    <FlatList 
                        data={donations}
                        keyExtractor = {(donationItem) => donationItem.donationId}
                        renderItem = {(element) => {
                            return (
                                <DonationItem 
                                    data = {element.item}
                                />
                            )
                        }}
                    />
    
                    
    
                </LinearGradient>
    
            </View>
        );
    };
};


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    linearGradient: {
        flex: 1
    },
    logo: {
        marginVertical: 10,
        width: 300,
        height: 40,
        alignSelf: "center"
    },
    donationsTitle: {
        fontWeight: "bold",
        fontSize: 30,
        alignSelf: "center",
        marginVertical: 20,
        color: "#03045E"
    }
})



export default HomeScreen;