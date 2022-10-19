import React, {useContext, useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { LinearGradient } from 'expo-linear-gradient';
import { AxiosContext } from "../contexts/axiosContext";
import { AuthContext } from "../contexts/authContext";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 



const LoginScreen = () => {

    const axiosContext = useContext(AxiosContext);
    const authContext = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const loginData = {
        email: email,
        password: password
    }


    const onLogin = () => {
        axiosContext.axiosClient.post("/api/accounts/login", loginData)
            .then((response) => {
                authContext.saveTokens(response.data);
            })
            .catch((error) => console.log(error))

    }


    return (

        <LinearGradient
            colors={["#00B4D8","#0077B6","#03045E"]}
            style = {styles.linearGradient}
        >

            <View style = {styles.container}>

                <Text style = {styles.loginTitle}>LOGIN</Text>

                <View style = {styles.card}>

                    <View style = {styles.emailContainer}>
                        <View style = {styles.labelAndIconContainer}>
                            <Text>Email</Text>
                            <MaterialCommunityIcons name="email-outline" size={24} color="black" />
                        </View>
                        <TextInput
                            style = {styles.textInputStyle}
                            value = {email}
                            onChangeText = {(text) => setEmail(text)}
                        />
                    </View>

                    <View style = {styles.passwordContainer}>
                        <View style = {styles.labelAndIconContainer}>
                            <Text>Password</Text>
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}
                            >
                                {!showPassword ? <MaterialCommunityIcons name="lock-open-variant-outline" size={24} color="black" /> :<MaterialCommunityIcons name="lock-outline" size={24} color="black" />}
                            </TouchableOpacity>
        
                        </View>
                        <TextInput 
                            style = {styles.textInputStyle}
                            secureTextEntry = {showPassword ? false : true}
                            value = {password}
                            onChangeText = {(text) => setPassword(text)}
                        />
                    </View>

                    <View>
                        <TouchableOpacity
                            style = {styles.buttonContainer}
                            onPress = {() => onLogin()}
                            >
                            <Text style = {styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>

                </View>

             </View>

        </LinearGradient>
        

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    linearGradient: {
        flex: 1
    },
    loginTitle: {
        fontWeight: "bold",
        fontSize: 30,
        alignSelf: "center",
        marginVertical: 20,
        color: "#03045E"
    },
    card: {
        width: 370,
        height: 300,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30
    },
    emailContainer: {
        marginVertical: 20,
        width: 350
    },
    labelAndIconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10
    },
    passwordContainer: {
        marginVertical: 20,
        width: 350
    },
    textInputStyle: {
        width: 350,
        height: 40,
        padding: 10,
        borderWidth: .5,
        borderColor: "black",
        borderRadius: 10,
        marginTop: 10
    },
    buttonContainer: {
        backgroundColor: "#FB8500",
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 40,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 15,
        marginRight: 2,
        fontWeight: "bold"

    },
})



export default LoginScreen;