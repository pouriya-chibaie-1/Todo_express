// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const findUserByAccessToken = async (req) => {
//     const accessToken = req.headers.authorization.split(' ')[1]

//   if (!accessToken) {
//     return res.status(401).json({ error: 'Access token is required' });
//   }

//   try {
//     // Verify and decode the access token
//     const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
//     // Extract userId from decoded token
//     const userId = decoded.userInfo.userId;

//     // Find user by userId
//     const user = await User.findByPk(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Return the user
//     return user.dataValues.userId
//   } catch (error) {
//     console.error('Error finding user by access token:', error);
//     return { error: 'Invalid access token' }
//   }
// };

// module.exports = { findUserByAccessToken };
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const findUserByAccessToken = async (req, res) => {
    const accessToken = req.headers.authorization.split(' ')[1];

    if (!accessToken) {
        throw new Error('Access token is required');
    }

    try {
        // Verify and decode the access token
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        // Extract userId from decoded token
        const userId = decoded.userInfo.userId;

        // Find user by userId
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Return the user ID
        return userId;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Access token has expired');
        }
        throw new Error('Invalid access token');
    }
};

module.exports = { findUserByAccessToken };