const jwt = require('jsonwebtoken')
const JWT_SECRET='shhhhhhhhhh'
const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please Authunticate with token ! "})
    }else{

        try {
            const data = jwt.verify(token,JWT_SECRET)
            req.user=data.user
            next()
            
        } catch (error) {
            res.status(401).send({error:"Please Authunticate ! "})
            
        }
    }
}
module.exports=fetchuser