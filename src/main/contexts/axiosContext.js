import React, {createContext, useContext} from "react";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { AuthContext } from "./authContext";


const AxiosContext = createContext();
const BASE_URL = "http://10.0.2.2:8080"; // 10.0.2.2 Special alias to your host loopback interface (i.e., 127.0.0.1 on your development machine)


const AxiosProvider = ({children}) => {

    const authContext = useContext(AuthContext);

    const axiosClient = axios.create({
        baseURL: BASE_URL,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    const authAxiosClient = axios.create({
        baseURL: BASE_URL
    });

    authAxiosClient.interceptors.request.use(
        (config) => {
            if (!config.headers.Authorization) {
                config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`
            };

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    

    const tokenRefresh = async (faildRequest) => {
        const data = {
            refreshToken: authContext.getRefreshToken()
        };

        const requestOptions = {
            method: "POST",
            data: data,
            url: "api/accounts/token/refresh"
        };

        return axios(requestOptions)
            .then(
                (tokenRefreshResponse) => {
                    faildRequest.config.headers.Authorization = `Bearer ${tokenRefreshResponse.access_token}`

                    authContext.saveTokens("tokens", {access_token: tokenRefreshResponse.access_token, refresh_token: tokenRefreshResponse.refresh_token})
                    
                    return Promise.resolve();
                }
            )
            .catch(
                (error) => {
                    authContext.logout();
                }
            )
    };

    createAuthRefreshInterceptor(authAxiosClient, tokenRefresh);

    return (
        <AxiosContext.Provider
            value={{
                axiosClient,
                authAxiosClient
            }}
        >
            {children}
        </AxiosContext.Provider>
    )
};

export {AxiosContext, AxiosProvider};