const jwt = require('jsonwebtoken');
const mysqlConnection = require('../../connection');

// USER VERIFY TOKEN
exports.userVerifyToken = async (req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        
        if (!authorization) {
            return res.status(401).json({ message: 'Invalid Authorization' });   
        }
        
        const token = authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Verify the token
        let decoded;
        try {
            decoded = jwt.verify(token, 'User');
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const userId = decoded.userId;

        // Query to find the user by ID
        const [user] = await mysqlConnection.promise().query('SELECT * FROM user WHERE id = ?', [userId]);

        if (user.length === 0) {
            return res.status(401).json({ message: 'Invalid User (token)' });
        }

        // Attach user information to the request
        req.user = user[0];
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error from User Token' });
    }
};
