const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1]; 
    const data = jwt.verify( token, process.env.TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            return decoded.user;
        })
    if(data.roleId != 1) return res.sendStatus(401).json({menssage: "unauthorized"});
    next();
}

module.exports = isAdmin;