const jwt = require('jsonwebtoken');
const MustacheStyle = require('../models/MustacheStyleMongoose');

exports.getToken = (req, res) => {
    const payload = { exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) }; 
    //I added the *7, because all the user accounts I made stopped working after 24 hours and I wanted to make sure you would be able to login
    //I also looked into token refresh but I just want to ensure that you're able to login
    const token = jwt.sign(payload, 'somesupersecretsecret'); 
    res.status(200).json({ token });
  };

exports.verifyToken = (req, res, next) => {
  const token = req.query.token;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    jwt.verify(token, 'somesupersecretsecret'); 
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ message: 'Invalid token' });
    } else {
      res.status(500).json({ message: 'Error verifying token', error });
    }
  }
};

exports.getStyles = async (req, res) => {
    try {
      const styles = await MustacheStyle.find();
      const baseUrl = 'http://localhost:3000/images/';
      const modifiedStyles = styles.map((style) => {
        return {
          id: style._id,
          title: style.title,
          description: style.description,
          imageUrl: baseUrl + style.imageUrl,
        };
      });
      res.status(200).json(modifiedStyles);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching styles', error });
    }
  };
  
  
