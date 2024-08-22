import axiosClient from "@/pages/api/axios.client";
import { useEffect } from "react";
import { useDispatch  } from "react-redux";
import Link from "next/link";
import Dokter from "./Dokter";
function DataDokter({listDokter,
                    matches,
                    showModalTambahFunc,
                    showModalHapusFunc,
                    showModalUbahFunc}){
  const dispatch = useDispatch();
  useEffect(()=>{
      axiosClient.get('Dokterpoli/getData').then(({data})=>{
          console.log(data.data); 
        dispatch({type:'ISI_DATA_DOKTER_POLI',
                 allDataDokterPoli:data.data
          });
      }).catch (error=>{
          
      })
  },[])
  const showModalTambah=()=>{
    dispatch({type:'PILIH_DATA_DOKTER_POLI',
      pilihDokterPoli:null})
      showModalTambahFunc(true)
  }
  const ubahFunc=(index)=>{ 
      dispatch({type:'PILIH_DATA_DOKTER_POLI',
                pilihDokterPoli:listDokter[index]
      })
      showModalUbahFunc(true)
  }
  const  hapusFunc=(index)=>{
    dispatch({type:'PILIH_DATA_DOKTER_POLI',
      pilihDokterPoli:listDokter[index]
    })
    showModalHapusFunc(true)
  }
   
  return(
    <div>
      <div className="r">
        <div style={{width:"fit-content"}} className="ms-auto">
        <button className="btn btn-success" onClick={showModalTambah}>Tambah Dokter</button>
        </div>
      </div>
      <table className="w-100">
        
      {listDokter.length>0?(
         listDokter.map((dokter,index)=>(
          <Dokter dokter={dokter} index={index} matches={matches} ubahFunc={ubahFunc} hapusFunc={hapusFunc}/>
        ))):(null)
      }
      </table>
    </div>
   
  )
}
export default DataDokter;