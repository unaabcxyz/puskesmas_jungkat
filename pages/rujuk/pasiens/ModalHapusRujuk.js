import React, { useState } from "react"
import styles from '../../../styles/ModalTambahPoli.module.css';
import { useEffect } from "react";
const Swal = require('sweetalert2')
const ModalHapusRujuk=(props)=>{
const [formaValue,setFormValue]=useState({
  nama_rujuk:''
})
const[errorValue,setErrorValue]=useState({
  nama_rujuk:true
})
const[errorLabel,setErrorLabel]=useState({
  nama_rujuk:'nama rujuk valid'
});
const[errorStyle,setErrorStyle]=useState({
  nama_rujuk:{
    color:'green'
  }
})
const closeModal=()=>{
  props.showModalHapusFunc(false)
}
useEffect(()=>{
  if(props.pilihRujuk!=null){
    setFormValue({...formaValue,['nama_rujuk']:props.pilihRujuk.nama_rujuk});
  }
  
},[props.pilihRujuk])
const hapus=()=> { 
  props.hapusAct(formaValue);
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
      {props.showModalHapus && (
      <div id="myModal" className={styles.modal_custom+" modal-custom"}>
          <div className={styles.modal_content_custom+" rounded "}>
              <div className="box-title-modal  position-relative ">
                  <h3 className='w-100 text-center fw-bold  text-dark' style={{fontFamily:"sans-serif"}}>Hapus Data Rawat Inap</h3>
                  <button  className={styles.close+' btn   position-absolute bg-danger top-0 '} id={styles.close_modal_logout} onClick={closeModal}>
                      <p className='fw-bolder text-light mt-1' style={{fontSize:"18px",marginTop:"0"}}>x</p>
                  </button>
              </div>
              <div className="box-modal-body">
                      <div className={styles.box_ipt+" ps-2"}>
                        <p className="text-center text-danger">Hapus data  IGD dengan nama "{props.pilihRujuk.nama_rujuk}"</p>
                    </div>
                <div className="w-50 mx-auto">
                  <button  className="btn bg-success w-100 fw-medium text-light" onClick={hapus}>Hapus Rujuk</button>
              </div>
              </div>
          </div>
      </div>)
  }
  </React.Fragment>
)
}
export default ModalHapusRujuk;