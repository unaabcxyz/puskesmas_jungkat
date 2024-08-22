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
            <tr >
              <td>
                <p style={styleTextTable}>No.</p>
              </td>
              <td>
                <p style={styleTextTable}>Nama Pasien</p>
              </td>
              <td> 
                <p style={styleTextTable}>NIK</p>
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
              <p style={styleTextTable}>{pasien.NIK}</p>
            </td>
            <td>
                  <Link href={`rujuk/pasiens/${index}`}>
                    <button className="btn btn-success">Kelola</button>   
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
                  <p style={styleTextTable}>{pasien.NIK}</p>
                </td>
                <td>
                 <Link href={`rujuk/pasiens/${index}`}>
                    <button className="btn btn-success">Kelola</button>   
                  </Link>
                </td>
             </tr>
        )
  ) 
}
export default Pasien;