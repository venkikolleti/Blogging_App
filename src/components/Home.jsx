import React, { useEffect,useContext,useState ,useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import BlogContext from '../contexts/blogs/BlogContext';
import Blogitem from './Blogitem';
import banner from '../assets/banner.png'
import { Button } from 'react-bootstrap';
const Home = () => {
  const context = useContext(BlogContext)
  const {blogs,getBlogs,editBlog,isLoggedIn}=context
    const navigate= useNavigate();
    useEffect(()=>{
        getBlogs();
        // eslint-disable-next-line
      },[])
      const [blog,setBlog]=useState({etitle:"",edescription:"",etag:""})

      const ref = useRef(null)
      const refClose = useRef(null)

const handleClick=(e)=>{
    e.preventDefault()
    editBlog(blog.id,blog.etitle,blog.edescription,blog.etag)
    ref.current.click();

}

const handleChange = (e)=>{
    setBlog({...blog,[e.target.name]:e.target.value})
}

const updateBlog = (currentblog)=>{
    ref.current.click();
    setBlog({id:currentblog._id,etitle:currentblog.title,edescription:currentblog.description,etag:currentblog.tag})
  }

  return (
     <>
  <header className="pb-5 bg-light border-bottom mb-4" >
    <div className="" >
      <img src={banner} className="h-[10] w-100" alt="" />
      <div className="text-center my-5" >
        <h1 className="fw-bolder">Welcome to iBlogger!</h1>
        <p className="lead mb-0">
          Best Platform to Post Blogs    
        </p>
      </div>
    </div>
  </header>
  <button
    type="button"
    ref={ref}
    className="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    hidden
  >
    Launch demo modal
  </button>
  {/* Modal */}
  <div
    className="modal fade"
    id="exampleModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            Edit Blog
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          

        <div>
       <h1>Update Blog</h1>
     <div className="container my-3">

      <form action="">
     <div className="mb-3">

  <label htmlFor="etitle" className="form-label">Title</label>
  <input type="text" name='etitle' className="form-control" id="etitle" placeholder="Title" minLength={5} required value={blog.etitle} onChange={handleChange}/>
</div>
     <div className="mb-3">

  <label htmlFor="etag" className="form-label">Tag</label>
  <input type="text" name='etag' className="form-control" id="etag" placeholder="Tag" value={blog.etag} onChange={handleChange}/>
</div>
<div className="mb-3">
  <label htmlFor="edescription"  className="form-label">Description</label>
  <textarea className="form-control" name='edescription' id="edescription" rows="3" minLength={5} required placeholder='Decsription Here..' value={blog.edescription} onChange={handleChange}></textarea>
 
</div>

  </form>
     </div>
    </div>


        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            ref={refClose}
          >
            Close
          </button>
          <Button variant='outline-danger'  disabled={blog.etitle.length<3} type="button" className="" onClick={handleClick}>
            Update Blog
          </Button>
        </div>
      </div>
    </div>
  </div>



  <div className="  d-flex flex-row mx-5 ">
    {  <div className="row">
      {blogs.map((blog)=>{
            return <Blogitem key={blog._id} user={blog.user} updateBlog={updateBlog} blog={blog} isLoggedIn={isLoggedIn} />
               })}
                
    </div>}
  </div>
    {!blogs.length && 
    // <div className="row">
               <div className="alert alert-danger  text-center container">
      No Blogs!
    </div> 
  
    }
  <footer className="py-5 bg-dark">
    <div className="container">
      <p className="m-0 text-center text-white">
        Copyright © iBlogger.com 2023
      </p>
    </div>
  </footer>
</>

  
  )
}

export default Home
