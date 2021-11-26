const Client = require('../../index'),
    {CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton} = require('discord.js')
module.exports = {
    name: 'serverinfo',
    description: 'Get information about a server',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {string[]} args
     */
    run: async (client, interaction, args) => {
        const {guild} = interaction
        if (!guild.available) return
        const owner = await guild.fetchOwner()
        const embed = new MessageEmbed()
            .setColor(guild.roles.highest.color || client.colors.darksalmon)
            .setTitle(`Information for ${guild.name}`)
            .addFields([
                {
                    name: 'ID',
                    value: `${guild.id}`
                },
                {
                    name: 'Created',
                    value: `<t:${Math.round(guild.createdTimestamp / 1000)}:F> - <t:${Math.round(guild.createdTimestamp / 1000)}:R>`,
                    inline: true
                },
                {
                    name: 'Joined',
                    value: `<t:${Math.round(interaction.member.joinedTimestamp / 1000)}:F> - <t:${Math.round(interaction.member.joinedTimestamp / 1000)}:R>`,
                    inline: true
                },
                {
                    name: 'Owner',
                    value: `${owner.user.tag} (${owner.id})`,
                    inline: true
                },
                {
                    name: 'Members',
                    value: `${guild.memberCount}`,
                    inline: true
                },
                {
                    name: 'Users',
                    value: `${guild.members.cache.filter((m) => !m.user.bot).size}`,
                    inline: true
                },
                {
                    name: 'Bots',
                    value: `${guild.members.cache.filter((m) => m.user.bot).size}`,
                    inline: true
                },
                {
                    name: 'Verified',
                    value: `${guild.verified ? 'Yes' : 'No'}`,
                    inline: true
                },
                {
                    name: 'Boosts',
                    value: `${guild.premiumSubscriptionCount}`,
                    inline: true
                },
                {
                    name: 'Level',
                    value: `${guild.premiumTier}`,
                    inline: true
                }
            ])
            .setThumbnail(guild.iconURL({format: 'png', dynamic: true, size: 1024}))
        interaction.reply({embeds: [embed], ephemeral: true})
    }
}
