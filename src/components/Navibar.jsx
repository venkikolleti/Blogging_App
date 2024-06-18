import React ,{useContext}from 'react'
import { Button } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import BlogContext from '../contexts/blogs/BlogContext';
const Navibar = () => {
  const navigate = useNavigate()
  const context = useContext(BlogContext)
  const {logout}=context
      const logOut = ()=>{
        logout()
        navigate('/')
    }
  const token = localStorage.getItem('token')
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      iBlogger
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="nav-link active" aria-current="page" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/blogs">
          Blogs
        </Link>
      </div>
    </div>
      {!token ? <div className="d-flex">
        <Link className="btn btn-outline-warning mx-2" to={"/signup"} type="submit">SignUp</Link>
        <Link className="btn btn-outline-success  mx-2" to={"/login"} type="submit">LogIn</Link>
      </div>:<Button onClick={logOut} variant='outline-danger' className="btn btn-outline-danger  mx-2">LogOut</Button>}
  </div>
</nav>

    </div>
  )
}

export default Navibar
