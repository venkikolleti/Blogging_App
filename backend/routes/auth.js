const express = require('express')
const router = express.Router();
const User = require('../models/User');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")
const { body, validationResult } = require('express-validator');
const Blogs = require('../models/Blogs');
const JWT_SECRET='shhhhhhhhhh'
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password Must be atleast 5 charecters long').isLength({min:5}),   
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false,errors:errors.array()})
    }
    try{
   let user = await User.findOne({email:req.body.email})
   if(user){
    return res.status(400).json({err:"Email Already Exist!"})
   }
   const salt = await bcrypt.genSalt(10)
   const secPass = await bcrypt.hash(req.body.password,salt)
    user = await User.create({
        name:req.body.name,
        password:secPass,
        email:req.body.email,
    })
    const data = {
        user:{
            id:user.id,
        }
    }
    const authToken = jwt.sign(data,JWT_SECRET)
 
    res.json({success:true,authToken})
}
catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured")
}

})


router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password Can not be blank').exists()
    
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors:errors.array()})
   
    }
    const {email,password}=req.body
    try{
        let user =await User.findOne({email})
        if(!user){
            return res.status(400).json({error:"Invalid Credentials !"})
        }
        const passwordCompare =await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            return res.status(400).json({success:false,error:"Invalid Credentials !"})
        }
        const data = {
            user:{
                id:user.id,
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET)
     
        
        res.json({success:true,authToken})
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error")
    }
})
router.post('/getuser',fetchuser,async(req,res)=>{
try {
    const user = await User.findOne({_id:req.user.id}).select("-password")
    res.send(user)
} catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error")
    }
})
router.get('/getuser/:blogId',async(req,res)=>{
    try {
        const blogId = req.params.blogId;
        const blog = await Blogs.findById(blogId);
        if (!blog) {
          return res.status(404).json({ message: 'Blog not found' });
        }
        const user = await User.findById(blog.user);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Some error occurred');
      }
    
})



router.get('/getuser', fetchuser, (req, res) => {
    // The user information is available in req.user due to the fetchuser middleware
    try {
        res.json(req.user);
        
    } catch (error) {
        console.log("Some error ")
    }
    
  });
module.exports=router