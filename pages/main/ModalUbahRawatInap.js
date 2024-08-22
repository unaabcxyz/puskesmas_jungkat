import React, { useEffect, useState } from "react"
import styles from '../../styles/ModalTambahPoli.module.css';

const ModalUbahRawatInap=(props)=>{ 
  const Swal = require('sweetalert2');
  const [rawatInap,setRawatInap]=useState(0);
  const [rujuk,setRujuk]=useState({
    value:'',
  })
  useEffect(()=>{
    if(props.pilihPasien!=null){ 
        if(props.pilihPasien.rawat_inap!=null){
          setRawatInap(1);
          console.log("tes")
          setRujuk({...rujuk,['value']:''})
        }else if(props.pilihPasien.rujuk!=null){
          setRawatInap(0);
          setRujuk({...rujuk,['value']:props.pilihPasien.rujuk.nama_rujuk})
        }
    }
  
  },[props.pilihPasien])
  const closeModal=()=>{
    props.toggleModalUbah(false)
  }
  const onChange=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    if(name=='rujuk'){
      setRujuk({...rujuk,['value']:value});
    }else{
      console.log(value);
      if(rawatInap==0){ 
        setRawatInap(1);
      }else{
        setRawatInap(0);
      }
    }
  }
  const ubahAct=()=>{
    props.ubahAct(rawatInap,rujuk)
  }
  return(
    <React.Fragment>
        {props.showModalUbah && (
          <div id="" className={styles.modal_custom+" modal-custom"}>
              <div className={styles.modal_content_custom+" rounded "}>
                  <div className="box-title-modal  position-relative ">
                      <h3 className='w-100 text-center fw-bold  text-dark' style={{fontFamily:"sans-serif"}}>Ubah Data IGD</h3>
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
                    {props.pilihPasien!=null?(
                       <div className={styles.box_ipt+" ps-2"}>
                           <p className="text-danger text-capitalize">Keterangan : {props.pilihPasien.rawat_inap!=null?('rawat inap'):(props.pilihPasien.rujuk!=null?('rujuk'):('-'))}</p>
                        </div>
                    ):(null)}
                      <div className={styles.box_ipt+" ps-2"}>
                          <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >Rawat Inap</label>
                          <select className="form-select" id="inputGroupSelect01" name='rawatInap' defaultValue={rawatInap} onChange={onChange}>
                            <option value="1">Rawat Inap</option>
                            <option value="0">Rujuk</option>
                          </select>
                        </div>
                      <div className={styles.box_ipt+" ps-2"}>
                        <label htmlFor="nama-signup" className={"form-label fw-medium text-dark bg-danger"+styles.label_ipt} >Keterangan  Rujukan</label>
                        <input type="text" className={styles.el_ipt+" form-control"} value={rujuk.value} onChange={onChange} id="rujuk" name="rujuk"   placeholder="Rujuk"/>
                        <hr/>
                     </div>
                    <div className="w-50 mx-auto">
                        <button onClick={ubahAct} className="btn bg-primary w-100 fw-medium text-light">Ubah Data IGD</button>
                    </div>
                  </div>
              </div>
          </div>
        )}
    </React.Fragment>
  )
}
export default ModalUbahRawatInap;