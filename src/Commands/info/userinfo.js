const Client = require('../../index'),
    {CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton} = require('discord.js')
module.exports = {
    name: 'userinfo',
    description: 'Get information about a user',
    options: [
        {
            name: 'user',
            description: 'The user to get information about',
            type: 'USER',
            required: false
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {string[]} args
     */
    run: async (client, interaction, args) => {
        const user = interaction.options.getMember('user') || interaction.member
        const embed = new MessageEmbed()
            .setColor(user.user.hexAccentColor || client.colors.darksalmon)
            .setTitle(`Information for ${user.user.tag}`)
            .addFields([
                {
                    name: 'ID',
                    value: `${user.id}`
                },
                {
                    name: 'User Flags',
                    value: `${user.user.flags.toArray().join(', ').toLowerCase() || 'No User Flags'}`,
                    inline: true
                },
                {
                    name: 'Joined',
                    value: `<t:${Math.round(user.joinedTimestamp / 1000)}:F> - <t:${Math.round(user.joinedTimestamp / 1000)}:R>`,
                    inline: true
                },
                {
                    name: 'Created',
                    value: `<t:${Math.round(user.user.createdTimestamp / 1000)}:F> - <t:${parseInt(user.user.createdTimestamp / 1000)}:R>`,
                    inline: true
                },
                {
                    name: 'Bot or user',
                    value: `${user.user.bot ? 'Bot' : 'User'}`
                }
            ])
            .setThumbnail(user.user.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))
        interaction.reply({embeds: [embed], ephemeral: true})
    }
}
