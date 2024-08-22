import React, { useState } from "react"
import styles from '../../styles/ModalTambahPoli.module.css';
import { useEffect } from "react";
import axiosClient from "../api/axios.client";
import CryptoJS from "crypto-js"; 
const Swal = require('sweetalert2')
const ModalHapusDokter=(props)=>{
 
const closeModal=()=>{
  props.showModalHapusFunc(false)
}
const hapus=()=> { 
  props.hapusAct();
}
return(
  <React.Fragment>
      {props.showModalHapus && (
      <div id="myModal" className={styles.modal_custom+" modal-custom"}>
          <div className={styles.modal_content_custom+" rounded "}>
              <div className="box-title-modal  position-relative ">
                  <h3 className='w-100 text-center fw-bold  text-dark' style={{fontFamily:"sans-serif"}}>Hapus Data Dokter</h3>
                  <button  className={styles.close+' btn   position-absolute bg-danger top-0 '} id={styles.close_modal_logout} onClick={closeModal}>
                      <p className='fw-bolder text-light mt-1' style={{fontSize:"18px",marginTop:"0"}}>x</p>
                  </button>
              </div>
              <div className="box-modal-body">
                <p className="text-danger text-center serif">Anda yakin ingin menghapus dokter dengan nama '{props.pilihDokter.nama}'</p>
                <div className="w-50 mx-auto">
                  <button  className="btn bg-danger w-100 fw-medium text-light" onClick={hapus}>Hapus Dokter</button>
              </div>
              </div>
          </div>
      </div>)
  }
  </React.Fragment>
)
}
export default ModalHapusDokter;