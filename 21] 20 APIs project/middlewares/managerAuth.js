const jwt = require('jsonwebtoken');

const managerAuth = (req, res, next) => {
    let token = req.header("Authorization");

    token = token.split(' ')[1];

    if (!token) return res.status(401).json({message: 'Token not provided'});

    jwt.verify(token, 'manager', (err, decoded) => {
        if (err) return res.status(403).json({message: 'Invalid token'});

        req.manager = decoded;
        next();
    });
}

module.exports = managerAuth;