import React, {createContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../services/api'

const AuthContext = createContext({});

const tokenMapKey = '@DKKN:tokenMap'
const credentialKey = '@DKKN:credentialMap'
const customerKey = '@DKKN:customer'

export const AuthProvider = ({children}) => {
    const [customer, setCustomer] = useState({})
    const [access, setAccess] = useState(null)
    const [accessExp, setAccessExp] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        refreshToken()
    }, [])

    async function refreshToken() {
        const tokenMap = JSON.parse(await AsyncStorage.getItem(tokenMapKey))
        const matchTimestamp = Date.now() - 2400000;
        if (tokenMap && tokenMap.exp > matchTimestamp) {
            const customer = JSON.parse(await AsyncStorage.getItem(customerKey))
            setCustomer(customer)
            setToken(tokenMap)
            setLoading(false)
        } else {
            const credentialMap = JSON.parse(await AsyncStorage.getItem(credentialKey))
            if (credentialMap) {
                await signIn(credentialMap);
            }
            setLoading(false)
        }
    }

    async function signIn(data) {
        const params = new URLSearchParams()
        params.append('email', data.email)
        params.append('password', data.password)
        const response = await api.post('/login', params)
        const tokenData = {access: response.data.api_token, exp: Date.now()};
        const customerData = {name: response.data.cust_name};
        setToken(tokenData);
        setCustomer(customerData)
        await AsyncStorage.setItem(tokenMapKey, JSON.stringify(tokenData))
        await AsyncStorage.setItem(credentialKey, JSON.stringify({email: data.email, password: data.password}))
        await AsyncStorage.setItem(customerKey, JSON.stringify(customerData))
    }

    function setToken(tokenData) {
        setAccess(tokenData.access);
        setAccessExp(tokenData.exp);
    }

    function signOut() {
        AsyncStorage.multiRemove([tokenMapKey, credentialKey, customerKey]).then(() => {
            setToken({});
            setCustomer(null);
        })
    }


    return (
        <AuthContext.Provider value={{
            signed: !!access, access, loading,
            signIn, signOut, customer, refreshToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
