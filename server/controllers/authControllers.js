const Users = require("../models/Users")
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')

const login = async (req, res) => {
    const { identity_number, password } = req.body
    if (!identity_number || !password) 
        return res.status(400).json({message:'All fields are required'})
    const foundUser = await Users.findOne({identity_number}).lean()
    if (!foundUser || !foundUser.active) 
        return res.status(401).json({ message: 'Unauthorized' })
    const match = await bcrypt.compare(password, foundUser.password)
    if(!match)
        return res.status(401).json({message:'Unauthorized' })
        
    const userInfo= {_id: foundUser._id, identity_number: foundUser.identity_number, name: foundUser.name, status: foundUser.status }
    const accessToken = jwt.sign({userInfo},process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken,user:userInfo,role:foundUser.status})
 }

const register = async (req, res) => {
    const { name, identity_number, password, phone, address, email, date_of_birth, status } = req.body
    const achievements = []
    if (!name || !identity_number || !password || !phone || !address || !status)
        return res.status(400).json({ message: 'Missing data' })
    const duplicate = await Users.findOne({ identity_number }).lean()
    if (duplicate)
        return res.status(409).json({ message: 'duplicate identity_number' })

    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = { name, identity_number, password:hashedPwd, phone, address, email, date_of_birth, status}
    const user = await Users.create(userObject)
    if (user) { 
        return res.status(201).json({message: `New user ${user.identity_number} created` })
    } else {
        return res.status(400).json({ message: 'Invalid user received' })
    }
}

module.exports = { login, register }