const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

const getUser = async (req, res) => {
    try {
        const users = await User.find({})
        return res.send({ users })
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
}
const register = async (req, res) => {
    const body = req.body;
    try {
        const hash = await bcrypt.hash(body.password, 10)
        body.password = hash
        const newUser = new User(body);
        await newUser.save();
        res.send({ msg: 'Welcome User', newUser });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}
const logIn = async (req, res) => {
    const body = req.body;
    console.log(body);
    try {
        const user = await User.findOne({ email: body.email });
        if (user) {
            const isMatch = await bcrypt.compare(body.password, user.password)
            console.log(isMatch);
            if (isMatch) {
                const token = generateToken({ id: user._id, email: user.email, role: 'admin' });
                return res.send({ user, token });
            }
            return res.status(401).send({ msg: 'Invalid password or email' });
        }
        return res.status(401).send({ msg: 'Invalid password or email' });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id)
        res.send({ msg: 'User deleted' })
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}
const editUser = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        await User.findByIdAndUpdate(id, body)
        res.send({ msg: 'User updated' })
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}
module.exports = { register, logIn, deleteUser, editUser, getUser }