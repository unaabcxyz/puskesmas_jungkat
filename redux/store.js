import { applyMiddleware,createStore } from "redux";
// import composeW
import { composeWithDevTools } from "@redux-devtools/extension";
import { useMemo } from "react";
import { isAsyncThunkAction } from "@reduxjs/toolkit";
let store;
const initialState={
  dataPendaftaran:null,
  listPasien:[],
  pilihPasien:null,
  listPasienPoliUmum:[],
  pilihPasienPoliUmum:null,
  dataPoliUmum:null,
  listPasienPoliGizi:[],
  pilihPasienPoliGizi:null,
  listPasienPoliGigi:[],
  pilihPasienPoliGigi:null,
  listPasienKiaKb:[],
  pilihPasienKiaKb:null,
  listDokterPoli:[],
  pilihDokterPoli:null,
  listPasienRujuk:[],
  listDataRujuk:[],
  pilihRujuk:null,
  listRiwayat:[],
  pilihRiwayat:null,
  listKelolaPasien:[],
  pilihKelolaPasien:null
};
const reducer=(state=initialState,action)=>{
  var data=[]
  switch(action.type){
    case 'ISI_DATA_PASIEN':
       return {
        ...state,
        ['listPasien']:action.dataPasien
       }
    case 'PILIH_PASIEN':
       var  data=[...state.listPasien]
       return {
        ...state,
        ['pilihPasien']:data[action.index]
       }
    case 'STORE_DATA_IGD':
       return {
        ...state,
        ['listPasien']:action.allDataIGD,
        ['pilihPasien']:action.pilihPasien
       }
    case 'ISI_DATA_POLI_UMUM':
      return{
        ...state,
        ['listPasienPoliUmum']:action.dataPasien
      }
    case 'PILIH_PASIEN_POLI_UMUM':
       var data=state.listPasienPoliUmum;
       return {
        ...state,
        ['pilihPasienPoliUmum']:data[action.index]
       }
    case 'STORE_DATA_POLI_UMUM':
        return {
          ...state,
          ['listPasienPoliUmum']:action.allDataPoliUmum,
          ['pilihPasienPoliUmum']:action.pilihPoliUmum
        }    
    case 'ISI_DATA_POLI_GIZI':
        return{
          ...state,
          ['listPasienPoliGizi']:action.dataPasien
        }
    case 'STORE_DATA_POLI_GIZI':
      return {
        ...state,
        ['listPasienPoliGizi']:action.allDataPoliGizi,
        ['pilihPasienPoliGizi']:action.pilihPoliGizi
      }
    case 'PILIH_PASIEN_POLI_GIZI':
      // console.log(action.index)
      var data=state.listPasienPoliGizi;
      return {
        ...state,
        ['pilihPasienPoliGizi']:data[action.index]
      }    
    case 'ISI_DATA_POLI_GIGI':
      return{
        ...state,
        ['listPasienPoliGigi']:action.dataPasien
      } 
    case 'PILIH_PASIEN_POLI_GIGI':
      var data=state.listPasienPoliGigi;
      return{
        ...state,
        ['pilihPasienPoliGigi']:data[action.index]
      }
    case 'STORE_DATA_POLI_GIGI':
      return {
        ...state,
        ['listPasienPoliGigi']:action.allDataPoliGigi,
        ['pilihPasienPoliGigi']:action.pilihPoliGigi
      }
    case 'ISI_DATA_KIA_KB':
      return {
        ...state,
        ['listPasienKiaKb']:action.dataPasien,
      }
    case 'PILIH_PASIEN_KIA_KB':
      var data=state.listPasienKiaKb;
      return{
        ...state,
        ['pilihPasienKiaKb']:data[action.index]
      }
    case 'STORE_DATA_KIA_KB':
      return{ 
        ...state,
        ['listPasienKiaKb']:action.allDataKiaKb,
        ['pilihPasienKiaKb']:action.pilihDataKiaKb
      }
    case 'ISI_DATA_DOKTER_POLI':
      return{ 
        ...state,
        ['listDokterPoli']:action.allDataDokterPoli
      }
    case 'TAMBAH_DATA_DOKTER_POLI':
      return{ 
        ...state,
        ['listDokterPoli']:action.listDokterPoli
      }
    case 'PILIH_DATA_DOKTER_POLI':
      return{ 
        ...state,
        ['pilihDokterPoli']:action.pilihDokterPoli
      }
      case 'STORE_DATA_DOKTER_POLI':
        console.log(action.newData);
        return{
          ...state,
          ['listDokterPoli']:action.newData
        }
      case 'ISI_DATA_LIST_RUJUK':
        return{
          ...state,
          ['listPasienRujuk']:action.dataPasien
        }
      case  'ISI_DATA_RUJUK':
        return{
          ...state,
           ['listDataRujuk']:action.rujuks
        };
      case 'PILIH_RUJUK':
        return { 
          ...state, 
          ['pilihRujuk']:action.pilihRujuk
        }
      case 'ISI_DATA_LIST_RIWAYAT':
        return{
          ...state,
          ['listRiwayat']:action.dataPasien
        }
      case 'PILIH_PASIEN_RIWAYAT': 
        var data = state.listRiwayat;
        return{
          ...state,
          ['pilihRiwayat']:data[action.index]
        }
      case 'ISI_PENDAFTARAN':
        return{
          ...state,
          ['dataPendaftaran']:action.pendaftaran
        }
      case 'ISI_KELOLA_PASIEN':
        return{
          ...state,
          ['listKelolaPasien']:action.listPasien
        }
      case 'PILIH_KELOLA_PASIEN':
        return{
          ...state,
          ['pilihKelolaPasien']:action.pasien
        }
    default:
    return state;
  }
}
function initStore(preloadState=initialState){
  return createStore(
    reducer,
    preloadState,
    composeWithDevTools(applyMiddleware())
  )
}
export const initializeStore=(preloadState)=>{
  let _store=store??initStore(preloadState);
  if(preloadState && store){
     _store=initStore({
       ...store.getState(),
       preloadState
     })
     store=undefined;
  }    
  if(typeof window==='undefined')return _store;
  if(!store)store=_store;
   return _store;
 }
 export function useStore(initialState){
   return useMemo(
     ()=>initializeStore(initialState),[initialState]
   )
 }