// middleware/attachUserIdToRequest.js
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = process.env;

const attachUserIdToRequest = (req, res, next) => {
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ error: 'Access token is required' });
    }

    try {
        const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
        req.userId = decoded.userInfo.userId; // Attach user ID to request object
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid access token' });
    }
};

module.exports = attachUserIdToRequest;
