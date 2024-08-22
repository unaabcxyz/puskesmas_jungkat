import React, { useState } from "react"
import styles from '../../styles/ModalTambahPoli.module.css';
import { useEffect } from "react";
const ModalRawatInap=(props)=>{
    const closeModal=()=>{
      props.toggleModalRawatInap(false)
    }
    const [rawatInap,setRawatInap]=useState(false);
    const [rujuk,setRujuk]=useState({
      value:'',
    })
    useState(()=>{
        setRawatInap(false);
    },[props.pilihPasien])
    const tambahAct=()=>{
        props.tambahAct(rawatInap,rujuk)
    }
    const onChange=(event)=>{
      var name = event.target.name; 
      var value = event.target.value ;
      if(name=='rujuk'){
        setRujuk({...rujuk,['value']:value});
      }else{
        if(rawatInap==false){ 
          setRawatInap(true)
        }else{
          setRawatInap(false);
        }
      }
     
    }
    return(
      <React.Fragment>
            {props.showModalRawatInap && (
            <div id="myModal" className={styles.modal_custom+" modal-custom"}>
                <div className={styles.modal_content_custom+" rounded "}>
                    <div className="box-title-modal  position-relative ">
                        <h3 className='w-100 text-center fw-bold  text-dark' style={{fontFamily:"sans-serif"}}>Tambah Data IGD</h3>
                        <button  className={styles.close+' btn   position-absolute bg-danger top-0 '} id={styles.close_modal_logout} onClick={closeModal}>
                            <p className='fw-bolder text-light mt-1' style={{fontSize:"18px",marginTop:"0"}}>x</p>
                        </button>
                    </div>
                    <div className="box-modal-body">
                      <div className={styles.box_ipt+" ps-2"}>
                          <label htmlFor="nama-signup" className={"form-label fw-medium text-dark bg-danger"+styles.label_ipt} >Nama Lengkap</label>
                          <input type="text" className={styles.el_ipt+" form-control"} value={props.pilihPasien.nama_lengkap} id="email" name="namaLengkap"   placeholder="Email" readOnly/>
                          <hr/>
                      </div>
                      <div className={styles.box_ipt+" ps-2"}>
                          <label htmlFor="nama-signup" className={"form-label fw-medium text-dark bg-danger"+styles.label_ipt} >NIK</label>
                          <input type="text" className={styles.el_ipt+" form-control"} value={props.pilihPasien.NIK} id="email" name="nik"   placeholder="NIK" readOnly/>
                          <hr/>
                      </div>
                      <div className={styles.box_ipt+" ps-2"}>
                          <label className="fw-medium">
                              Rawat Inap: <input type="checkbox" name="reset_password" defaultChecked={rawatInap}  onChange={onChange}/>
                        </label>
                          <hr/>
                      </div>
                      <div className={styles.box_ipt+" ps-2"}>
                        <label htmlFor="nama-signup" className={"form-label fw-medium text-dark bg-danger"+styles.label_ipt} >Keterangan Rujuk</label>
                        <input type="text" className={styles.el_ipt+" form-control"} value={rujuk.value} onChange={onChange} id="rujuk" name="rujuk"   placeholder="Rujuk"/>
                        <hr/>
                     </div>
                      <div className="w-50 mx-auto">
                        <button onClick={tambahAct} className="btn bg-success w-100 fw-medium text-light">Tambah Data IGD</button>
                    </div>
                    </div>
                </div>
            </div>)
        }
        </React.Fragment>
    )
}
export default ModalRawatInap;