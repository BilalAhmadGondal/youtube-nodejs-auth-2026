import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({

    username: {

        type: String,
        required: true,
        unique: [true, 'Name must be unique'],
        trim: true
    },
    email:{

        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true

    },
    password: {
       type: String,
       required: true,
       


    },
    role:{

        type: String,
        enum: ['user', 'admin'] , // specify allowed roles 
        default: 'user'


    }

  







}, {timestamps: true});


const User =  mongoose.model('User', UserSchema);

export default User