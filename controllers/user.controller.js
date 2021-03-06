const User = require('../models/users');
const bcrypt = require('bcrypt');
const _ = require('underscore');


exports.getUsers = (req, res) =>{
    User.find({ status: true }).exec( (err, users) =>{

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            users
        })

    })
};

exports.getUserById = (req, res) =>{

    const id = req.params.id;

    User.findById(id, (err, user) =>{
        if (err) {
            return res.json({
                ok: false,
                err: {
                    msg: 'Could not find the user you are looking for'
                }
            });
        }

        res.json({
            ok: true,
            user
        });

    });

};

exports.createUser = (req, res) => {
    let body = req.body;

    let user = new User({
        name: body.name,
        lastName: body.lastName,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10 ),
        role: body.role
    });

    user.save( (err, newUser) =>{

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
    
        res.json({
            ok: true,
            newUser
        });

    });
};

exports.createAdminUser = (req, res) => {

    const body = req.body;

    const user = new User({
        name: body.name,
        lastName: body.lastName,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10 ),
        role: body.role
    })

    user.save( (err, newAdminUser) =>{

        if (err) {
            return res.json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            newAdminUser
        });

    });

}

exports.updateUser = (req, res) => {
    const id = req.params.id;
    let body = _.pick( req.body, ['name', 'lastName', 'email', 'img', 'role', 'direction', 'business'] );

    User.findByIdAndUpdate( id, body, { new: true, runValidators: true }, (err, newUser) =>{

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            newUser
        });

    });

};

exports.softDeleteUser = (req, res) =>{

    const id = req.params.id;
    let change = {
        status: false,
    }

    User.findByIdAndUpdate(id, change, {new: true}, (err, deletedUser) => {

        if (err) {
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok: true,
            msg: 'User deleted successfully',
            deletedUser
        });

    });

};
