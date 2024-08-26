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
      setStyleTextTable({...styleTextTable,['fontSize']:'8px'});
    }
  },[])
  return(
        index==0?(
        <React.Fragment>
          <thead>
            <tr >
              <td>
                <p style={styleTextTable}>No.</p>
              </td>
              <td>
                <p style={styleTextTable}>Nama Pasien</p>
              </td>
              <td> 
                <p style={styleTextTable}>Layanan</p>
              </td>
              <td> 
                <p style={styleTextTable}>Diagnosis</p>
              </td>
              <td> 
                <p style={styleTextTable}>Status</p>
              </td>
              <td> 
                <p style={styleTextTable}>Kelola</p>
              </td>

            </tr>
          </thead>         
            <tr style={{borderBottom:"2px solid #EEEEEE"}}>
            <td>
              <p style={styleTextTable}>{index+1}</p>
            </td>
            <td>
              <p style={styleTextTable}>{pasien.nama_lengkap}</p>
            </td>
            <td> 
              <p style={styleTextTable}>{pasien.pelayanan}</p>
            </td>
              {
                pasien.pelayanan=='poli gizi'?(
                  <td> 
                    <p style={styleTextTable}>{pasien.diagnosis_poli_gizi}</p>
                  </td>
                ):(pasien.pelayanan=='poli umum'?(
                  <td> 
                    <p style={styleTextTable}>{pasien.diagnosis_poli_umum}</p>
                  </td>
                ):(pasien.pelayanan=='poli gigi'?(
                <td> 
                  <p style={styleTextTable}>{pasien.diagnosis_poli_gigi}</p>
                </td>):(pasien.pelayanan=='IGD'?(
                   <td> 
                    <p style={styleTextTable}>{pasien.diagnosis_igd}</p>
                 </td>
                ):( <td> 
                  <p style={styleTextTable}>{pasien.diagnosis_poli_kiakb}</p>
                </td>))))
              }
            <td> 
              <p style={styleTextTable}>{pasien.status}</p>
            </td>
            <td>
                  <Link href={`riwayat/pasiens/${index}`}>
                    <button className="btn btn-info" style={{fontSize:styleTextTable.fontSize}}>Detil</button>   
                  </Link>
                </td>
          </tr>
        </React.Fragment>):(
             <tr style={{borderBottom:"2px solid #EEEEEE"}}>
                <td>
                  <p style={styleTextTable}>{index+1}</p>
                </td>
                <td>
                  <p style={styleTextTable}>{pasien.nama_lengkap}</p>
                </td>
                <td> 
                   <p style={styleTextTable}>{pasien.pelayanan}</p>
                </td>
                {
                pasien.pelayanan=='poli gizi'?(
                  <td> 
                    <p style={styleTextTable}>{pasien.diagnosis_poli_gizi}</p>
                  </td>
                ):(pasien.pelayanan=='poli umum'?(
                  <td> 
                    <p style={styleTextTable}>{pasien.diagnosis_poli_umum}</p>
                  </td>
                ):(pasien.pelayanan=='poli gigi'?(
                <td> 
                  <p style={styleTextTable}>{pasien.diagnosis_poli_gigi}</p>
                </td>):(pasien.pelayanan=='IGD'?(
                   <td> 
                    <p style={styleTextTable}>{pasien.diagnosis_igd}</p>
                 </td>
                ):( <td> 
                  <p style={styleTextTable}>{pasien.diagnosis_kiakb}</p>
                </td>))))
              }
                <td> 
                   <p style={styleTextTable}>{pasien.status}</p>
                </td>
                <td>
                 <Link href={`riwayat/pasiens/${index}`}>
                    <button className="btn btn-info" style={{fontSize:styleTextTable.fontSize}}>Detil</button>   
                  </Link>
                </td>
             </tr>
        )
  ) 
}
export default Pasien;