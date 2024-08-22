import axiosClient from "@/pages/api/axios.client";
import { useEffect } from "react";
import { useDispatch  } from "react-redux";
import Pasien from "./Pasien";
function DataPoliGigi({listPasien,matches}){
  const dispatch = useDispatch();
  useEffect(()=>{
    axiosClient.get('Poligigi/getData').then(({data})=>{
        dispatch({type:'ISI_DATA_POLI_GIGI',dataPasien:data.data})
    }).catch(error=>{ 
        
    })
  },[])
  return(
    <table className="table w-75">
      {
      listPasien.map((pasien,index)=>(
        <Pasien pasien={pasien} index={index} matches={matches}/>
      ))}
    </table>
  )
}
export default DataPoliGigi;