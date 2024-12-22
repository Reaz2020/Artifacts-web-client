
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const PrivateRoute = ({children}) => {
    const { user,loading } = useContext(AuthContext);

 



    
    if(loading)  {return <Loading></Loading> }
    
    if(user)  {return  children}

    return( <Navigate state={location.pathname}  to="/login"></Navigate>   );


}
 
export default PrivateRoute;