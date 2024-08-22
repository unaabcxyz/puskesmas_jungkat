import React, { useEffect, useState } from "react";
import Link from "next/link";
function Dokter({dokter,index,matches,ubahFunc,hapusFunc}){
  const [styleTextTable,setStyleTextTable]=useState({
    fontSize:'12px',
    padding:'10px'
  })
  useEffect(()=>{
    if(matches==false){
       setStyleTextTable({...styleTextTable,['fontSize']:'14px'});
    }else{
      setStyleTextTable({...styleTextTable,['fontSize']:'12px'});
    }
  },[])
  const ubah=()=>{
    ubahFunc(index)
  }
  const  hapus=()=>{ 
      hapusFunc(index);
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
                <p style={styleTextTable}>Nama dokter</p>
              </td>
              <td key={'col-title-'+'3'}> 
                <p style={styleTextTable}>No dokter</p>
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
                <p style={styleTextTable}>{dokter.nama}</p>
              </td>
              <td key={"col-"+index+"-2"}> 
                <p style={styleTextTable}>{dokter.no_dokter}</p>
              </td>
              <td key={"col-"+index+"-3"}>
              <button className="btn btn-primary me-2 mb-2" style={{width:"75px"}} onClick={ubah}>ubah</button>
              <button className="btn btn-danger" style={{width:"75px"}} onClick={hapus}>hapus</button>
                </td>
          </tr>
        </React.Fragment>):(
             <tr style={{borderBottom:"2px solid #EEEEEE"}} key={'row'+index}>
                <td key={'col-'+index+'-0'}>  
                  <p style={styleTextTable}>{index+1}</p>
                </td>
                <td  key={'col-'+index+'-1'}>
                  <p style={styleTextTable}>{dokter.nama}</p>
                </td>
                <td key={'col-'+index+'-2'}> 
                  <p style={styleTextTable}>{dokter.no_dokter}</p>
                </td>
                <td  key={'col-'+index+'-3'}>
                    <button className="btn btn-primary me-2 mb-2" style={{width:"75px"}} onClick={ubah}>ubah</button>
                    <button className="btn btn-danger" style={{width:"75px"}} onClick={hapus}>hapus</button>
                </td>
             </tr>
        )
  ) 
}
export default Dokter;