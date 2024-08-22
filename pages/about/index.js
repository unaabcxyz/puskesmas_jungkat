import { useAuth } from "@/lib/hooks/auth";
import { useRouter } from "next/navigation";
import Master from "../Auth/Master";
import styles from '../../styles/Main.module.css';
import React, { useEffect, useState ,useRef} from "react";
import useDeviceSize from "@/components/UseDevice/useDeviceSize";
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
}const About=()=>{
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
            <h4 className="w-50 text mt-2">About Us</h4>
              <div className="mx-auto w-50 mt-5  p-2 rounded border border-primary border-3">
                 
                  <table className="table w-100 ">
                      <tr >
                        <td>
                          <p>Nama Peneliti</p>
                        </td>
                        <td>
                          <p>:</p>
                        </td>
                        <td>
                          <p>Dwi Aulia</p>
                        </td>
                      </tr>
                      <tr >
                        <td>
                          <p>Judul Penelitan</p>
                        </td>
                        <td>
                          <p>:</p>
                        </td>
                        <td>
                          <p>Pendafataran Rumah Sakit</p>
                        </td>
                      </tr>
                      <tr >
                        <td>
                          <p>Fakultas</p>
                        </td>
                        <td>
                          <p>:</p>
                        </td>
                        <td>
                          <p>Informatika</p>
                        </td>
                      </tr>
                      <tr >
                        <td>
                          <p>Tahun/Angkatan</p>
                        </td>
                        <td>
                          <p>:</p>
                        </td>
                        <td>
                          <p>2019/2020</p>
                        </td>
                      </tr>
                  </table>
              </div>
          </div>
      </div>
    </div>
    )
}
export default About;