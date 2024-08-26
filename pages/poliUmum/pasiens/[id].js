import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector,shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";
import styles from '../../../styles/DetilPasienPoliUmum.module.css';
import axiosClient from "@/pages/api/axios.client";
import DetilDataPasien from "@/components/PoliUmum/DetilDataPasien";
import { useRef } from "react";
import { useAuth } from "@/lib/hooks/auth";
import useDeviceSize from "@/components/UseDevice/useDeviceSize";
import * as ExcelJS from 'exceljs/dist/exceljs.min.js';
const Swal = require('sweetalert2')
import Header from "@/pages/Auth/Header";
import Master from "@/pages/Auth/Master";
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
function useGlobalPilihPasienPoliUmum(){
  return useSelector((state)=>state.pilihPasienPoliUmum,shallowEqual);
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
  const  [styleContainer,setStyleContainer]=useState({
    marginLeft:"60px"
  })
  const[styleSideBarIcon,setStyleSideBarIcon]=useState({
    marginLeft:"1%",
  })
  const {loadingAuth,loggedIn,user}=useAuth();
  //batas Sidebar dan User;
  const dispatch = useDispatch();
  const  pilihPasien = useGlobalPilihPasienPoliUmum();
  const [formValue,setFormValue]=useState({
      diagnosis:'',
      diagnosis_pengobatan:'',
      resep_obat:'',
      nama_rujuk:''
  })
  const [errorValue,setErrorValue]=useState({
    diagnosis:true,
    diagnosis_pengobatan:true,
    resep_obat:true,
    nama_rujuk:true
  });
  const [errorLabel,setErrorLabel]=useState({
    diagnosis:'harus memasukan data diagnosis',
    diagnosis_pengobatan:'harus memasukan data diagnosis pengobatan',
    resep_obat:'harus memasukan data resep obat',
    nama_rujuk:'harus memasukan data nama rujuk'
  })
  const [errorStyle,setErrorStyle]=useState({
    diagnosis:{
      color:'red'
    },
    diagnosis_pengobata:{
      color:'red'
    },
    resep_obat:{
        color:'red'
    },
    nama_rujuk:{ 
      color:'red'
    }
  })
  const [toggleRawatInap,setToggleRawatInap]=useState(false);
  const [styleBox,setStyleBox]=useState({
      width:"45%",
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
  });
  const [toggleMenu,setToggleMenu]=useState(1);
  useEffect(()=>{
    var image=imagaBase;
    if(image!==null){ 
      setLogo(image);
    }
    if(pilihPasien!=null){
      if(pilihPasien.poli_umum!=null){
          console.log(pilihPasien);
           if(pilihPasien.rawat_inap!=null){
            setFormValue({...formValue,['diagnosis']:'',
              ['resep_obat']:'',
              ['diagnosis_pengobatan']:pilihPasien.poli_umum.diagnosis_pengobatan,
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
              ['diagnosis_pengobatan']:pilihPasien.poli_umum.diagnosis_pengobatan,
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
            setFormValue({...formValue,['diagnosis']:pilihPasien.poli_umum.diagnosis,
                                      ['resep_obat']:pilihPasien.poli_umum.resep_obat,
                                      ['diagnosis_pengobatan']:pilihPasien.poli_umum.diagnosis_pengobatan,
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
  useEffect(()=>{
      if(user!==null){
        setAdmin({...admin,['id']:user.id,['email']:user.email});
      }
      dispatch({type:'PILIH_PASIEN_POLI_UMUM',index:id})
  },[])
  useEffect(()=>{
    if(user!==null){
      if(user.nama_poli!='poli umum'&&user.nama_poli!='admin'){
        if(user.nama_poli=='poli gizi'){
          router.push('/poliGizi');
        }else if(user.nama_poli=='poli umum'){
          router.push('/poliUmum');
        }else if(user.nama_poli=='kia/kb'){
          router.push('/kiaKb');
        }else if(user.nama_poli=='igd'){
          router.push('/main');
        }else if(user.nama_poli=='poli gigi'){
          router.push('/poliGigi');
        }
      }else{
        setAdmin({...admin,['id']:user.id,['email']:user.email});
      }
    }
  },[user])
  //Fungsi Toggle Sidebar
  useEffect(()=>{
    if(width>480){
      setMatches(false);
      setStyleBox({...styleBox,['width']:'45%'});
    }else{
      setMatches(true);
      setStyleBox({...styleBox,['width']:'90%'});
    }
  }, [height])
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
//fugsi CRUD 
  const ubahDataPoliUmum=()=>{
    Swal.showLoading();
    axiosClient.post('Poliumum/ubahDataPoliUmum',
      {id:pilihPasien.id,
        toggle:toggleMenu,
        diagnosis_pengobatan:formValue.diagnosis_pengobatan,
        diagnosis:formValue.diagnosis,
        resep_obat:formValue.resep_obat,
        nama_rujuk:formValue.nama_rujuk
      }).then(({data})=>{
                    dispatch({
                      type:'STORE_DATA_POLI_UMUM',
                      allDataPoliUmum:data.allDataPoliUmum.data,
                      pilihPoliUmum:data.allDataPoliUmum.data[id]
                    })
                    Swal.close();
                    Swal.fire({
                      icon: "success",
                      title: "Berhasil",
                      text: "Data Poli Umum Berhasil Diubah",
                    });
    })
  }
  const hapusDataPoliUmum=()=>{
    Swal.showLoading();
    axiosClient.post('Poliumum/hapusDataPoliUmum',
          {id:pilihPasien.id}).then(({data})=>{
          Swal.close();
          dispatch({
            type:'STORE_DATA_POLI_UMUM',
            allDataPoliUmum:data.allDataPoliUmum.data,
            pilihPoliUmum:data.allDataPoliUmum.data[id]
          })
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Data Poli Umum Berhasil Dihapus"
    })
  })
  }
  const tambahDataPoliumum=()=>{
      axiosClient.post('Poliumum/tambahDataPoliUmum',
        {id:pilihPasien.id,
          toggle:toggleMenu,
          diagnosis_pengobatan:formValue.diagnosis_pengobatan,
          diagnosis:formValue.diagnosis,
          resep_obat:formValue.resep_obat,
          nama_rujuk:formValue.nama_rujuk
        }).then(({data})=>{
                      dispatch({type:'STORE_DATA_POLI_UMUM',
                                allDataPoliUmum:data.allDataPoliUmum.data,
                                pilihPoliUmum:data.allDataPoliUmum.data[id]})
                      Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: "Data Poli Umum Berhasil Ditambahkan",
                      });
     })
  }
  const onChange=(event)=>{
     var value=event.target.value;
     var name = event.target.name;
      if(name=='diagnosis'){
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
      }else if(name=='diagnosis_pengobatan'){
        if(value==""){ 
          setErrorLabel({...errorLabel,[name]:'harus memasukan data '+name.replace('_',' ')+''})
          setErrorValue({...errorValue,[name]:true}); 
          setErrorStyle({...errorStyle,[name]:{color:'red'}})
        }else{
          setErrorLabel({...errorLabel,[name]:'Data '+name.replace('_',' ')+' valid'}) 
          setErrorValue({...errorValue,[name]:false});
          setErrorStyle({...errorStyle,[name]:{color:'green'}})
        }
        setFormValue({...formValue,[name]:value});
      }else if(name=='resep_obat'){
        if(value==""){ 
          setErrorLabel({...errorLabel,[name]:'harus memasukan data '+name.replace('_',' ')+''})
          setErrorValue({...errorValue,[name]:true}); 
          setErrorStyle({...errorStyle,[name]:{color:'red'}})
        }else{
          setErrorLabel({...errorLabel,[name]:'Data '+name.replace('_',' ')+' valid'}) 
          setErrorValue({...errorValue,[name]:false});
          setErrorStyle({...errorStyle,[name]:{color:'green'}})
        }
        setFormValue({...formValue,[name]:value});
      }else if(name=='nama_rujuk'){
        if(value==''){
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
  const cekNumber=(telepon)=>{
    let isnum = /^\d+$/.test(telepon);
    return isnum;
  }
  //Batas Fungsi CRUD
       //Cetak  Excel
       const [logo,setLogo]=useState();
       const exportExcelTrigger=(event)=>{
         Swal.showLoading();
         var m;
         // swalLoadingFunc();
         logo.then(result=>{
             m = result.base64Url;
          });
         setTimeout(()=>{
            exportExcelFile(m)
         },15000)
       }
       const exportExcelFile=(logo)=>{
         console.log(pilihPasien)
         const workbook= new ExcelJS.Workbook();
         var sheet=[];
         sheet[0] = workbook.addWorksheet(`Data Pasien`,{views:[ {showGridLines:false} ]})
         const imageNew=logo.split(';');
         const imageId = workbook.addImage({
           base64:"data:image/png;"+imageNew[1].toString(),
           extension: 'png',
         });
         sheet[0].mergeCells('C2:D2');
         sheet[0].mergeCells('C3:D3');
         sheet[0].mergeCells('C4:D4');
         sheet[0].mergeCells('C5:D5');
         
         sheet[0].mergeCells('E2:H2');
         sheet[0].mergeCells('E3:H3');
         sheet[0].mergeCells('E4:H4');
         sheet[0].mergeCells('E5:H5');
         sheet[0].addImage(imageId,'D2:D5');
         for (let index = 2; index <= 5; index++) {
           if(index==2){
             sheet[0].getCell('C'+index.toString()).border = {
               left: {style:'thin'},
               right: {style:'thin'},
               top: {style:'thin'},
             };
             sheet[0].getCell('E'+index.toString()).border = {
               left: {style:'thin'},
               right: {style:'thin'},
               top: {style:'thin'},
             };
           }else{
             sheet[0].getCell('C'+index.toString()).border = {
               left: {style:'thin'},
               right: {style:'thin'},
             };
             sheet[0].getCell('E'+index.toString()).border = {
               left: {style:'thin'},
               right: {style:'thin'}
             };
           }
          
           
         }
         sheet[0].getCell('E3').value="Puskesmas Rawat Inap Jungkat";
         sheet[0].getCell('E3').font={name: 'Calibri', family: 4, size: 18,bold: true}
         sheet[0].getCell('E3').alignment ={vertical:"middle",horizontal:"center"};
     
         sheet[0].getColumn(2).width=15.0;
         sheet[0].getColumn(3).width=10.0;
         sheet[0].getColumn(4).width=20.0;
         sheet[0].getColumn(5).width=15.0;
         sheet[0].getColumn(6).width=15.0;
         
         
         
         sheet[0].mergeCells('C6:D6');
         sheet[0].getCell('C6').value="Nama Pasien";
         sheet[0].getCell('C6').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('C6').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('C6').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
         sheet[0].mergeCells('E6:H6');
         sheet[0].getCell('E6').value=pilihPasien.nama_lengkap;
         sheet[0].getCell('E6').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('E6').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('E6').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
     
         sheet[0].mergeCells('C7:D7');
         sheet[0].getCell('C7').value="NIK";
         sheet[0].getCell('C7').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('C7').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('C7').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
         sheet[0].mergeCells('E7:H7');
         sheet[0].getCell('E7').value=pilihPasien.NIK;
         sheet[0].getCell('E7').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('E7').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('E7').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
     
         sheet[0].mergeCells('C8:D8');
         sheet[0].getCell('C8').value="Alamat";
         sheet[0].getCell('C8').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('C8').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('C8').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
         sheet[0].mergeCells('E8:H8');
         sheet[0].getCell('E8').value=pilihPasien.alamat_lengkap;
         sheet[0].getCell('E8').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('E8').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('E8').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
     
         sheet[0].mergeCells('C9:D9');
         sheet[0].getCell('C9').value="Jenis Kelamin";
         sheet[0].getCell('C9').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('C9').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('C9').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
         sheet[0].mergeCells('E9:H9');
         sheet[0].getCell('E9').value=pilihPasien.jenis_kelamin;
         sheet[0].getCell('E9').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('E9').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('E9').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
     
         sheet[0].mergeCells('C10:D10');
         sheet[0].getCell('C10').value="Nomor Telepon";
         sheet[0].getCell('C10').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('C10').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('C10').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
         sheet[0].mergeCells('E10:H10');
         sheet[0].getCell('E10').value=pilihPasien.no_telepon;
         sheet[0].getCell('E10').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('E10').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('E10').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
     
         sheet[0].mergeCells('C11:D11');
         sheet[0].getCell('C11').value="Tanggal Lahir";
         sheet[0].getCell('C11').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('C11').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('C11').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
         sheet[0].mergeCells('E11:H11');
         sheet[0].getCell('E11').value=pilihPasien.tanggal_lahir;
         sheet[0].getCell('E11').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('E11').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('E11').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
     
         sheet[0].mergeCells('C12:D12');
         sheet[0].getCell('C12').value="Nomor BPJS";
         sheet[0].getCell('C12').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('C12').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('C12').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
         sheet[0].mergeCells('E12:H12');
         sheet[0].getCell('E12').value=pilihPasien.no_bpjs;
         sheet[0].getCell('E12').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('E12').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('E12').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
     
         sheet[0].mergeCells('C13:D13');
         sheet[0].getCell('C13').value="Biaya";
         sheet[0].getCell('C13').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('C13').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('C13').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
         sheet[0].mergeCells('E13:H13');
         sheet[0].getCell('E13').value=pilihPasien.harga;
         sheet[0].getCell('E13').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('E13').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('E13').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
     
         sheet[0].mergeCells('C14:D14');
         sheet[0].getCell('C14').value="Poliklinik";
         sheet[0].getCell('C14').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('C14').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('C14').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
         sheet[0].mergeCells('E14:H14');
         sheet[0].getCell('E14').value=pilihPasien.tujuan_poliklinik;
         sheet[0].getCell('E14').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('E14').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('E14').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
     
         sheet[0].mergeCells('C15:D15');
         sheet[0].getCell('C15').value="Keluhan Utama";
         sheet[0].getCell('C15').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('C15').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('C15').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
         sheet[0].mergeCells('E15:H15');
         sheet[0].getCell('E15').value=pilihPasien.keluhan_utama;
         sheet[0].getCell('E15').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('E15').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('E15').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
     
         sheet[0].mergeCells('C16:D16');
         sheet[0].getCell('C16').value="Riwayat Pengobatan Operasi";
         sheet[0].getCell('C16').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('C16').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('C16').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
         sheet[0].mergeCells('E16:H16');
         sheet[0].getCell('E16').value=pilihPasien.riwayat_pengobatan_operasi;
         sheet[0].getCell('E16').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('E16').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('E16').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
     
         sheet[0].mergeCells('C17:D17');
         sheet[0].getCell('C17').value="Riwayat Penyakit Keluarga";
         sheet[0].getCell('C17').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('C17').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('C17').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
         sheet[0].mergeCells('E17:H17');
         sheet[0].getCell('E17').value=pilihPasien.riwayat_penyakit_keluarga;
         sheet[0].getCell('E17').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
         sheet[0].getCell('E17').alignment ={vertical:"middle",horizontal:"left"};
         sheet[0].getCell('E17').border = {
             top: {style:'thin'},
             left: {style:'thin'},
             bottom: {style:'thin'},
             right: {style:'thin'}
         };
         if(pilihPasien.rawat_inap!==null){
           sheet[0].mergeCells('C18:H18');
           sheet[0].getCell('C18').value='Rawat Inap';
           sheet[0].getCell('C18').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('C18').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('C18').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
     
           sheet[0].mergeCells('C19:D19');
           sheet[0].getCell('C19').value='Diagnosis Pengobatan';
           sheet[0].getCell('C19').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('C19').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('C19').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
           sheet[0].mergeCells('E19:H19');
           sheet[0].getCell('E19').value=pilihPasien.rawat_inap.diagnosis_pengobatan;
           sheet[0].getCell('E19').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('E19').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('E19').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
     
           sheet[0].mergeCells('C20:D20');
           sheet[0].getCell('C20').value='Tanggal Rawat Inap';
           sheet[0].getCell('C20').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('C20').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('C20').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
           sheet[0].mergeCells('E20:H20');
           sheet[0].getCell('E20').value=pilihPasien.rawat_inap.tanggal_rawat_inap;
           sheet[0].getCell('E20').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('E20').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('E20').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
     
           sheet[0].mergeCells('C21:D21');
           sheet[0].getCell('C21').value='Tanggal Pulang';
           sheet[0].getCell('C21').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('C21').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('C21').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
           sheet[0].mergeCells('E21:H21');
           sheet[0].getCell('E21').value=pilihPasien.rawat_inap.tanggal_pulang;
           sheet[0].getCell('E21').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('E21').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('E21').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
           if(pilihPasien.rujuk!=null){
             sheet[0].mergeCells('C22:D22');
             sheet[0].getCell('C22').value='Nama Rujuk';
             sheet[0].getCell('C22').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
             sheet[0].getCell('C22').alignment ={vertical:"middle",horizontal:"left"};
             sheet[0].getCell('C22').border = {
                 top: {style:'thin'},
                 left: {style:'thin'},
                 bottom: {style:'thin'},
                 right: {style:'thin'}
             };
             sheet[0].mergeCells('E22:H22');
             sheet[0].getCell('E22').value=pilihPasien.rujuk.nama_rujuk;
             sheet[0].getCell('E22').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
             sheet[0].getCell('E22').alignment ={vertical:"middle",horizontal:"left"};
             sheet[0].getCell('E22').border = {
                 top: {style:'thin'},
                 left: {style:'thin'},
                 bottom: {style:'thin'},
                 right: {style:'thin'}
             };
     
             sheet[0].mergeCells('C23:D23');
             sheet[0].getCell('C23').value='Tanggal Rujuk';
             sheet[0].getCell('C23').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
             sheet[0].getCell('C23').alignment ={vertical:"middle",horizontal:"left"};
             sheet[0].getCell('C23').border = {
                 top: {style:'thin'},
                 left: {style:'thin'},
                 bottom: {style:'thin'},
                 right: {style:'thin'}
             };
             sheet[0].mergeCells('E23:H23');
             sheet[0].getCell('E23').value=pilihPasien.rujuk.tanggal_rujuk;
             sheet[0].getCell('E23').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
             sheet[0].getCell('E23').alignment ={vertical:"middle",horizontal:"left"};
             sheet[0].getCell('E23').border = {
                 top: {style:'thin'},
                 left: {style:'thin'},
                 bottom: {style:'thin'},
                 right: {style:'thin'}
             };
           }
         }else if(pilihPasien.rujuk!==null){
           sheet[0].mergeCells('C18:H18');
           sheet[0].getCell('C18').value='Rujuk';
           sheet[0].getCell('C18').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('C18').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('C18').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
     
           sheet[0].mergeCells('C19:D19');
           sheet[0].getCell('C19').value='Diagnosis Pengobatan';
           sheet[0].getCell('C19').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('C19').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('C19').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
           sheet[0].mergeCells('E19:H19');
           sheet[0].getCell('E19').value=pilihPasien.poli_umum.diagnosis_pengobatan;
           sheet[0].getCell('E19').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('E19').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('E19').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
     
           sheet[0].mergeCells('C20:D20');
           sheet[0].getCell('C20').value='Nama Rujuk';
           sheet[0].getCell('C20').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('C20').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('C20').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
           sheet[0].mergeCells('E20:H20');
           sheet[0].getCell('E20').value=pilihPasien.rujuk.nama_rujuk;
           sheet[0].getCell('E20').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('E20').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('E20').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
     
           sheet[0].mergeCells('C21:D21');
           sheet[0].getCell('C21').value='Tanggal Rujuk';
           sheet[0].getCell('C21').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('C21').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('C21').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
           sheet[0].mergeCells('E21:H21');
           sheet[0].getCell('E21').value=pilihPasien.rujuk.tanggal_rujuk;
           sheet[0].getCell('E21').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('E21').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('E21').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
         }else{
           sheet[0].mergeCells('C18:H18');
           sheet[0].getCell('C18').value='Rawat Jalan';
           sheet[0].getCell('C18').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('C18').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('C18').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
     
           sheet[0].mergeCells('C19:D19');
           sheet[0].getCell('C19').value='Diagnosis Pengobatan';
           sheet[0].getCell('C19').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('C19').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('C19').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
           sheet[0].mergeCells('E19:H19');
           sheet[0].getCell('E19').value=pilihPasien.poli_umum.diagnosis_pengobatan;
           sheet[0].getCell('E19').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('E19').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('E19').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
     
           
     
           sheet[0].mergeCells('C20:D20');
           sheet[0].getCell('C20').value='Diagnosis';
           sheet[0].getCell('C20').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('C20').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('C20').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
           sheet[0].mergeCells('E20:H20');
           sheet[0].getCell('E20').value=pilihPasien.poli_umum.diagnosis;
           sheet[0].getCell('E20').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('E20').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('E20').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
     
           sheet[0].mergeCells('C21:D21');
           sheet[0].getCell('C21').value='Resep Obat';
           sheet[0].getCell('C21').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('C21').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('C21').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
           sheet[0].mergeCells('E21:H21');
           sheet[0].getCell('E21').value=pilihPasien.poli_umum.resep_obat;
           sheet[0].getCell('E21').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
           sheet[0].getCell('E21').alignment ={vertical:"middle",horizontal:"left"};
           sheet[0].getCell('E21').border = {
               top: {style:'thin'},
               left: {style:'thin'},
               bottom: {style:'thin'},
               right: {style:'thin'}
           };
         }
         const d = new Date();
         var arrDate = d.toString().split(" ");
         var moon = getNamaBulan(arrDate[1])
         workbook.xlsx.writeBuffer().then(function (data) {
             const blob = new Blob([data], {
               type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
             });
             const url = window.URL.createObjectURL(blob);
             const anchor = document.createElement("a");
             anchor.href = url;
     
             anchor.download = `cetakRiwayat(${arrDate[2]}-${moon}-${arrDate[3]}-${arrDate[4]}).xlsx`;
             anchor.click();
             window.URL.revokeObjectURL(url);
             // swalLoading.close();
         });
         Swal.close();
       }
       const getNamaBulan=(moon)=>{
         var result=""
         switch (moon.toLowerCase()) {
             case 'jan':
                  result ="Januari";
                 break;
             case 'feb':
                  result ="Februari";
                 break;
             case 'mar':
                  result ="Maret";
                 break;
             case 'apr':
                  result ="April";
                 break;
             case 'may':
                  result ="Mei";
                 break;
             case 'jun':
                  result ="Juni";
                 break;
             case 'jul':
                  result = "Juli";
                 break;
             case 'aug':
                  result ="Agustus";
                 break;
             case 'sep':
                  result ="September";
                 break;
             case 'oct':
                  result ="Oktober";
                 break;
             case 'nov':
                  result ="November";
                 break;
             case 'dec':
                  result ="Desember";
                 break;
     
             default:
                 result = "none";;
                 break;
         }
         return result;
     }
       const toDataURL = (url) => {
         const promise = new Promise((resolve, reject) => {
             axiosClient.get(url,{responseType: 'blob'}).then((data)=>{
                 var reader = new FileReader();
                 reader.readAsDataURL(data.data);
                 reader.onloadend = function () {
                 resolve({ base64Url: reader.result });
                 };
             });
     
         });
         return promise;
       }
       const imagaBase = async () => {
         const a = await toDataURL('/Riwayat/getLogoPuskesmas');
         return a;
       };
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
            {/* <Header toggleSideBar={toggleSideBar2.current}/> */}
            <Master toggleSideBar={toggleSideBar2.current} matches={matches}/>
              {pilihPasien!=null?(
                  <div className=" w-75 d-inline-block align-top mt-5 mb-2"  style={styleContainer}>
                    <div className="mt-2">
                          <h1 className="w-100 text-center">Form Data Pasien Poli Umum</h1>
                            
                          <div id="form_pasien_poli_umum" 
                               className="p-2 rounded d-inline-block me-2 align-top border border-primary" 
                               style={styleBox}> 
                              <h3>Data  Pasien</h3>
                               <DetilDataPasien pilihPasien={pilihPasien}/>
                          </div>
                          <div className="d-inline-block ps-2 align-top"
                               style={styleBox}>
                             <h3 className="text-capitalize " style={{borderBottom:"2px solid grey"}}>Form Data Poli Umum</h3>
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
                              <div className={styles.box_ipt+" ps-2"}>
                                  <label htmlFor="nama-signup" className={"form-label fw-medium text-dark bg-danger"+styles.label_ipt} >Nama Rujuk</label>
                                  <input type="text" className={styles.el_ipt+" form-control w-100"}  value={formValue.nama_rujuk}id="nama_rujuk" onChange={onChange} name="nama_rujuk"   placeholder="Nama Rujuk" />
                                  <p className="mt-2 text-capitalize" style={errorStyle.nama_rujuk} >{errorLabel.nama_rujuk}</p>
                                  <hr/>
                              </div>
                            </div>
                            
                             <div className="mt-2">
                                  {
                                    pilihPasien!=null?(
                                        pilihPasien.poli_umum==null?(
                                          <button className="btn btn-primary " onClick={tambahDataPoliumum}>Tambah</button>
                                        ):(
                                          <div>
                                              <div className="w-25 d-inline-block me-2" >
                                                  <button className="btn btn-success w-100" onClick={ubahDataPoliUmum}>Ubah </button>
                                              </div>
                                              <div className=" d-inline-block" style={{width:"30%"}} >
                                                     <button className="btn btn-danger w-100" onClick={hapusDataPoliUmum}>Hapus</button>
                                              </div>
                                              <div className="d-inline-block " style={{width:"40%"}}>
                                                <div style={{width:'fit-content'}} className="ms-auto ">
                                                    <button className="btn-info btn text-light"  onClick={exportExcelTrigger}>Cetak</button>
                                                </div>
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
       </div>
       </div>
    ):(<h1>d</h1>)
   
   
  )
}
export default DetilPasien;