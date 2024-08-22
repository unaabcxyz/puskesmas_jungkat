import { useState,useEffect } from "react";
export function useAuth(){
  const[loggedIn,setLoggedIn]=useState(false);
  const[user,setUser] = useState(null);
  const[loadingAuth,setLoadingAuth]=useState(true);
  const[error,setError]=useState(null);
  
  useEffect(()=>{
      setLoadingAuth(true);
      fetch('/api/get-session').then((res)=>res.json()).then((data)=>{
        if(data.loggedIn){
          setLoggedIn(true)
          setUser(data.user)
        }
      }).catch((err)=>setError(err)).finally(()=>setLoadingAuth(false)) 
  },[])
  return{
    user,
    loggedIn,
    loadingAuth,
    error
  }
}