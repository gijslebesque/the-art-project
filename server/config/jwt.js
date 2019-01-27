const jwt = require('jsonwebtoken');

const jwtToken = {
    generateToken: user => {
        let u = {
            username: user.username,
            email: user.email,
            _id: user._id.toString(),
        };
        return jwt.sign(u, process.env.SECRET, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        });
       
    }
}

module.exports = jwtToken;