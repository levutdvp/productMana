import {useContext, useRef} from "react";
import {api} from "../axios-instance";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../App";

const Login = () => {
  const nameRef = useRef(null);
  const mailRef = useRef(null);
  const navigate = useNavigate();
   const user = useContext(UserContext)

  function login() {
     

    const name = nameRef.current?.value;
    const email = mailRef.current?.value;
    api.get(`/user?userName=${name}&&Email=${email}`).then(res => {
      if (res.data.length > 0) {
        
        user.setUser(name);
        navigate('/')
      } else {
        alert('login fail')
      }
    }).catch(e => {
      console.log(e)
      alert('login fail')
    })
  }

  return <div>
    <label>UserName</label>
    <input type='text' ref={nameRef}/>
    <div/>
    <label>Email</label>
    <input type='text' ref={mailRef}/>
    <div>
      <button onClick={login}>Login</button>
    </div>
  </div>
}

export default Login;