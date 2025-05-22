const jwt = require('jsonwebtoken')

const verifyJWT_Manager = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer '))
        return res.status(401).json({ message: 'Unauthorized' })
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(decoded.userInfo.status !== 'manager')
            return res.status(401).json({ message: 'Unauthorized' })
            if (err) 
                return res.status(403).json({message: 'Forbidden' })
    req.user = decoded
    next()

    })
}
module.exports = verifyJWT_Manager