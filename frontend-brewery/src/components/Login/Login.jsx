import axios from "axios"
import "./Login.css"
import { useContext, useEffect, useState } from "react"
import { ReactContext } from "../../ReactContext/ReactContext"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

const Login = () => {
  const [details, setDetails] = useState({
    email: "",
    password: ""
  })
  const { url, setToken } = useContext(ReactContext)
  const navigate = useNavigate()

  const onChangeInput = (e) => {
    const { id, value } = e.target
    setDetails({
      ...details,
      [id]: value
    });
  }
  console.log(details)

  const onSubmitSuccess = (token) => {
    Cookies.set("jwtToken", token, { expires: 30 })
    navigate("/")
  }

  const onSubmitDetails = async (e) => {
    e.preventDefault()
    console.log(details)
    const response = await axios.post(`${url}/user/login`, details)
    setDetails({
      email: "",
      password: ""
    })
    console.log(response.data.token)
    setToken(response.data.token)
    if (response.status === 200) {
      onSubmitSuccess(response.data.token)
    }
  }

  const onClickCreateAccount = () => {
    navigate("/signup")
  }


  return (
    <div className="login-container">
      <form action="" onSubmit={onSubmitDetails} className="form-container">
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={details.email} placeholder="Email" onChange={onChangeInput} />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input type="text" id="password" placeholder="Password" value={details.password} onChange={onChangeInput} />
        </div>
        <div className="btn-container">
          <button type="submit">Submit</button>
          <p onClick={onClickCreateAccount}>Create An Account</p>
        </div>
      </form>
    </div>
  )
}

export default Login