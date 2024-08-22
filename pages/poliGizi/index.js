import { useAuth } from "@/lib/hooks/auth";
import { useRouter } from "next/navigation";
import Master from "../Auth/Master";
import styles from '../../styles/Main.module.css';
import React, { useEffect, useState ,useRef} from "react";
import useDeviceSize from "@/components/UseDevice/useDeviceSize";
import DataPoliGizi from "@/components/PoliGizi/DataPoliGizi";
import { useSelector,shallowEqual } from "react-redux";
import Header from "../Auth/Header";
import axiosClient from "../api/axios.client";
import { useDispatch } from "react-redux";
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
function useGlobalListPasienPoliGizi(){
  return useSelector((state)=>state.listPasienPoliGizi,shallowEqual)
}
const mainPoliGizi=()=>{ 
  const router = useRouter();
  const Swal = require('sweetalert2');
  const [admin,setAdmin]=useState({
    email:'',
    id:0
  });
  const [width, height] = useDeviceSize();
  const listPasienPoliGizi = useGlobalListPasienPoliGizi();
  const [matches, setMatches] = useState(false)
  const[styleSideBarIcon,setStyleSideBarIcon]=useState({
    marginLeft:"1%",
  }); 
  const dispatch=useDispatch();
  useEffect(()=>{
    if(width>480){
      setMatches(false)
      setStyleContainer({...styleContainer,['width']:'900px',marginTop:'70px'})
    }else{
        setMatches(true);
        setStyleContainer({...styleContainer,['width']:'250px',marginTop:'50px'})
    }
  }, [height]) 
  const toggleSideBar2=useRef(true);
  const {loadingAuth,loggedIn,user}=useAuth();
  useEffect(()=>{
    if(user!==null){
      if(user.nama_poli!='poli gizi'&&user.nama_poli!='admin'){
        if(user.nama_poli=='poli gizi'){
          router.push('/poliGizi');
        }else if(user.nama_poli=='poli umum'){
          router.push('/poliUmum');
        }else if(user.nama_poli=='kia/kb'){
          router.push('/kiaKb');
        }else if(user.nama_poli=='igd'){
          router.push('/main');
        }else if(user.nama_poli=='poli gigi'){
          router.push('/poliGigi');
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
  const  [styleContainer,setStyleContainer]=useState({
    marginLeft:"60px",
    width:'250px',
    marginTop:'20px'
  })
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
  const [cariIpt,setCariIpt]=useState("")
  const  cariPasien=()=>{
    Swal.showLoading();
    axiosClient.post('Poligizi/cariDataPoliGizi',{search:cariIpt}).then(({data})=>{
      console.log(data);
      dispatch({type:"ISI_DATA_POLI_GIZI",dataPasien:data})
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
                      <h6>Kelola Data Poli Gizi</h6>
                      <div className={"input-group flex-nowrap "+matches==false?('w-25'):('w-50')}>
                           <input type="text" class="form-control" placeholder="Cari Pasien" value={cariIpt} onKeyDown={(e)=>{e.key=='Enter'?(cariPasien()):(null)}} onChange={(e)=>{setCariIpt(e.target.value)}} aria-label="Username" aria-describedby="addon-wrapping"/>
                      </div>
                      <DataPoliGizi listPasien={listPasienPoliGizi} matches={matches}/>
                  </div>
              </div>
          </div>
        ):(null)
  )
}
export default mainPoliGizi;