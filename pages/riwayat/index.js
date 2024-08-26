import { useAuth } from "@/lib/hooks/auth";
import { useRouter } from "next/navigation";
import Master from "../Auth/Master";
import styles from '../../styles/Main.module.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React, { useEffect, useState ,useRef} from "react";
import useDeviceSize from "@/components/UseDevice/useDeviceSize";
import { useSelector,shallowEqual } from "react-redux";
import DataRiwayat from "@/components/Riwayat/DataRiwayat";
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
function  useGlobalListRiwayat(){
    return useSelector((state)=>state.listRiwayat,shallowEqual); 
}
const  MainKelolaRiwayat=()=>{ 
  const router = useRouter();
  const Swal = require('sweetalert2');
  const [admin,setAdmin]=useState({
    email:'',
    id:0
  });
  const [width, height] = useDeviceSize();
  const [matches, setMatches] = useState(false)
  const[styleSideBarIcon,setStyleSideBarIcon]=useState({
    marginLeft:"1%",
  });
  const listRiwayat = useGlobalListRiwayat();
  const [startDate, setStartDate] = useState(new Date());
  const [endData, setEndDate]=useState(new Date());
  const [togglePelayanan,setTogglePelayanan]=useState({
      rawat_inap:false,
      rawat_jalan:false,
      rujuk:false
  })
  const [pencarian,setPencarian]=useState('')
  const [pelayanan,setPelayanan]=useState("")
  useEffect(()=>{
    if(width>480){
      setMatches(false)
    }else{
        setMatches(true);
    }
  }, [height]) 
  const {loadingAuth,loggedIn,user}=useAuth();
  useEffect(()=>{
    if(user!==null){
      if(user.nama_poli!='admin'){
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
  },[user])
  useEffect(()=>{
    var date=startDate;
    var  tanggalArray=date.toString().split(' ');
    tanggalArray[1]=convertMouthToNumber(tanggalArray[1]);
    setFormValue({...formValue,['tanggal_dari']:tanggalArray[1].toString()+'-'+tanggalArray[2].toString()+'-'+tanggalArray[3].toString(),
                               ['tanggal_ke']:tanggalArray[1].toString()+'-'+tanggalArray[2].toString()+'-'+tanggalArray[3].toString()
    });
  },[])
  if(!loadingAuth && !loggedIn){
    Swal.close();
    router.push('/');
  }
  const  [styleContainer,setStyleContainer]=useState({
    marginLeft:"60px"
  })
  const  [formValue,setFormValue]=useState({
    tanggal_dari:'',
    tanggal_ke:'',
    pencarian:'',
    pelayanan:''
  })
  const toggleSideBar2=useRef(true);
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
  const changeTanggal=(date,name)=>{
    if(name=='tanggal_dari'){ 
      setStartDate(date);
      var  tanggalArray=date.toString().split(' ');
      tanggalArray[1]=convertMouthToNumber(tanggalArray[1]);
      setFormValue({...formValue,['tanggal_dari']:tanggalArray[1].toString()+'-'+tanggalArray[2].toString()+'-'+tanggalArray[3].toString()});
    }else{ 
      setEndDate(date);
      var  tanggalArray=date.toString().split(' ');
      tanggalArray[1]=convertMouthToNumber(tanggalArray[1]);
      setFormValue({...formValue,['tanggal_ke']:tanggalArray[1].toString()+'-'+tanggalArray[2].toString()+'-'+tanggalArray[3].toString()});
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
  const togglePelayananFunc=(event)=>{
    var id = event.target.id;
    var toggle=false;
    if(id=='rawat_inap'){
        if(togglePelayanan.rawat_inap==true){
          setTogglePelayanan({...togglePelayanan,[id]:false,
                                                 ['rawat_jalan']:false,
                                                ['rujuk']:false
          })
          console.log(id.replace('_',' '))
          setPelayanan('')
        }else{
          setTogglePelayanan({...togglePelayanan,[id]:true,
                            ['rawat_jalan']:false,
                            ['rujuk']:false
          })
          setPelayanan(id.replace('_',' '))
          toggle=true;
        
        }
    }else if(id=='rawat_jalan'){
      if(togglePelayanan.rawat_jalan==true){
        setTogglePelayanan({...togglePelayanan,[id]:false,
                                               ['rawat_inap']:false,
                                              ['rujuk']:false
        })
        setPelayanan('')
      }else{
        setTogglePelayanan({...togglePelayanan,[id]:true,
                          ['rawat_inap']:false,
                          ['rujuk']:false
        })
        setPelayanan(id.replace('_',' '))
        toggle=true;
      }
    }else{  
      if(togglePelayanan.rujuk==true){
        setTogglePelayanan({...togglePelayanan,[id]:false,
                                               ['rawat_inap']:false,
                                              ['rawat_jalan']:false
        })
        setPelayanan('')
      }else{
        setTogglePelayanan({...togglePelayanan,[id]:true,
                          ['rawat_inap']:false,
                          ['rawat_jalan']:false
        })
        setPelayanan(id.replace('_',' '))
        toggle=true;
    
      }
    }
    if(toggle ==true){ 
      setFormValue({...formValue,['pelayanan']:id.replace('_',' ')})
    }else{
      setFormValue({...formValue,['pelayanan']:''})
    }
   
      
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
        <div className="w-75 d-inline-block align-top mt-4" style={styleContainer} >
            <h2 className="fw-bold">Kelola Riwayat Pasien</h2>
            <div className="w-100">
              <div className={styles.box_ipt+" ps-2 w-50 d-inline-block"}>
                <label htmlFor="nama-signup" className={"form-label fw-medium  w-100 "+styles.label_ipt}>Dari Tanggal</label>
                <DatePicker className="form-control" selected={startDate} onChange={(date) => changeTanggal(date,'tanggal_dari')}  name="tes"/>
                <hr/>
              </div>
              <div className={styles.box_ipt+" ps-2 d-inline-block"} style={{width:"45%"}}>
                <label htmlFor="nama-signup" className={"form-label fw-medium  w-100 "+styles.label_ipt}>Ke Tanggal</label>
                <DatePicker className="form-control" selected={endData} onChange={(date) => changeTanggal(date,'tanggal_ke')} name="tes"/>
                <hr/>
              </div>
              <div className="mb-2 w-100">
                <div className="w-50 d-inline-block">
                  <label htmlFor="nama-signup" className={"form-label fw-medium  w-100 "+styles.label_ipt}>Pencarian Pelayanan : <span>{pelayanan}</span></label>
                  <div className="d-inline-block me-2">
                      {
                        togglePelayanan.rawat_inap==false?(<button className={"btn btn-outline-primary  "} id="rawat_inap" onClick={togglePelayananFunc}>rawat inap</button>
                        ):( <button className={"btn btn-primary  "} id="rawat_inap" onClick={togglePelayananFunc}>rawat inap</button>)
                      }
                   
                  </div>
                  <div className="d-inline-block me-2">
                    {
                        togglePelayanan.rawat_jalan==false?(<button className={"btn btn-outline-success  "} id="rawat_jalan" onClick={togglePelayananFunc}>rawat jalan</button>
                        ):( <button className={"btn btn-success  "} id="rawat_jalan" onClick={togglePelayananFunc}>rawat jalan</button>)
                    }
                  </div>
                  <div className="d-inline-block">
                    {togglePelayanan.rujuk==false?( <button className="btn btn-outline-warning" id="rujuk" onClick={togglePelayananFunc}>Rujuk</button>):(<button className="btn btn-warning" id="rujuk" onClick={togglePelayananFunc}>Rujuk</button>)
                    }
                 
                  </div>
                </div>
                <div className="w-50 d-inline-block mb-2">
                <div className={styles.box_ipt+" ps-2 w-50 d-inline-block"}>
                  <label htmlFor="nama-signup" className={"form-label fw-medium  w-100 "+styles.label_ipt}>Pencarian Diagnosis</label>
                  <input type="text" className="form-control" placeholder="Pencarian Diagnosis" value={formValue.pencarian} onChange={(event)=>{setFormValue({...formValue,['pencarian']:event.target.value})}}/>
                </div>
              </div>
              </div>
               <DataRiwayat formValue={formValue} listRiwayat={listRiwayat} matches={matches}/>
            </div>
            
            
        </div>
      </div>):(null)
  )
}
export default MainKelolaRiwayat;