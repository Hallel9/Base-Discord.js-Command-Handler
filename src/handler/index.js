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
        const splitted = value.split('/')
        const directory = splitted[splitted.length - 2]
        if (!file?.name) return
        const properties = {directory, ...file}
        client.commands.set(file.name, properties)
        if (['MESSAGE', 'USER'].includes(file.type)) delete file.description
        array.push(file)
    })
    client.on('ready', async () => {
        await client.guilds.cache.get('824352390676611144').commands.set(array)
        // Multiple Guilds
        // client.guilds.cache.forEach(guild => guild.commands.set(array))
    })
}
