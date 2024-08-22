import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
function RowPasien({pasien,index,matches,showModalUbahFunc,showModalHapusFunc}){
  const [styleTextTable,setStyleTextTable]=useState({
    fontSize:'12px',
    padding:'10px'
  })
  const dispatch = useDispatch();
  useEffect(()=>{
    if(matches==false){
       setStyleTextTable({...styleTextTable,['fontSize']:'14px'});
    }else{
      setStyleTextTable({...styleTextTable,['fontSize']:'12px'});
    }
  },[])
  const ubah=()=>{
    dispatch({type:'PILIH_RUJUK',pilihRujuk:pasien})
    showModalUbahFunc(true)
  }
  const hapus=()=>{ 
    dispatch({type:'PILIH_RUJUK',pilihRujuk:pasien});
    showModalHapusFunc(true);
  }
  return(
    index==0?(
      <React.Fragment>
        <thead>
          <tr key={'row-title'}>
            <td key={'col-title-'+'1'}>
              <p style={styleTextTable}>No.</p>
            </td>
            <td key={'col-title-'+'2'}>
              <p style={styleTextTable}>Nama Rujuk</p>
            </td>
            <td key={'col-title-'+'3'}> 
              <p style={styleTextTable}>Waktu Rujuk</p>
            </td>
            <td key={'col-title-'+'4'}> 
              <p style={styleTextTable}>Kelola</p>
            </td>
          </tr>
        </thead>         
          <tr style={{borderBottom:"2px solid #EEEEEE"}} key={'row'+index}>
            <td  key={"col-"+index+"-0"}>
              <p style={styleTextTable}>{index+1}</p>
            </td>
            <td key={"col-"+index+"-1"}>
              <p style={styleTextTable}>{pasien.nama_rujuk}</p>
            </td>
            <td key={"col-"+index+"-2"}> 
              <p style={styleTextTable}>{pasien.tanggal_rujuk}</p>
            </td>
            <td key={"col-"+index+"-3"}>
              <button className="btn btn-primary  me-2"  onClick={ubah}style={{width:"75px"}}>ubah</button>
              <button className="btn btn-danger " onClick={hapus} style={{width:"75px"}}>hapus</button>
                
             </td>
        </tr>
      </React.Fragment>):(
           <tr style={{borderBottom:"2px solid #EEEEEE"}} key={'row'+index}>
              <td key={'col-'+index+'-0'}>  
                <p style={styleTextTable}>{index+1}</p>
              </td>
              <td  key={'col-'+index+'-1'}>
                <p style={styleTextTable}>{pasien.nama_rujuk}</p>
              </td>
              <td key={'col-'+index+'-2'}> 
                <p style={styleTextTable}>{pasien.tanggal_rujuk}</p>
              </td>
              <td  key={'col-'+index+'-3'}>
              <button className="btn btn-primary  me-2" onClick={ubah} style={{width:"75px"}}>ubah</button>
              <button className="btn btn-danger " onClick={hapus} style={{width:"75px"}}>hapus</button>
              </td>
           </tr>
      )
  )
}
export default RowPasien;