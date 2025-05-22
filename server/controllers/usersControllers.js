const Users = require("../models/Users")

const getByType = ('/', async (req, res) => {
     const {type}=req.params
        const usersByType = await Users.find({ status: type });
        res.json(usersByType);
    
        res.status(500).json({ message: 'An error occurred while retrieving staff data' });
    
})

const getUserById = ('/', async (req, res) => {
    const { id } = req.params  
    const user = await Users.findById(id).lean()
    if (!user) {
        return res.status(404).json({ message: 'No user found' })
    }
    res.json(user)
})


const creatUser = ('/', async (req, res) => {
    const { name, identity_number, password, phone, address, email, date_of_birth, status } = req.body
    const achievements = []
    if (!name || !identity_number || !password || !phone || !address || !status)
        return res.status(400).json({ message: 'Missing data' })
    const duplicate=await Users.findOne({identity_number}).lean()
    if(duplicate)
        return res.status(409).json({ message: 'duplicate identity_number' })
    const user = await Users.create({ name, identity_number, password, phone, address, email, date_of_birth, status })
    if (!user)
        return res.status(404).json({ message: 'did not creat new user' })
    res.json(user)
})


const updateUser = ('/', async (req, res) => {
    const { _id, name, identity_number, password, phone, address, email, date_of_birth, status } = req.body
    if (!_id)
        return res.status(400).json({ message: 'Missing data "id" ' })
    const user = await Users.findById(_id).exec()
    if (!user)
        return res.status(404).json({ message: 'user not found' })

    user.name = name
    user.identity_number = identity_number
    user.password = password
    user.phone = phone
    user.address = address
    if (email)
        user.email = email
    if (date_of_birth)
        user.date_of_birth = date_of_birth
    user.status = status

    const updateUser = await user.save()
    res.json(`'${user.name}' updated`)
})

const deleteUser = ('/', async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).json({ message: 'enter id' })
    const user = await Users.findById(id).exec()
    if (!user)
        return res.status(404).json({ message: 'user not found' })
    const result = await Users.deleteOne(user)
    res.json(`'${user.name}' deleted`)
})

module.exports = { getByType, getUserById, creatUser, updateUser, deleteUser }