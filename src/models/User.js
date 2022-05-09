const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const bcrypt= require('bcryptjs');

const UserSchema = new Schema ({
    name: { type: String, require: true},
    email: { type: String, require: true},
    password: { type: String, require: true},
    date: {type: Date, default: Date.now}
});

//cifrar el password al registrarse
UserSchema.methods.encryptPassword = async (password) =>{
const salt= await bcrypt.genSalt(10);
const hash= bcrypt.hash(password,salt);
return hash;
};
// compara cifrados desde ingreso de login
UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password,this.password);
};

module.exports= mongoose.model('User', UserSchema);
