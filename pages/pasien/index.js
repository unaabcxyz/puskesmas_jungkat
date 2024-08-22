import { useAuth } from "@/lib/hooks/auth";
import { useRouter } from "next/navigation";
import Master from "../Auth/Master";
import styles from '../../styles/Main.module.css';
import React, { useEffect, useState ,useRef} from "react";
import useDeviceSize from "@/components/UseDevice/useDeviceSize";
import { useSelector,shallowEqual } from "react-redux";
import Header from "../Auth/Header";
import axiosClient from "../api/axios.client";
import { useDispatch } from "react-redux";
import DataPasien from "@/components/Pasien/DataPasien";
import ModalRujuk from "./modalRujuk";
import ModalPulang from "./modalPulang";
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
function useGlobalListPasien(){
  return useSelector((state)=>state.listKelolaPasien,shallowEqual)
}
function useGlobalPilihPasien(){
  return useSelector((state)=>state.pilihKelolaPasien,shallowEqual)
}

const mainKelolaPasien=()=>{ 
  const dispatch=useDispatch();
  const router = useRouter();
  const Swal = require('sweetalert2');
  const [admin,setAdmin]=useState({
    email:'',
    id:0
  });
  const listPasien = useGlobalListPasien();
  const pilihPasien = useGlobalPilihPasien();
  const [width, height] = useDeviceSize();
  const [matches, setMatches] = useState(false)
  const[styleSideBarIcon,setStyleSideBarIcon]=useState({
    marginLeft:"1%",
  })
  useEffect(()=>{
    if(width>480){
      setMatches(false)
    }else{
        setMatches(true);
    }
  }, [height]) 
  const toggleSideBar2=useRef(true);
  const {loadingAuth,loggedIn,user}=useAuth();
  const  [styleContainer,setStyleContainer]=useState({
    marginLeft:"60px",
     width:'75%',
    marginTop:'58px'
  })
  const [showModalRujuk,setShowModalRujuk]=useState(false);
  const [showModalPulang,setShowModalPulang]=useState(false);
  useEffect(()=>{
    if(user!==null){
      if(user.nama_poli!='admin'){
        if(user.nama_poli=='poli gizi'){
          router.push('/poliGizi');
        }else if(user.nama_poli=='poli umum'){
          router.push('/poliUmum');
        }else if(user.nama_poli=='kia/kb'){
          router.push('/kiaKb');
        }else if(user.nama_poli=='igd'){
          router.push('/main');
        }
      }else{
        setAdmin({...admin,['id']:user.id,['email']:user.email});
      }
    }
  },[user])
  if(!loadingAuth && !loggedIn){
    Swal.close();
    router.push('/');
  }
  const toggleSidebarFunc=()=>{
    if(toggleSideBar2.current == false){
        setStyleSideBarIcon({...styleSideBarIcon,['marginLeft']:"1%"});
        setStyleContainer({...styleContainer,['marginLeft']:'60px'});
        toggleSideBar2.current = true;
    }else{
        if(matches==false){
          setStyleSideBarIcon({...styleSideBarIcon,['marginLeft']:"13.8%"})
          setStyleContainer({...styleContainer,['marginLeft']:'60px'});
        }else{
          setStyleSideBarIcon({...styleSideBarIcon,['marginLeft']:"10.8%"})
          setStyleContainer({...styleContainer,['marginLeft']:'10px'});
        }toggleSideBar2.current = false;
    }
  }
  const showModalRujukFunc=(toggle)=>{
      setShowModalRujuk(toggle);
  }
  const showModalPulangFunc=(toggle)=>{ 
      setShowModalPulang(toggle)
  }
  //CRUD FUNC//
  const rujukAct=(formValue)=>{
    Swal.showLoading(); 
    axiosClient.post('Pasien/ubahRujuk',{
      id:pilihPasien.id,
      nama_rujuk:formValue.nama_rujuk
    }).then(({data})=>{ 
        Swal.close();
        var dataArr=listPasien;
        var index = dataArr.findIndex(function(dt){
          return data.id==dt.id
        });
        dataArr[index]=data;
        setShowModalRujuk(false)
        dispatch({type:'ISI_KELOLA_PASIEN',listPasien:dataArr})
        dispatch({type:'PILIH_KELOLA_PASIEN',pasien:{id:0,nama_lengkap:'',nama_rujuk:''}});
        // dispatch({type:'ISI_KELOLA_PASIEN',listPasien:data.data})
       
        Swal.fire({
          icon: "success",
          title: "Ubah Data Rawat Inap",
          text: "Data Rawat Inap Berhasil Diubah ke Rujuk",
        });
    })
  }
  const pulangAct=()=>{
    Swal.showLoading(); 
    axiosClient.post('Pasien/ubahRawatInap',{id:pilihPasien.id}).then(({data})=>{
        // console.log(data);
        var dataArr=listPasien;
        var index = dataArr.findIndex(function(dt){
          return data.id==dt.id
        });
        dataArr[index]=data;
        setShowModalPulang(false)
        dispatch({type:'ISI_KELOLA_PASIEN',listPasien:dataArr})
        dispatch({type:'PILIH_KELOLA_PASIEN',pasien:{id:0,nama_lengkap:'',nama_rujuk:''}});
        // setShowModalRujuk(false)
         
        Swal.fire({
          icon: "success",
          title: "Ubah Data Rawat Inap",
          text: "Data Rawat Inap Berhasil Diubah ke Rujuk",
        });
      })
  }
  const [cariIpt,setCariIpt]=useState("")
  const  cariPasien=()=>{
    Swal.showLoading();
    axiosClient.post('Pasien/cariPasien',{search:cariIpt}).then(({data})=>{
      console.log(data.data);
      dispatch({type:'ISI_KELOLA_PASIEN',listPasien:data.data})
      Swal.close();
    })
    Swal.close();
  }
  return(
    admin.id>0?(
      <div className="w-100">
              <div className="d-block bg-danger align-top " style={styleSideBarIcon}  onClick={toggleSidebarFunc}>
                <div className={styles.cont_sidebar_icon+" d-flex align-items-center  rounded-circle  shadow "} style={{cursor:"pointer"}}>
                  <img src="https://website.penjadwalanmatapelajaransman2sekayam.xyz/iconFoto/menuSidebar2.png" className="w-50 h-50 mx-auto" />
                </div>
              </div>
            <div className="d-block">
            <Header toggleSideBar={toggleSideBar2.current}/>
              <Master toggleSideBar={toggleSideBar2.current} matches={matches}/>
                  <div className=" d-inline-block  align-top " style={styleContainer}>
                  <h5>Kelola Pasien</h5>
                  <div className={"input-group flex-nowrap "+matches==false?('w-25'):('w-50')}>
                        <input type="text" class="form-control" placeholder="Cari Pasien" value={cariIpt} onKeyDown={(e)=>{e.key=='Enter'?(cariPasien()):(null)}} onChange={(e)=>{setCariIpt(e.target.value)}} aria-label="Username" aria-describedby="addon-wrapping"/>
                  </div>
                  <ModalRujuk  showModalRujuk={showModalRujuk} 
                               showModalRujukFunc={showModalRujukFunc} 
                               pilihPasien={pilihPasien}
                               rujukAct={rujukAct}/>
                  <ModalPulang  showModalPulang={showModalPulang} 
                               showModalPulangFunc={showModalPulangFunc} 
                               pilihPasien={pilihPasien}
                               pulangAct={pulangAct}/>
                  <DataPasien listPasien={listPasien} matches={matches} 
                              showModalRujukFunc={showModalRujukFunc}
                              showModalPulangFunc={showModalPulangFunc}/> 
                  </div>
              </div>
          </div>
    ):(null)
  )
}
export default mainKelolaPasien;