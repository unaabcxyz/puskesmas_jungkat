import { encode } from "@/lib/jwt";
import { serialize } from "cookie";
export default(req,res)=>{
  const {method} = req;
  const {id,NIK} = req.body;
  if(method !== 'POST'){
    return res.status(404).end();
  }
  if(!NIK){
    return res.status(404).json({
      error:'Missing requiered params',
    })
  }
  const pendaftar = authenticateUser(id,NIK);
  if(pendaftar){
    res.setHeader('Set-Cookie',serialize('my_pasien',pendaftar,{path:'/',httpOnly:true}));
    return res.json({success:true});
  }else{
    return res.status(401).json({
      success:false,
      error:'kesalahan masukan data'
    });
  };
}
function authenticateUser(id,NIK){
  return encode({
        id:id,
        NIK:NIK,
  });
  return null;
}