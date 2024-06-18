import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
const Signup = () => {
    const host = "http://localhost:5000"
    const [credentials,setCredebtials] = useState({name:"",email:"",password:"",cpassword:""})
    const navigate = useNavigate()
    const [Spinner, setSpinner] = useState(false)
        const handleSubmit =async(e)=>{
            e.preventDefault();
            setSpinner(true)
            const {name,email,password,cpassword}=credentials
            const response = await fetch(`${host}/api/auth/createuser`,{
                method:'POST',
                headers:{
                  'Content-Type':'application/json',
                },
                body:JSON.stringify({name,email,password})
              })
              const json = await response.json()
           if(json.success){

               localStorage.setItem('token',json.authToken)
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
            <h3 className="card-title text-center">Signup</h3>
            {Spinner ? <Loading /> :<form method='POST' onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name='name' onChange={handleChange} placeholder="Enter your name"  required/>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' onChange={handleChange} placeholder="Enter your email" required/>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password' onChange={handleChange} placeholder="Enter your password" minLength={5}  required/>
              </div>
              <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={handleChange} placeholder="Enter your password" minLength={5} required />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">Signup</button>
              </div>
            </form>}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Signup
