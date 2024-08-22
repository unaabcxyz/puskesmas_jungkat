import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector,shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";
import styles from '../../../styles/DetilPasienPoliUmum.module.css';
import axiosClient from "@/pages/api/axios.client";
import { useRef } from "react";
import { useAuth } from "@/lib/hooks/auth";
import useDeviceSize from "@/components/UseDevice/useDeviceSize";
import DetilDataPasien from "@/components/PoliGigi/DetilDataPasien";
const Swal = require('sweetalert2')
import Master from "@/pages/Auth/Master";
import Header from "@/pages/Auth/Header";
async function handleLogout(){
  const resp =await fetch('/api/logout',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    }
  })
  const data=await resp.json();
  if(data.success){
    return ;
  }
  throw new Error('Logout Gagal');
}
export async function getServerSideProps({query}){
    const{id}=query;
    return{
      props:{
        id,
        authorization:null
      }
    }
}
function useGlobalPilihPasienPoliGigi(){
  return useSelector((state)=>state.pilihPasienPoliGigi,shallowEqual);
}
const DetilPasien=({id,authorization})=>{
  //SideBar dan Login
  const [admin,setAdmin]=useState({
    email:'',
    id:0
  });
  const [matches, setMatches] = useState()
  const [width, height] = useDeviceSize();
  const toggleSideBar2=useRef(true);
  const router = useRouter();
  const  [styleContainer,setStyleContainer]=useState({
    marginLeft:"60px"
  })
  const[styleSideBarIcon,setStyleSideBarIcon]=useState({
    marginLeft:"1%",
  })
  const pilihPasien=useGlobalPilihPasienPoliGigi();
  const {loadingAuth,loggedIn,user}=useAuth();
  //batas Sidebar dan User;
  const dispatch = useDispatch();
  const [formValue,setFormValue]=useState({
      diagnosis_pengobatan:'',
      diagnosis:'',
      resep_obat:'',
      keterangan:'',
      nama_rujuk:''
  })
  const [errorValue,setErrorValue]=useState({
    diagnosis_pengobatan:true,
    diagnosis:true,
    resep_obat:true,
    keterangan:true,
    nama_rujuk:true
  });
  const [errorLabel,setErrorLabel]=useState({
    diagnosis_pengobatan:'harus memasukan data diagnosis pengobatan',
    diagnosis:'harus memasukan data diagnosis',
    resep_obat:'harus memasukan data resep obat',
    keterangan:'harus menyertai keterangan',
    nama_rujuk:'harus meyertai nama rujuk'
  })
  const [errorStyle,setErrorStyle]=useState({
    diagnosis_pengobatan:{
      color:'red'
    },
    diagnosis:{
      color:'red'
    },
    resep_obat:{
      color:'red'
    },
    keterangan:{ 
      color:'red'
    },
    nama_rujuk: { 
      color:'red'
    }
  })
  const [styleBoxForm,setStyleBoxForm]=useState({
    rawat_inap:{
      display:'none'
    },
    rawat_jalan:{
      display: 'none'
    },
    rujuk:{ 
      display:"none"
    }
  })
  const [toggleMenu,setToggleMenu]=useState(1);
  const [styleBox,setStyleBox]=useState({
      width:"45%",
  })
  const[toggleRujuk,setToggleRujuk]=useState(false);
  useEffect(()=>{
    if(pilihPasien!=null){
      if(pilihPasien.poli_gigi!=null){
          console.log(pilihPasien);
           if(pilihPasien.rawat_inap!=null){
            setFormValue({...formValue,['diagnosis']:'',
              ['resep_obat']:'',
              ['diagnosis_pengobatan']:pilihPasien.poli_gigi.diagnosis_pengobatan,
              ['nama_rujuk']:''
            })
            setErrorLabel({diagnosis:'masukan diagnosis harus diiisi',
              resep_obat:'masukan resep obat harus diisi',  
              diagnosis_pengobatan:'masukan diagnosis pengobatan valid',
              nama_rujuk:'masukan rujuk harus diisi'
            });
            setErrorValue({diagnosis:true,
              resep_obat:true,
              diagnosis_pengobatan:false,
              nama_rujuk:true
            });
            setErrorStyle({diagnosis:{color:'red'},
              resep_obat:{color:'red'}, 
              diagnosis_pengobatan:{color:'green'}, 
              nama_rujuk:{color:'red'}
            });
              setToggleMenu(1)
              setStyleBoxForm({...styleBoxForm,['rawat_inap']:{display:'block'},
                                                ['rawat_jalan']:{display:'none'},
                                                ['rujuk']:{display:'none'},})
           }else if(pilihPasien.rujuk!=null){
            setFormValue({...formValue,['diagnosis']:'',
              ['resep_obat']:'',
              ['diagnosis_pengobatan']:pilihPasien.poli_gigi.diagnosis_pengobatan,
              ['nama_rujuk']:pilihPasien.rujuk.nama_rujuk
            })
            setErrorLabel({diagnosis:'data diagnosis harus diisi',
              resep_obat:'data resep obat harus diisi',  
              diagnosis_pengobatan:'masukan diagnosis pengobatan valid',
              nama_rujuk:'masukan rujuk valid'
            });
            setErrorValue({diagnosis:true,
              resep_obat:true,
              diagnosis_pengobatan:false,
              nama_rujuk:false
            });
            setErrorStyle({diagnosis:{color:'red'},
              resep_obat:{color:'red'}, 
              diagnosis_pengobatan:{color:'green'}, 
              nama_rujuk:{color:'green'}
            });
            setToggleMenu(3)
            setStyleBoxForm({...styleBoxForm,['rawat_inap']:{display:'none'},
                                            ['rawat_jalan']:{display:'none'},
                                            ['rujuk']:{display:'block'},})
          }else{
            setFormValue({...formValue,['diagnosis']:pilihPasien.poli_gigi.diagnosis,
                                      ['resep_obat']:pilihPasien.poli_gigi.resep_obat,
                                      ['diagnosis_pengobatan']:pilihPasien.poli_gigi.diagnosis_pengobatan,
                                      ['nama_rujuk']:''
            })
            setErrorLabel({diagnosis:'masukan diagnosis valid',
                          resep_obat:'masukan resep obat valid',  
                          diagnosis_pengobatan:'masukan diagnosis pengobatan valid',
                          nama_rujuk:'masukan rujuk harus diisi'
            });
            setErrorValue({diagnosis:false,
                          resep_obat:false,
                          diagnosis_pengobatan:false,
                          nama_rujuk:true
            });
            setErrorStyle({diagnosis:{color:'green'},
                          resep_obat:{color:'green'}, 
                          diagnosis_pengobatan:{color:'green'}, 
                          nama_rujuk:{color:'red'}
            });
            setToggleMenu(2)
            setStyleBoxForm({...styleBoxForm,['rawat_inap']:{display:'none'},
                                            ['rawat_jalan']:{display:'block'},
                                            ['rujuk']:{display:'none'},})
          }
      }else{ 
        setFormValue({...formValue, ['diagnosis']:'',
                                    ['resep_obat']:'',
                                    ['diagnosis_pengobatan']:'',
                                    ['nama_rujuk']:''
        })
        setErrorLabel({diagnosis:'jika pilih menu diagnosis, wajib memasukan data diagnosis',
                      resep_obat:'jika pilih menu diagnosis, wajib memasukan data resep obat',
                      diagnosis_pengobatan:'data diagnosis pengobatan wajib diisi',
                      nama_rujuk:'nama rujuk harus diisi'
        });
        setErrorValue({diagnosis:true,
                      resep_obat:true,
                      diagnosis_pengobatan:true,
                      nama_rujuk:true
        });
        setErrorStyle({diagnosis:{color:'red'},
                      resep_obat:{color:'red'},
                      diagnosis_pengobatan:{color:'red'},
                      nama_rujuk:{color:'red'}  
                    });
      setStyleBoxForm({...styleBoxForm,['rawat_inap']:{display:'block'},
                                      ['rawat_jalan']:{display:'none'},
                                      ['rujuk']:{display:'none'},})
                    
      }
    }
  },[pilihPasien])
  useEffect(()=>{
    if(user!==null){
      if(user.nama_poli!='poli gigi'&&user.nama_poli!='admin'){
        if(user.nama_poli=='poli gizi'){
          router.push('/poliGizi');
        }else if(user.nama_poli=='poli umum'){
          router.push('/poliUmum');
        }else if(user.nama_poli=='kia/kb'){
          router.push('/kiaKb');
        }else if(user.nama_poli=='igd'){
          router.push('/main');
        }
      }else{
        setAdmin({...admin,['id']:user.id,['email']:user.email});
      }
    }
    dispatch({type:'PILIH_PASIEN_POLI_GIGI',index:id})
  },[])
  useEffect(()=>{
    if(user!==null){
      setAdmin({...admin,['id']:user.id,['email']:user.email});
    }
  },[user])
    const toggleBoxRujukFunc=(toggle)=>{
       if(toggle==false){ 
        setStyleBoxForm({...styleBoxForm,['langsung']:{display:'block'},
                                        ['rujuk']:{display:'none'}});
        setToggleRujuk(false);
       }else{
        setStyleBoxForm({...styleBoxForm,['langsung']:{display:'none'},
          ['rujuk']:{display:'block'}});
          setToggleRujuk(true);
       }
     
    }
    const toggleBoxMenuFunc=(toggle)=>{
      if(toggle == 1){
        setStyleBoxForm({...styleBoxForm,['rawat_jalan']:{display:'none'},
                                        ['rawat_inap']:{display:'block'},
                                        ['rujuk']:{display:'none'},
        });
      }else if(toggle ==2){
        setStyleBoxForm({...styleBoxForm,['rawat_inap']:{display:'none'},
                                        ['rawat_jalan']:{display:'block'},
                                        ['rujuk']:{display:'none'},
        });
      }else if(toggle ==3){
          setStyleBoxForm({...styleBoxForm,['rawat_jalan']:{display:'none'},
                                          ['rawat_inap']:{display:'none'},
                                          ['rujuk']:{display:'block'},
          });
      }
      setToggleMenu(toggle)
  }
    //Fungsi Toggle Sidebar
    useEffect(()=>{
      if(width>480){
        setMatches(false);
        setStyleBox({...styleBox,['width']:'45%'});
      }else{
        setMatches(true);
        setStyleBox({...styleBox,['width']:'90%'});
      }
    },[height])
    const toggleSidebarFunc=()=>{
      if(toggleSideBar2.current == false){
          setStyleSideBarIcon({...styleSideBarIcon,['marginLeft']:"1%"});
          setStyleContainer({...styleContainer,['marginLeft']:'60px'});
          toggleSideBar2.current = true;
      }else{
          if(matches==false){
            setStyleSideBarIcon({...styleSideBarIcon,['marginLeft']:"13.8%"})
            setStyleContainer({...styleContainer,['marginLeft']:'60px'});
          }else{
            setStyleSideBarIcon({...styleSideBarIcon,['marginLeft']:"10.8%"})
            setStyleContainer({...styleContainer,['marginLeft']:'10px'});
          }toggleSideBar2.current = false;
      }
    }
    //batas fungsi toggle sidebar
    //FUNGSI CRUD
    const onChange=(event)=>{
      var value=event.target.value;
      var name = event.target.name;
       if(name=='diagnosis_pengobatan'){
           if(value==""){ 
             setErrorLabel({...errorLabel,['diagnosis_pengobatan']:'harus memasukan data diagnosis pengobatan'})
             setErrorValue({...errorValue,['diagnosis_pengobatan']:true}); 
             setErrorStyle({...errorStyle,['diagnosis_pengobatan']:{color:'red'}})
           }else{
             setErrorLabel({...errorLabel,['diagnosis_pengobatan']:'Data diagnosis pengobatan valid'}) 
             setErrorValue({...errorValue,['diagnosis_pengobatan']:false});
             setErrorStyle({...errorStyle,['diagnosis_pengobatan']:{color:'green'}})
           }
           setFormValue({...formValue,['diagnosis_pengobatan']:value});
       }else if(name=='diagnosis'){
         if(value==""){ 
           setErrorLabel({...errorLabel,['diagnosis']:'harus memasukan data diagnosis'})
           setErrorValue({...errorValue,['diagnosis']:true}); 
           setErrorStyle({...errorStyle,['diagnosis']:{color:'red'}})
         }else{
           setErrorLabel({...errorLabel,['diagnosis']:'Data diagnosis valid'}) 
           setErrorValue({...errorValue,['diagnosis']:false});
           setErrorStyle({...errorStyle,['diagnosis']:{color:'green'}})
         }
         setFormValue({...formValue,['diagnosis']:value});
       }else if(name=='resep_obat'){
         if(value==""){ 
           setErrorLabel({...errorLabel,['resep_obat']:'harus memasukan data '+name.replace(/_/g, " ")})
           setErrorValue({...errorValue,['resep_obat']:true}); 
           setErrorStyle({...errorStyle,['resep_obat']:{color:'red'}})
         }else{
           setErrorLabel({...errorLabel,['resep_obat']:'Data '+name.replace(/_/g, " ")+' valid'}) 
           setErrorValue({...errorValue,['resep_obat']:false});
           setErrorStyle({...errorStyle,['resep_obat']:{color:'green'}})
         }
         setFormValue({...formValue,['resep_obat']:value});
       }else if(name=='keterangan'){
         if(value==""){ 
           setErrorLabel({...errorLabel,['keterangan']:'harus memasukan data '+name.replace(/_/g, " ")})
           setErrorValue({...errorValue,['keterangan']:true}); 
           setErrorStyle({...errorStyle,['keterangan']:{color:'red'}})
         }else{
           setErrorLabel({...errorLabel,['keterangan']:'Data '+name.replace(/_/g, " ")+' valid'}) 
           setErrorValue({...errorValue,['keterangan']:false});
           setErrorStyle({...errorStyle,['keterangan']:{color:'green'}})
         }
         setFormValue({...formValue,['keterangan']:value});
       }else if('nama_rujuk'){
        if(value==""){ 
          setErrorLabel({...errorLabel,[name]:'harus memasukan data '+name.replace(/_/g, " ")})
          setErrorValue({...errorValue,[name]:true}); 
          setErrorStyle({...errorStyle,[name]:{color:'red'}})
        }else{
          setErrorLabel({...errorLabel,[name]:'Data '+name.replace(/_/g, " ")+' valid'}) 
          setErrorValue({...errorValue,[name]:false});
          setErrorStyle({...errorStyle,[name]:{color:'green'}})
        }
        setFormValue({...formValue,[name]:value});
       }
   }
   const cekFormError=()=>{ 
    var result=true;
    Object.keys(errorValue).forEach(function(key) {
        errorValue[key]==true?(result=false):(null)
    });
    // console.log(result);
    return result;
  }
  const hapusDataPoliGigi=()=>{
    Swal.showLoading();
    axiosClient.post('Poligigi/hapusDataPoliGigi',
      {id:pilihPasien.id,
      diagnosis_pengobatan:formValue.diagnosis_pengobatan,
      diagnosis:formValue.diagnosis,
      resep_obat:formValue.resep_obat,
      keterangan:formValue.keterangan
      }).then(({data})=>{
        console.log(data);
        Swal.close();
        dispatch({type:'STORE_DATA_POLI_GIGI',
                  allDataPoliGigi:data.allDataPoliGigi.data,
                  pilihPoliGigi:data.allDataPoliGigi.data[id]})
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data Poli Umum Berhasil Diubah",
        });
      })
    }
   const tambahDataPoliGigi=()=>{
      axiosClient.post('Poligigi/tambahDataPoliGigi',
        {id:pilihPasien.id,
          toggle:toggleMenu,
          diagnosis_pengobatan:formValue.diagnosis_pengobatan,
          diagnosis:formValue.diagnosis,
          resep_obat:formValue.resep_obat,
          nama_rujuk:formValue.nama_rujuk
        }).then(({data})=>{
                      console.log(data);
                      Swal.close();
                      // console.log()
                      dispatch({type:'STORE_DATA_POLI_GIGI',
                                allDataPoliGigi:data.allDataPoliGigi.data,
                                pilihPoliGigi:data.allDataPoliGigi.data[id]})
                      Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: "Data Poli Gigi Berhasil Ditambahkan",
                      });
     })
   }
   const ubahDataPoliGigi=()=>{
      axiosClient.post('Poligigi/ubahDataPoliGigi',
        {id:pilihPasien.id,
          toggle:toggleMenu,
          diagnosis_pengobatan:formValue.diagnosis_pengobatan,
          diagnosis:formValue.diagnosis,
          resep_obat:formValue.resep_obat,
          nama_rujuk:formValue.nama_rujuk
        }).then(({data})=>{
                      console.log(data);
                      Swal.close();
                      // console.log()
                      dispatch({type:'STORE_DATA_POLI_GIGI',
                                allDataPoliGigi:data.allDataPoliGigi.data,
                                pilihPoliGigi:data.allDataPoliGigi.data[id]})
                      Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: "Data Poli Gigi Berhasil Diubah",
                      });
     })
   }

    //BATAS FUNGSI CRUD
    return(
      admin.id>0?(
        <div>
            <div className="d-block bg-danger align-top " style={styleSideBarIcon}  onClick={toggleSidebarFunc}>
              <div className={styles.cont_sidebar_icon+" d-flex align-items-center  rounded-circle  shadow "} style={{cursor:"pointer"}}>
                <img src="https://website.penjadwalanmatapelajaransman2sekayam.xyz/iconFoto/menuSidebar2.png" className="w-50 h-50 mx-auto" />
              </div>
            </div>
            <div className="d-block">
            <Header toggleSideBar={toggleSideBar2.current}/>
            <Master toggleSideBar={toggleSideBar2.current} matches={matches}/>
         
              {pilihPasien!=null?(
                  <div className=" w-75 d-inline-block align-top mt-5 mb-2"  style={styleContainer}>
                    <div className="mt-2">
                          <h1 className="w-100 text-center">Form Data Pasien Poli Gigi</h1>
                            
                          <div id="form_pasien_poli_umum" 
                               className="p-2 rounded d-inline-block me-2 align-top border border-primary" 
                               style={styleBox}> 
                              <h3>Data  Pasien</h3>
                               <DetilDataPasien pilihPasien={pilihPasien}/>
                          </div>
                          
                          <div className="d-inline-block ps-2 align-top"
                               style={styleBox}>
                             <h3 className="text-capitalize " style={{borderBottom:"2px solid grey"}}>Form Data Poli Gigi</h3>
                             <h5 className="fw-bold text-danger mb-3">Keterangan :{toggleMenu==1?('Rawat Inap'):(toggleMenu==2?('Rawat Jalan'):('Rujuk'))}</h5>
                             <div className={styles.box_ipt+" ps-2"}>
                                <label htmlFor="nama-signup" className={"form-label fw-medium text-dark bg-danger"+styles.label_ipt} >Diagnosis Pengobatan</label>
                                <input type="text" className={styles.el_ipt+" form-control w-100"}  value={formValue.diagnosis_pengobatan}id="diagnosis-pengobatan" onChange={onChange} name="diagnosis_pengobatan"   placeholder="Diagnosis Pengobatan" />
                                <p className="mt-2 text-capitalize" style={errorStyle.diagnosis_pengobatan} >{errorLabel.diagnosis_pengobatan}</p>
                                <hr/>
                             </div>
                             <div className="w-100 mb-2">
                                <div className="d-inline-block me-2">
                                  <button className="btn btn-outline-primary" onClick={()=>toggleBoxMenuFunc(1)}>
                                    Rawat Inap
                                  </button>
                                </div>
                                <div className="d-inline-block me-2">
                                  <button className="btn btn-outline-success" onClick={()=>toggleBoxMenuFunc(2)}>
                                    Rawat Jalan
                                  </button>
                                </div>
                                <div className="d-inline-block">
                                  <button className="btn btn-outline-warning" onClick={()=>toggleBoxMenuFunc(3)}>
                                      Rujuk
                                  </button>
                                </div>
                             </div>
                            <div style={styleBoxForm.rawat_jalan}>
                                  <div className={styles.box_ipt+" ps-2"}>
                                      <label htmlFor="nama-signup" className={"form-label fw-medium text-dark bg-danger"+styles.label_ipt} >Diagnosis</label>
                                      <input type="text" className={styles.el_ipt+" form-control w-100"}  value={formValue.diagnosis}id="pengobatan" onChange={onChange} name="diagnosis"   placeholder="Diagnosis" />
                                      <p className="mt-2 text-capitalize" style={errorStyle.diagnosis} >{errorLabel.diagnosis}</p>
                                      <hr/>
                                  </div>
                                  <div className={styles.box_ipt+" ps-2"}>
                                      <label htmlFor="nama-signup" className={"form-label fw-medium text-dark bg-danger"+styles.label_ipt} >Resep Obat</label>
                                      <input type="text" className={styles.el_ipt+" form-control w-100"}  value={formValue.resep_obat}id="resep_obat" onChange={onChange} name="resep_obat"   placeholder="Resep Obat" />
                                      <p className="mt-2 text-capitalize" style={errorStyle.resep_obat} >{errorLabel.resep_obat}</p>
                                      <hr/>
                                  </div>
                            </div>
                            <div style={styleBoxForm.rujuk}>
                                <div className={styles.box_ipt+" ps-2"} style={styleBoxForm.rujuk}>
                                    <label htmlFor="nama-signup" className={"form-label fw-medium text-dark bg-danger"+styles.label_ipt} >Nama Rujuk</label>
                                    <input type="text" className={styles.el_ipt+" form-control w-100"}  value={formValue.nama_rujuk}i d="resep_obat" onChange={onChange} name="nama_rujuk"   placeholder="Nama Rujuk" />
                                    <p className="mt-2 text-capitalize" style={errorStyle.nama_rujuk} >{errorLabel.nama_rujuk}</p>
                                    <hr/>
                                </div>
                            </div>
                             
                          
                             <div >
                                  {
                                    pilihPasien!=null?(
                                        pilihPasien.poli_gigi==null?(
                                          <button className="btn btn-primary" onClick={tambahDataPoliGigi}>Tambah Data Poli Gigi</button>
                                        ):(
                                          <div>
                                              <div className="w-25 d-inline-block me-2" >
                                                  <button className="btn btn-success w-100" onClick={ubahDataPoliGigi}>Ubah Data Poli Gigi</button>
                                              </div>
                                              <div className=" d-inline-block" style={{width:"30%"}} >
                                                     <button className="btn btn-danger w-100" onClick={hapusDataPoliGigi}>Hapus Data Poli Gigi</button>
                                              </div>
                                          </div>                                        
                                        )
                                    ):(null)
                                  } 
                             </div>
                          </div>
                    </div>
                  </div>
                 
                ):(null)
              }
       </div></div>
    ):(<h1>d</h1>))
}
export default DetilPasien;