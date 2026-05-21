
import jwt from 'jsonwebtoken';

const authMiddleware =(req,res,next)=>{


    const authHeaders = req.headers['authorization'];

    console.log(authHeaders);
    

    // token

    const token = authHeaders && authHeaders.split(" ")[1];


  if(!token){

   return res.status(401).json({

        success: false,
        message: 'Access denied. No token provided ! '
    })
  }

// decode the token 


try {
    const decodedtoken = jwt.verify(token, process.env.JWT_SECRET_KEY)

   console.log(decodedtoken);
    
   req.userinfo = decodedtoken;

   next();



} catch (error) {

    res.status(500).json({

        success: false,
        message: 'Access denied. No token provided! '
    })
}


    
 next();

}


export default authMiddleware