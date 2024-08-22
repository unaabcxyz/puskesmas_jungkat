import styles from '../../styles/Pendaftaran.module.css';
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axiosClient from "../api/axios.client";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
const Swal = require('sweetalert2');
import { useRouter } from "next/router";
import { useAuthPendaftar } from "@/lib/hooks/authPendaftar";
import { useAuth } from '@/lib/hooks/auth';
async function handleLoginPendaftar(id,NIK){
  const resp =await fetch('/api/login-pendaftar',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      NIK,
      id
    })
    })
    const data=await resp.json();
    // console.log(data);
    if(data.success){
      return data;
    }
    throw new Error('Wrong email or password');
}
export default function Pendaftaran() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [errorText,setErrorText]=useState({
      namaLengkap:'Nama Harus Diisi',
      nik:'nik Harus Diisi',
      alamat:'alamat Harus Diisi',
      nomorTelepon:'nomor telepon harus diisi',
      keluhanUtama:'keluhan utama harus diisi',
      nomorBPJS:'*Bagi Pasien yang memiliki kartu bpjs(Dapat Dikosongkan)',
      nomorKartuAsuransi:'*Bagi pasien yang memiliki kartu Asuransi selain BPJS(Dapat Dikosongkan)',
      nomorKontakDarurat:'Kontak harus diisi',
      tempatLahir:'tempat lahir harus diisi',
      jumlahAnak:'*Bagi pasien yang memiliki anak(Dapat Dikosongkan )',
      
  });
  const {user}=useAuth();
  const  {loggedInPendaftar,loadingAuthPendaftar}=useAuthPendaftar();
  // const swalAlert = withReactContent(Swal)
  const [startDate, setStartDate] = useState(new Date());
  const [dataAlreadyRegisterd,setDataAlreadyRegistered]=useState({
    namaLengkap:'asdasd',
    nik:'',
    alamat:'asdasd'
  })
  const[formValue,setFormValue]=useState({
    namaLengkap:'',
    nik:'', 
    jenisKelamin:'perempuan',
    tanggalLahir:'',
    tempatLahir:'',
    alamat:'',
    nomorTelepon:'',
    statusPernikahan:'menikah',
    namaOrangTuaWali:'',
    namaPasangan:'',
    jumlahAnak:0,
    tujuanPoliklinik:'poli umum',
    keluhanUtama:'',
    riwayatPenyakitSebelumnya:'',
    riwayatAlergi:'',
    riwayatPengobatanOperasi:'',
    riwayatPenyakitKeluarga:'',
    nomorBPJS:'',
    nomorKartuAsuransi:'',
  })
  const [toggleDaftar,setToggleDaftar]=useState(false);
  const [errorValue,setErrorValue]=useState({
      namaLengkap:true,
      nik:true, 
      alamat:true,
      nomorTelepon:true,
      keluhanUtama:true,
      nomorBPJS:false,
     nomorKartuAsuransi:false,
     nomorKontakDarurat:true,
     tempatLahir:true,
    jumlahAnak:false,
  })
  const [errorLabelStyle,setErrorLabelStyle]=useState({
     namaLengkap:{ 
      color:'red'
     },
     nik:{ 
      color:'red'
     },
    alamat:{ 
      color:'red'
     },
    nomorTelepon:{ 
      color:'red'
     },
    keluhanUtama:{ 
      color:'red'
     },
     nomorBPJS:{
      color:'blue'
     },
     nomorKartuAsuransi:{
      color:'blue'
     },
     nomorKontakDarurat:{
      color:'red'
     },
     tempatLahir:{
      color:'red'
     },
     jumlahAnak:{
      color:'blue'
     }
  })
  if(!loadingAuthPendaftar && loggedInPendaftar){
    router.push('/pembayaran')
  }
  useEffect(()=>{
    axiosClient.post('Pasien/getDataPasien',{email:'asdasd'}).then(({data})=>{
        console.log(data);
    }).catch(err=>{
      
    })
  },[])
  const cekNumber=(telepon)=>{
    let isnum = /^\d+$/.test(telepon);
    return isnum;
  }
  const onChange=(event)=>{ 
    let name=event.target.name;
    let value=event.target.value;
    switch (name) {
      case 'namaLengkap':
          if(value==''){
            setErrorText({...errorText,['namaLengkap']:'nama harus diisi'});
            setErrorValue({...errorValue,['namaLengkap']:true});
            setErrorLabelStyle({...errorLabelStyle,['namaLengkap']:{color:'red'}});
          }else{
            setErrorText({...errorText,['namaLengkap']:'nama valid'});
            setErrorValue({...errorValue,['namaLengkap']:false});
            setErrorLabelStyle({...errorLabelStyle,['namaLengkap']:{color:'green'}});
          }
          setFormValue({...formValue,['namaLengkap']:value});
        break;
      case 'nik':
          if(value==''){
            setErrorText({...errorText,['nik']:'nomor NIK harus diisi'});
            setErrorValue({...errorValue,['nik']:true});
            setErrorLabelStyle({...errorLabelStyle,['nik']:{color:'red'}});
            setFormValue({...formValue,['nik']:value})
          }else if(cekNumber(value)==false){
              setErrorText({...errorText,['nik']:'masukan nik harus berupa angka'});
              setErrorValue({...errorValue,['nik']:true});
              setErrorLabelStyle({...errorLabelStyle,['nik']:{color:'red'}});
              setFormValue({...formValue,['nik']:value})
          }
          else{
            if(value.length>16){
              Swal.fire({
                title:'Gagal',
                icon:'error',
                text:'nomor NIK tidak boleh lebih dari 16 karakter',
                confirmButtonText:'Tutup pemberitahuan',
              });
              setErrorText({...errorText,['nik']:'nomor NIK valid'});
              setErrorValue({...errorValue,['nik']:false});
              setErrorLabelStyle({...errorLabelStyle,['nik']:{color:'green'}});  
            }else{
              if(value.length<16){ 
                setErrorText({...errorText,['nik']:'masukan nik harus berjumlah 16 karakter'});
                setErrorValue({...errorValue,['nik']:true});
                setErrorLabelStyle({...errorLabelStyle,['nik']:{color:'red'}});
              }else{  
                setErrorText({...errorText,['nik']:'nomor NIK valid'});
                setErrorValue({...errorValue,['nik']:false});
                setErrorLabelStyle({...errorLabelStyle,['nik']:{color:'green'}});  
              }
             
                    
              setFormValue({...formValue,['nik']:value})
            }
          }
         
        break;
      case 'alamat':
        if(value==''){
          setErrorText({...errorText,['alamat']:'alamat harus diisi'});
          setErrorValue({...errorValue,['alamat']:true});
          setErrorLabelStyle({...errorLabelStyle,['alamat']:{color:'red'}});
        }else{
          setErrorText({...errorText,['alamat']:'alamat valid'});
          setErrorValue({...errorValue,['alamat']:false});
          setErrorLabelStyle({...errorLabelStyle,['alamat']:{color:'green'}});
        }
        setFormValue({...formValue,['alamat']:value})
      break;
      case 'nomorTelepon':
        if(value==''){
          setErrorText({...errorText,['nomorTelepon']:'nomor telepon harus diisi'});
          setErrorValue({...errorValue,['nomorTelepon']:true});
          setErrorLabelStyle({...errorLabelStyle,['nomorTelepon']:{color:'red'}});
        }else if(cekNumber(value)==false){
          setErrorText({...errorText,['nomorTelepon']:'masukan nomor Telepon harus berupa angka'});
          setErrorValue({...errorValue,['nomorTelepon']:true});
          setErrorLabelStyle({...errorLabelStyle,['nomorTelepon']:{color:'red'}});
        }else if(value.length<8){
          setErrorText({...errorText,['nomorTelepon']:'masukan nomor telepon minimal 8 angka'});
          setErrorValue({...errorValue,['nomorTelepon']:true});
          setErrorLabelStyle({...errorLabelStyle,['nomorTelepon']:{color:'red'}});
        }else{
          setErrorText({...errorText,['nomorTelepon']:'nomor telepon valid'});
          setErrorValue({...errorValue,['nomorTelepon']:false});
          setErrorLabelStyle({...errorLabelStyle,['nomorTelepon']:{color:'green'}});
        }
        setFormValue({...formValue,['nomorTelepon']:value})
      break;
      case 'keluhanUtama':
        if(value==''){
          setErrorText({...errorText,['keluhanUtama']:'keluhan utama harus diisi'});
          setErrorValue({...errorValue,['keluhanUtama']:true});
          setErrorLabelStyle({...errorLabelStyle,['keluhanUtama']:{color:'red'}});
        }else{
          setErrorText({...errorText,['keluhanUtama']:'keluhan utama telepon valid'});
          setErrorValue({...errorValue,['keluhanUtama']:false});
          setErrorLabelStyle({...errorLabelStyle,['keluhanUtama']:{color:'green'}});
        }
        setFormValue({...formValue,['keluhanUtama']:value});
      break;
      case 'nomorBPJS':
        if(value==''){
          setErrorText({...errorText,['nomorBPJS']:'*Bagi Pasien yang memiliki kartu bpjs(Dapat Dikosongkan)'});
          setErrorValue({...errorValue,['nomorBPJS']:false});
          setErrorLabelStyle({...errorLabelStyle,['nomorBPJS']:{color:'blue'}});
         }
        else if(cekNumber(value)==false){
          setErrorText({...errorText,['nomorBPJS']:'masukan nomor BPJS harus berupa angka'});
          setErrorValue({...errorValue,['nomorBPJS']:true});
          setErrorLabelStyle({...errorLabelStyle,['nomorBPJS']:{color:'red'}});
        }else{
          setErrorText({...errorText,['nomorBPJS']:'*Bagi Pasien yang memiliki kartu bpjs(Dapat Dikosongkan)'});
          setErrorValue({...errorValue,['nomorBPJS']:false});
          setErrorLabelStyle({...errorLabelStyle,['nomorBPJS']:{color:'blue'}});
        }
        setFormValue({...formValue,['nomorBPJS']:value});
        break; 
      case 'jumlahAnak':
        if(value==''){
          setErrorText({...errorText,['jumlahAnak']:'*Bagi Pasien yang memiliki anak(Dapat Dikosongkan)'});
          setErrorValue({...errorValue,['jumlahAnak']:false});
          setErrorLabelStyle({...errorLabelStyle,['jumlahAnak']:{color:'blue'}});
         }
        else if(cekNumber(value)==false){
          setErrorText({...errorText,['jumlahAnak']:'masukan jumlah anak harus berupa angka'});
          setErrorValue({...errorValue,['jumlahAnak']:true});
          setErrorLabelStyle({...errorLabelStyle,['jumlahAnak']:{color:'red'}});
        }else{
          setErrorText({...errorText,['jumlahAnak']:'*Bagi Pasien yang memiliki anak(Dapat Dikosongkan)'});
          setErrorValue({...errorValue,['jumlahAnak']:false});
          setErrorLabelStyle({...errorLabelStyle,['jumlahAnak']:{color:'blue'}});
        }
        setFormValue({...formValue,['jumlahAnak']:value});
        break; 
      case 'nomorKartuAsuransi':
        if(value==''){
          setErrorText({...errorText,['nomorKartuAsuransi']:'*Bagi Pasien yang memiliki nomor kartu asuransi lain, selain BPJS(Dapat Dikosongkan)'});
          setErrorValue({...errorValue,['nomorKartuAsuransi']:false});
          setErrorLabelStyle({...errorLabelStyle,['nomorKartuAsuransi']:{color:'blue'}});
         }
        else if(cekNumber(value)==false){
          setErrorText({...errorText,['nomorKartuAsuransi']:'masukan nomor kartu asuransi lain, harus berupa angka'});
          setErrorValue({...errorValue,['nomorKartuAsuransi']:true});
          setErrorLabelStyle({...errorLabelStyle,['nomorKartuAsuransi']:{color:'red'}});
        }else{
          setErrorText({...errorText,['nomorKartuAsuransi']:'*Bagi Pasien yang memiliki nomor kartu asuransi lain, selain BPJS(Dapat Dikosongkan)'});
          setErrorValue({...errorValue,['nomorKartuAsuransi']:false});
          setErrorLabelStyle({...errorLabelStyle,['nomorKartuAsuransi']:{color:'blue'}});
        }
        setFormValue({...formValue,['nomorKartuAsuransi']:value}) 
        break; 
      case 'nomorKontakDarurat':
        if(value==''){
          setErrorText({...errorText,['nomorKontakDarurat']:'nomor kontak darurat harus diisi'});
          setErrorValue({...errorValue,['nomorKontakDarurat']:true});
          setErrorLabelStyle({...errorLabelStyle,['nomorKontakDarurat']:{color:'red'}});
        }else if(cekNumber(value)==false){
          setErrorText({...errorText,['nomorKontakDarurat']:'masukan nomor kontak darurat harus berupa angka'});
          setErrorValue({...errorValue,['nomorKontakDarurat']:true});
          setErrorLabelStyle({...errorLabelStyle,['nomorKontakDarurat']:{color:'red'}});
        }else if(value.length<8){
          setErrorText({...errorText,['nomorKontakDarurat']:'masukan nomor kontak darurat minimal 8 angka'});
          setErrorValue({...errorValue,['nomorKontakDarurat']:true});
          setErrorLabelStyle({...errorLabelStyle,['nomorKontakDarurat']:{color:'red'}});
        }else{
          setErrorText({...errorText,['nomorKontakDarurat']:'nomor kontak darurat valid'});
          setErrorValue({...errorValue,['nomorKontakDarurat']:false});
          setErrorLabelStyle({...errorLabelStyle,['nomorKontakDarurat']:{color:'green'}});
        }
          setFormValue({...formValue,['nomorKontakDarurat']:value})
          break;
      case 'tempatLahir':
        if(value==''){
          setErrorText({...errorText,['tempatLahir']:'Tempat Lahir harus diisi'});
          setErrorValue({...errorValue,['tempatLahir']:true});
          setErrorLabelStyle({...errorLabelStyle,['tempatLahir']:{color:'red'}});
        }else{
          setErrorText({...errorText,['tempatLahir']:'Tempat Lahir valid'});
          setErrorValue({...errorValue,['tempatLahir']:false});
          setErrorLabelStyle({...errorLabelStyle,['tempatLahir']:{color:'green'}});
        }
        setFormValue({...formValue,['tempatLahir']:value});
        break;
      case 'jenisKelamin':
          setFormValue({...formValue,['jenisKelamin']:value});
        break ;
      case 'statusPernikahan':
         setFormValue({...formValue,['statusPernikahan']:value});
        break;
      case 'namaOrangTuaWali': 
        setFormValue({...formValue,['namaOrangTuaWali']:value}); 
        break;
      case 'namaPasangan': 
        setFormValue({...formValue,['namaPasangan']:value}); 
        break;
      case 'riwayatPenyakitSebelumnya':
         setFormValue({...formValue,['riwayatPenyakitSebelumnya']:value})
         break;
      case 'riwayatAlergi':
         setFormValue({...formValue,['riwayatAlergi']:value})
         break;
      case 'riwayatPengobatanOperasi':
         setFormValue({...formValue,['riwayatPengobatanOperasi']:value})
         break;
      case 'riwayatPenyakitKeluarga':
         setFormValue({...formValue,['riwayatPenyakitKeluarga']:value})
         break;
      case 'tujuanPoliklinik':
        setFormValue({...formValue,['tujuanPoliklinik']:value})
        break;
      default:
        break;
    }
  }
  const convertMouthToNumber=(mouth)=>{
    var result =0;
    switch (mouth.toLowerCase()) {
        case "jan":
                result=1;
            break;
        case "feb":
                result=2;
            break;
        case "mar":
                result=3;
            break;
        case "apr":
                result=4;
            break;
        case "mei":
                result=5;
            break;
        case "jun":
                result=6;
            break;
        case "jul":
                result=7;
            break;
        case "aug":
                result=8;
            break;
        case "sep":
                result=9;
            break;
        case "oct":
                result=10;
            break;
        case "nov":
                result=11;
            break;
        case "dec":
                result=12;
            break;
        default:
                result=0;
            break;
    }
    return result;
}
  const onClick=()=>{
    // console.log(formValue);
    var errorKey="";
    for (var key in errorValue) {
      if(errorValue[key]==true){
        errorKey=key;
        break;
      }
    }
    if(errorKey!==''){
      Swal.fire({
        title:'Gagal',
        icon:'error',
        text:errorText[errorKey].toUpperCase(),
        confirmButtonText:'Tutup pemberitahuan',
      });
    }else if(formValue.tanggalLahir==''){
      Swal.fire({
        title:'Gagal',
        icon:'error',
        text:'Mohon untuk memasukan tanggal lahir anda',
        confirmButtonText:'Tutup pemberitahuan',
      });
    }
    else if(formValue.nomorBPJS!==''&&formValue.nomorKartuAsuransi!==''){
      Swal.fire({
        title:'Gagal',
        icon:'error',
        text:'Anda harus memilih salah satu, antara BPJS atau Nomor Asuransi Lain',
        confirmButtonText:'Tutup pemberitahuan',
      });
    }else{ 
      Swal.showLoading();
      axiosClient.post('Pasien/inputDataPasien ',formValue).then(({data})=>{
        Swal.close();
        console.log(data);
        if(data.no_bpjs!=null){
          Swal.fire({
            title:'Berhasil',
            icon:'success',
            text:'Pendafaran berhasil dilakukan, melalui media BPJS',
            confirmButtonText:'Tutup pemberitahuan',
          });
        }else{
          dispatch({type:'ISI_PENDAFTARAN',pendaftaran:data})
          handleLoginPendaftar(data.id,data.NIK).then(response=>response.success==true?(router.push('/pembayaran')):(null))
        }
      }).catch(error=>{
        const response=error.response;
          if(response.status==422||response.status==500||response.status==404){
              Swal.close();
              Swal.fire({
                title:'Gagal',
                icon:'error',
                text:'Anda gagal mendaftarkan diri anda, dikarenakan ada gangguan',
                confirmButtonText:"<p class='text-capitalize my-0'>Tutup pemberitahuan</p>",
            });
          }
      }
      )
    }
  } 
  // useEffect 
  const changeTanggal=(date)=>{
    setStartDate(date);
    var  tanggalArray=date.toString().split(' ');
    tanggalArray[1]=convertMouthToNumber(tanggalArray[1]);
    console.log(tanggalArray);
    setFormValue({...formValue,['tanggalLahir']:tanggalArray[1].toString()+'-'+tanggalArray[2].toString()+'-'+tanggalArray[3].toString()});
    
  }
  return (
    <div>
    {user!==null?(
      <div className='w-75 mx-auto my-3'>
          <button className="btn btn-success fw-bold h5" onClick={()=>{router.push('/utama')}}>Kembali</button>
      </div>
    ):(null)}
    <div className=" w-75 mx-auto p-3 mt-2 rounded" style={{backgroundColor:'#009FBD'}}>
      
      <div className=" mx-auto " style={{width:'fit-content',borderBottom:"2px solid white"}}>
       <h2 className="text-light text-center ">Pendaftaran Pasien Rumah Sakit</h2>
      </div>
      
      {toggleDaftar?(
        <div>
          <div>
          </div>
          <h2 className="w-100 text-center text-light">Pendaftran Berhasil</h2>
        <div style={{border:'1px solid white'}} className="mt-2 p-2">
        <table className='w-100'> 
          <tr>
            <td>
             <p className="text-light fw-medium text-capitalize">Nama Lengkap</p>
            </td>
            <td>
              <p className="text-light fw-medium text-capitalize">:</p>
            </td>
            <td>
              <p className="text-light fw-medium text-capitalize">{dataAlreadyRegisterd.namaLengkap}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="text-light fw-medium text-capitalize">NIK</p>
            </td>
            <td>
              <p className="text-light fw-medium text-capitalize">:</p>
            </td>
            <td>
             <p className="text-light fw-medium text-capitalize">{dataAlreadyRegisterd.nik}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="text-light fw-medium text-capitalize">Alamat</p>
            </td>
            <td>
               <p className="text-light fw-medium text-capitalize">:</p>
            </td>
            <td>
               <p className="text-light fw-medium text-capitalize">{dataAlreadyRegisterd.alamat}</p>
            </td>
          </tr>
          
        </table>
        </div> 
        </div>
      ):(
      <div>
        
       <div> 
        <h3 className="text-light">Form Pendaftaran</h3>
      </div>
      <div className="bg-light p-3 rounded">
        <div className={styles.box_ipt+" ps-2"}>
            <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >Nama Lengkap</label>
            <input type="text" className={styles.el_ipt+" form-control"} id="nama-lengkap" name="namaLengkap" onChange={onChange}  placeholder="Nama Lengkap" />
            <p className="mt-2 text-capitalize" style={errorLabelStyle.namaLengkap}>{errorText.namaLengkap}</p>
            <hr/>
        </div>
        <div className={styles.box_ipt+" ps-2"}>
            <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >NIK</label>
            <input type="text" className={styles.el_ipt+" form-control"} id="nik" name="nik" onChange={onChange} value={formValue.nik}   placeholder="NIK" />
            <p className="mt-2 text-capitalize" style={errorLabelStyle.nik}>{errorText.nik}</p>
            <hr/>
        </div>
        <div className={styles.box_ipt+" ps-2"}>
            <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >Jenis Kelamin</label>
            <select className="form-select" id="jenis Kelamin" name="jenisKelamin" onChange={onChange}> 
              <option selected value= "laki-laki">Laki-Laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
            <hr/>
        </div>
        <div className={styles.box_ipt+" ps-2"}>
            <label htmlFor="nama-signup" className={"form-label fw-medium  w-100 "+styles.label_ipt}>Tanggal Lahir</label>
            <DatePicker className="form-control" selected={startDate} onChange={(date) => changeTanggal(date)} />
            <hr/>
        </div>
        <div className={styles.box_ipt+" ps-2"}>
            <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >Tempat Lahir</label>
            <input type="text" className={styles.el_ipt+" form-control"} id="tempat-lahir" name="tempatLahir" onChange={onChange}   placeholder="Tempat Lahir" />
            <p className="mt-2 text-capitalize" style={errorLabelStyle.tempatLahir}>{errorText.tempatLahir}</p>
            <hr/>
        </div>
        <div className={styles.box_ipt+" ps-2"}>
            <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >Alamat Lengkap</label>
            <textarea className="form-control" placeholder="Masukan alamat anda disini" id="alamat"  name="alamat" onChange={onChange}></textarea>
            <p className="mt-2 text-capitalize" style={errorLabelStyle.alamat}>{errorText.alamat}</p>
            <hr/>
        </div>
        <div className={styles.box_ipt+" ps-2"}>
            <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >Nomor Telepon</label>
            <input type="text" className={styles.el_ipt+" form-control"} id="nama-signup" name="nomorTelepon" onChange={onChange}   placeholder="Nomor Telepon" />
            <p className=" mt-2 text-capitalize" style={errorLabelStyle.nomorTelepon}>{errorText.nomorTelepon}</p>
            <hr/>
        </div>
        <div className={styles.box_ipt+" ps-2"}>
            <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >Status Pernikahan</label>
            <select className="form-select" id="inputGroupSelect01" defaultValue={'menikah'} value={formValue.statusPernikahan} name="statusPernikahan" onChange={onChange}>
              <option value="menikah">Menikah</option>
              <option value="belun menikah">Belum Menikah</option>
            </select>
            <hr/>
            <hr/>
        </div>
        <div className={styles.box_ipt+" ps-2"}>
            <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >Nama Orang tua/Wali</label>
            <input type="text" className={styles.el_ipt+" form-control"} id="nama-orang-tua-wali" name="namaOrangTuaWali" onChange={onChange}   placeholder="Nama Orang Tua Wali" />
            <p className="text-primary mt-2 text-capitalize">*untuk pasien anak-anak(Bisa dikosongkan)</p>
            <hr/>
        </div>
        <div className={styles.box_ipt+" ps-2"}>
            <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >Nama  Pasangan</label>
            <input type="text" className={styles.el_ipt+" form-control"} id="nama-pasangan" name="namaPasangan"   placeholder="Nama Pasangan" onChange={onChange} />
            <p className="text-primary mt-2 text-capitalize">*untuk pasien dewasa yang sudah menikah(Bisa dikosongkan)</p>
            <hr/>
        </div>
        <div className={styles.box_ipt+" ps-2"}>
            <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >Jumlah Anak</label>
            <input type="text" className={styles.el_ipt+" form-control"} id="nama-signup" name="jumlahAnak"   placeholder="Jumlah Anak" onChange={onChange} />
            <p className=" mt-2 text-capitalize" style={errorLabelStyle.jumlahAnak }>{errorText.jumlahAnak}</p>
            <hr/>
        </div>
        <div className={styles.box_ipt+" ps-2"}>
            <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt}>Tujuan Poliklinik</label>
            <select className="form-select" id="inputGroupSelect01" value={formValue.tujuanPoliklinik}  onChange={onChange} name='tujuanPoliklinik' defaultValue={'poli umum'}>
              <option value="poli umum">Poli Umum</option>
              <option value="poli gigi">Poli Gigi</option>
              <option value="igd">IGD</option>
              <option value="poli gizi">Poli Gizi</option>
              <option value="kia/kb">KIA/KB</option>
            </select>
            <hr/>
        </div>
        <div className={styles.box_ipt+" ps-2"}>
            <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >Keluhan Utama</label>
            <textarea className="form-control" placeholder="Masukan keluhan utama disini" id="keluhan-utama"  name="keluhanUtama" onChange={onChange}></textarea>
            <p className=" mt-2 text-capitalize" style={errorLabelStyle.keluhanUtama}>{errorText.keluhanUtama}</p>
            <hr/>
        </div>
        <div className={styles.box_ipt+" ps-2"}>
            <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >Riwayat Penyakit Sebelumnya</label>
            <textarea className="form-control" placeholder="Masukan Riwayat Penyakit Sebelumnya Disini" id="riwayat-penyakit-sebelumnya"  name="riwayatPenyakitSebelumnya" onChange={onChange}></textarea>
            <p className="text-primary mt-2 text-capitalize">*Bagi pasien yang memiliki penyakit sebelumnya(Dapat dikosongkan)</p>
            <hr/>
        </div>
        <div className={styles.box_ipt+" ps-2"}>
            <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >Riwayat Alergi</label>
            <input type="text" className={styles.el_ipt+" form-control"} id="riwayat-alergi" name="riwayatAlergi"   placeholder="Riwayat Alergi" onChange={onChange} />
            <p className="text-primary mt-2 text-capitalize">*Bagi pasien yang memiliki riwayat alergi(Dapat dikosongkan)</p>
            <hr/>
        </div>
        <div className={styles.box_ipt+" ps-2"}>
            <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >Riwayat Pengobatan atau operasi</label>
            <input type="text" className={styles.el_ipt+" form-control"} id="riwayat-pengobatan-operasi" name="riwayatPengobatanOperasi" onChange={onChange}   placeholder="Riwayat Pengobatan Alergi" />
            <p className="text-primary mt-2 text-capitalize">*Bagi Pasien yang memiliki riwayat pengobatan atau operasi(Dapat dikosongka)</p>
            <hr/>
        </div>
        <div className={styles.box_ipt+" ps-2"}>
            <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >Riwayat Penyakit Keluarga</label>
            <input type="text" className={styles.el_ipt+" form-control"} id="riwayat-penyakit-keluarga" name="riwayatPenyakitKeluarga" onChange={onChange}   placeholder="Riwayat Penyakit Keluarga" />
            <p className="text-primary mt-2 text-capitalize">*Bagi Pasien yang keluarganya memiliki riwayat penyakit(Dapat dikosongkan)</p>
            <hr/>
        </div>
        <div className={styles.box_ipt+" ps-2"}>
            <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >No. BPJS</label>
            <input type="text" className={styles.el_ipt+" form-control"} id="nomor-BPJS" name="nomorBPJS" onChange={onChange}   placeholder="nomor BPJS" />
            <p className=" mt-2 text-capitalize" style={errorLabelStyle.nomorBPJS}>{errorText.nomorBPJS}</p>
            <hr/>
        </div>
        <div className={styles.box_ipt+" ps-2"}>
            <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >No. Kartu Asuransi</label>
            <input type="text" className={styles.el_ipt+" form-control"} id="no-kartu-asurans-lain" name="nomorKartuAsuransi" onChange={onChange}   placeholder="Nomor Kartu Asuransi Selain BPJS" />
            <p className=" mt-2" style={errorLabelStyle.nomorKartuAsuransi}>{errorText.nomorKartuAsuransi}</p>
            <hr/>
        </div>
        <div className={styles.box_ipt+" ps-2"}>
            <label htmlFor="nama-signup" className={"form-label fw-medium  "+styles.label_ipt} >Kontak Darurat</label>
            <input type="text" className={styles.el_ipt+" form-control"} id="kontak-darurat" onChange={onChange} name="nomorKontakDarurat"   placeholder="Kontak Darurat" />
            <p className=" mt-2 text-capitalize" style={errorLabelStyle.nomorKontakDarurat}>{errorText.nomorKontakDarurat}</p>
            <hr/>
        </div>
        <div className={styles.box_ipt+" ps-2"}>
          <div style={{width:"fit-content"}} className="w-75 mx-auto">
           <button type="button" className="btn btn-primary w-100" onClick={onClick}>Daftar</button>
          </div>
        
        </div>

       </div>
        </div>
      )}
     
      </div>
      </div>
  );
}
