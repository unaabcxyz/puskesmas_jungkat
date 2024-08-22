import React, { useState } from "react"
import styles from '../../../styles/ModalTambahPoli.module.css';
import { useEffect } from "react";
import axiosClient from "../../api/axios.client";
import CryptoJS from "crypto-js"; 
const Swal = require('sweetalert2')
const ModalTambahRujuk=(props)=>{
const [formaValue,setFormValue]=useState({
  nama_rujuk:''
})
const[errorValue,setErrorValue]=useState({
  nama_rujuk:false
})
const[errorLabel,setErrorLabel]=useState({
  nama_rujuk:'nama rujuk harus diisi'
});
const[errorStyle,setErrorStyle]=useState({
  nama_rujuk:{
    color:'red'
  }
})
const closeModal=()=>{
  props.showModalTambahFunc(false)
}
const tambah=()=> { 
  props.tambahAct(formaValue);
}
const onChange=(event)=>{
  var name = event.target.name;
  var value =event.target.value;
  console.log(name);
  if(name=='nama_rujuk'){
      if(value==''){
        setErrorLabel({...errorLabel,[name]:'masukan '+name.replace(/_/g, " ")+' harus diisi'});
        setErrorValue({...errorValue,[name]:true});
        setErrorStyle({...errorStyle,[name]:{color:'red'}});
      }else{
        setErrorLabel({...errorLabel,[name]:'masukan '+name.replace(/_/g, " ")+' valid'});
        setErrorValue({...errorValue,[name]:false});
        setErrorStyle({...errorStyle,[name]:{color:'green'}});
      }
      setFormValue({...formaValue,[name]:value});
  }
}
return(
  <React.Fragment>
      {props.showModalTambah && (
      <div id="myModal" className={styles.modal_custom+" modal-custom"}>
          <div className={styles.modal_content_custom+" rounded "}>
              <div className="box-title-modal  position-relative ">
                  <h3 className='w-100 text-center fw-bold  text-dark' style={{fontFamily:"sans-serif"}}>Tambah Data Rujuk</h3>
                  <button  className={styles.close+' btn   position-absolute bg-danger top-0 '} id={styles.close_modal_logout} onClick={closeModal}>
                      <p className='fw-bolder text-light mt-1' style={{fontSize:"18px",marginTop:"0"}}>x</p>
                  </button>
              </div>
              <div className="box-modal-body">
                      <div className={styles.box_ipt+" ps-2"}>
                        <label htmlFor="nama-signup" className={"form-label fw-medium text-dark bg-danger"+styles.label_ipt} >Nama Rujuk</label>
                        <input type="text" className={styles.el_ipt+" form-control"} value={formaValue.nama_rujuk} id="nama_rujuk" onChange={onChange} name="nama_rujuk" placeholder="Nama Rujuk" />
                          <p className="serif text-capitalize" style={errorStyle.nama_rujuk}>{errorLabel.nama_rujuk}</p>
                        <hr/>
                    </div>
                <div className="w-50 mx-auto">
                  <button  className="btn bg-success w-100 fw-medium text-light" onClick={tambah}>Tambah Rujuk</button>
              </div>
              </div>
          </div>
      </div>)
  }
  </React.Fragment>
)
}
export default ModalTambahRujuk;