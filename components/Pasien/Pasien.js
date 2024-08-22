import React, { useEffect, useState } from "react";
import Link from "next/link";
function Pasien({pasien,index,matches,rujukFunc,pulangFunc}){
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
  const rujuk=()=>{ 
      rujukFunc(index)
  }
  const pulang=()=>{
     pulangFunc(index)
  }
  const isNumber=(value)=>{
      let isnum = /^\d+$/.test(value);
      return isnum;
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
                <p style={styleTextTable}>Nama Pasien</p>
              </td>
              <td key={'col-title-'+'3'}> 
                <p style={styleTextTable}>NIK</p>
              </td>
              <td key={'col-title-'+'3'}> 
                <p style={styleTextTable}>Status</p>
              </td>
              <td key={'col-title-'+'3'}> 
                <p style={styleTextTable}>Tanggal Inap</p>
              </td>
              <td key={'col-title-'+'3'}> 
                <p style={styleTextTable}>Hari Inap</p>
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
              <td key={"col-"+index+"-2"}> 
                <p style={styleTextTable}>{pasien.status}</p>
              </td>
              <td key={"col-"+index+"-2"}> 
                <p style={styleTextTable} className="text-center">{pasien.tanggal_text!=null?(pasien.tanggal_text):('-')}</p>
              </td>
              <td key={"col-"+index+"-2"}> 
                <p style={styleTextTable} className="text-center">{pasien.tanggal_text!=null?(pasien.selisih_hari):('-')}</p>
              </td>
              <td key={"col-"+index+"-3"}>
              {pasien.rawat_inap!=null&&pasien.rujuk==null&&pasien.rawat_inap.status_rawat_inap==0?(<button className="btn btn-success me-2  bg-primary text-light" onClick={pulang}>Pulang</button> ):(null)}
              {pasien.rawat_inap!=null&&pasien.rujuk==null&&pasien.rawat_inap.status_rawat_inap==0?(<button className="btn btn-success me-2  bg-success text-light" onClick={rujuk}>Rujuk</button> ):(null)}  

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
                <td key={"col-"+index+"-2"}> 
                  <p style={styleTextTable}>{pasien.status}</p>
                </td>
                <td key={"col-"+index+"-2"}> 
                  <p style={styleTextTable} className="text-center">{pasien.tanggal_text!=null?(pasien.tanggal_text):('-')}</p>
                </td>
                <td key={"col-"+index+"-2"}> 
                <p style={styleTextTable} className="text-center">{pasien.tanggal_text!=null?(pasien.selisih_hari):('-')}</p>
                </td>
                <td  key={'col-'+index+'-3'}>
                    {pasien.rawat_inap!=null&&pasien.rujuk==null&&pasien.rawat_inap.status_rawat_inap==0?(<button className="btn btn-success me-2  bg-primary text-light" onClick={pulang}>Pulang</button> ):(null)}
                    {pasien.rawat_inap!=null&&pasien.rujuk==null&&pasien.rawat_inap.status_rawat_inap==0?(<button className="btn btn-success me-2  bg-success text-light" onClick={rujuk}>Rujuk</button> ):(null)}  
                   
                 </td>
             </tr>
        )
  ) 
}
export default Pasien;