import mongoose from "mongoose";



const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true  
    },
    fullname:{
        firstname:{type:String,required:true},
        lastname:{type:String,default:""}

    },
    password:{
        type:String,
        required:function(){!this.googleId}

    },
    googleId:{
        type:String,

    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }


},
{
    timestamps:true
})


const userModel=mongoose.model('user',userSchema)

export default userModel;


