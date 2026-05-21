import mongoose from 'mongoose';



const connecttoDB = async()=>{

    try{

        await mongoose.connect(process.env.MONGO_URI  );

        console.log('MongoDB is connencted successfully');
        


    }catch(err){

   console.error('MongoDB connection is failed ', err);
   process.exit(1);


    }


}



export default connecttoDB;