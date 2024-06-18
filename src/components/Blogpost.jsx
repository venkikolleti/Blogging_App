import {React,useContext,useState,useEffect, } from 'react'
import { Link, useParams, } from 'react-router-dom';
import BlogContext from '../contexts/blogs/BlogContext';
import { Button } from 'react-bootstrap';
import Loading from './Loading';
const Blogpost = () => {

  const {id} = useParams();
  const context = useContext(BlogContext)
  const {blogs,getBlogs,editBlog,deleteBlog,getBlogPost}=context
  const [blogData, setBlogData] = useState(null);

  const [user, setUser] = useState(null);
  const host="http://localhost:5000"
 
  useEffect(() => {
    fetch(`${host}/api/blogs/fetchblogs/${id}`)
    .then((response) => response.json())
    .then((data) => {
      setBlogData(data); 
    })
    .catch((error) => {
      console.error('Error fetching blog details:', error);
    });
}, [id]);
useEffect(() => {
    fetch(`${host}/api/auth/getuser/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }, [id]);



if (!blogData) {
    return <div><Loading /> </div>;
  }else{
      return (
          <>
    <div className="container mt-5">
  <div className="row">
    <div className="container">
      <article>
        <header className="mb-4">
          <h1 className="fw-bolder mb-1">{blogData.title}</h1>
          <div className="text-muted fst-italic mb-2">
          Published :{blogData.createdAt.slice(7,10)}-{blogData.createdAt.slice(5,7)}-{blogData.createdAt.slice(0,4)} <br/>
         {user ? (<p>Author: {user.name}</p>) : ( <p>Loading author information...</p>)}
          </div>
        <p className="badge bg-secondary text-decoration-none link-light">{blogData.tag}</p>
        </header>
        <figure className="mb-4">
          <img
            className="img-fluid rounded "
            src={blogData.img}
            width={200}
            alt="Blog-Img"
          />
        </figure>
        <section className="mb-5">
          <div className="fs-5 mb-4">
        
           <p dangerouslySetInnerHTML={{ __html: blogData.description}}/>
          </div>
        </section>
      </article>
    </div>
  </div>
</div>
    </>
  )
}

}
export default Blogpost
