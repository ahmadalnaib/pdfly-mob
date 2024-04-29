import React from "react";
import { createContext,useState } from "react";
import * as SecureStore from 'expo-secure-store';
import axiosConfig from "../helpers/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    
    return (
        <AuthContext.Provider 
        value={{
          user,
          setUser,
          error,
          loading,
          login:(email,password) => {
            
            setLoading(true)
            axiosConfig.post('login',{email,password,devies_name:'mobile'}).then(res => {
           const userRes={
             token:res.data.token,
              id:res.data.user.id,
              name:res.data.user.name,
              email:res.data.user.email,
           }
           setUser(userRes)
           setError(null)
           setLoading(false)
           SecureStore.setItemAsync('user', JSON.stringify(userRes))
            }).catch(err => {
              setError(err.response.data.message)
              setLoading(false)
            })
            
          },
          logout:() => {
            setLoading(true)
            axiosConfig.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
            axiosConfig
            .post('logout')
            .then(response => {
              setUser(null);
              SecureStore.deleteItemAsync('user');
              setError(null);
              setLoading(false);
            })
            .catch(error => {
              console.log(error);
              setUser(null);
              SecureStore.deleteItemAsync('user');
              setError(error.response.data.message);
              setLoading(false);
            });
          },
        }}
          >
         {children}
        </AuthContext.Provider>
    )

}