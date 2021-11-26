const Discord = require('discord.js')
const mongoose = require('mongoose')
require('dotenv').config()

class Client extends Discord.Client {
    constructor() {
        super({
            intents: 32767,
            allowedMentions: {parse: []}
        })
        this.commands = new Discord.Collection()
        this.events = new Discord.Collection()
    }
    init() {
        this.login(process.env.TOKEN)
        require('../handler')(this)
        if (!process.env.DB) return
        mongoose
            .connect(process.env.DB)
            .then(() => console.log(`[MONGOOSE] - ${require('chalk').greenBright('Connected to mongodb!')}`))
            .catch((err) => console.log(`[MONGOOSE] - ${require('chalk').redBright(`Error connecting to mongodb: ${err}`)}`))
    }
}

module.exports = {Client}
