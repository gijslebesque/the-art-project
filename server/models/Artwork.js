import mongoose, { Schema } from 'mongoose';

const ArtworkSchema = new Schema({
    artworkName:{
        type:String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'user',
        required:true
    },
    artworkURL: {
        type:String,
        required: true,
    },
    artworkDescription: {
        type:String,
        required: true,
    },
    favouritised:Number,
    auction: {
        bidder: {type: Schema.Types.ObjectId, ref: 'user'},
        originalPrice: {
            type:Number,
            required: true,
        },
        endDate: {
            type:Date,
            required: true,
        },
        bid: Number,
    },
  
    },
    {
        timestamps: true
});

const Artwork = mongoose.model('artwork', ArtworkSchema);

module.exports = Artwork;