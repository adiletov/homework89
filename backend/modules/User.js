const mongoose = require('mongoose');
const nanoid = require('nanoid');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const newSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        required: true,
        enum: ['admin', 'user']
    }
});


newSchema.methods.generateToken = function (cb) {
    this.token = nanoid();
};


newSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

newSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});


const User = mongoose.model('User', newSchema);

module.exports = User;