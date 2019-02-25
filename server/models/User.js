const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersSchema = new Schema(
    {
        username:String,
        email: String,
        password: String,
        artworks:[{type: Schema.Types.ObjectId, ref: 'artwork'}],
        favourite:[{type: Schema.Types.ObjectId, ref: 'artwork'}],
        following:[{type: Schema.Types.ObjectId, ref: 'user'}],
        followers:[{type: Schema.Types.ObjectId, ref: 'user'}],
    }, 
    {
        timestamps: { 
            createdAt: "created_at", 
            updatedAt: "updated_at" 
    }
});

const User = mongoose.model('user', UsersSchema);

module.exports = User;