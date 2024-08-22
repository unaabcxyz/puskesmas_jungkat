import React, { useState } from "react"
import styles from '../../styles/ModalTambahPoli.module.css';
import { useEffect } from "react";
import axiosClient from "../api/axios.client";
import CryptoJS from "crypto-js"; 
const Swal = require('sweetalert2')
const ModalRujuk=(props)=>{
const[formValue,setFormValue]=useState({
  nama_rujuk:'',
});
const [errorValue,setErrorValue]=useState({ 
  nama_rujuk:true,
})
const [errorLabel,setErrorLabel]=useState({ 
  nama_rujuk:"Nama Rujuk Harus Diisi",
});
const [errorStyle,setErrorStyle]=useState({ 
  nama_rujuk:{ 
    color:'red'
  }
});
const closeModal=()=>{
  props.showModalRujukFunc(false)
}
const rujukAct=()=>{ 
  props.rujukAct(formValue)
}
const onChange=(event)=>{
  var value=event.target.value;
  var nama = event.target.name;
  if(value==''){
      setErrorLabel({...errorLabel,[nama]:nama.replace('_',' ')+" harus diisi"});
      setErrorValue({...errorValue,[nama]:true});
      setErrorStyle({...errorStyle,[nama]:{color:'red'}});
     
  }else{ 
    setErrorLabel({...errorLabel,[nama]:nama.replace('_',' ')+" valid"});
    setErrorValue({...errorValue,[nama]:false});
    setErrorStyle({...errorStyle,[nama]:{color:'green'}});
  }
  setFormValue({...formValue,[nama]:value})
}
return(
  <React.Fragment>
      {props.showModalRujuk && (
      <div id="myModal" className={styles.modal_custom+" modal-custom"}>
          <div className={styles.modal_content_custom+" rounded "}>
              <div className="box-title-modal  position-relative ">
                  <h3 className='w-100 text-center fw-bold  text-dark' style={{fontFamily:"sans-serif"}}>Modal Rujuk Pasien</h3>
                  <button  className={styles.close+' btn   position-absolute bg-danger top-0 '} id={styles.close_modal_logout} onClick={closeModal}>
                      <p className='fw-bolder text-light mt-1' style={{fontSize:"18px",marginTop:"0"}}>x</p>
                  </button>
              </div>
              <div className="box-modal-body">
                  <h5 className="text-center" style={{fontFamily:'serif'}}>Anda yakin ingin memindahkan pasien "{props.pilihPasien.nama_lengkap}" dari rawat inap ke rujuk</h5>
                  <div className={styles.box_ipt+" ps-2"}>
                    <label htmlFor="nama-signup" className={"form-label fw-medium text-dark bg-danger"+styles.label_ipt} >Nama Rujuk</label>
                    <input type="text" className={styles.el_ipt+" form-control"} id="rujuk" placeholder="nama rujuk" name="nama_rujuk" value={formValue.nama_rujuk} onChange={onChange} />
                    <p className="serif text-capitalize" style={errorStyle.nama_rujuk}>{errorLabel.nama_rujuk}</p>
                    <hr/>
                </div>
                <div className="w-50 mx-auto">
                  <button  className="btn bg-success w-100 fw-medium text-light" onClick={rujukAct}>Rujuk</button>
              </div>
              </div>
          </div>
      </div>)
  }
  </React.Fragment>
)
}
export default ModalRujuk;