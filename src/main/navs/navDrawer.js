import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import React, { useContext } from "react";
import CuriositiesScreen from "../screens/curiositiesScreen";
import ProjectsScreen from "../screens/projectsScreen";
import BottomTabs from "./bottomNavs";
import { FontAwesome } from '@expo/vector-icons'; 
import { AuthContext } from "../contexts/authContext";




const CustomDraweContent = (props) => {

    const authContext = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            {authContext.authState.authenticated ?
                        <DrawerItem
                        icon={({color}) => <FontAwesome name="sign-out" size={24} color= {color} />} 
                        label = "Logout" 
                        labelStyle = {{color: "#FB8500"}}
                        style = {{marginTop: 550}}
                        onPress = {() => {
                            authContext.logOut();
                            props.navigation.closeDrawer();
                        }} />
            : 
            null}

        </DrawerContentScrollView>
    )
}

const Drawer = createDrawerNavigator();

const DrawerNav = () => {

    return (
        <Drawer.Navigator 
            initialRouteName="Home" 
            drawerContent={(props) => <CustomDraweContent {...props}/>}
            screenOptions={{
            headerTitleAlign: "center"
        }}>

            <Drawer.Screen 
                name="Home"
                component={BottomTabs}
            />

            <Drawer.Screen 
                name="Curiosities"
                component={CuriositiesScreen}
            />

            <Drawer.Screen 
                name="Projects"
                component={ProjectsScreen}
            />

        </Drawer.Navigator>

    )
}

export default DrawerNav;