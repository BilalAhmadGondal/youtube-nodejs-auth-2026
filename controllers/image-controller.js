import Image from '../models/Image.js';
import uploadtoCloudinary from '../helpers/cloudinaryhelper.js';
import cloudinary from '../config/cloudinary.js';

export const imagecontroller = async(req,res)=>{


  try {
    
    // check if file is missing in req object 

    if(!req.file){


      return res.status(400).json({

        success: false,
        message: 'File is required ! Pleaes upload an image'


      })



    }

    // upload into cloudinary

const {url, publicId} = await uploadtoCloudinary(req.file.path);

// store the image url and public id 

  const newlyuploadedImage = new Image({

    url,
    publicId,
    uploadedBy : req.userinfo.userid
  })
   await newlyuploadedImage.save()

    res.status(201).json({

     success: true,
     message: 'Image uploaded successfully',
     image: newlyuploadedImage

    })
   
  } catch (error) {
     console.log(error)

     res.status(500).json({


       success: false,
       message: 'Something went wrong! Please try again '  

     })
     
  }




}

export const fetchImagesController = async(req,res)=>{

  
   // Fetching & Pagination & Sorting the Images 



   try {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const skip = (page - 1) * limit;

  const sortby = req.query.sortby || 'createdAt';

  const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1 ;  // sorting direction asc or desc 
  const totalImages = await Image.countDocuments();
  const totalpages = Math.ceil(totalImages/limit);

  const sortObj = {};
  sortObj[sortby] = sortOrder; 



  const images = await Image.find().sort(sortObj).skip(skip).limit(limit);



  if(images)
  {
    return res.status(200).json({

      success: true,
      currentPage: page,
      totalPages: totalpages,
      totalImages: totalImages,
      message: 'Image fetch successfully',
      data: images
    })


  }


  
}catch(error) {

   console.log(error);
   res.status(500).json({
    success: false,
    message: 'Failed to fetch the image'
   })

}




}
export const  deleteImageController = async(req,res)=>{

  try {

       const getCurrentIdOfImageController = req.params.id;

       const userId = req.userInfo.userid;


       const findImage = await Image.findById( getCurrentIdOfImageController);
       if(!findImage){

        return res.status(404).json({
          success: false,
          message: 'Image not found'
        })
       }

       // check that wheather this user is authorize to delete this image or not 

  
       if(findImage.uploadedBy.toString() !== userId)
       {

        return res.status(403).json({
          success: false,
          message: 'You are not authorize to delete this image'
        })
       }

       // delete the image first from cloudinary

  await cloudinary.uploader.destroy(findImage.publicId);


  // now delete the image from mongo db

  await Image.findByIdAndDelete(getCurrentIdOfImageController);

  res.status(200).json({
      success: true,
      message: 'Image is deleted successfully from Cloudinary',


  })

    
  } catch (error) {
     console.log(error);
     res.status(500).json({
      success: false,
      message: 'Failed to delete image controller'
     })
  }
   




}


