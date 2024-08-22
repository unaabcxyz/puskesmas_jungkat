import axiosClient from "@/pages/api/axios.client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Pasien from "./Pasien";
function DataRujuk({listPasien,matches}){
  const dispatch=useDispatch();
  useEffect(()=>{
    axiosClient.get('Rujuk/getData').then(({data})=>{
        console.log(data) 
        dispatch({type:'ISI_DATA_LIST_RUJUK',
                  dataPasien:data.data,
        });
    })
  }, [])
  return(
    <table className="table">{
    listPasien.length>0?(listPasien.map((pasien,index,matches)=>(
      <Pasien pasien={pasien} index={index} matches={matches}/>
    ))):(null)
    }
    </table>
    // <h1>Test</h1>
  )
}
export default DataRujuk;