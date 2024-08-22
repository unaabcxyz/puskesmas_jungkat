import styles from '../../styles/Main.module.css';
import React, { useEffect, useState ,useRef} from "react";
import useDeviceSize from "@/components/UseDevice/useDeviceSize";

// import { Router } from 'next/router';
import { useRouter } from 'next/router';
const Header=({toggleSideBar})=>{ 
  const [width,height] = useDeviceSize();
  const [toggleDropDown,setToggleDropDown]=useState(false);
  const router = useRouter();
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
  useEffect(()=>{ 
    console.log(height)
    if(width>480){
      desktopView(); 
    }else{
      mobileView();
    }
  },[width])
  useEffect(()=>{
    if(toggleSideBar==false){
      setStyleWidthHeader("85%")
    }else{
      setStyleWidthHeader("100%")
    }
  },[toggleSideBar])
  const [styleWidthHeader,setStyleWidthHeader]=useState("100%");
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
  useEffect(()=>{ 
    if(width>480){
      desktopView(); 
    }else{
      mobileView();
    }
  },[width]);
  const mobileView=()=>{ 
    setStyleHeader({...styleHeader,['logo']:{width:25},
                                  ['nama_instansi']:{fontSize:'6px'},
                                  ['menu_text']:{fontSize:'6px'},
                                  ['box_header']:{height:'40px'},
                                  ['box_menu']:{width:12},
                                  ['container']:{width:'85%'}})
  }
  const desktopView=()=>{
    setStyleHeader({...styleHeader,['logo']:{width:50},
                                ['nama_instansi']:{fontSize:'14px'},
                                ['box_menu']:{width:20},
                                ['menu_text']:{fontSize:'14px'},
                                ['box_header']:{height:'60px'},
                                ['container']:{width:'50%'}})
  }
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
  const toggleDropDownFunc=()=>{
    if(toggleDropDown==false){
      setToggleDropDown(true)
    }else{  
      setToggleDropDown(false)
    }
  }
  const redirectToPendafataran=()=>{
    router.push('/pendaftaran')
  }
  const redirectToAboutUs=()=>{
    router.push('/about')
  }
  const redirectToKontak=()=>{
    router.push('/kontak')
  }
  return(
    <div className={styles.box_header+" "}  style={{height:styleHeader.box_header.height,position:'absolute',right:'0',width:styleWidthHeader,backgroundColor:'#FCF8F3'}}>
      <div style={{width:"100%"}} className="by mx-auto h-100 r">
        <div style={{width:styleHeader.container.width,position:'relative'}} className=" mx-auto d-block h-100">
          <div className="d-inline-block align-top me-2 h-100" width={{width:"10%"}}>
            <div className="d-flex align-items-center h-100">
                  <div style={styleHeader.logo} className="ms-auto">
                  {width<480&&toggleSideBar==true?(null):(
                         <img src="https://simpuskesmasjungkat.online/iconFoto/logoPuskesmas.png" style={{width:parseInt(styleHeader.logo.width)+"px"}}/>
                  )}
                  </div>
            </div> 
          </div>
          <div className="d-inline-block alig-top h-100 " style={{width:'85%'}}>
              <div className="d-flex align-items-center h-100">
                <div  className="d-inline-block">
                    <p className="my-0 w-100 text-left text-dark fw-bold text-uppercase mt-1" style={{color:"#9BA4B5",fontSize:styleHeader.nama_instansi.fontSize}}>Puskesmas Rawat Inap Jungkat</p>
                  </div>
                <div  className="d-inline-block ms-2 ps-1 mt-1" style={{borderLeft:"1px solid gray",cursor:'pointer'}} onClick={redirectToAboutUs}>
                    <p className="my-0 w-100 text-left text-dark fw-bold text-uppercase " style={{color:"#9BA4B5",fontSize:styleHeader.menu_text.fontSize}}>About</p>
                  </div>
                <div  className="d-inline-block ms-2 ps-1 mt-1" style={{borderLeft:"1px solid gray"}}>
                    <p className="my-0 w-100 text-left text-dark fw-bold text-uppercase " style={{color:"#9BA4B5",fontSize:styleHeader.menu_text.fontSize}}>Layanan</p>
                  </div>
                <div  className="d-inline-block ms-2 ps-1 " style={{}} onClick={toggleDropDownFunc}>
                <img src="https://simpuskesmasjungkat.online/iconFoto/arrowMenu.png" style={{width:styleHeader.box_menu.width+"px"}}/>

                  </div>
              </div>
          </div>
          <div className="bg-light rounded shadow  w-50" style={{right:"0px",position:'absolute',top:"50px",display:toggleDropDown==true?('block'):('none')}}>
            <div style={{height:"50px",cursor:'pointer',backgroundColor:styleMenuHeader.pendaftaran_menu.backgroundColor}} 
                  id="pendaftaran_menu" className="p-2 d-flex align-items-center mb-1" onMouseEnter={hoverIn} onMouseLeave={hoverOut} onClick={redirectToPendafataran}>
              <p className="mt-3 w-100 text-center fw-semibold" style={{color:styleMenuHeader.pendaftaran_menu.color}}>Pendaftaran</p>
            </div>
            <div style={{height:"50px",cursor:'pointer',backgroundColor:styleMenuHeader.kontak_menu.backgroundColor}}  
            className="p-2 d-flex align-items-center" id="kontak_menu" onMouseEnter={hoverIn} onMouseLeave={hoverOut} onClick={redirectToKontak}>
              <p className="mt-3 w-100 text-center fw-semibold" style={{color:styleMenuHeader.kontak_menu.color}}>Kontak</p>
            </div>
          </div>
        </div>
    </div>
  </div>
  )
}
export default Header;