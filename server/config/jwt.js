import jwt from "jsonwebtoken";

const jwtToken = {
  generateToken: user => {
    let u = {
      username: user.username,
      artworks: user.artworks,
      favourite: user.favourite,
      _id: user._id.toString()
    };
    return jwt.sign(u, process.env.SECRET, {
      // expires in 24 hours
      expiresIn: 60 * 60 * 24
    });
  }
};

module.exports = jwtToken;
