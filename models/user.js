
var mongoose=require("mongoose");
var localMongoose=require("passport-local-mongoose");

var UserSchema=new mongoose.Schema({
	username:String,
	password:String
});

UserSchema.plugin(localMongoose);

module.exports=mongoose.model("User",UserSchema);