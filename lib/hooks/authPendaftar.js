import { useState,useEffect } from "react";
export function useAuthPendaftar(){
  const[loggedInPendaftar,setLoggedInPendaftar]=useState(false);
  const[pendaftar,setPendaftar] = useState(null);
  const[loadingAuthPendaftar,setLoadingAuthPendaftar]=useState(true);
  const[errorPendaftar,setErrorPendaftar]=useState(null);
  
  useEffect(()=>{
      setLoadingAuthPendaftar(true);
      fetch('/api/get-session-pendaftar').then((res)=>res.json()).then((data)=>{
        if(data.loggedInPendaftar){
          console.log(data)
          setLoggedInPendaftar(true)
          setPendaftar(data.pendaftar)
        }
      }).catch((err)=>setErrorPendaftar(err)).finally(()=>setLoadingAuthPendaftar(false)) 
  },[])
  return{
    pendaftar,
    loggedInPendaftar,
    loadingAuthPendaftar,
    errorPendaftar
  }
}