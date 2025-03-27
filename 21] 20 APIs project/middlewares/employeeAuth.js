const jwt = require('jsonwebtoken');

const employeeAuth = (req, res, next) => {
    let token = req.header("Authorization");

    token = token.split(' ')[1];

    if (!token) return res.status(401).json({message: 'Token not provided'});

    jwt.verify(token, 'employee', (err, decoded) => {
        if (err) return res.status(403).json({message: 'Invalid token'});

        req.employee = decoded;
        next();
    });
};

module.exports = employeeAuth;