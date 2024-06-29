import axios from "axios"
import "./Signup.css"
import { useContext, useEffect, useState } from "react"
import { ReactContext } from "../../ReactContext/ReactContext"
import { useNavigate } from "react-router-dom"

const Signup = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  const { url, setToken } = useContext(ReactContext)

  const onChangeInput = (e) => {
    const { id, value } = e.target
    setDetails({
      ...details,
      [id]: value
    });
  }
  console.log(details)

  const onClickLogin = () => {
    navigate("/login")
  }

  const onSubmitDetails = async (e) => {
    e.preventDefault()
    console.log(details)
    const response = await axios.post(`${url}/user/signup`, details)
    setDetails({
      email: "",
      password: "",
      name: ""
    })
    setToken(response.data.token)
  }


  return (
    <div className="signup-container">
      <form action="" onSubmit={onSubmitDetails} className="form-container">
        <div className="input-container">
          <label htmlFor="name">Username</label>
          <input type="text" id="name" value={details.name} placeholder="Username" onChange={onChangeInput} />
        </div>
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
          <p onClick={onClickLogin}>Already have an account? Go to Login</p>
        </div>
      </form>
    </div>
  )
}

export default Signup