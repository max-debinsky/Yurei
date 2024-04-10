const {ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');
const { description } = require('../misc/ping');

module.exports = {
    name: 'ban',
    description: 'Bans targeted user.',
    // devOnly: Boolean,
    // testOnly: Boolean,
    options: [
        {
            name: 'target-user',
            description: 'The user you want to ban.',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'The reason for banning.',
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],

    callback: (client, interaction) => { 
        interaction.reply(`ban..`);
    }
}