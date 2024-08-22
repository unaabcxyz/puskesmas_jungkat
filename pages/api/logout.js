import { serialize } from "cookie";
export default(req,res)=>{
  const {method} = req;
  // const {email,password,namaLengkap} = req.body;
  if(method !== 'POST'){
    return res.status(404).end();
  }
  res.setHeader('Set-Cookie',serialize('my_auth','',{path:'/',httpOnly:true}));
  return res.json({success:true});
}