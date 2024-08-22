import { useSelector,shallowEqual } from "react-redux";
import { useEffect, useState } from "react";
import { useAuthPendaftar } from "@/lib/hooks/authPendaftar";
import { useRouter } from "next/router";
import axiosClient from "../api/axios.client";
import Pasien from "@/components/KiaKb/Pasien";
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
async function bayar(dataPass){ 
  const response = await fetch('api/tokenizer/route/',{ 
    method:'POST',
    body:JSON.stringify(dataPass),
    headers:{
      'Content-Type':'application/json'
    }
  });
  const requestData=await response.json();
  if(requestData!=null){
    // axiosClient.post('')  
    axiosClient.post('Pasien/updateDataToken',{id:dataPass.id,token:requestData.token}).then(({data})=>{
        window.snap.pay(requestData.token,{
          onSuccess: function(result){
            /* You may add your own implementation here */
            alert("payment success!"); console.log(result);
          }
        })
    }) 
   }else{
      
  }

}

export default function Pembayaran(){ 
  // const pendaftar = useGlobalDataPendaftaran();
  const router =  useRouter();
  const Swal = require('sweetalert2');
  const {loadingAuthPendaftar,loggedInPendaftar,pendaftar}=useAuthPendaftar();
  const [pembayaranPasien,setPembayaranPasien]=useState({id:0,NIK:0,nama:'',tujuan_poliklinik:'',harga:0,token:''});
  useEffect(()=>{
    if(pendaftar!=null){
      axiosClient.post('Pasien/getDataPasien',{id:pendaftar.id}).then(({data})=>{
        setPembayaranPasien({...pembayaranPasien,['id']:data.id,
                                                  ['NIK']:data.NIK,
                                                  ['nama']:data.nama_lengkap,
                                                  ['harga']:data.harga,
                                                  ['tujuan_poliklinik']:data.tujuan_poliklinik,
                                                  ['token']:data.token})
      })
    }
  },[pendaftar])
  const  getDataPasien=()=>{
    var result={};
    axiosClient.post('Pasien/getDataPasien',{id:pendaftar.id}).then(({data})=>{   
      result=data
    })
    return result;
  }
  if(!loadingAuthPendaftar && !loggedInPendaftar){
    router.push('/pendaftaran');
  }
  useEffect(() => {
    // render midtrans snap token
    const snapScript='https://app.sandbox.midtrans.com/snap/snap.js';
    const clientKey = process.env.NEXT_PUBLIC_CLIENT
     
    const script = document.createElement('script');
    script.src = snapScript
    script.setAttribute('data-client-key',clientKey);
    script.async = true;
    
    document.body.appendChild(script);
    return ()=>{
        document.body.removeChild(script)
    }
  }, []);
  const doLogout=()=>{
    Swal.fire({
      title: '<p>Loading Penghapusan Data Pasien</p>',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
       Swal.showLoading()
      },
    })
    handleLogout().then(()=>{
      Swal.close();
      let timerInterval;
      Swal.fire({
        title: "penghapusan data berhasil!",
        html: "Penghapusan selesai dalam <b></b> milidetik lagi.",
        timer: 2000,
        timerProgressBar: true,
        allowOutsideClick:false,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          router.push('/pendaftaran');
        }
      });
    })
  }
  const bayarFunc=()=>{ 
    // console.log(pembayaranPasien)
    // event.preventDefault();
  //   const  data={ 
  //     id:pembayaranPasien.id, 
  //     productName:pembayaranPasien.tujuan_poliklinik, 
  //     price:pembayaranPasien.harga,
  //     quantity:1
  // }
  // console.log(data);
    console.log(pembayaranPasien);  
    if(pembayaranPasien.token!=''){
      window.snap.pay(pembayaranPasien.token,{
        onSuccess: function(result){
          /* You may add your own implementation here */
          alert("payment success!"); console.log(result);
        }
      })
    }else{
      bayar({id:pembayaranPasien.id,productName:pembayaranPasien.tujuan_poliklinik,price:pembayaranPasien.harga,quantity:1});
    }
  // 
    
    // const requestData = await response.json(); 
    // console.log(requestData);
  }
  return(
        <div className="w-50  p-2 mx-auto mt-5 rounded border border-2 border-primary">
            <h5 className="w-100 text-center fw-bold">Lakukan pembayaran pada pasien dengan data berikut:</h5>
            <h5 className="w-100 text-center">Nama Pasien: {pembayaranPasien.nama} </h5>
            <h5 className="w-100 text-center">NIK : {pembayaranPasien.NIK}</h5>
            <h5 className="w-100 text-center">Pelayanan : {pembayaranPasien.tujuan_poliklinik}</h5>
            <div style={{width:'fit-content'}} className="mx-auto">
                <button className="btn btn-primary  mb-2" onClick={bayarFunc}>Bayar</button>
            </div>
            <div style={{width:'fit-content'}} className="mx-auto">
                <button className="btn btn-danger" onClick={doLogout}>Hapus pendaftaran pasien</button>
            </div>
        </div>
    
    // {
    // }
    // <h1>{pendaftar.id}</h1>
  )
}