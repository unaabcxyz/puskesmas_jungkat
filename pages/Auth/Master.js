import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/auth";
import { useRouter } from "next/router";
import styles from '../../styles/Master.module.css';
import useDeviceSize from "@/components/UseDevice/useDeviceSize";
async function handleLogout(){
  const resp =await fetch('/api/logout',{
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
const Master=(props)=>{
  const Swal = require('sweetalert2');
  const [width,height] = useDeviceSize();
  const[styleSideBarIcon,setStyleSideBarIcon]=useState({
    marginLeft:"1%",
  })
  const router=useRouter();
  const [styleSideBarBox,setStyleSideBarBox]=useState({
    display:"none",
    width:"0%",
  })
  const[styleMainMenu,setStyleMainMenu]=useState({
    width:"100%"
  });
  const {loadingAuth,loggedIn,user}=useAuth();
  useEffect(()=>{
    setStyleSideBarBox({...styleSideBarBox,['display']:"none",['width']:"0%"});
  },[])
  useEffect(()=>{
    if(props.toggleSideBar==false){
      setStyleSideBarBox({...styleSideBarBox,['display']:"inline-block",['width']:"15%"});
      setStyleMainMenu({...styleMainMenu,['width']:"85%"})
    }else{
      setStyleSideBarBox({...styleSideBarBox,['display']:"none",['width']:"15%"});
      setStyleMainMenu({...styleMainMenu,['width']:"85%"})
    }
  },[props.toggleSideBar])
  const redirectToaPoliUmum=()=>{
      router.push('/poliUmum')
  }
  const redirectToIGD=()=>{
      router.push('/main')
  }
  const redirectToPoliGizi=()=>{
      router.push('/poliGizi')
  }
  const redirectToPoliGigi=()=>{ 
      router.push('/poliGigi');
  }
  const redirectToKiaKb=()=>{ 
      router.push('/kiaKb');
  }
  const redirectToKelolaDokter=()=>{
    router.push('/dokterPoli');
  }
  const redirectToKelolaRujuk=()=>{    
    router.push('/rujuk')
  }
  const redirectToKelolaRiwayat=()=>{  
    router.push('/riwayat'); 
  }
  const doLogout=()=>{
    Swal.fire({
      title: '<p>Loading Logout</p>',
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
        title: "Logout Berhasil!",
        html: "Anda akan diarahkan kehalaman login <b></b> milliseconds lagi.",
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
          router.push('/');
        }
      });
    })
  }
  return(
    <React.Fragment>
      {
        user!=null?(
            <div className="vh-100 bg-light" style={styleSideBarBox}>
                <div className="w-100 align-items-center  d-flex  mt-5">
                    <div className="box_container  h-75 d-block w-100" >
                      <div className={styles.box_menu_sidebar+" mx-auto px-2 mt-2 pt-2"} style={{width:"90%",cursor:"pointer"}} onClick={()=>{router.push('/utama')}} >
                            <div className={styles.icon_menu_sidebar+" d-inline-block"}>
                                <img src="https://simpuskesmasjungkat.online/iconFoto/home.png" className="w-100 h-100" />
                            </div>
                            {props.matches==false?( <div className="d-inline-block ms-2">
                                <p className={styles.text_menu+" fw-bold"} style={{color:"#86A3B8"}} >Menu Utama</p>
                            </div>):(null)}
                        </div>
                        {user.nama_poli=='igd'||user.nama_poli=='admin'?(
                          <div className={styles.box_menu_sidebar+" mx-auto px-2 mt-2 pt-2"} onClick={redirectToIGD}  style={{width:"90%",cursor:"pointer"}} >
                              <div className={styles.icon_menu_sidebar+" d-inline-block"}>
                                  <img src="https://simpuskesmasjungkat.online/iconFoto/kelola_poli.png" className="w-100 h-100" />
                              </div>
                                {
                                props.matches==false?( <div className="d-inline-block ms-2">
                                  <p className={styles.text_menu+" fw-bold"} style={{color:"#86A3B8",fontSize:"12px"}} >IGD</p>
                              </div>):(null)
                                }
                          </div>
                        ):(null)}
                        {user.nama_poli=='poli umum'||user.nama_poli=='admin'?(
                          <div className={styles.box_menu_sidebar+" mx-auto px-2 mt-2 pt-2"} style={{width:"90%",cursor:"pointer"}} onClick={redirectToaPoliUmum}>
                              <div className={styles.icon_menu_sidebar+" d-inline-block"}>
                                  <img src="https://simpuskesmasjungkat.online/iconFoto/kelola_poli.png" className="w-100 h-100" />
                              </div>
                              {
                                props.matches==false ?( <div className="d-inline-block ms-2">
                                  <p className={styles.text_menu+" fw-bold"} style={{color:"#86A3B8",fontSize:"12px"}} >Kelola Poli Umum </p>
                              </div>):(null)
                              }
                          </div>
                        ):(null)}
                         {user.nama_poli=='poli gigi'||user.nama_poli=='admin'?(
                          <div className={styles.box_menu_sidebar+" mx-auto px-2 mt-2 pt-2"} onClick={redirectToPoliGigi} style={{width:"90%",cursor:"pointer"}} >
                              <div className={styles.icon_menu_sidebar+" d-inline-block"}>
                                <img src="https://simpuskesmasjungkat.online/iconFoto/kelola_poli.png" className="w-100 h-100" />
                              </div>
                              {props.matches==false?( <div className="d-inline-block ms-2">
                                  <p className={styles.text_menu+" fw-bold"} style={{color:"#86A3B8",fontSize:"12px"}} >Kelola Poli Gigi</p>
                              </div>):(null)}
                          </div>
                        ):(null)}
                         {user.nama_poli=='poli gizi'||user.nama_poli=='admin'?(
                          <div className={styles.box_menu_sidebar+" mx-auto px-2 mt-2 pt-2"} onClick={redirectToPoliGizi} style={{width:"90%",cursor:"pointer"}} >
                              <div className={styles.icon_menu_sidebar+" d-inline-block"}>
                              <img src="https://simpuskesmasjungkat.online/iconFoto/kelola_poli.png" className="w-100 h-100" />
                              </div>
                              {props.matches==false?( <div className="d-inline-block ms-2">
                                  <p className={styles.text_menu+" fw-bold"} style={{color:"#86A3B8",fontSize:"12px"}} >Kelola Poli Gizi</p>
                              </div>):(null)}
                          </div>
                        ):(null)}
                       
                        {user.nama_poli=='kia/kb'||user.nama_poli=='admin'?(
                           <div className={styles.box_menu_sidebar+" mx-auto px-2 mt-2 pt-2"} onClick={redirectToKiaKb} style={{width:"90%",cursor:"pointer"}} >
                              <div className={styles.icon_menu_sidebar+" d-inline-block"}>
                                <img src="https://simpuskesmasjungkat.online/iconFoto/kelola_poli.png" className="w-100 h-100" />
                              </div>
                              {props.matches==false?( <div className="d-inline-block ms-2">
                                  <p className={styles.text_menu+" fw-bold"} style={{color:"#86A3B8",fontSize:"12px"}} >Kelola KIA/KB</p>
                              </div>):(null)}
                          </div>
                        ):(null)}
                          {user.nama_poli=='admin'?(
                            <div>
                              <div className={styles.box_menu_sidebar+" mx-auto px-2 mt-2 pt-2"} style={{width:"90%",cursor:"pointer"}} onClick={()=>{router.push('/pasien')}}>
                                <div className={styles.icon_menu_sidebar+" d-inline-block"}>
                                    <img src="https://simpuskesmasjungkat.online/iconFoto/kelola_user.png" className="w-100 h-100" />
                                </div>
                                {props.matches==false?( <div className="d-inline-block ms-2">
                                    <p className={styles.text_menu+" fw-bold"} style={{color:"#86A3B8"}} >Kelola  Pasien</p>
                                </div>):(null)}
                            </div>
                            <div className={styles.box_menu_sidebar+" mx-auto px-2 mt-2 pt-2"} style={{width:"90%",cursor:"pointer"}} onClick={redirectToKelolaDokter}>
                                <div className={styles.icon_menu_sidebar+" d-inline-block"}>
                                    <img src="https://simpuskesmasjungkat.online/iconFoto/kelola_user.png" className="w-100 h-100" />
                                </div>
                                {props.matches==false?( <div className="d-inline-block ms-2">
                                    <p className={styles.text_menu+" fw-bold"} style={{color:"#86A3B8"}} >Kelola Dokter </p>
                                </div>):(null)}
                            </div>
                          
                            <div className={styles.box_menu_sidebar+" mx-auto px-2 mt-2 pt-2"} style={{width:"90%",cursor:"pointer"}} onClick={redirectToKelolaRiwayat} >
                                <div className={styles.icon_menu_sidebar+" d-inline-block"}>
                                    <img src="https://simpuskesmasjungkat.online/iconFoto/riwayat.png" className="w-100 h-100" />
                                </div>
                                {props.matches==false?( <div className="d-inline-block ms-2">
                                    <p className={styles.text_menu+" fw-bold"} style={{color:"#86A3B8"}} >Kelola Riwayat</p>
                                </div>):(null)}
                            </div>
                          </div> 
                        ):(null)}
                        {user.nama_poli!='admin'?(<div className={styles.box_menu_sidebar+" mx-auto px-2 mt-2 pt-2"} onClick={()=>{router.push('/ubahPassword')}} style={{width:"90%",cursor:"pointer"}} >
                              <div className={styles.icon_menu_sidebar+" d-inline-block"}>
                                <img src="https://simpuskesmasjungkat.online/iconFoto/kelola_poli.png" className="w-100 h-100" />
                              </div>
                              {props.matches==false?( <div className="d-inline-block ms-2">
                                  <p className={styles.text_menu+" fw-bold"} style={{color:"#86A3B8",fontSize:"12px"}} >Ubah Password</p>
                              </div>):(null)}
                          </div>):(null)}
                       
                        
                        <div className={styles.box_menu_sidebar+" mx-auto px-2 mt-2 pt-2"} style={{width:"90%",cursor:"pointer"}} onClick={doLogout} >
                            <div className={styles.icon_menu_sidebar+" d-inline-block"}>
                                <img src="https://simpuskesmasjungkat.online/iconFoto/power.png" className="w-100 h-100" />
                            </div>
                            {props.matches==false?( <div className="d-inline-block ms-2">
                                <p className={styles.text_menu+" fw-bold"} style={{color:"#86A3B8"}} >Logout</p>
                            </div>):(null)}
                        </div>
                    </div>
                </div>
            </div>
        ):(null)
      }
    
    </React.Fragment>
  )
}
export default Master;