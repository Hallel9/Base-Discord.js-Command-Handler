const Client = require('../index')
const globPromise = require('util').promisify(require('glob').glob)
const Discord = require('discord.js')
const mongoose = require('mongoose')
/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
    // Events
    const eventFiles = await globPromise(`${process.cwd()}/src/Events/**/*.js`)
    eventFiles.map((value) => require(value))
    // Slash Commands
    const commandFiles = await globPromise(`${process.cwd()}/src/Commands/**/*.js`)
    const array = []
    commandFiles.map((value) => {
        const file = require(value)
        const fileName = value.replace('.js', '')
        if (!file?.name) return
        client.commands.set(file.name, file)
        console.log(`Loaded command: ${fileName}`)
        if (['MESSAGE', 'USER'].includes(file.type)) delete file.description
        array.push(file)
    })
    client.on('ready', async () => {
        await client.guilds.cache.get('824352390676611144').commands.set(array)
        // Multiple Guilds
        // client.guilds.cache.forEach(guild => guild.commands.set(array))
    })
}
