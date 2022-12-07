import { Fragment } from "react";
import Register from "../../components/Authentication/Register";
import { useSession } from 'next-auth/client'; 

const RegisterPage = () => {
  return (
    <Fragment>
      <Register />
    </Fragment>
  )
}

export default RegisterPage; 