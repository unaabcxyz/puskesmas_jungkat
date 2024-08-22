import React, { useEffect, useState } from "react";
import Link from "next/link";
function Pasien({pasien,index,matches}){
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
  return(
        index==0?(
        <React.Fragment>
          <thead>
            <tr key={'row-title'}>
              <td key={'col-title-'+'1'}>
                <p style={styleTextTable}>No.</p>
              </td>
              <td key={'col-title-'+'2'}>
                <p style={styleTextTable}>Nama Pasien</p>
              </td>
              <td key={'col-title-'+'3'}> 
                <p style={styleTextTable}>NIK</p>
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
                <p style={styleTextTable}>{pasien.nama_lengkap}</p>
              </td>
              <td key={"col-"+index+"-2"}> 
                <p style={styleTextTable}>{pasien.NIK}</p>
              </td>
              <td key={"col-"+index+"-3"}>
                  <Link href={`main/pasiens/${index}`}>
                    <button className="btn btn-success">Kelola</button>   
                  </Link>
                </td>
          </tr>
        </React.Fragment>):(
             <tr style={{borderBottom:"2px solid #EEEEEE"}} key={'row'+index}>
                <td key={'col-'+index+'-0'}>  
                  <p style={styleTextTable}>{index+1}</p>
                </td>
                <td  key={'col-'+index+'-1'}>
                  <p style={styleTextTable}>{pasien.nama_lengkap}</p>
                </td>
                <td key={'col-'+index+'-2'}> 
                  <p style={styleTextTable}>{pasien.NIK}</p>
                </td>
                <td  key={'col-'+index+'-3'}>
                 <Link href={`main/pasiens/${index}`}>
                    <button className="btn btn-success">Kelola</button>   
                  </Link>
                </td>
             </tr>
        )
  ) 
}
export default Pasien;