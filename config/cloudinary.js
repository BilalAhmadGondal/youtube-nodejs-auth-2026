import cloudinary from 'cloudinary';

cloudinary.config({

    cloudinary_name :  process.env.CLOUDINARY_CLOUD_NAME ,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_Secret 

})


export default cloudinary