import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";
let snap = new Midtrans.Snap({
    isProduction:false, 
    serverKey:process.env.SECRET,
    clientKey:process.env.NEXT_PUBLIC_CLIENT
}); 


export default async function(request,res){
  const {id,productName,price,quantity}=request.body;
  let parameter={
    item_details:{
      name :productName,
      price:price,
      quantity:quantity
    },
    transaction_details:{
       order_id:id,
       gross_amount:price
    }
  }
  const  token = await snap.createTransactionToken(parameter)
  return res.json({token:token,});
}
