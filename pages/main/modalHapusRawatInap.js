import React, { useEffect, useState } from "react"
import styles from '../../styles/ModalTambahPoli.module.css';
const ModalHapusRawatInap=(props)=>{
  const Swal = require('sweetalert2');
  const closeModal=()=>{
    props.toggleModalHapus(false)
  } 
  const hapusAct=()=>{
    props.hapusAct();
  }
  return(
    <React.Fragment>
        {props.showModalHapus && (
          <div id="" className={styles.modal_custom+" modal-custom"}>
              <div className={styles.modal_content_custom+" rounded "}>
                  <div className="box-title-modal  position-relative ">
                      <h3 className='w-100 text-center fw-bold  text-dark' style={{fontFamily:"sans-serif"}}>Hapus Data IGD</h3>
                      <button  className={styles.close+' btn   position-absolute bg-danger top-0 '} id={styles.close_modal_logout} onClick={closeModal}>
                          <p className='fw-bolder text-light mt-1' style={{fontSize:"18px",marginTop:"0"}}>x</p>
                      </button>
                  </div>
                  <div className="box-modal-body"> 
                    <p className="text-center">Apakah anda yakin ingin menghapus data IGD dengan nik "{props.pilihPasien.NIK}"</p>     
                    <div className="w-50 mx-auto">
                        <button onClick={hapusAct}  className="btn bg-primary w-100 fw-medium text-light">Hapus Data IGD</button>
                    </div>
                  </div>
              </div>
          </div>
         )} 
    </React.Fragment>
  )
}
export default ModalHapusRawatInap