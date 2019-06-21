import mongoose, { Schema } from 'mongoose';

const UsersSchema = new Schema(
    {
        username:{
            type:String,
            required: true,
        },
        email: {
            type:String,
            required: true,
        },
        password: {
            type:String,
            required: true,
        },
        artworks:[{type: Schema.Types.ObjectId, ref: 'artwork'}],
        favourite:[{type: Schema.Types.ObjectId, ref: 'artwork'}],
        following:[{type: Schema.Types.ObjectId, ref: 'user'}],
        followers:[{type: Schema.Types.ObjectId, ref: 'user'}],
    }, 
    {
        timestamps: true
});

const User = mongoose.model('user', UsersSchema);

module.exports = User;