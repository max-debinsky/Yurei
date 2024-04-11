const {Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => { 
        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || "No reason provided";

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);
        if(!targetUser) {
            await interaction.editReply("That user doesn't exist in this server.");
            return;
        }

        if(targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply("You can't kick that user because they're the server owner.");
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position;               ///Highest role of target user
        const requiestUserRolePosition = interaction.member.roles.highest.position;     ///Highest role of the user using command
        const botRolePosition = interaction.guild.members.me.roles.highest.position;    ///Highest role of the bot
        if(targetUserRolePosition >= requiestUserRolePosition) {
            await interaction.editReply("You can't kick that user because they have the same or higher role than you.");
            return;
        }

        if(targetUserRolePosition >= botRolePosition) {
            await interaction.editReply("I can't kick that user because they have the same or higher role than me.");
            return;
        }

        ///Kick
        try {
            await targetUser.kick(reason);
            await interaction.editReply(`${targetUser} was kicked.\n Reason: ${reason}`);
        } catch (error) {
            console.log(`There was an error with kicking. Error: ${error}`);
        }
    },

    name: 'kick',
    description: 'Kicks targeted user.',
    // devOnly: Boolean,
    // testOnly: Boolean,
    options: [
        {
            name: 'target-user',
            description: 'The user you want to kick.',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason for kicking.',
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],
}