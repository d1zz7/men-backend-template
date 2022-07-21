const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        login: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: false },
        password: { type: String, required: true },
        role: { type: String, default: 'user' },
        status: { type: String, default: 'active'}, // active, inactive, blocked
        email: { type: String, required: true, unique: true }
    },
    { timestamps: true },
);

module.exports = model('user', schema);
