const mongoose = require("mongoose");

const userSchema = {
    first_name:{type:String},
    last_name:{type:String},
    user_name:{type:String},
    email_id:{type:String},
    password:{type:String},
    user_id:{type:Number},
    is_active:{type: Boolean},
    created_on:{type:Date},
    updated_on:{type:Date}
}

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;