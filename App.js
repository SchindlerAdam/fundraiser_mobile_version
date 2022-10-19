import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNav from "./src/main/navs/navDrawer";
import { AuthProvider } from "./src/main/contexts/authContext";
import { AxiosProvider } from "./src/main/contexts/axiosContext";



const App = () => {

  return (

  <AuthProvider>
    <AxiosProvider>
       <NavigationContainer>

        <DrawerNav/>

      </NavigationContainer>
    </AxiosProvider>
  </AuthProvider>

  )
};

export default App;