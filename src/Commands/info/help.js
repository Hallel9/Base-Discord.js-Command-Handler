const Client = require('../../index'),
    {CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow} = require('discord.js')
const fs = require('fs')
const {stripIndent} = require('common-tags')
let color = '#ff0000'
module.exports = {
    name: 'help',
    description: 'Help Command',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {string[]} args
     */
    run: async (client, interaction, args) => {
        const emojis = {
            info: '❗',
            test: '📃'
        }
        const directory = [...new Set(client.commands.map((cmd) => cmd.directory))]
        const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`
        const categories = directory.map((dir) => {
            const getCommands = client.commands
                .filter((cmd) => cmd.directory === dir)
                .map((cmd) => {
                    return {
                        name: cmd.name || 'No command name',
                        description: cmd.description || 'No command description'
                    }
                })
            return {
                directory: formatString(dir),
                commands: getCommands
            }
        })
        const embed = new MessageEmbed().setColor(client.colors.slategray).setDescription('Please choose a category in the dropdown menu.')
        const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId('help-menu')
                    .setPlaceholder('Please select a category.')
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLowerCase(),
                                description: `Commands from ${cmd.directory} category`,
                                emoji: emojis[cmd.directory.toLowerCase()] || null
                            }
                        })
                    )
            )
        ]
        await interaction.reply({embeds: [embed], components: components(false)})

        const filter = (i) => i.user.id === interaction.user.id
        const collector = interaction.channel.createMessageComponentCollector({filter, componentType: 'SELECT_MENU', time: 30000})

        collector.on('collect', async (i) => {
            const [directory] = i.values
            const category = categories.find((x) => x.directory.toLowerCase() === directory)
            const embed1 = new MessageEmbed()
                .setTitle(`${emojis[directory.toLowerCase()]}${directory} commands`)
                .setDescription('Here is the list of commands')
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: `\`${cmd.name}\``,
                            value: `${cmd.description}`,
                            inline: true
                        }
                    })
                )
            i.update({embeds: [embed1]})
        })

        collector.on('end', () => {
            interaction.editReply({components: components(true)})
        })
    }
}
