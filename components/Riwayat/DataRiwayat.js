import axiosClient from "@/pages/api/axios.client";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import Pasien from "./Pasien";
import * as ExcelJS from 'exceljs/dist/exceljs.min.js';
function DataRiwayat({formValue,listRiwayat,matches}){
  const dispatch = useDispatch();
  const [logo,setLogo]=useState();
  useEffect(()=>{
    var image=imagaBase;
    if(image!==null){ 
      setLogo(image);
    }
  },[])
  const cariRiwayat=()=>{ 
    axiosClient.post('Riwayat/getData',formValue).then(({data})=>{
      console.log(data)
      dispatch({type:'ISI_DATA_LIST_RIWAYAT',dataPasien:data})
    })
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
  const exportExcelTrigger=()=>{
    var m;
    // swalLoadingFunc();
    logo.then(result=>{
        m = result.base64Url;
     });
    setTimeout(()=>{
       exportExcelFile(m)
    },4000)
}
  const exportExcelFile=(logo)=>{
    const workbook= new ExcelJS.Workbook();
    var sheet=[];
    sheet[0] = workbook.addWorksheet(`jadwal-${0+1}`,{views:[ {showGridLines:false} ]})
    // sheet[0].addImage(imageId,'D2:D5');
    // console.log(logo)
    const imageNew=logo.split(';');
    const imageId = workbook.addImage({
      base64:"data:image/png;"+imageNew[1].toString(),
      extension: 'png',
    });
    console.log(formValue);
    var tanggalDari='';
    var tanggalKe='';
    if(formValue.tanggal_dari!=null){
        var a=formValue.tanggal_dari.split("-");
        var b=formValue.tanggal_ke.split("-");
        tanggalDari =a[1]+"-"+getNamaBulanByNumber(a[0])+'-'+a[2];
        tanggalKe =b[1]+"-"+getNamaBulanByNumber(b[0])+'-'+b[2];
    }
    sheet[0].addImage(imageId,'B2:B5');
    sheet[0].mergeCells('B2:H2');
    sheet[0].mergeCells('B3:H3');
    sheet[0].getCell('B2').value="Puskesmas Rawat Inap Jungkat";
    sheet[0].getCell('B2').font={name: 'Calibri', family: 4, size: 18,bold: true}
    sheet[0].getCell('B2').alignment ={vertical:"middle",horizontal:"center"};
    
    sheet[0].getCell('B3').value="Laporan Pasien pada Tanggal "+tanggalDari+" sampai "+tanggalKe;
    sheet[0].getCell('B3').font={name: 'Times New Roman', family: 4, size: 12,bold: true}
    sheet[0].getCell('B3').alignment ={vertical:"middle",horizontal:"center"};

    sheet[0].getColumn(2).width=15.0;
    sheet[0].getColumn(3).width=10.0;
    sheet[0].getColumn(4).width=20.0;
    sheet[0].getColumn(5).width=15.0;
    sheet[0].getColumn(6).width=15.0;
    //nma column
    sheet[0].getCell('C5').value="No.";
    sheet[0].getCell('C5').font={name: 'Times New Roman', family: 4, size: 10,bold: true}
    sheet[0].getCell('C5').alignment ={vertical:"middle",horizontal:"center"};
    sheet[0].getCell('C5').border = {
      top: {style:'thin'},
      left: {style:'thin'},
      bottom: {style:'thin'},
      right: {style:'thin'}
    };
    sheet[0].getCell('D5').value="Nama Pasien";
    sheet[0].getCell('D5').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
    sheet[0].getCell('D5').alignment ={vertical:"middle",horizontal:"center"};
    sheet[0].getCell('D5').border = {
      top: {style:'thin'},
      left: {style:'thin'},
      bottom: {style:'thin'},
      right: {style:'thin'}
    };
    sheet[0].getCell('E5').value="Layanan";
    sheet[0].getCell('E5').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
    sheet[0].getCell('E5').alignment ={vertical:"middle",horizontal:"center"};
    sheet[0].getCell('E5').border = {
      top: {style:'thin'},
      left: {style:'thin'},
      bottom: {style:'thin'},
      right: {style:'thin'}
    };
    sheet[0].getCell('F5').value="Status";
    sheet[0].getCell('F5').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
    sheet[0].getCell('F5').alignment ={vertical:"middle",horizontal:"center"};
    sheet[0].getCell('F5').border = {
      top: {style:'thin'},
      left: {style:'thin'},
      bottom: {style:'thin'},
      right: {style:'thin'}
    };
    sheet[0].getCell('G5').value="Biaya";
    sheet[0].getCell('G5').font={name: 'Times New Roman', family: 4, size: 10,bold: false}
    sheet[0].getCell('G5').alignment ={vertical:"middle",horizontal:"center"};
    sheet[0].getCell('G5').border = {
      top: {style:'thin'},
      left: {style:'thin'},
      bottom: {style:'thin'},
      right: {style:'thin'}
    };
    console.log(listRiwayat)
    listRiwayat.map((riwayat,index)=>{
      sheet[0].getCell('C'+(index+6).toString()).value=index+1;
      sheet[0].getCell('C'+(index+6).toString()).font={name: 'Times New Roman', family: 4, size: 10,bold: false}
      sheet[0].getCell('C'+(index+6).toString()).alignment ={vertical:"middle",horizontal:"center"};
      sheet[0].getCell('C'+(index+6).toString()).border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
    };
      sheet[0].getCell('D'+(index+6).toString()).value=riwayat.nama_lengkap;
      sheet[0].getCell('D'+(index+6).toString()).font={name: 'Times New Roman', family: 4, size: 10,bold: false}
      sheet[0].getCell('D'+(index+6).toString()).alignment ={vertical:"middle",horizontal:"center"};
      sheet[0].getCell('D'+(index+6).toString()).border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
    };
      sheet[0].getCell('E'+(index+6).toString()).value=riwayat.pelayanan;
      sheet[0].getCell('E'+(index+6).toString()).font={name: 'Times New Roman', family: 4, size: 10,bold: false}
      sheet[0].getCell('E'+(index+6).toString()).alignment ={vertical:"middle",horizontal:"center"};
      sheet[0].getCell('E'+(index+6).toString()).border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
    };
      sheet[0].getCell('F'+(index+6).toString()).value=riwayat.status;
      sheet[0].getCell('F'+(index+6).toString()).font={name: 'Times New Roman', family: 4, size: 10,bold: false}
      sheet[0].getCell('F'+(index+6).toString()).alignment ={vertical:"middle",horizontal:"center"};
      sheet[0].getCell('F'+(index+6).toString()).border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
    };
      sheet[0].getCell('G'+(index+6).toString()).value=riwayat.harga;
      sheet[0].getCell('G'+(index+6).toString()).font={name: 'Times New Roman', family: 4, size: 10,bold: false}
      sheet[0].getCell('G'+(index+6).toString()).alignment ={vertical:"middle",horizontal:"center"};
      sheet[0].getCell('G'+(index+6).toString()).border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
    };
    })

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
  const getNamaBulanByNumber=(moon)=>{
    var result=""
    moon=parseInt(moon)
    switch (moon) {
        case 1:
             result ="Januari";
            break;
        case 2:
             result ="Februari";
            break;
        case 3:
             result ="Maret";
            break;
        case 4:
             result ="April";
            break;
        case 5:
             result ="Mei";
            break;
        case 6:
             result ="Juni";
            break;
        case 7:
             result = "Juli";
            break;
        case 8:
             result ="Agustus";
            break;
        case 9:
             result ="September";
            break;
        case 10:
             result ="Oktober";
            break;
        case 11:
             result ="November";
            break;
        case 12:
             result ="Desember";
            break;

        default:
            result = "none";;
            break;
    }
    return result;
}
  
  const imagaBase = async () => {
    const a = await toDataURL('/Riwayat/getLogoPuskesmas');
    return a;
  };
  return(
    <div>
        <div className="w-100  d-block">
          <div style={{width:'fit-content'}} className="mx-auto w-25">
            <button className="btn btn-primary w-100" onClick={cariRiwayat}>Cari</button>
          </div>
        </div>
        <div className="w-100 d-block">
            <div style={{width:'fit-content'}} className="ms-auto"> 
              <button className="btn-success btn" onClick={exportExcelTrigger}>Cetak</button>
            </div>
        </div>
        <table className="table w-100" >
            {
              listRiwayat.map((pasien,index)=>(
                <Pasien pasien={pasien} index={index} matches={matches}/>
              ))
            }
        </table>
    </div>
   
  )
}
export default DataRiwayat;