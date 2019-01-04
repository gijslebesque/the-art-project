const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const { Schema } = mongoose;

const UsersSchema = new Schema({
  email: String,
  password: String,
  hash: String
});


UsersSchema.methods.validatePassword = password => {
    this.hash = bcrypt.compare(password, this.password, (err, res) => {
        if(err) throw err;
        return res;
    });
};

UsersSchema.methods.setPassword = password => {
   this.password = bcrypt.hash(password, 8, (err, hash) => {
        if(err) throw err;
        return hash;
    });
};

var User = mongoose.model('user', UsersSchema);

module.exports = User;