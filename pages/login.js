import { useState } from 'react';
import styles from '../styles/Login.module.css';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/hooks/auth';
import CryptoJS from "crypto-js"; 
import axiosClient from './api/axios.client';
const Swal = require('sweetalert2')
async function handleLogin(id,email,nama_poli){
  const resp =await fetch('/api/login',{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({
    email,
    id,
    nama_poli
  })
  })
  const data=await resp.json();
  if(data.success){
    return;
  }
  throw new Error('Wrong email or password');
}
export default function Home() {
  const [errorText,setErrorText]=useState({
    email:'masukan email harus terisi',
    password: 'masukan password harus terisi'
  });
  const {loadingAuth,loggedIn}=useAuth();
  const router=useRouter();
  const [toggle,setToggle]=useState(false)
  const [formValue,setFormValue]=useState({
    email:'',
    password:''
  })
  const [errorValue,setErrorValue]=useState({
    email:true, 
    password:true
  })
  const  [errorLabelStyle,setErrorLabelStyle]=useState({
    email:{
      color:'#FF4C4C', 
      fontWeight:500
    },
    password:{
      color:'#FF4C4C', 
      fontWeight:500
    }
  }) 
  const cekEmail=(email)=>{
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return (emailRegex.test(email));
  }
  const onChange=(event)=>{
    var name=event.target.name;
    var value=event.target.value;
    if(name=='email'){
      if(value==''){
        setErrorText({...errorText,['email']:'masukan email harus terisi'});
        setErrorLabelStyle({...errorLabelStyle,['email']:{color:'#FF4C4C',fontWeight:500}})
        setErrorValue({...errorValue,['email']:true})
      }else if(cekEmail(value)===false){
        setErrorText({...errorText,['email']:'masukan email harus berformat email'});
        setErrorLabelStyle({...errorLabelStyle,['email']:{color:'#FF4C4C',fontWeight:500}})
        setErrorValue({...errorValue,['email']:true})
      }else{ 
        setErrorText({...errorText,['email']:'email valid'});
        setErrorLabelStyle({...errorLabelStyle,['email']:{color:'#059212',fontWeight:500}})
        setErrorValue({...errorValue,['email']:false})
      }
      setFormValue({...formValue,['email']:value});
    }else{
      if(value==''){
        setErrorText({...errorText,['password']:'masukan password harus terisi'});
        setErrorLabelStyle({...errorLabelStyle,['password']:{color:'#FF4C4C',fontWeight:500}})
        setErrorValue({...errorValue,['password']:true})
      }else{ 
        setErrorText({...errorText,['password']:'password valid'});
        setErrorLabelStyle({...errorLabelStyle,['password']:{color:'#059212',fontWeight:500}})
        setErrorValue({...errorValue,['password']:false})
      }
      setFormValue({...formValue,['password']:value});
    }
  }
  const loginAdmin=()=>{ 
      Swal.showLoading();
      const password= JSON.parse(cryptFunc(formValue.password));
      axiosClient.post('Admin/loginAdmin',{email:formValue.email,passct:password.ct,passiv:password.iv,passs:password.s}).then(({data})=>{ 
          console.log(data.id);
            if(data.id<1&&toggle==true){
              Swal.close();
              Swal.fire({
                icon: "error",
                title: "Login Gagal",
                text: "login gagal, mungkin data login salah",
              });
              setToggle(false)
            }else{
                handleLogin(data.id,data.email,data.nama_poli).then(()=>{
                let timerInterval;
                Swal.fire({
                  title: "Login Berhaasil!",
                  html: "Anda akan diarahkan kehalaman utama sekitar <b></b> milliseconds lagi.",
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
                  /* Read more about handling dismissals below */
                  if (result.dismiss === Swal.DismissReason.timer) {
                    // console.log("I was closed by the timer");
                    router.push('utama');
                  }
                });
              })
            }
      }).catch(function (error){

      });
  }
  if(!loadingAuth && loggedIn){
    router.push('/utama')
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
  return (
     <div className="">
        <div>
          <div id="box_login" className=" w-75  mt-3 mx-auto rounded p-2 shadow" style={{backgroundColor:"#ffff"}}>
            <h1 className="w-100 text-center text-dark ">Login</h1>
            <div className="f">
              <div className={styles.box_ipt+" ps-2"}>
                  <label htmlFor="nama-signup" className={"form-label fw-medium text-dark bg-danger"+styles.label_ipt} >Email</label>
                  <input type="text" className={styles.el_ipt+" form-control"} id="email" name="email" onChange={onChange}  placeholder="Email" />
                  <p className="mt-2 text-capitalize" style={errorLabelStyle.email}>{errorText.email}</p>
                  <hr/>
              </div>
              <div className={styles.box_ipt+" ps-2"}>
                  <label htmlFor="nama-signup" className={"form-label fw-medium text-dark bg-danger"+styles.label_ipt} >Password</label>
                  <input type="password" className={styles.el_ipt+" form-control w-100"} id="password" name="password" onChange={onChange}  placeholder="Password" />
                  <p className="mt-2 text-capitalize" style={errorLabelStyle.password}>{errorText.password}</p>
                  <hr/>
              </div>
             
              <div className='w-50 mx-auto'>
                 <button type="button" className="btn btn-outline-primary w-100 " onClick={loginAdmin}>login</button>
              </div>
             
            </div>
          </div>
        </div>
     </div>
  );
}
