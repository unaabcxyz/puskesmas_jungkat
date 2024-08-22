import { useAuth } from "@/lib/hooks/auth";
import { useRouter } from "next/navigation";
import Master from "../Auth/Master";
import styles from '../../styles/Main.module.css';
import React, { useEffect, useState ,useRef} from "react";
import useDeviceSize from "@/components/UseDevice/useDeviceSize";
import { useSelector,shallowEqual } from "react-redux";
import DataRujuk from "@/components/Rujuk/DataRujuk";
import CryptoJS from "crypto-js"; 
import axiosClient from "../api/axios.client";
import { useDispatch } from "react-redux"; 
function useGlobalListPasienRujuk(){
    return useSelector((state)=>state.listPasienRujuk,shallowEqual);
}
const mainRujuk=()=>{
  const router = useRouter();
  const Swal = require('sweetalert2');
  const [admin,setAdmin]=useState({
    email:'',
    id:0
  });
  const [width, height] = useDeviceSize();
  const pasienRujuk = useGlobalListPasienRujuk();
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
  const {loadingAuth,loggedIn,user}=useAuth();
  useEffect(()=>{
    if(user!==null){
      setAdmin({...admin,['id']:user.id,['email']:user.email});
    }
  },[user])
  if(!loadingAuth && !loggedIn){
    Swal.close();
    router.push('/');
  }
  const  [styleContainer,setStyleContainer]=useState({
    marginLeft:"60px"
  })
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
  return(
    admin.id>0?(
      <div>
        <div className="d-block bg-danger align-top " style={styleSideBarIcon}  onClick={toggleSidebarFunc}>
          <div className={styles.cont_sidebar_icon+" d-flex align-items-center  rounded-circle  shadow "} style={{cursor:"pointer"}}>
            <img src="https://website.penjadwalanmatapelajaransman2sekayam.xyz/iconFoto/menuSidebar2.png" className="w-50 h-50 mx-auto" />
          </div>
        </div>
        <Master toggleSideBar={toggleSideBar2.current} matches={matches}/>
        <div className=" w-75 d-inline-block align-top mt-5" style={styleContainer} >
            <h5>Rujuk</h5>
            <DataRujuk listPasien={pasienRujuk} 
                      matches={matches}/>
       </div>
      </div>
    ):(null)
  )
}
export  default  mainRujuk;