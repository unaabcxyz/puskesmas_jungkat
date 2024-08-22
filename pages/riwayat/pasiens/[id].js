import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector,shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";
import styles from '../../../styles/DetilPasienPoliUmum.module.css';
import axiosClient from "@/pages/api/axios.client";
import DetilDataPasien from "@/components/PoliGizi/DetilDataPasien";
import { useRef } from "react";
import { useAuth } from "@/lib/hooks/auth";
import useDeviceSize from "@/components/UseDevice/useDeviceSize";
const Swal = require('sweetalert2')
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
function useGlobalPilihPasienRiwayat(){
  return useSelector((state)=>state.pilihRiwayat,shallowEqual)
}
const DetilPasien=({id})=>{ 
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
  const pilihPasien = useGlobalPilihPasienRiwayat();
  const {loadingAuth,loggedIn,user}=useAuth();
  const dispatch = useDispatch();
  const [styleBox,setStyleBox]=useState({
    width:"45%",
  })
  useEffect(()=>{
    if(user!==null){
      setAdmin({...admin,['id']:user.id,['email']:user.email});
    }
    dispatch({type:'PILIH_PASIEN_RIWAYAT',index:id})
    // dispatch({type:'PILIH_PASIEN_POLI_GIZI',index:id})
  },[])
  useEffect(()=>{
        console.log(pilihPasien)
  },[pilihPasien])
  useEffect(()=>{
    if(user!==null){
      setAdmin({...admin,['id']:user.id,['email']:user.email});
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
  const convetTanggalIndonesia=(tanggal)=>{ 
      const splitTanggal = tanggal.split(" ");
      const splitTanggal2=splitTanggal[0].split("-");
      return splitTanggal2[2]+"-"+tanggalString(splitTanggal2[1])+"-"+splitTanggal2[0];
  }
  const tanggalString=(bulan)=>{
    var bulan = parseInt(bulan);
    var result = "";
    switch (bulan) {
      case 1:
          result="Januari";
        break;
      case 2:
          result="Februari";
        break;
      case 3:
          result="Maret";
        break;
      case 4:
          result="April";
        break;
      case 5:
          result="Mei";
        break;
      case 6:
          result="Juni";
        break;
      case 7:
          result="Juli";
        break;
      case 8:
          result="Agustus";
        break;
      case 9:
          result="September";
        break;
      case 10:
          result="Oktober";
        break;
      case 11:
          result="November";
        break;
      case 10:
          result="Desember";
        break;
      default:
        break;
    }
    return  result;
  }
  return(
    admin.id>0?(
        <div>
            <div className="d-block bg-danger align-top " style={styleSideBarIcon}  onClick={toggleSidebarFunc}>
              <div className={styles.cont_sidebar_icon+" d-flex align-items-center  rounded-circle  shadow "} style={{cursor:"pointer"}}>
                <img src="https://website.penjadwalanmatapelajaransman2sekayam.xyz/iconFoto/menuSidebar2.png" className="w-50 h-50 mx-auto" />
              </div>
            </div>
            <Master toggleSideBar={toggleSideBar2.current} matches={matches}/>
            {pilihPasien!=null?(
                  <div className=" w-75 d-inline-block align-top mt-5 mb-2"  style={styleContainer}>
                      <h1  className="fw-bold">Detil Data Pasien</h1>
                      <table>
                          <tr>
                            <td>
                              <p>Nama Pasien</p>
                            </td>
                            <td>
                              <p>:</p>
                            </td>
                            <td>
                              <p>{pilihPasien.nama_lengkap}</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p>NIK</p>
                            </td>
                            <td>
                              <p>:</p>
                            </td>
                            <td>
                              <p>{pilihPasien.NIK}</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p>Alamat</p>
                            </td>
                            <td>
                              <p>:</p>
                            </td>
                            <td>
                              <p>{pilihPasien.alamat_lengkap}</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p>Keluhan</p>
                            </td>
                            <td>
                              <p>:</p>
                            </td>
                            <td>
                              <p>{pilihPasien.keluhan_utama}</p>
                            </td>
                          </tr>
                      </table>
                      { 
                        pilihPasien.poli_umum!=null?(
                          <div>
                              <div className=" align-top">
                                <h3>Poli umum:</h3>
                              </div>
                              <div className="block align-center">
                                <p>Diagmosis Pengobatan : {pilihPasien.poli_umum.diagnosis_pengobatan}</p>
                                <p>Diagnosis: {pilihPasien.poli_umum.diagnosis}</p>
                                <p>Resep Obat: {pilihPasien.poli_umum.resep_obat}</p>
                              </div>
                          </div>
                        ):(null)
                      }
                      {
                        pilihPasien.poli_gigi!=null?(
                          <div>
                            <div className=" align-top">
                              <h3>Poli gigi:</h3>
                            </div>
                            <div className="block align-center">
                              <p>Diagmosis Pengobatan : {pilihPasien.poli_gigi.diagnosis_pengobatan}</p>
                              <p>Diagnosis: {pilihPasien.poli_gigi.diagnosis}</p>
                              <p>Resep Obat: {pilihPasien.poli_gigi.resep_obat}</p>
                            </div>
                        </div>
                        ):(null)
                      }
                      {
                        pilihPasien.poli_gizi!=null?(
                          <div>
                            <div className=" align-top">
                                <h3>Poli gizi:</h3>
                              </div>
                              <div className="block align-center">
                                <p>Diagmosis Pengobatan : {pilihPasien.poli_gizi.diagnosis_pengobatan}</p>
                                <p>Diagnosis: {pilihPasien.poli_gizi.diagnosis}</p>
                                <p>Resep Obat: {pilihPasien.poli_gizi.resep_obat}</p>
                              </div>
                          </div>
                        ):(null)
                      }
                      { 
                        pilihPasien.kia_kb!=null?(
                          <div>
                          <div className=" align-top">
                              <h3>KIA KB:</h3>
                            </div>
                            <div className="block align-center">
                                <p>Diagmosis Pengobatan : {pilihPasien.kia_kb.diagnosis_pengobatan}</p>
                                <p>Diagnosis: {pilihPasien.kia_kb.diagnosis}</p>
                                <p>Resep Obat: {pilihPasien.kia_kb.resep_obat}</p>
                            </div>
                        </div>
                        ):(null)
                      }
                      { 
                        pilihPasien.igd!=null?(
                          <div>
                          <div className=" align-top">
                              <h3>IGD:</h3>
                            </div>
                            <div className="block align-center">
                                <p>Diagnosis Pengobatan: {pilihPasien.igd.diagnosis_pengobatan}</p>
                                <p>Resep Obat: {pilihPasien.igd.resep_obat}</p>
                                <p>Rawat Inap: {pilihPasien.igd.rawat_inap}</p>
                            </div>
                        </div>
                        ):(null)
                      }
                      {
                        pilihPasien.rawat_inap!=null?(
                          pilihPasien.rujuk!=null?(
                            <div>
                            <div className=" align-top">
                                <h3>Status Pelayanan:</h3>
                              </div>
                              <div className="block align-center">
                                  <p>Status: Rawat Inap dan Rujuk</p>
                                  <p>Tanggal rawat inap : {convetTanggalIndonesia(pilihPasien.rawat_inap.tanggal_rawat_inap)}</p>
                                  <p>Rujuk : {convetTanggalIndonesia(pilihPasien.rujuk.tanggal_rujuk)}</p>
                              </div>
                          </div>
                          ):(
                            <div>
                            <div className=" align-top">
                                <h3>Status Pelayanan:</h3>
                              </div>
                              <div className="block align-center">
                                  <p>Status: Rawat Inap</p>
                                  <p>Tanggal rawat inap : {convetTanggalIndonesia(pilihPasien.rawat_inap.tanggal_rawat_inap)}</p>
                                  <p>Tanggal Pulang : {convetTanggalIndonesia(pilihPasien.rawat_inap.tanggal_pulang)}</p>
                              </div>
                          </div>
                          )
                        ):( pilihPasien.rujuk!=null?(
                          <div>
                          <div className=" align-top">
                              <h3>Status Pelayanan:</h3>
                            </div>
                            <div className="block align-center">
                                <p>Status: Rujuk</p>
                                <p>Tanggal Rujuk : {convetTanggalIndonesia(pilihPasien.rujuk.tanggal_rujuk)}</p>
                            </div>
                        </div>
                        ):(<div>
                          <div className=" align-top">
                              <h3>Status Pelayanan:</h3>
                            </div>
                            <div className="block align-center">
                                <p>Status: Rawat Jalan</p>
                            </div>
                        </div>))
                      }
                      {/* <h1>{pilihPasien.nama_lengkap}</h1> */}
                  </div>):(null)}
        </div>
    ):(null))
}
export default DetilPasien;