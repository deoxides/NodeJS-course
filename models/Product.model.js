const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  img:{
    type:String
  },
  price: {
    type: Number,
    default: 0,
  },
  description:{
      type:String
  },
  available:{
      type:Boolean,
      default:true
  },
  state: {
    type: Boolean,
    required: [true, "The state is required"],
    default: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

ProductSchema.methods.toJSON = function () {
  const { __v,state, ...fields } = this.toObject();
  return fields;
};

module.exports = model("Product", ProductSchema);
