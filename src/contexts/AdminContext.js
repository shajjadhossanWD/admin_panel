import axios from 'axios';
import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export default function AdminProvider({ children }) {

    const [admin, setAdmin] = useState(null);
    const [token, setToken] = useState()
    const [isAuthenticating, setIsAuthenticating] = useState(false);
  


    useEffect(() => {
        axios.get("https://kccb.kvillagebd.com/api/v1/admin/admin", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('kccbAdminToken')}`
            }
        })
         .then(res => {
                if (res.status === 200) {
                    setAdmin(res.data.admin);
                    console.log(res.data.admin)
                }
            })
            .catch(err => {
                setAdmin(null);
            });
    }, []);


    const logout = () => {
        setAdmin(null);
        localStorage.removeItem("kccbAdminToken");
    }


    return (
        <AdminContext.Provider value={{
            admin,
            isAuthenticating,
            setAdmin,
            logout,
            token,
            setToken,
            setIsAuthenticating,
        }}>{children}</AdminContext.Provider>
    )
}