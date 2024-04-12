const {Client, GuildMember} = require('discord.js');
const AutoRole = require('../../models/mAutoRole');

/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 */

module.exports = async (client, member) => {
    try {
        let guild = member.guild;   
        if(!guild) return;

        const AutoRole = await AutoRole.findOne({guildId: guild.id});
        if(!AutoRole) return;

        await member.roles.add(AutoRole.roleId);
    }catch(error){
        console.log(`Error while auto giving role. ${error}`)
    }
} 