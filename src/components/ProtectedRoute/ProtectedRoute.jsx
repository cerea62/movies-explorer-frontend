import React from 'react';
import { Navigate} from "react-router-dom";

function ProtectedRouteElement({  isLogin, children  }) {
  return <>{{isLogin} ? children : <Navigate to='/' />}</>;
}

export default ProtectedRouteElement;