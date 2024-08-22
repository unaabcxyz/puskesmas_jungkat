import { gql  } from "@apollo/client";
const  LOGIN = gql`
  query LoginAdminQuery($email:String,
                        $passct:String,
                        $passiv:String,
                        $passs:String)
                      { 
                        LoginAdminQuery(
                          email:$email,
                          passct:$passct,
                          passiv:$passiv,
                          passs:$passs
                        ){
                          id
                          email
                          nama_poli
                        }
                      }`;
export default LOGIN;