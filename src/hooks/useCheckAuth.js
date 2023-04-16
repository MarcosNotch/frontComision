import { useState, useEffect } from "react";

export default function useCheckAuth(){

    const [userAuth, setUserAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        async function checkAuth() {
            try {
                if(true){
                    setUserAuth(true)
                    return
                }
            } catch (e) {
                console.log(e)
                setUserAuth(false)
            }finally{
                setLoading(false)
            }

        }
        checkAuth();
    }, [])

    return {userAuth, loading}

}