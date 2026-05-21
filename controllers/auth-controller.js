
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { useDeferredValue } from 'react';

// Regsitar Controller 

export const RegisterUser = async(req,res)=>{

try{
// extract user info from our req body 
  const {username, email, password,role} = req.body;

// check if the user is already exist in our database


const checkExistingUser = await User.findOne({ $or : [ {username , email}]  }) // $or tell user this email or username is already in database or choosen by any other user 

if(checkExistingUser){

  return res.status(400).json({

     success : false,
     message: 'User is already exist.Please try with different username or email'

  })
}

// hash the password

const salt = bcrypt.genSalt(10);
const hashedPassword = bcrypt.hash(password,salt ); 

// create a new user 
const newcreateduser = new User({
 
  username,
  email,
  password : hashedPassword,
  role: role || 'user'


})

await newcreateduser.save();

if(newcreateduser){


  res.status(201).json({

     success: true,
     message: 'User registered successfully'

  })
}
else{

    res.status(400).json({

           success: false,
           message: 'Unable to registered user! please try agian'

    });

}




}catch(err)
{

    console.log(err);
    res.status(500).json({
        success: false,
      message: 'Some error is occured ! Please try again '
    })
    
}



}

// Login Controller 
 export const LoginUser=async(req,res)=>{

   try {
    
    const {username, email} = req.body;

// if the current user is exist in database or not

 const user = await User.findOne({username})

 if(!user){

  return res.status(400).json({

    success: false,
    message: "User does not exist"
  })
 }

 
const ispasswordmatch = await bcrypt.compare(password, user.password);

if(!ispasswordmatch){


   res.status(201).json({
    success: false,
    message: "Invalid Password "
   })
}

// create the user token 

const accesstoken = jwt.sign({

  userid : user._id,
  username: user.username,
  role: user.role

}, process.env.JWT_SECRET_KEY,{
expireIn : "15m"
})


res.status(200).json({

  success: true,
  message: 'Login is successfull',
  accesstoken
})

}catch(error){
  console.log(error);
  return res.status(500).json({

    success: false,
    message: 'Some error is occured ! Please try again'
  })



}

 }
  
  export const changepassword =async(req, res)=>{

    try{

     const userId = req.userInfo.userid ;

// extract the old password and new password

   const {oldpassword, newpassword} = req.body;

   const myuser = await User.findById(userId);


   
   if(!myuser){


    return res.status(404).json({

        success: false,
        message: 'User not found' 

    })
   }
// check if the old password is correct or not 

  const passwordmatch = await bcrypt.compare(oldpassword, myuser.password);

  if(!passwordmatch){

    return res.staus(400).json({

     success: false,
     message: 'Old password is incorrect'


    })
  }


  // hash the new password

  const salt = await bcrypt.genSalt(10);
   
  const newhashedpassword = await bcrypt.hash(newpassword, salt);

  // update the password in database


  myuser.password = newhashedpassword;

  await myuser.save();

  res.status(200).json({

    success: true,
    message: 'Password changed successfully'
  })


   
    }catch(err){

      console.log(err);
      res.status(500).json({
          success: false,
          message: 'Some error is occured ! Please try again'


      })


    }


}

 




   


  



export default {RegisterUser, LoginUser, changepassword};