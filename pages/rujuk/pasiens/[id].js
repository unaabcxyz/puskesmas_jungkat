import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector,shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";
import styles from '../../../styles/DetilPasienPoliUmum.module.css';
import axiosClient from "@/pages/api/axios.client";
import { useRef } from "react";
import { useAuth } from "@/lib/hooks/auth";
import useDeviceSize from "@/components/UseDevice/useDeviceSize";
const Swal = require('sweetalert2')
import Master from "@/pages/Auth/Master";
import ModalTambahRujuk from "./ModalTambahRujuk";
import RowPasien from "@/components/Rujuk/RowPasien";
import ModalUbahRujuk from "./ModalUbahRujuk";
import ModalHapusRujuk from "./ModalHapusRujuk";
import axios from "axios";
export async function getServerSideProps({query}){
  const{id}=query;
  return{
    props:{
      id,
      authorization:null
    }
  }
}
function useGlobalListPasienRujuk(){
  return useSelector((state)=>state.listPasienRujuk,shallowEqual);
}
function useGlobalListDataRujuk(){
  return useSelector((state)=>state.listDataRujuk,shallowEqual)
}
function useGlobalPilihRujuk(){
  return useSelector((state)=>state.pilihRujuk,shallowEqual)
}
const DetilPasien=({id})=>{ 
  const [admin,setAdmin]=useState({
    email:'',
    id:0
  });
  const [matches, setMatches] = useState()
  const [width, height] = useDeviceSize();
  const toggleSideBar2=useRef(true);
  const {loadingAuth,loggedIn,user}=useAuth();
  const dispatch = useDispatch();
  const listPasien = useGlobalListPasienRujuk();
  const listRujuk = useGlobalListDataRujuk();
  const pilihRujuk = useGlobalPilihRujuk();
  const [pilihPasien,setPilihPasien]=useState({
    nama_lengkap:'',
    NIK:""
  });
  const[styleSideBarIcon,setStyleSideBarIcon]=useState({
    marginLeft:"1%",
  })
  const [styleBox,setStyleBox]=useState({
    width:"45%",
  });
  const  [styleContainer,setStyleContainer]=useState({
    marginLeft:"60px"
  })
  const [showModalTambah,setShowModalTambah]=useState(false)
  const [showModalUbah,setShowModalUbah]=useState(false)
  const [showModalHapus,setShowModalHapus]=useState(false);
  useEffect(()=>{
    if(user!==null){
      setAdmin({...admin,['id']:user.id,['email']:user.email});
    }
    var pilih = listPasien[id];
    var dataTemp=[];
    if(pilih.rujuks.length>0){
      dataTemp = pilih.rujuks;
    }
    setPilihPasien({...pilihPasien,['nama_lengkap']:pilih.nama_lengkap, 
                                  ['NIK']:pilih.NIK
    })
    dispatch({type:'ISI_DATA_RUJUK',rujuks:dataTemp})
  },[])
  useEffect(()=>{
    if(user!==null){
      setAdmin({...admin,['id']:user.id,['email']:user.email});
    }
  },[user])
  const showModalTambahFunc=(toggle)=>{ 
      setShowModalTambah(toggle);
  }
  const showModalUbahFunc=(toggle)=>{
      setShowModalUbah(toggle);
      console.log(pilihRujuk)
  }
  const  showModalHapusFunc=(toggle)=>{ 
      setShowModalHapus(toggle);
  }
  //Fungsi CRUD
  const tambahAct=(formValue)=>{
    Swal.showLoading();
    axiosClient.post('Rujuk/tambahDataRujuk',{nama_rujuk:formValue.nama_rujuk,
                                              pasien_id:listPasien[id].id
    }).then(({data})=>{
      dispatch({type:'ISI_DATA_RUJUK',rujuks:data})
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "tambah data rujuk berhasil",
      });
      setShowModalTambah(false)
    })
  }
  const ubahAct=(formValue)=>{ 
    Swal.showLoading();
    axiosClient.post('Rujuk/ubahDataRujuk',{nama_rujuk:formValue.nama_rujuk,
                                              pasien_id:listPasien[id].id, 
                                              rujuk_id:pilihRujuk.id
    }).then(({data})=>{
      Swal.close();
      setShowModalUbah(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "ubah data rujuk berhasil",
      });
      var dataTemp =  listRujuk;
      var index =dataTemp.findIndex(function(dt){
        return data.id==dt.id
      });
      dataTemp[index]=data;
      console.log(dataTemp);
      dispatch({type:'ISI_DATA_RUJUK',rujuks:dataTemp})
    })
  }
  const hapusAct=()=>{ 
    axiosClient.post('Rujuk/hapusDataRujuk',{'rujuk_id':pilihRujuk.id}).then(({data})=>{
        if(data.status==1){
          var dataTemp =listRujuk; 
          var index=dataTemp.findIndex(function(dt){
            return pilihRujuk.id==dt.id
          })
          dataTemp.splice(index,1);
          dispatch({type:'ISI_DATA_RUJUK',rujuks:dataTemp})
          setShowModalHapus(false);
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "hapus data rujuk berhasil",
          });
        }
    }) 
    console.log(pilihRujuk.id)
  }
  //Batas Fungsi CRUD 
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
  return(
           <div>
             <div className="d-block bg-danger align-top " style={styleSideBarIcon}  onClick={toggleSidebarFunc}>
              <div className={styles.cont_sidebar_icon+" d-flex align-items-center  rounded-circle  shadow "} style={{cursor:"pointer"}}>
                <img src="https://website.penjadwalanmatapelajaransman2sekayam.xyz/iconFoto/menuSidebar2.png" className="w-50 h-50 mx-auto" />
              </div>
            </div>
            <Master toggleSideBar={toggleSideBar2.current} matches={matches}/>
            {listRujuk!=null?(
              <div className=" w-75 d-inline-block align-top mt-3 mb-2"  style={styleContainer}>
                <h1>Kelola Data Rujuk</h1> 
                  <table className="table w-25 mb-0">
                        <tr key={'row-1-tabel-data'}>
                          <td  key={'row-1-col-2'}>
                            <p>Nama Pasien</p>
                          </td>
                          <td key={'row-1-col-2'}>
                            <p>:</p>
                          </td>
                          <td key={'row-1-col-3'}>
                            <p>{pilihPasien.nama_lengkap}</p>
                          </td>
                        </tr>
                        <tr key={'row-2-tabel-data'}>
                          <td key={'row-2-col-1'}>
                            <p>No.NIK</p>
                          </td>
                          <td key={'row-2-col-2'}>
                            <p>:</p>
                          </td>
                          <td key={'row-2-col-3 '}>
                            <p>{pilihPasien.NIK}</p>
                          </td>
                        </tr>
                    </table>
                      <div className="ms-auto " style={{width:'fit-content'}}>
                         <button className="btn btn-success" onClick={()=>showModalTambahFunc(true)}>Tambah Data Rujuk</button>
                      </div>
                      <ModalTambahRujuk  showModalTambahFunc={showModalTambahFunc}
                                          showModalTambah={showModalTambah}
                                          tambahAct={tambahAct}  />
                      <ModalUbahRujuk showModalUbahFunc={showModalUbahFunc} 
                                      showModalUbah={showModalUbah}
                                      ubahAct={ubahAct}
                                      pilihRujuk={pilihRujuk}/>
                      <ModalHapusRujuk showModalHapusFunc={showModalHapusFunc}
                                       showModalHapus={showModalHapus}
                                       hapusAct={hapusAct}
                                       pilihRujuk={pilihRujuk}/>
                  <table className="table">
                    {listRujuk.map((pasien,index)=>(
                         <RowPasien pasien={pasien} 
                                    index={index} matches={matches} 
                                    showModalUbahFunc={showModalUbahFunc}
                                    showModalHapusFunc={showModalHapusFunc}/> 
                        ))}
                  </table>
                 
              </div>
            ):(null)}
        </div> 
      
    // <h1>{pilihPasien.nama_lengkap}</h1>
  )
}
export default DetilPasien;