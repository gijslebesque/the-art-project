const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArtworkSchema = new Schema({
    artworkName:String,
    author: {type: Schema.Types.ObjectId, ref: 'user'} ,
    artworkURL: String,
    artworkDescription: String,
    bidAmount: Number,
    bidder: {type: Schema.Types.ObjectId, ref: 'user'},
    favouritised:Number
    },
    {
        timestamps: true
});

const Artwork = mongoose.model('artwork', ArtworkSchema);

module.exports = Artwork;