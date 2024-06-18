import FormData from 'form-data';
import React, { useEffect ,useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import BlogContext from './../contexts/blogs/BlogContext';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 
import Loading from './Loading';
const Blogs = () => {
  const context = useContext(BlogContext)
  const {addBlog}=context

    const host = "http://localhost:5000"
 const navigate= useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
        // else{
        // }
        // eslint-disable-next-line
      },[])



      const imageUpload = async()=>{
        const data = new FormData()
        data.append('file',image)
        data.append('upload_preset',"iBlogger")
        data.append('cloud_name','draz5gi01')
       const res=  await fetch(`https://api.cloudinary.com/v1_1/draz5gi01/image/upload`,{
          method:"POST",body:data
        })
        const response = await res.json()
        return response.url
       
      }




    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);  
    const [blog,setBlog]=useState({title:"",tag:""})
    const [Spinner, setSpinner] = useState(false)
  

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
    };
  

    const handleChange = (e)=>{
      setBlog({...blog,[e.target.name]:e.target.value})
  }
    
    const handleSubmit=async(e)=>{
      e.preventDefault()
      setSpinner(true)
      const imgurl = await imageUpload();
        addBlog(blog.title,imgurl,description,blog.tag)
        setBlog({title:"",description:"",tag:""})
        setImage(null);
        setDescription('');
        setSpinner(false)
        navigate('/')
    }


  return (
    <>
    
       <div className="container mt-4">
      <h2>Create a New Blog Post</h2>
      {Spinner ? <Loading /> : <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            name='title'
            id="title"
            placeholder="Enter the title of your blog post"
            value={blog.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
           <ReactQuill
           theme='snow'
           value={description}
          onChange={setDescription}
          modules={{ toolbar: true }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            className="form-control"
            id="tags"
            name='tag'
            placeholder="e.g., technology, coding, React"
            value={blog.tag}
            onChange={handleChange}
            required
          />
        </div>
        <button  className="btn btn-primary">
          Publish
        </button>
      </form>}
    </div>
    </>
  )
}


export default Blogs
