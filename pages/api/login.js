import { encode } from "@/lib/jwt";
import { serialize } from "cookie";
export default(req,res)=>{
  const {method} = req;
  const {id,email,nama_poli} = req.body;
  if(method !== 'POST'){
    return res.status(404).end();
  }
  if(!email){
    return res.status(404).json({
      error:'Missing requiered params',
    })
  }
  const user = authenticateUser(id,email,nama_poli);
  if(user){
    res.setHeader('Set-Cookie',serialize('my_auth',user,{path:'/',httpOnly:true}));
    return res.json({success:true});
  }else{
    return res.status(401).json({
      success:false,
      error:'wrong email of password'
    });
  };
}
function authenticateUser(id,email,nama_poli){
  return encode({
        id:id,
        email:email,
        nama_poli:nama_poli 
  });
  // }
  return null;
}