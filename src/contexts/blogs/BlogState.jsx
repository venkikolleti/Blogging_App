import React, { useState } from "react";
import BlogContext from "./BlogContext";

const BlogState = (props)=>{
  const host="http://localhost:5000"
   const initialBlogs =[]
  const [blogs,setBlogs] = useState(initialBlogs)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getBlogs = async()=>{


    const response = await fetch(`${host}/api/blogs/fetchblogs`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      
    })

      const json = await response.json() 
      setBlogs(json)

  }
  const getBlog = async()=>{


    const response = await fetch(`${host}/api/blogs/fetchblog`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      
    })

      const json = await response.json() 
      setBlogs(json)

  }
  const getBlogPost = async(id)=>{

    const response = await fetch(`${host}/api/blogs/fetchblogs/${id}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      
    })

      const json = await response.json() 
      setBlogs(json)

  }




    const addBlog = async(title,img,description,tag)=>{
  

      const response = await fetch(`${host}/api/blogs/addblog`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({title,img,description,tag})
      })

        const blog = await response.json();
      setBlogs(blogs.concat(blog))
    }
    const deleteBlog = async(id)=>{


      const response = await fetch(`${host}/api/blogs/deleteblog/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        
      })
      const json = response.json()

      const newBlogs=blogs.filter((blog)=>{return blog._id!==id})
       setBlogs(newBlogs)
    }
    const editBlog = async(id,title,description,tag)=>{
     
      const response = await fetch(`${host}/api/blogs/updateblog/${id}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
      })
      const json =await response.json()


        let newBlog = JSON.parse(JSON.stringify(blogs))
        for (let index = 0; index < blogs.length; index++) {
          const element = blogs[index];
          if(element._id==id){
            newBlog[index].title=title;
            newBlog[index].description=description;
            newBlog[index].tag=tag;
            break;
          }
        }
        setBlogs(newBlog);
    }

    const logout=()=>{
      localStorage.removeItem('token');
      setIsLoggedIn(false)
     
    }

    return(

        <BlogContext.Provider value={{blogs,setBlogs,addBlog,deleteBlog,editBlog,getBlogs,getBlogPost,getBlog, logout,isLoggedIn, setIsLoggedIn}}>
        {props.children}
    </BlogContext.Provider>
        )
}

export default BlogState