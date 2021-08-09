import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../services/api'

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [customer, setCustomer] = useState({})
    const [access, setAccess] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function localStorageData(){
            const storagedToken = await AsyncStorage.getItem('@RNAuth:token')

            if (storagedToken){
                const customer = JSON.parse(await AsyncStorage.getItem('@RNAuth:customer'))
                setCustomer({name: 'Hello'})
                setAccess(storagedToken)
                setLoading(false)
            }else{
                setLoading(false)
            }
        }

        localStorageData()
    }, [])

    async function signIn(data){
        const params = new URLSearchParams()
        params.append('email', data.email)
        params.append('password', data.password)
        const response = await api.post('/login', params)
        setAccess(response.data.api_token)

        await AsyncStorage.setItem('@RNAuth:token', response.data.api_token)
        await AsyncStorage.setItem('@RNAuth:customer', JSON.stringify({name: response.data.cust_name}))
    }

    function signOut(){
        AsyncStorage.clear().then( () => {
            setAccess(null)
        })
    }


    return(
        <AuthContext.Provider value={{signed: !!access, access, loading, signIn, signOut, customer}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
