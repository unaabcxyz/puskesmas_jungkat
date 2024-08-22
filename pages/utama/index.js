import { useAuth } from "@/lib/hooks/auth";
import { useRouter } from "next/navigation";
import Master from "../Auth/Master";
import styles from '../../styles/Main.module.css';
import React, { useEffect, useState ,useRef} from "react";
import useDeviceSize from "@/components/UseDevice/useDeviceSize";
import Image from "next/image";
import Header from "../Auth/Header";
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
const Main=()=>{ 
  const router = useRouter();
  const Swal = require('sweetalert2');
  const [admin,setAdmin]=useState({
    email:'',
    id:0
  });
  const [width] = useDeviceSize();
  const [matches, setMatches] = useState(false)
  const [toggleDropDown,setToggleDropDown]=useState(false)
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
      setAdmin({...admin,['id']:user.id,['email']:user.email});
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
    width:'75%',
    marginTop:'58px'
  })
  const [styleHeader,setStyleHeader]=useState({
    logo:{
      width:50,
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
  const [styleWidthHeader,setStyleWidthHeader]=useState("100%")
  const mobileView=()=>{ 
      setStyleHeader({...styleHeader,['logo']:{width:25},
                                    ['nama_instansi']:{fontSize:'6px'},
                                    ['menu_text']:{fontSize:'6px'},
                                    ['box_header']:{height:'40px'},
                                    ['box_menu']:{width:12},
                                    ['container']:{width:'75%'}})
  }
  const desktopView=()=>{
    setStyleHeader({...styleHeader,['logo']:{width:50},
                                ['nama_instansi']:{fontSize:'14px'},
                                ['box_menu']:{width:20},
                                ['menu_text']:{fontSize:'14px'},
                                ['box_header']:{height:'60px'},
                                ['container']:{width:'50%'}})
  }
  const toggleDropDownFunc=()=>{
      console.log('hello')
      if(toggleDropDown==false){
        setToggleDropDown(true)
      }else{  
        setToggleDropDown(false)
      }
  }
  const toggleSidebarFunc=()=>{
    console.log(matches)
    if(toggleSideBar2.current == false){
      if(matches==false){
        // setStyleHeader({...styleHeader,['logo']:{width:'50px'}})
        setStyleWidthHeader('100%')
        setStyleSideBarIcon({...styleSideBarIcon,['marginLeft']:"1%"})
        setStyleContainer({...styleContainer,['marginLeft']:'60px'});
      }else{
        // setStyleHeader({...styleHeader,['logo']:{width:'2px5'}})
        setStyleWidthHeader('100%')
        setStyleSideBarIcon({...styleSideBarIcon,['marginLeft']:"1%"})
        setStyleContainer({...styleContainer,['marginLeft']:'40px'});
      }  
      toggleSideBar2.current = true;
      
    }else{
        if(matches==false){
          // setStyleHeader({...styleHeader,['logo']:{width:'50px'}})
          setStyleWidthHeader('85%')
          setStyleSideBarIcon({...styleSideBarIcon,['marginLeft']:"13.8%"})
          setStyleContainer({...styleContainer,['marginLeft']:'60px'});
        }else{
          // setStyleHeader({...styleHeader,['logo']:{width:'25px'}})
          setStyleWidthHeader('85%')
          setStyleSideBarIcon({...styleSideBarIcon,['marginLeft']:"10.8%"})
          setStyleContainer({...styleContainer,['marginLeft']:'10px'});
        }toggleSideBar2.current = false;
    }
  }
  const [styleMenuHeader,setStyleMenuHeader]=useState({
    pendaftaran_menu:{ 
      backgroundColor:'white',
      color:'black'
    },
    kontak_menu:{ 
      backgroundColor:'white',
      color:'black'
    },
  })
  const hoverIn=(event)=>{ 
    if(event.target.getAttribute('id')=='pendaftaran_menu'){
      setStyleMenuHeader({...styleMenuHeader,[event.target.getAttribute('id')]:{backgroundColor:'#024319',
        color:'white'}
      ,['kontak_menu']:{backgroundColor:'white',
      color:'black'}})
    }else{
      setStyleMenuHeader({...styleMenuHeader,[event.target.getAttribute('id')]:{backgroundColor:'#024319',
        color:'white'}
      ,['pendaftaran_menu']:{backgroundColor:'white',
      color:'black'}})
    }
  
  }
  const hoverOut=(event)=>{
    setStyleMenuHeader({...styleMenuHeader,[event.target.getAttribute('id')]:{backgroundColor:'white',
      color:'black'}})
  }
  return(
        admin.id>0?(
              <div className="w-100">
                <div className="d-block bg-danger align-top " style={styleSideBarIcon}  onClick={toggleSidebarFunc}>
                  <div className={styles.cont_sidebar_icon+" d-flex align-items-center  rounded-circle  shadow "} style={{cursor:"pointer"}}>
                    <img src="https://simpuskesmasjungkat.online/iconFoto/menuSidebar2.png" className="w-50 h-50 mx-auto" />
                  </div>
                </div>
                <div className="d-block">
                <Header toggleSideBar={toggleSideBar2.current}/>
                  <Master toggleSideBar={toggleSideBar2.current} matches={matches}/>
                    <div className="d-inline-block  align-top" style={styleContainer}>
                        <div className="mt-5 border-2 border-success border p-2 ">
                          {matches==false?( <div className="d-inline-block align-top w-25 align-top">
                              <img src="https://simpuskesmasjungkat.online/iconFoto/logoPuskesmas.png" style={{width:styleHeader.logo.width+150+"px",height:styleHeader.logo.height+150+"px"}}/>
                              
                          </div>):(<div className="d-inline-block align-top w-100 align-top">
                              <div className="mx-auto" style={{width:'fit-content'}}>
                              <img src="https://simpuskesmasjungkat.online/iconFoto/logoPuskesmas.png" style={{width:styleHeader.logo.width+150+"px",height:styleHeader.logo.height+150+"px"}}/>
                              </div>
                              
                          </div>)}
                        
                          <div className="d-inline-block  align-top">
                              <div className=" h-100 mt-5">
                                <h1>Puskesmas Rawat Inap Jungkat </h1>
                                <p style={{fontFamily:'serif'}}>Alamat : Jl. Raya Jungkat, Sei Nipah, Kec. Jongkat, Kab. Mempawah, Kalimantan Barat 78351</p>
                                <p className="fw-semibold" style={{color:'#024319'}}>Pusat Kesehatan Masyarakat</p>
                              </div>
                            
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
        ):(null)
  )
}
export default Main;