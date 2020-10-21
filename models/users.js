const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE', 'ENTERPRISE_ROLE'],
    message: '{VALUE} is not a valid role.'
}

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRoles,
    },
    img: {
        type: String
    },
    direction: {
        type: String
    },
    phone: {
        type: Number
    },
    status: {
        type: Boolean,
        default: true,
    },
    business: {
        default: null,
        type: Schema.Types.ObjectId,
    },
});

userSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;

};

userSchema.plugin( uniqueValidator, { message: '{PATH} must be unique' });


module.exports = mongoose.model('User', userSchema);
