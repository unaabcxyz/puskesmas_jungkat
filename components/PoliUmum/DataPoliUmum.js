import axiosClient from "@/pages/api/axios.client";
import { useEffect } from "react";
import { useDispatch  } from "react-redux";
import Link from "next/link";
import Pasien from "./Pasien";
function DataPoliUmum({listPasien,matches}){
  const dispatch = useDispatch();
  useEffect(()=>{
    axiosClient.get('Poliumum/getData').then(({data})=>{
      dispatch({type:"ISI_DATA_POLI_UMUM",dataPasien:data.data})
    }).catch(error=>{ 
        
    })
  },[])
  return(   
  <table className="w-100 table">{
    listPasien.map((pasien,index)=>(
      <Pasien pasien={pasien} index={index} matches={matches}/>
    ))}
  </table>
  )
    // <Link href={`poliUmum/pasiens/${2}`}>Tes</Link>)
}
export default DataPoliUmum