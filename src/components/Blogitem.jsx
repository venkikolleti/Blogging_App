import React, { useContext,useState,useEffect } from 'react'
import BlogContext from '../contexts/blogs/BlogContext'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Blogitem = (props) => {

 const {blog,updateBlog,isLoggedIn}=props
    const context = useContext(BlogContext)
    const {deleteBlog}=context
    const token = localStorage.getItem('token')
 
    const [Author, setAuthor] = useState(false);
    const host="http://localhost:5000"
  


  useEffect(() => {
    if(token){

  
    fetch(`${host}/api/auth/getuser/`,{
      headers: {
        'auth-token': token, 
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.id && data.id === blog.user) {
          setAuthor(true); 
        }
      })
      .catch((error) => {
        setAuthor(false); 
      });
    }
  }, []);

      return (
    <>
    <div className='w-100' key={blog._id}>
      <div className="card mb-4 text-center p-3 h-auto" >
              <a href="#!">
                <img
                  className="card-img-top w-25 "
                  src={blog.img}
                  alt="Blog-Img"
                />
              </a>
              <div className="card-body">
                <div className="small text-muted">{blog.tag}</div>
                <h2 className="card-title h4">{blog.title}</h2>
                <div className="card-text">
                  <p dangerouslySetInnerHTML={{ __html: blog.description.slice(0, 50) }}/>
                 
                </div>
                <div className="container mt-3">
                <Link className="btn btn-outline-primary m-2 w-50" to={`/blogpost/${blog._id}`}>Read more</Link>
              {isLoggedIn&& <div>
                {Author&&<Button type='button'  variant='outline-warning'  className="m-2 w-50" onClick={()=>{updateBlog(blog)}}>Edit</Button>}
                {Author&&<Button type='button'  variant='outline-danger'   className="m-2 w-50" onClick={()=>{deleteBlog(blog._id)}}>Delete</Button>}
               </div>}
                
                </div>
              </div>
            </div>
            </div>
    </>
  )
}


export default Blogitem
