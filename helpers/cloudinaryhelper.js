import cloudinary from '../config/cloudinary.js';


const uploadtoCloudinary = async(filePath)=>{

try {

    const result = cloudinary.uploader.upload(filePath)

  return {

    url: result.secure_url,
    publicId : result.publicId

  }

    


} catch (error) {
    console.error('Error while uploading to the cloudinary ');
    throw new Error('Error while uploading to the cloudinary') ;


    
}



}

export default uploadtoCloudinary;