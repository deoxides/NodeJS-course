const {Schema, model} = require('mongoose');

const CategorySchema = Schema({
    name:{
        type:String,
        required:[true,'The name is required'],
        unique:true
    },
    state:{
        type:Boolean,
        default:true,
        required:[true,'The state is required']
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true,'The user is required']
    }
})

CategorySchema.methods.toJSON = function(){
    const {__v,...fields} = this.toObject();
    return fields;
}

module.exports = model('Category',CategorySchema);