import axiosClient from "@/pages/api/axios.client";
import { useEffect } from "react";
import { useDispatch  } from "react-redux";
import Pasien from "./Pasien";
function DataPasien({listPasien,matches,showModalRujukFunc,showModalPulangFunc}){
  const dispatch = useDispatch();
  useEffect(()=>{
    axiosClient.get('Pasien/getDataPasienKelola').then(({data})=>{
        console.log(data);
        dispatch({type:'ISI_KELOLA_PASIEN',listPasien:data.data})
    }).catch(error=>{ 
        
    })
  },[])
  const  rujukFunc=(index)=>{
    dispatch({type:'PILIH_KELOLA_PASIEN',pasien:listPasien[index]});
    showModalRujukFunc(true);
  }
  const pulangFunc=(index)=>{ 
    dispatch({type:'PILIH_KELOLA_PASIEN',pasien:listPasien[index]});
    showModalPulangFunc(true);
  }
  return(
    <table className="table w-75">
      {
      listPasien.map((pasien,index)=>(
        <Pasien pasien={pasien} 
                index={index} 
                matches={matches} 
                rujukFunc={rujukFunc}
                pulangFunc={pulangFunc}/>
      ))}
    </table>
  )
}
export default DataPasien;