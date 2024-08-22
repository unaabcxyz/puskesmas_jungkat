import { useState } from 'react';
import { useEffect } from 'react';
import useDeviceSize from '@/components/UseDevice/useDeviceSize';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/hooks/auth';
const Home=()=>{ 
  const [matches, setMatches] = useState(false);
  const [width] = useDeviceSize();
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
  const {loadingAuth,loggedIn}=useAuth();
  useEffect(()=>{ 
    if(width>480){
      desktopView(); 
      setMatches(false)
    }else{
      mobileView();
      setMatches(true);
    }
  },[width])
  const router =useRouter();
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
if(!loadingAuth && loggedIn){
  router.push('/utama')
}
  return(
    <div className='vh-100 d-flex align-items-center'> 
      <div className='w-75  mx-auto h-50 rounded border border-2 border-success p-3 pt-4 ps-5 '>
            {matches==false?( <div className="d-inline-block align-top w-25 align-top">
              <img src="https://simpuskesmasjungkat.online/iconFoto/logoPuskesmas.png" style={{width:styleHeader.logo.width+150+"px",header:styleHeader.logo.width+150+"px"}}/>
                </div>):(<div className="d-inline-block align-top w-100 align-top">
                <div className="mx-auto" style={{width:'fit-content'}}>
                <img src="https://simpuskesmasjungkat.online/iconFoto/logoPuskesmas.png" style={{width:styleHeader.logo.width+150+"px",header:styleHeader.logo.width+150+"px"}}/>
                 
                </div>
                
            </div>)}
            {
              matches==true?(
                <div className='mt-5  mx-auto d-block w-100'>
                  <button className="btn btn-primary w-100 fw-bold "  style={{fontSize:"20px"}}  onClick={()=>{router.push('pendaftaran/')}}>Pendaftaran</button>
                </div>
              ):(
                <div className="d-inline-block  align-top">
                    <div>
                      <div className=" h-100 mt-5">
                        <h1>Puskesmas Rawat Inap Jungkat </h1>
                        <p style={{fontFamily:'serif'}}>Alamat : Jl. Raya Jungkat, Sei Nipah, Kec. Jongkat, Kab. Mempawah, Kalimantan Barat 78351</p>
                        <p className="fw-semibold" style={{color:'#024319'}}>Pusat Kesehatan Masyarakat</p>
                      </div>
                  </div>
                <div className='mt-5  mx-auto d-block w-100 px-5'>
                  <button className="btn btn-primary w-100 fw-bold "  style={{fontSize:"20px"}}  onClick={()=>{router.push('pendaftaran/')}}>Pendaftaran</button>
                </div>
                </div>

              )
            }
              
       </div>
            
    </div>
  
   
  
  )
}
export default Home;