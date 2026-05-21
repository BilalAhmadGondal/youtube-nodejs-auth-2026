

const isAdminUser=(req,res,next )=>{


 if(req.userinfo.role !== 'admin'){

   return res.status(401).json({

     success: false,
     message: 'Access denied! Admin rights require'


   })

 }


 next();


}


export default isAdminUser