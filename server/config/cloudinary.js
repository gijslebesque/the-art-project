import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

let folderName;
if(process.env.ENV === "production"){
	folderName = "art-database-prod";
}
else {
	folderName = "art-database-test";
}

const storage = cloudinaryStorage({
	cloudinary: cloudinary,
	folder: folderName, // The name of the folder in cloudinary
	allowedFormats: ['jpg', 'png'],
	filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
	}
});

const parser = multer({ storage: storage });

module.exports = parser;
