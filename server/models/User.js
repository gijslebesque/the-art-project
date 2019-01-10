const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UsersSchema = new Schema(
    {
        username:String,
        email: String,
        password: String,
        artworks:[{type: Schema.Types.ObjectId, ref: 'Artwork'}],
        favourite:[{type: Schema.Types.ObjectId, ref: 'Artwork'}],
    }, 
    {
        timestamps: { 
            createdAt: "created_at", 
            updatedAt: "updated_at" 
    }
});


var User = mongoose.model('user', UsersSchema);

module.exports = User;