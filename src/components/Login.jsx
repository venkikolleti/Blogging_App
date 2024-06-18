import React, { useContext } from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom' 
import Loading from './Loading'
import BlogContext from '../contexts/blogs/BlogContext';
const Login = () => {
  const context = useContext(BlogContext)
  const { isLoggedIn,setIsLoggedIn}=context
    const host = "http://localhost:5000"
const [credentials,setCredebtials] = useState({email:"",password:""})
const [Spinner, setSpinner] = useState(false)
const navigate = useNavigate()
    const handleSubmit =async(e)=>{
        e.preventDefault();
        setSpinner(true)
        const response = await fetch(`${host}/api/auth/login`,{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
          })
          const json = await response.json()
          if(json.success){
                localStorage.setItem('token',json.authToken)
                localStorage.setItem('verified',JSON.stringify(json.verifyed))
                setIsLoggedIn(true)
                navigate("/");
                setSpinner(false)

          }else{
            alert(json.error)
          }
    }

    const handleChange = (e)=>{
        setCredebtials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center">Login</h3>
            {Spinner ? <Loading /> : <form method='POST' onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' id="email" onChange={handleChange} value={credentials.email} placeholder="Enter your email" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' id="password" onChange={handleChange} value={credentials.password} placeholder="Enter your password" />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </form>}
          </div>
        </div>
      </div>
    </div>
  </div>


  )
}

export default Login
