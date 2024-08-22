import React, { useState } from "react"
import styles from '../../styles/ModalTambahPoli.module.css';
import { useEffect } from "react";
const Swal = require('sweetalert2')
import { useDispatch } from "react-redux";
const ModalTambahDokter=(props)=>{
    const [formValue,setFormValue]=useState({
          no_dokter:'',
          nama:'',
          email:'',
          password:'',
          nama_poli:'',
    });
    const [errorValue,setErrorValue]=useState({
      no_dokter:true,
      nama:true,
      email:true,
      password:true,
    })
    const [errorLabel,setErrroLabel]=useState({
      no_dokter:'masuka no dokter harus diisi',
      nama:'masukan nama harus diisi',
      email:'masukan email harus diisi',
      password:'masukan password harus diisi',
    })
    useEffect(()=>{ 
         
    },[])
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
      props.showModalTambahFunc(false)
    }
    const onChange=(event)=>{
      var name=event.target.name ;
      var value=event.target.value ;
      if(name=='no_dokter'){
        if(value==''){
            setErrroLabel({...errorLabel,[name]:'masukan '+name.replace(/_/g, " ")+' harus diisi'});
            setErrorValue({...errorValue,[name]:true});
            setErrorStyle({...erorrStyle,[name]:{color:'red'}});
        }else{
          setErrroLabel({...errorLabel,[name]:'masukan '+name.replace(/_/g, " ")+' valid'});
          setErrorValue({...errorValue,[name]:false});
          setErrorStyle({...erorrStyle,[name]:{color:'green'}});
        }
        setFormValue({...formValue,[name]:value})
      }else if(name=='nama'){
        if(value==''){
          setErrroLabel({...errorLabel,[name]:'masukan '+name.replace(/_/g, " ")+' harus diisi'});
          setErrorValue({...errorValue,[name]:true});
          setErrorStyle({...erorrStyle,[name]:{color:'red'}});
        }else{
          setErrroLabel({...errorLabel,[name]:'masukan '+name.replace(/_/g, " ")+' valid'});
          setErrorValue({...errorValue,[name]:false});
          setErrorStyle({...erorrStyle,[name]:{color:'green'}});
        }
        setFormValue({...formValue,[name]:value})
      }else if(name=='email'){
        if(value==''){
          setErrroLabel({...errorLabel,[name]:'masukan '+name.replace(/_/g, " ")+' harus diisi'});
          setErrorValue({...errorValue,[name]:true});
          setErrorStyle({...erorrStyle,[name]:{color:'red'}});
        }else if(cekEmail(value)==false){
          setErrroLabel({...errorLabel,[name]:'masukan '+name.replace(/_/g, " ")+' harus berformat email'});
          setErrorValue({...errorValue,[name]:true});
          setErrorStyle({...erorrStyle,[name]:{color:'red'}});
        }else{
          setErrroLabel({...errorLabel,[name]:'masukan '+name.replace(/_/g, " ")+' valid'});
          setErrorValue({...errorValue,[name]:false});
          setErrorStyle({...erorrStyle,[name]:{color:'green'}});
        }
        setFormValue({...formValue,[name]:value})
      }else if(name=='password'){
        if(value==''){
          setErrroLabel({...errorLabel,[name]:'masukan '+name.replace(/_/g, " ")+' harus diisi'});
          setErrorValue({...errorValue,[name]:true});
          setErrorStyle({...erorrStyle,[name]:{color:'red'}});
        }else{
          setErrroLabel({...errorLabel,[name]:'masukan '+name.replace(/_/g, " ")+' valid'});
          setErrorValue({...errorValue,[name]:false});
          setErrorStyle({...erorrStyle,[name]:{color:'green'}});
        }
        setFormValue({...formValue,[name]:value});
      }else{
        setFormValue({...formValue,[name]:value});
      }
    }
    const cekEmail=(email)=>{
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return (emailRegex.test(email));
  }
    const tambah=()=>{
      props.tambahAct(formValue)
    }
    return(
      <React.Fragment>
            {props.showModalTambah && (
            <div id="myModal" className={styles.modal_custom+" modal-custom"}>
                <div className={styles.modal_content_custom+" rounded "}>
                    <div className="box-title-modal  position-relative ">
                        <h3 className='w-100 text-center fw-bold  text-dark' style={{fontFamily:"sans-serif"}}>Tambah Data Dokter</h3>
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
                          <label htmlFor="nama-signup" className={"form-label fw-medium text-dark bg-danger"+styles.label_ipt} >Password</label>
                          <input type="password" className={styles.el_ipt+" form-control"} id="password" name="password"  value={formValue.password} onChange={onChange}  placeholder="password" />
                          <p className="serif text-capitalize" style={erorrStyle.password}>{errorLabel.password}</p>
                          <hr/>
                      </div>
                      <div className={styles.box_ipt+" ps-2"}>
                        <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt}>Poliklinik</label>
                        <select className="form-select" id="nama-poli" onChange={onChange} name='nama_poli'>
                          <option selected value="poli umum">Poli Umum</option>
                          <option value="poli gigi">Poli Gigi</option>
                          <option value="poli gizi">Poli Gizi</option>
                          <option value="kia/kb">KIA/KB</option>
                        </select>
                        <hr/>
                    </div>
                      <div className="w-50 mx-auto">
                        <button onClick={tambah}  className="btn bg-success w-100 fw-medium text-light">Tambah Dokter</button>
                    </div>
                    </div>
                </div>
            </div>)
        }
        </React.Fragment>
    )
}
export default ModalTambahDokter;