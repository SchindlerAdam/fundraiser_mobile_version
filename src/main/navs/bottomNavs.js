import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from '@expo/vector-icons'; 
import { HomeScreenStack, LoginScreenStack, ProfileScreenStack } from "./mainStackNavigator";
import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";



const Tab = createBottomTabNavigator();

const BottomTabs = () => {

    const authContext = useContext(AuthContext);

    return (
        <Tab.Navigator
            screenOptions={
                {
                    tabBarActiveTintColor: "#FB8500",
                    tabBarStyle: {
                        backgroundColor: "#03045E"
                    },
                    headerStyle: {
                        backgroundColor: "#FFFFFF"
                    },

                }
            }
        >
            
            <Tab.Screen 
                name="HomeScreen"
                component={HomeScreenStack}
                options = {
                    {
                        tabBarIcon: ({color}) => (<FontAwesome name = "home" size = {24} color = {color} />),
                        headerShown: false,
                        tabBarLabelStyle: {
                            fontSize: 15
                        },
                        title: "Home"
                    }
                }
            />

            {!authContext.authState.authenticated ? 
                        <Tab.Screen 
                            name="LoginScreen"
                            component={LoginScreenStack}
                            options = {
                                {
                                    tabBarIcon: ({color}) => (<FontAwesome name="sign-in" size={24} color= {color} />),
                                    headerShown: false,
                                    tabBarLabelStyle: {
                                        fontSize: 15
                                    },
                                    title: "Login"
                                }
                            }
                        /> :

                        <Tab.Screen 
                        name="ProfileScreen"
                        component={ProfileScreenStack}
                        options = {
                            {
                                tabBarIcon: ({color}) => (<FontAwesome name = "user" size = {24} color = {color} />),
                                headerShown: false,
                                tabBarLabelStyle: {
                                    fontSize: 15
                                },
                                title: "Profile"
                            }
                        }
                    />
            
            }

           

        </Tab.Navigator>
    )
};

export default BottomTabs;