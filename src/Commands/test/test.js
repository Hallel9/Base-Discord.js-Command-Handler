const Client = require('../../index'),
    {CommandInteraction} = require('discord.js')

module.exports = {
    name: 'test',
    description: 'Ping Command',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {string[]} args
     */
    run: async (client, interaction, args) => {
        interaction.reply({content: 'Test Command.', ephemeral: true})
    }
}
