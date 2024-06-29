import axios from "axios"
import "./Login.css"
import { useContext, useEffect, useState } from "react"
import { ReactContext } from "../../ReactContext/ReactContext"

const Login = () => {
  const [details, setDetails] = useState({
    email: "",
    password: ""
  })
  const { url } = useContext(ReactContext)

  const onChangeInput = (e) => {
    const { id, value } = e.target
    setDetails({
      ...details,
      [id]: value
    });
  }
  console.log(details)

  const onSubmitDetails = async (e) => {
    e.preventDefault()
    console.log(details)
    const response = await axios.post(`${url}/user/login`, details)
    setDetails({
      email: "",
      password: ""
    })
    console.log(response)
  }


  return (
    <div>
      <form action="" onSubmit={onSubmitDetails}>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={details.email} placeholder="Email" onChange={onChangeInput} />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input type="text" id="password" placeholder="Password" value={details.password} onChange={onChangeInput} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Login