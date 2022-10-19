import React, {createContext, useState} from "react";
import * as SecureStore from 'expo-secure-store';


const AuthContext = createContext();

const initialAuthState = {
    access_token: null,
    refresh_token: null,
    authenticated: false
};

const secure_store_keys = {
    access_token: "access_token",
    refresh_token: "refresh_token"
}

const AuthProvider = ({children}) => {

    const [authState, setAuthState] = useState(initialAuthState);


    const saveTokens = async (tokensResponse) => {

        await SecureStore.setItemAsync(secure_store_keys.access_token, JSON.stringify(tokensResponse.access_token));
        await SecureStore.setItemAsync(secure_store_keys.refresh_token, JSON.stringify(tokensResponse.refresh_token));

        const access_token = await SecureStore.getItemAsync("access_token");
        const refresh_token = await SecureStore.getItemAsync("refresh_token");

        setAuthState({
            access_token: JSON.parse(access_token), 
            refresh_token: JSON.parse(refresh_token),
            authenticated: true
        });
    };

    const getAccessToken = () => {
        return authState.access_token;
    };

    const getRefreshToken = () => {
        return authState.refresh_token;
    };

    const logOut = async () => {
        await SecureStore.deleteItemAsync(secure_store_keys.access_token);
        await SecureStore.deleteItemAsync(secure_store_keys.refresh_token);
        setAuthState({
            access_token: null, 
            refresh_token: null,
            authenticated: false
        })

    };

    return (
        <AuthContext.Provider
            value={{
                authState,
                saveTokens,
                getAccessToken,
                getRefreshToken,
                logOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )

};

export {AuthContext, AuthProvider};