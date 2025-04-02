import {Outlet,Navigate} from "react-router-dom";
import { AuthContext } from "./utils/AuthContext";
import { useContext } from "react";
const  ProtectedRoute=()=>{
    const {valid}=useContext(AuthContext);
    console.log("protected route",valid);
    return valid==="true"?<Outlet/>: <Navigate to="/VLogin"/>
}
export default ProtectedRoute;