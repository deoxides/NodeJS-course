const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name:{
        type:String,
        required:[true,'The name is required']
    },
    lastName:{
        type:String,
        required:[true,'The lastname is required']
    },
    email:{
        type:String,
        required:[true,'The email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'The password cannot be empty']
    },
    img:{
        type:String
    },
    google:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        required:[true,'Each user must have one role at least'],
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    status:{
        type:Boolean,
        default:true
    }
})

UserSchema.methods.toJSON = function(){
    const {__v,password,_id,...fields} = this.toObject();
    fields['uid'] = _id;
    return fields;
}

module.exports = model('User', UserSchema)