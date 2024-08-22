import axiosClient from "@/pages/api/axios.client";
import { useEffect } from "react";
import { useDispatch  } from "react-redux";
import Link from "next/link";
import Pasien from "./Pasien";
function DataKiaKb({listPasien,matches}){
  const dispatch = useDispatch();
  useEffect(()=>{
    axiosClient.get('Kiakb/getData').then(({data})=>{
        dispatch({type:'ISI_DATA_KIA_KB',dataPasien:data.data})
    }).catch(error=>{ 
        
    })
  },[])
  return(
    <table className="w-100">
      {
      listPasien.map((pasien,index)=>(
        <Pasien pasien={pasien} index={index} matches={matches}/>
      ))}
    </table>
  )
}
export default DataKiaKb;