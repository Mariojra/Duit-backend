const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

router.post('/login', (req, res) =>{

    const body = req.body;

    User.findOne({ email: body.email }, (err, DBUser) =>{

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if ( !DBUser || !bcrypt.compareSync(body.password, DBUser.password) ) {
            return res.status(400).json({
                ok: false,
                err: {
                    msg: 'Incorrect user email or password'
                }
            });
        }
        
        const token = jwt.sign({
            user: DBUser
        }, process.env.SEED, {expiresIn: process.env.TOKEN_EXPIRES});

        res.json({
            ok: true,
            DBUser,
            token
        });

    });

});

module.exports = router;
