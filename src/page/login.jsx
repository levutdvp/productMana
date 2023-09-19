import {useContext, useRef} from "react";
import {api} from "../axios-instance";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
// import {UserContext} from "../App";
import { loginSuccess } from "../slices/UserLoginSlice.js";
const Login = () => {
  const nameRef = useRef(null);
  const mailRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  function logins() {
    const name = nameRef.current?.value;
    const email = mailRef.current?.value;
    api.get(`/user?userName=${name}&&Email=${email}`).then(res => {
      if (res.data.length > 0) {
        dispatch(loginSuccess(name))
        navigate('/')
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
      <button onClick={logins}>Login</button>
    </div>
  </div>
}

export default Login;