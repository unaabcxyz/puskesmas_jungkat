import { useAuth } from "@/lib/hooks/auth";
import { useRouter } from "next/navigation";
import Master from "../Auth/Master";
import styles from '../../styles/Main.module.css';
import React, { useEffect, useState ,useRef} from "react";
import { shallowEqual, useSelector } from 'react-redux';
import DataIGD from "@/components/Main/DataIGD";
import useDeviceSize from "@/components/UseDevice/useDeviceSize";
import Header from "../Auth/Header";
import axiosClient from "../api/axios.client";
import { useDispatch } from "react-redux";
function useGlobalListPasien(){ 
  return useSelector((state)=>state.listPasien,shallowEqual)
}
const Main=()=>{ 
  const router = useRouter();
  const Swal = require('sweetalert2');
  const listPasien=useGlobalListPasien();
  const [admin,setAdmin]=useState({
    email:'',
    id:0
  });
  const [width, height] = useDeviceSize();
  const [matches, setMatches] = useState(false);
  const dispatch = useDispatch();
  useEffect(()=>{ 
    if(width>480){
      desktopView(); 
      setMatches(false)
    }else{
      mobileView();
      setMatches(true);
    }
  },[width])
  const[styleSideBarIcon,setStyleSideBarIcon]=useState({
    marginLeft:"1%",
  })
  const toggleSideBar2=useRef(true);
  const {loadingAuth,loggedIn,user}=useAuth();
  useEffect(()=>{
    console.log(user)
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
  
  const  [styleContainer,setStyleContainer]=useState({
    marginLeft:"60px",
    width:'75%',
    marginTop:'58px'
  })
  const [styleHeader,setStyleHeader]=useState({
    logo:{
      width:"50px",
    },
    nama_instansi:{ 
      fontSize:'6px'   
    },
    menu_text:{
      fontSize:'6px'
    },
    box_header:{
      height:'40px'
    },
    container:{
       width:'75%'
    },
    box_menu:{
        width:50
    }
  })
  const [cariIpt,setCariIpt]=useState("")
  const [styleWidthHeader,setStyleWidthHeader]=useState("100%")
  const mobileView=()=>{ 
      setStyleHeader({...styleHeader,['logo']:{width:"25px"},
                                    ['nama_instansi']:{fontSize:'6px'},
                                    ['menu_text']:{fontSize:'6px'},
                                    ['box_header']:{height:'40px'},
                                    ['box_menu']:{width:12},
                                    ['container']:{width:'75%'}})
  }
  const desktopView=()=>{
    setStyleHeader({...styleHeader,['logo']:{width:"50px"},
                                ['nama_instansi']:{fontSize:'14px'},
                                ['box_menu']:{width:20},
                                ['menu_text']:{fontSize:'14px'},
                                ['box_header']:{height:'60px'},
                                ['container']:{width:'50%'}})
  }

  const toggleSidebarFunc=()=>{
    if(toggleSideBar2.current == false){
      if(matches==false){
        setStyleHeader({...styleHeader,['logo']:{width:'50px'}})
        setStyleWidthHeader('100%')
        setStyleSideBarIcon({...styleSideBarIcon,['marginLeft']:"1%"})
        setStyleContainer({...styleContainer,['marginLeft']:'60px'});
      }else{
        setStyleHeader({...styleHeader,['logo']:{width:'2px5'}})
        setStyleWidthHeader('100%')
        setStyleSideBarIcon({...styleSideBarIcon,['marginLeft']:"1%"})
        setStyleContainer({...styleContainer,['marginLeft']:'40px'});
      }  
      toggleSideBar2.current = true;
      
    }else{
        if(matches==false){
          setStyleHeader({...styleHeader,['logo']:{width:'50px'}})
          setStyleWidthHeader('85%')
          setStyleSideBarIcon({...styleSideBarIcon,['marginLeft']:"13.8%"})
          setStyleContainer({...styleContainer,['marginLeft']:'60px'});
        }else{
          setStyleHeader({...styleHeader,['logo']:{width:'25px'}})
          setStyleWidthHeader('85%')
          setStyleSideBarIcon({...styleSideBarIcon,['marginLeft']:"10.8%"})
          setStyleContainer({...styleContainer,['marginLeft']:'10px'});
        }toggleSideBar2.current = false;
    }
  }
  const  cariPasien=()=>{
    Swal.showLoading();
    axiosClient.post('Igd/cariDataIgd',{search:cariIpt}).then(({data})=>{
      dispatch({type:"ISI_DATA_PASIEN",dataPasien:data});
      console.log(data);
      Swal.close();
    })
    Swal.close();
  }
  //batas fungsi tersendiri//
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
                      <h5>Kelola Data IGD</h5>
                          <div className={"input-group flex-nowrap "+matches==false?('w-25'):('w-50')}>
                           <input type="text" class="form-control" placeholder="Cari Pasien" value={cariIpt} onKeyDown={(e)=>{e.key=='Enter'?(cariPasien()):(null)}} onChange={(e)=>{setCariIpt(e.target.value)}} aria-label="Username" aria-describedby="addon-wrapping"/>
                          </div>
                        <DataIGD listPasien={listPasien} />
                  </div>
              </div>
          </div>
        ):(null)
  )
}
export default Main;