import { useAuth } from "@/lib/hooks/auth";
import { useRouter } from "next/navigation";
import Master from "../Auth/Master";
import styles from '../../styles/Main.module.css';
import React, { useEffect, useState ,useRef} from "react";
import useDeviceSize from "@/components/UseDevice/useDeviceSize";
import { useSelector,shallowEqual } from "react-redux";
import DataDokter from "@/components/Dokter/DataDokter";
import ModalTambahDokter from "./modalTambahDokter";
import Header from "../Auth/Header";
import CryptoJS from "crypto-js"; 
import axiosClient from "../api/axios.client";
import { useDispatch } from "react-redux";
import ModalUbahDokter from "./modalUbahDokter";
import ModalHapusDokter from "./modalHapusDokter";
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
function useGlobalListDokterPoli(){
  return useSelector((state)=>state.listDokterPoli,shallowEqual)
}
function useGlobalPilihDokterPoli(){ 
  return useSelector((state)=>state.pilihDokterPoli,shallowEqual)
}
const mainDokterPoli=()=>{ 
  const dispatch=useDispatch();
  const router = useRouter();
  const Swal = require('sweetalert2');
  const [admin,setAdmin]=useState({
    email:'',
    id:0
  });
  const dokterPoli=useGlobalListDokterPoli();
  const pilihDokter = useGlobalPilihDokterPoli();
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
  const  [showModalTambah,setShowModalTambah]=useState(false);
  const  [showModalUbah,setShowModalUbah]=useState(false);
  const  [showModalHapus,setShowModalHapus]=useState(false);
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
  const showModalTambahFunc=(toggle)=>{
      setShowModalTambah(toggle)
  }
  const showModalUbahFunc=(toggle)=>{
      setShowModalUbah(toggle)
  }
  const showModalHapusFunc=(toggle)=>{ 
        setShowModalHapus(toggle);
  }
  const ubahAct=(formValue)=>{
    var reset_password=0;
    if(formValue.reset_password==true){
        reset_password=1;
    }
    var dataForm={};
    if(reset_password==1){ 
    const password= JSON.parse(cryptFunc('password'));
     dataForm={no_dokter:formValue.no_dokter,
        nama:formValue.nama,
        email:formValue.email,
        passct:password.ct ,
        passiv:password.iv,
        passs:password.s,
        nama_poli:formValue.nama_poli,
        reset_password:reset_password,
        id:pilihDokter.id
      }
    }else{ 
      dataForm={no_dokter:formValue.no_dokter,
        nama:formValue.nama,
        email:formValue.email,
        nama_poli:formValue.nama_poli,
        reset_password:reset_password, 
        id:pilihDokter.id
      }
    }
    axiosClient.post('Dokterpoli/ubahDataDokterPoli',dataForm).then(({data})=>{ 
      if(data.status==700){
        Swal.fire({
          icon: "error",
          title: "ubah data dokter gagal",
          text: "Email sudah pernah digunakan",
        });
      }else{ 
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "ubah data dokter berhasil",
        });
        // console.log(data);
        var newData = dokterPoli
        var index = newData.findIndex(function(dt){
          return data.id==dt.id
        });
        newData[index]=data;
        dispatch({type:'STORE_DATA_DOKTER_POLI',
                  newData:newData});
        setShowModalUbah(false);
      }
    })
  
  
  } 
  const tambahAct=(formValue)=>{
    const password= JSON.parse(cryptFunc(formValue.password));
     axiosClient.post('Dokterpoli/tambahDataDokterPoli',{no_dokter:formValue.no_dokter,
                                                        nama:formValue.nama,
                                                        email:formValue.email,
                                                        passct:password.ct ,
                                                        passiv:password.iv,
                                                        passs:password.s,
                                                        nama_poli:formValue.nama_poli
     }).then(({data})=>{
        if(data.status==700){
          Swal.fire({
            icon: "error",
            title: "tambah data dokter gagal",
            text: "Email sudah pernah digunakan",
          });
        }else{ 
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "tambah data dokter berhasil",
          });
          dispatch({type:'TAMBAH_DATA_DOKTER_POLI',
                    listDokterPoli:data.data});
          setShowModalTambah(false);
        }
     }).catch(error =>{ 
        console.log(error);
     })
  }
  const hapusAct=()=>{
      axiosClient.post('Dokterpoli/hapusDataDokterPoli',{id:pilihDokter.id,
                                                        last_id:dokterPoli[dokterPoli.length-1].id
      }).then(({data})=>{
        var dataTemp=dokterPoli;
        var index=dataTemp.findIndex(function(dt){
          return pilihDokter.id==dt.id
        });
        if(data.status_new_data==1){
          dataTemp.splice(index,1);
          dataTemp.push(data.new_dokter);
        }else{ 
          dataTemp.splice(index,1);
        }
        dispatch({type:'STORE_DATA_DOKTER_POLI',
          newData:dataTemp});
        setShowModalHapus(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Hapus Data Dokter Berhasil",
        });
      })
  }
  const cryptFunc=(passwordPass)=>{
    var CryptoJSAesJson = {
      stringify: function (cipherParams) {
          var j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
          if (cipherParams.iv) j.iv = cipherParams.iv.toString();
          if (cipherParams.salt) j.s = cipherParams.salt.toString();
          return JSON.stringify(j);
      },
      parse: function (jsonStr) {
          var j = JSON.parse(jsonStr);
          var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)});
          if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
          if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)
          return cipherParams;
      }
  }
  const crypt =  CryptoJS.AES.encrypt(JSON.stringify(passwordPass),'jeruk',{format: CryptoJSAesJson}).toString();
  // console.log(crypt);
  return crypt
}
const [cariIpt,setCariIpt]=useState("")
  const  cariPasien=()=>{
    Swal.showLoading();
    axiosClient.post('Dokterpoli/cariDokterPoli',{search:cariIpt}).then(({data})=>{
      console.log(data);
      dispatch({type:'ISI_DATA_DOKTER_POLI',
        allDataDokterPoli:data
    });
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
                  <h5>Kelola Dokter</h5>
                  <div className={"input-group flex-nowrap "+matches==false?('w-25'):('w-50')}>
                        <input type="text" class="form-control" placeholder="Cari Pasien" value={cariIpt} onKeyDown={(e)=>{e.key=='Enter'?(cariPasien()):(null)}} onChange={(e)=>{setCariIpt(e.target.value)}} aria-label="Username" aria-describedby="addon-wrapping"/>
                  </div>
               <ModalTambahDokter showModalTambah={showModalTambah} tambahAct={tambahAct} showModalTambahFunc={showModalTambahFunc}/>
               <ModalUbahDokter  showModalUbah={showModalUbah} 
                                showModalUbahFunc={showModalUbahFunc}
                                pilihDokter={pilihDokter}
                                ubahAct={ubahAct}/>
              <ModalHapusDokter  showModalHapus={showModalHapus}
                                showModalHapusFunc={showModalHapusFunc}
                                hapusAct={hapusAct}
                                pilihDokter={pilihDokter}/>
              <DataDokter listDokter={dokterPoli} 
                        matches={matches}
                        showModalHapusFunc={showModalHapusFunc}
                        showModalTambahFunc={showModalTambahFunc}
                        showModalUbahFunc={showModalUbahFunc}/>
                  </div>
              </div>
          </div>
    ):(null)
  )
}
export default mainDokterPoli;