const {Schema, model} = require('mongoose');

const autoRoleModel = new Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    roleId: {
        type: String,
        required: true,
    }
})

module.exports = model('AutoRole', autoRoleModel);