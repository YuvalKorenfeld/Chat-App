import { get } from "mongoose";
import LoginPassword from "./loginPassword/LoginPassword";
import LoginSubmitButton from "./loginSubmitButton/LoginSubmitButton";
import LoginUsername from "./loginUsername/LoginUsername";
import { Navigate } from 'react-router-dom';

function LoginForm(props) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: props.username,
      password: props.password
    };

    try {
      const getToken = await fetch("/api/Tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      
      const token = await getToken.text();
      if (getToken.status === 200) {
       
        const authenticated = await fetch("/api/Users/" + props.username, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
        }).then((response) => response.json());
        props.setAuthenticated(authenticated);
        props.setToken(token);
      } else if(getToken.status === 404){
        const element = document.getElementById("loginError");
        element.textContent = "Invalid username or password.";
      }
    } catch (error) {
      const element = document.getElementById("loginError");
      element.textContent = "Invalid username or password.";
    }
  };

  return (
    <>
      {props.token != null && (
        <Navigate to="/" />
      )}
      <form onSubmit={handleSubmit}>
        <LoginUsername userValue={props.username} setter={props.usernameSetter} />
        <LoginPassword passwordValue={props.password} setter={props.passwordSetter} />
        <div>
          <br />
        </div>
        <LoginSubmitButton />
        <div id="loginError" className="errorField"></div>
      </form>
    </>
  );
}

export default LoginForm;
