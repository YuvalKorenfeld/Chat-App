import { Link } from "react-router-dom";
import { useState } from "react";
import RegisterForm from "./registerForm/RegisterForm";
import "./Register.css";
import { useNavigate } from 'react-router-dom';

function Register(props) {
  const [formData, setFormData] = useState({
  username: "",
  password: "",
  picture: "",
  display: "",
  confirm: "",
  allowedSubmit: { username: false, password: false, confirm: false, display: false, picture: false },
  });
  const navigate = useNavigate();
if(props.authenticated!==null){
navigate('/');
}
  return (
    
    <div className="row justify-content-center">
      <div className="col-md-6 mt-4">
        <div className="card">
          <div className="card-header bg-secondary text-white">Register</div>
          <div className="card-body">
            <RegisterForm
              registered={props.registered}
              formData={formData}
              setFormData={setFormData}
              setRegisteredUsers={props.setRegisteredUsers}
            ></RegisterForm>
            <br />
            Already registered?
            <Link to="/login"> Click here to log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
