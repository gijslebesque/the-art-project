import mongoose, { Schema } from 'mongoose';

const ArtworkSchema = new Schema({
    artworkName:String,
    author: {type: Schema.Types.ObjectId, ref: 'user'} ,
    artworkURL: String,
    artworkDescription: String,
    favouritised:Number,
    auction: {
        bidder: {type: Schema.Types.ObjectId, ref: 'user'},
        originalPrice: Number,
        endDate: Date,
        bid: Number,
    },
  
    },
    {
        timestamps: true
});

const Artwork = mongoose.model('artwork', ArtworkSchema);

module.exports = Artwork;