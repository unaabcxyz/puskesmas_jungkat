import React, { useState } from "react"
import styles from '../../styles/ModalTambahPoli.module.css';
import { useEffect } from "react";
import CryptoJS from "crypto-js"; 
const ModalUbahDokter=(props)=>{
    const [formValue,setFormValue]=useState({
          no_dokter:'',
          nama:'',
          email:'',
          password:'',
          nama_poli:'',
          reset_password:false,
    });
    const [errorValue,setErrorValue]=useState({
      no_dokter:true,
      nama:true,
      email:true,
      password:true,
    })
    const [errorLabel,setErrorLabel]=useState({
      no_dokter:'masuka no dokter harus diisi',
      nama:'masukan nama harus diisi',
      email:'masukan email harus diisi',
      password:'masukan password harus diisi',
    })
    const[erorrStyle,setErrorStyle]=useState({
      no_dokter:{
        color:'red'
      },
      nama:{
        color:'red'
      },
      email:{
        color:'red'
      },
      password:{
        color:'red'
      },
    })
    const closeModal=()=>{
      props.showModalUbahFunc(false)
    }
    const ubah=()=>{
        // console.log(formValue);
        props.ubahAct(formValue)
    }
    useEffect(()=>{
      if(props.pilihDokter!=null){
          setFormValue({...formValue,['nama']:props.pilihDokter.nama,
                                      ['email']:props.pilihDokter.email,
                                      ['no_dokter']:props.pilihDokter.no_dokter,
                                     ['nama_poli']:props.pilihDokter.nama_poli
          })
          setErrorValue({...errorValue,['nama']:false,
                                  ['email']:false,
                                  ['no_dokter']:false})
          setErrorLabel({...errorLabel,['nama']:'masukan nama valid',
                                    ['email']:'masukan email valid',
                                  ['no_dokter']:'masukan no dokter valid'});
          setErrorStyle({...erorrStyle,['nama']:{color:'green'},
            ['email']:{color:'green'},
            ['no_dokter']:{color:'green'}})
          
      } 
    },[props.pilihDokter ])
   
    const onChange=(event)=>{
      var name=event.target.name ;
      var value=event.target.value ;
      console.log(name); 
      if(name=='no_dokter'){
        if(value==''){
            setErrorLabel({...errorLabel,[name]:'masukan '+name.replace(/_/g, " ")+' harus diisi'});
            setErrorValue({...errorValue,[name]:true});
            setErrorStyle({...erorrStyle,[name]:{color:'red'}});
        }else{
          setErrorLabel({...errorLabel,[name]:'masukan '+name.replace(/_/g, " ")+' valid'});
          setErrorValue({...errorValue,[name]:false});
          setErrorStyle({...erorrStyle,[name]:{color:'green'}});
        }
        setFormValue({...formValue,[name]:value})
      }else if(name=='nama'){
        if(value==''){
          setErrorLabel({...errorLabel,[name]:'masukan '+name.replace(/_/g, " ")+' harus diisi'});
          setErrorValue({...errorValue,[name]:true});
          setErrorStyle({...erorrStyle,[name]:{color:'red'}});
        }else{
          setErrorLabel({...errorLabel,[name]:'masukan '+name.replace(/_/g, " ")+' valid'});
          setErrorValue({...errorValue,[name]:false});
          setErrorStyle({...erorrStyle,[name]:{color:'green'}});
        }
        setFormValue({...formValue,[name]:value})
      }else if(name=='email'){
        if(value==''){
          setErrorLabel({...errorLabel,[name]:'masukan '+name.replace(/_/g, " ")+' harus diisi'});
          setErrorValue({...errorValue,[name]:true});
          setErrorStyle({...erorrStyle,[name]:{color:'red'}});
        }else if(cekEmail(value)==false){
          setErrorLabel({...errorLabel,[name]:'masukan '+name.replace(/_/g, " ")+' harus berformat email'});
          setErrorValue({...errorValue,[name]:true});
          setErrorStyle({...erorrStyle,[name]:{color:'red'}});
        }else{
          setErrorLabel({...errorLabel,[name]:'masukan '+name.replace(/_/g, " ")+' valid'});
          setErrorValue({...errorValue,[name]:false});
          setErrorStyle({...erorrStyle,[name]:{color:'green'}});
        }
        setFormValue({...formValue,[name]:value})
      }else if(name=='password'){
        if(value==''){
          setErrorLabel({...errorLabel,[name]:'masukan '+name.replace(/_/g, " ")+' harus diisi'});
          setErrorValue({...errorValue,[name]:true});
          setErrorStyle({...erorrStyle,[name]:{color:'red'}});
        }else{
          setErrorLabel({...errorLabel,[name]:'masukan '+name.replace(/_/g, " ")+' valid'});
          setErrorValue({...errorValue,[name]:false});
          setErrorStyle({...erorrStyle,[name]:{color:'green'}});
        }
        setFormValue({...formValue,[name]:value});
      }else if(name=='reset_password'){
        if(formValue.reset_password==false){
          setFormValue({...formValue,['reset_password']:true});
        }else{
            setFormValue({...formValue,['reset_password']:false});
        }
      }
      else{
        setFormValue({...formValue,[name]:value});
      }
    }
    const cekEmail=(email)=>{
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return (emailRegex.test(email));
  }
    const cekNumber=(telepon)=>{
      let isnum = /^\d+$/.test(telepon);
      return isnum;
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
    return(
      <React.Fragment>
            {props.showModalUbah && (
            <div id="myModal" className={styles.modal_custom+" modal-custom"}>
                <div className={styles.modal_content_custom+" rounded "}>
                    <div className="box-title-modal  position-relative ">
                        <h3 className='w-100 text-center fw-bold  text-dark' style={{fontFamily:"sans-serif"}}>Ubah Data Dokter</h3>
                        <button  className={styles.close+' btn   position-absolute bg-danger top-0 '} id={styles.close_modal_logout} onClick={closeModal}>
                            <p className='fw-bolder text-light mt-1' style={{fontSize:"18px",marginTop:"0"}}>x</p>
                        </button>
                    </div>
                    <div className="box-modal-body">
                      <div className={styles.box_ipt+" ps-2"}>
                          <label htmlFor="nama-signup" className={"form-label fw-medium text-dark bg-danger"+styles.label_ipt} >No. Dokter </label>
                          <input type="text" className={styles.el_ipt+" form-control"} value={formValue.no_dokter} id="no-dokter" onChange={onChange} name="no_dokter"placeholder="No Dokter" />
                           <p className="serif text-capitalize" style={erorrStyle. no_dokter}>{errorLabel.no_dokter}</p>
                          <hr/>
                      </div>
                      <div className={styles.box_ipt+" ps-2"}>
                          <label htmlFor="nama-signup" className={"form-label fw-medium text-dark bg-danger"+styles.label_ipt} >Nama Lengkap</label>
                          <input type="text" className={styles.el_ipt+" form-control"} value={formValue.nama} onChange={onChange} id="nama-lengkap" name="nama"   placeholder="Nama Lengkap" />
                          <p className="serif text-capitalize" style={erorrStyle.nama}>{errorLabel.nama}</p>
                          <hr/>
                      </div>
                      <div className={styles.box_ipt+" ps-2"}>
                          <label htmlFor="nama-signup" className={"form-label fw-medium text-dark bg-danger"+styles.label_ipt} >Email</label>
                          <input type="text" className={styles.el_ipt+" form-control"} value={formValue.email} id="email" name="email"   placeholder="Email" onChange={onChange} />
                          <p className="serif text-capitalize" style={erorrStyle.email}>{errorLabel.email}</p>
                          <hr/>
                      </div>
                      <div className={styles.box_ipt+" ps-2"}>
                          <label className="fw-medium">
                              Reset Password: <input type="checkbox" name="reset_password" defaultChecked={formValue.reset_password}  onChange={onChange}/>
                        </label>
                          <hr/>
                      </div>
                      <div className={styles.box_ipt+" ps-2"}>
                        <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt}>Poliklinik</label>
                        <select className="form-select" id="nama-poli" onChange={onChange} name='nama_poli' defaultValue={props.pilihDokter.nama_poli}>
                          <option  value="poli umum">Poli Umum</option>
                          <option value="poli gigi">Poli Gigi</option>
                          <option value="poli gizi">Poli Gizi</option>
                          <option value="kia/kb">KIA/KB</option>
                        </select>
                        <hr/>
                    </div>
                      <div className="w-50 mx-auto">
                        <button  className="btn bg-primary w-100 fw-medium text-light" onClick={ubah}>Ubah Dokter</button>
                    </div>
                    </div>
                </div>
            </div>)
        }
        </React.Fragment>
    )
}
export default ModalUbahDokter;