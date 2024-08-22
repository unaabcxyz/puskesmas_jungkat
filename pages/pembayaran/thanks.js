import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axiosClient from "../api/axios.client";
// import { headers } from "next/headers";
export async function getServerSideProps(req,res){
  const order_id =req.query.order_id;
  return{
    props:{ 
      id:order_id
    }
  }
}
async function handleLogout(){
  const resp =await fetch('/api/logout-pendaftar',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    }
  })
  const data=await resp.json();
  if(data.success){
    return ;
  }
  throw new Error('Logout Gagal');
}
const Thanks=()=>{
  const router = useRouter()
  const [toggle,setToggle]=useState(false);
  useEffect(()=>{
    var {order_id}=router.query;
    var {status_code}=router.query;
    if(status_code==200){
      handleLogout();
      axiosClient.post('Pasien/setDataPembayaran',{id:order_id}).then(({data})=>{
        setToggle(true);  
      })
    }else{ 
      setToggle(false);
    }
  },[]) 
  return(
     toggle==true?(
    <div className="d-block mt-3 mx-auto" style={{width:'fit-content'}}>
          <h1>Terima kasih sudah melakukan pembayaran </h1>
    </div>):(
      <div className="mt-4 w-50 border rounded border-2 border-primary p-2 mx-auto">
          <h5 className="text-center fw-medium" >Pembayaran ditunda, silahkan kembali kehalaman pembayaran untuk melakukan pembayaran </h5>
       <div className="d-block mt-3 mx-auto" style={{width:'fit-content'}}>
          <button className="btn btn-primary" onClick={()=>{router.push('/pembayaran')}}>Kembali</button>
      </div>
      </div>
    )
   
  )    
}
export default Thanks;