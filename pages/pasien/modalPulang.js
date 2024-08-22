import React, { useState } from "react"
import styles from '../../styles/ModalTambahPoli.module.css';
import { useEffect } from "react";
import axiosClient from "../api/axios.client";
import CryptoJS from "crypto-js"; 
const Swal = require('sweetalert2')
const ModalPulang=(props)=>{
const closeModal=()=>{
  props.showModalPulangFunc(false);
}
const pulangAct=()=>{ 
  // props.rujukAct(formValue)
  props.pulangAct();
}
return(
  <React.Fragment>
      {props.showModalPulang && (
      <div id="myModal" className={styles.modal_custom+" modal-custom"}>
          <div className={styles.modal_content_custom+" rounded "}>
              <div className="box-title-modal  position-relative ">
                  <h3 className='w-100 text-center fw-bold  text-dark' style={{fontFamily:"sans-serif"}}>Modal Pulang Pasien</h3>
                  <button  className={styles.close+' btn   position-absolute bg-danger top-0 '} id={styles.close_modal_logout} onClick={closeModal}>
                      <p className='fw-bolder text-light mt-1' style={{fontSize:"18px",marginTop:"0"}}>x</p>
                  </button>
              </div>
              <div className="box-modal-body">
                  <h5 className="text-center" style={{fontFamily:'serif'}}>Anda yakin ingin memulangkan pasien "{props.pilihPasien.nama_lengkap}" dari rawat inap </h5>
                <div className="w-50 mx-auto">
                  <button  className="btn bg-success w-100 fw-medium text-light" onClick={pulangAct}>Pulang</button>
              </div>
              </div>
          </div>
      </div>)
  }
  </React.Fragment>
)
}
export default ModalPulang;