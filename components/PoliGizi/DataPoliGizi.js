import axiosClient from "@/pages/api/axios.client";
import { useEffect } from "react";
import { useDispatch  } from "react-redux";
import Link from "next/link";
import Pasien from "./Pasien";
function DataPoliGizi({listPasien,matches}){
  const dispatch = useDispatch();
  useEffect(()=>{
    axiosClient.get('Poligizi/getData').then(({data})=>{
        console.log(data);
        dispatch({type:"ISI_DATA_POLI_GIZI",dataPasien:data.data})
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
    // <Link href={`poliUmum/pasiens/${2}`}>Tes</Link>)
}
export default DataPoliGizi; 