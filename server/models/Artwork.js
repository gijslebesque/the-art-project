const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArtworkSchema = new Schema({
    artworkName:String,
    author: {type: Schema.Types.ObjectId, ref: 'User'} ,
    artworkURL: String,
    artworkDescription: String,
    bidAmount: Number,
    bidder: {type: Schema.Types.ObjectId, ref: 'User'},
    favouritised:Number,
    timestamps: { 
        createdAt: "created_at", 
        updatedAt: "updated_at" 
    } 
});

const Artwork = mongoose.model('artwork', ArtworkSchema);

module.exports = Artwork;