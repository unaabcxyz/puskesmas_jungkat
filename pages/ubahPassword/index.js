import { useAuth } from "@/lib/hooks/auth";
import { useRouter } from "next/navigation";
import Master from "../Auth/Master";
import styles from '../../styles/Main.module.css';
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState ,useRef} from "react";
import useDeviceSize from "@/components/UseDevice/useDeviceSize";
import { useSelector,shallowEqual } from "react-redux";
import CryptoJS from "crypto-js"; 
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
function  useGlobalListRiwayat(){
    return useSelector((state)=>state.listRiwayat,shallowEqual); 
}
const  MainUbahPassword=()=>{ 
  const router = useRouter();
  const Swal = require('sweetalert2');
  const [admin,setAdmin]=useState({
    email:'',
    id:0
  });
  const [width, height] = useDeviceSize();
  const [matches, setMatches] = useState(false)
  const[styleSideBarIcon,setStyleSideBarIcon]=useState({
    marginLeft:"1%",
  });
  const [formValue,setFormValue] = useState({
    password_sebelumnya:'',
    password_baru:''
  })
  
  const [errorText,setErrorText]=useState({ 
      password_sebelumnya:'password sebelumnya harus diisi',
    password_baru:'password baru harus diisi',
  });
  const [errorValue,setErrorValue]=useState({ 
      password_sebelumnya:true,
    password_baru:true,
  });
  const [errorLabelStyle,setErrorLabelStyle]=useState({
    password_sebelumnya:{
      color:'red'
    },
    password_baru:{
      color:'red'
    },
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
      if(user.nama_poli=='admin'){
          router.push('/utama');
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
const onChange=(event)=>{ 
  var name=event.target.name;
  var value=event.target.value;
  if(value==''){
    setErrorText({...errorText,[name]:"masukan "+ name.replace('_', ' ')+" harus disi"});
    setErrorLabelStyle({...setErrorLabelStyle,[name]:{color:'red'}})
    setErrorValue({...errorValue,[name]:true})
  }else if(value.length<8){
    setErrorText({...errorText,[name]:"masukan "+ name.replace('_', ' ')+" harus lebih dari 8 karakter"});
    setErrorLabelStyle({...setErrorLabelStyle,[name]:{color:'red'}})
    setErrorValue({...errorValue,[name]:true})
  }else{ 
    setErrorText({...errorText,[name]:"masukan "+ name.replace('_', ' ')+" valid"});
    setErrorLabelStyle({...setErrorLabelStyle,[name]:{color:'green'}})
    setErrorValue({...errorValue,[name]:false})
  }  
  setFormValue({...formValue,[name]:value});
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
const ubahPassword=()=>{ 
  Swal.showLoading();
  var passwordLamAct = JSON.parse(cryptFunc(formValue.password_sebelumnya));
  var passwordBaruAct= JSON.parse(cryptFunc(formValue.password_baru));
  axiosClient.post('Dokterpoli/ubahPassword',{id:user.id,
                                        passBrCt:passwordBaruAct.ct,
                                        passBrIv:passwordBaruAct.iv,
                                        passBrS:passwordBaruAct.s,
                                        passLmCt:passwordLamAct.ct,
                                        passLmIv:passwordLamAct.iv,
                                        passLmS:passwordLamAct.s
  }).then(({data})=>{ 
      console.log(data);
      if(data.status=='success'){
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Password berhasil diubah",
        });
      } else{
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Password gagal diubah, mungkin data password yang lama tidak tepat",
        });
      }
  })
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
        <div className="w-75 d-inline-block align-top mt-4" style={styleContainer} >
            <h2 className="fw-bold">Ubah Password</h2>
            <div className="w-100">
            <div className={styles.box_ipt+" ps-2"}>
                <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >Password Sebelumnya</label>
                <input type="password" className={styles.el_ipt+" form-control"} id="nama-signup" name="password_sebelumnya" value={formValue.password_sebelumnya}   placeholder="password sebelumnya" onChange={onChange} />
                <p className=" mt-2 text-capitalize" style={errorLabelStyle.password_sebelumnya }>{errorText.password_sebelumnya}</p>
                <hr/>
            </div>
            <div className={styles.box_ipt+" ps-2"}>
                <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >Password Baru</label>
                <input type="password" className={styles.el_ipt+" form-control"} id="nama-signup" name="password_baru" value={formValue.password_baru}   placeholder="password baru" onChange={onChange} />
                <p className=" mt-2 text-capitalize" style={errorLabelStyle.password_baru }>{errorText.password_baru}</p>
                <hr/>
            </div>
            </div>
            <div>
              <button className="btn btn-success fw-bold" onClick={ubahPassword}>Ubah Password</button>
            </div>
        </div>
      </div>):(<h1>Test</h1>)
  )
}
export default MainUbahPassword;