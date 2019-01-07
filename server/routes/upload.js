const express = require('express');
const router = express.Router();

const parser = require('../config/cloudinary');

// This route finds the first user, takes the file from the request with the key 'picture' and save the 'pictureUrl'


router.post('/photo-upload', parser.single('picture'), (req, res, next) => {
  User.findOneAndUpdate({}, { pictureUrl: req.file.url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    }).catch(err =>{
      res.status(500).json("Something went wrong ");
    })
});

module.exports = router;
