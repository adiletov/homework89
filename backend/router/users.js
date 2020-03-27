const express = require('express');
const User = require('../modules/User');
const bcrypt = require('bcrypt');
const router = express.Router();


router.get('/', async (req, res) => {
    const user = await User.find();
    res.send(user)
});

router.post('/', async (req, res) => {
    const username = await User.findOne({username: req.body.username});
    if (username){
        res.status(401).send({username: 'Такой пользователь существует'})
    }else {


        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        try {
            await user.generateToken();
            await user.save();
            res.send(user)
        } catch (e) {
            res.status(404).send({error: "not found"})
        }
    }
});


router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(400).send({username: 'Username not found '})
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
        return res.status(400).send({password: 'Password in correct'})
    }
    user.generateToken();
    await user.save();
    return res.send(user)
});

router.delete('/sessions', async (req,res)=>{
    const success = {message: 'Bye'};

    const token = req.get('Authorization');
    if (!token) return res.send(success);

    const user = await User.findOne({token});
    if (!user) return res.send(success);


    user.generateToken();
    await user.save();
    return res.send(success);
});

module.exports = router;