import {useContext, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { login } from "../slices/UserLoginSlice.js";
const Login = () => {
  const nameRef = useRef(null);
  const mailRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isLoginSuccess = useSelector(state => state.userLogin)
  async function loginClick() {
    const name = nameRef.current?.value;
    const email = mailRef.current?.value;
    try {
      await dispatch(login({name, email})).unwrap();
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    if (isLoginSuccess) {
      navigate('/')
    }
  }, [isLoginSuccess])

  
  return <div>
    <label>UserName</label>
    <input type='text' ref={nameRef}/>
    <div/>
    <label>Email</label>
    <input type='text' ref={mailRef}/>
    <div>
      <button onClick={loginClick}>Login</button>
    </div>
  </div>
}

export default Login;