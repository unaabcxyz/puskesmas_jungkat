import { useAuth } from "@/lib/hooks/auth";
import { useRouter } from "next/navigation";
import Master from "../Auth/Master";
import styles from '../../styles/Main.module.css';
import React, { useEffect, useState ,useRef} from "react";
import useDeviceSize from "@/components/UseDevice/useDeviceSize";
import { useSelector,shallowEqual } from "react-redux";
import DataKiaKb from "@/components/KiaKb/DataKiaKb";
import Header from "../Auth/Header";
import { useDispatch } from "react-redux";
import axiosClient from "../api/axios.client";
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
function useGlobalListPasienKiaKb(){
  return useSelector((state)=>state.listPasienKiaKb,shallowEqual)
}
const mainKiaKb=()=>{
  const router = useRouter();
  const Swal = require('sweetalert2');
  const [admin,setAdmin]=useState({
    email:'',
    id:0
  });
  const [width, height] = useDeviceSize();
  const listPasienKiaKb = useGlobalListPasienKiaKb();
  const [matches, setMatches] = useState(false)
  const[styleSideBarIcon,setStyleSideBarIcon]=useState({
    marginLeft:"1%",
  })
  useEffect(()=>{
    if(width>480){
      setMatches(false)
      setStyleContainer({...styleContainer,['width']:'900px',marginTop:'70px'})
    }else{
        setMatches(true);
        setStyleContainer({...styleContainer,['width']:'250px',marginTop:'50px'})
    }
  }, [height]) 
  const {loadingAuth,loggedIn,user}=useAuth();
  useEffect(()=>{
    if(user!==null){
      if(user.nama_poli!='kia/kb'&&user.nama_poli!='admin'){
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
  const  [styleContainer,setStyleContainer]=useState({
    marginLeft:"60px",
    width:'250px',
    marginTop:'20px'
  })
  const dispatch = useDispatch();
  const toggleSideBar2=useRef(true);
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
    axiosClient.post('Kiakb/cariDataKiaKb',{search:cariIpt}).then(({data})=>{
      console.log(data);
      dispatch({type:'ISI_DATA_KIA_KB',dataPasien:data})
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
                  <h5>Kelola Data KIA/KB</h5>
                  <div className={"input-group flex-nowrap "+matches==false?('w-25'):('w-50')}>
                           <input type="text" class="form-control" placeholder="Cari Pasien" value={cariIpt} onKeyDown={(e)=>{e.key=='Enter'?(cariPasien()):(null)}} onChange={(e)=>{setCariIpt(e.target.value)}} aria-label="Username" aria-describedby="addon-wrapping"/>
                      </div>
                  <DataKiaKb listPasien={listPasienKiaKb}/>
              </div>
          </div>
      </div>
    //   <div>
    //     <div className="d-block bg-danger align-top " style={styleSideBarIcon}  onClick={toggleSidebarFunc}>
    //       <div className={styles.cont_sidebar_icon+" d-flex align-items-center  rounded-circle  shadow "} style={{cursor:"pointer"}}>
    //         <img src="https://website.penjadwalanmatapelajaransman2sekayam.xyz/iconFoto/menuSidebar2.png" className="w-50 h-50 mx-auto" />
    //       </div>
    //     </div>
    //     <Master toggleSideBar={toggleSideBar2.current} matches={matches}/>
    //     <div className=" w-75 d-inline-block align-top mt-5" style={styleContainer} >
    //         <h5>Kelola KIA/KB</h5>
    //         <DataKiaKb listPasien={listPasienKiaKb}/>
    //    </div>
    // </div>
    ):(null)
  )
}
export default mainKiaKb;