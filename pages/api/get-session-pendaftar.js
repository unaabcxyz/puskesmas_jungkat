import { parse } from "cookie";
import { decode } from "@/lib/jwt";
export default(req,res)=>{
  if(req.method!=='GET'){
    return res.status(404).end();
  } 
  const {my_pasien}=parse(req.headers.cookie||'');
  if(!my_pasien){
    return res.json({loggedInPendaftar:false})
  }
  return res.json({
    loggedInPendaftar:true,
    pendaftar:decode(my_pasien)
  })
}