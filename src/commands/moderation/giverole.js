const { ApplicationCommandOptionType } = require("discord.js");
const { options, description } = require("./ban");

module.exports = {
    name: 'giverole',
    description: 'Give someone selected role.',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],

    callback: async (client, interaction) => { 
        const targetUserId = interaction.options.get('target-user').value;
        const targetRoleId = interaction.options.get('role').value;

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);
        const targetRole = await interaction.guild.roles.fetch(targetRoleId);
        if(!targetUser) {
            await interaction.editReply("That user doesn't exist in this server.");
            return;
        }

        if(targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply("You can't modify server owner's roles.");
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position;               ///Highest role of target user
        const requiestUserRolePosition = interaction.member.roles.highest.position;     ///Highest role of the user using command
        const botRolePosition = interaction.guild.members.me.roles.highest.position;    ///Highest role of the bot
        if(targetUserRolePosition >= requiestUserRolePosition) {
            await interaction.editReply("You can't do that, because the user has the same or higher role than you.");
            return;
        }

        if(targetUserRolePosition >= botRolePosition) {
            await interaction.editReply("You can't do that, because the user has the same or higher role than me.");
            return;
        }

        ///Give role
        try {
            //var role = targetUser.roles.cache.find(role => role.name === targetRole);
            //if (isNaN(role)){ await interaction.editReply("That role seems to not exist on this server.")};
            
            await targetUser.roles.add(targetRole);
            await interaction.editReply(`${targetUser} was given a ${targetRole} role.`);
        } catch (error) {
            await interaction.editReply("There was an error. Check the console.");
            console.log(`There was an error with kicking. Error: ${error}`);
        }
    },

    options: [
        {
            name: 'target-user',
            description: 'The user you want to give a role.',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
        {
            name: 'role',
            description: 'The role you want to give to the user.',
            type: ApplicationCommandOptionType.Role,
            required: true,
        }
    ]
}