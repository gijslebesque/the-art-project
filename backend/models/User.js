const mongoose = require('mongoose');


const { Schema } = mongoose;

const UsersSchema = new Schema({
  email: String,
  password: String
});
