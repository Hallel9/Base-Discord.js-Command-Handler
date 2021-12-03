const client = require('../index')
const Discord = require('discord.js')
client.on('ready', () => {
    console.log(`${client.user.tag} is ready to go!`)
})

client.on('error', (err) => {
    console.log(`[CLIENT ERROR] - ${err}`)
})

process.on('uncaughtException', (err) => {
    const wc = new Discord.WebhookClient({url: 'webhookurl'})
    wc.send({
        embeds: [
            {
                author: {
                    name: `${err.name} - ${client.user.tag}`
                },
                description: `${err.stack}`,
                color: 'NOT_QUITE_BLACK',
                footer: {
                    text: 'Uncaught Exception'
                }
            }
        ]
    })
    console.log(`[UNCAUGHT EXCEPTION] - ${require('chalk').redBright(`${err.stack}`)}`)
})

process.on('unhandledRejection', (err) => {
    const wc = new Discord.WebhookClient({url: 'webhookurl'})
    wc.send({
        embeds: [
            {
                author: {
                    name: `${err.name} - ${client.user.tag}`
                },
                description: `${err.stack}`,
                color: 'NOT_QUITE_BLACK',
                footer: {
                    text: 'Unhandled Rejection'
                }
            }
        ]
    })
    console.log(`[UNHANDLED REJECTION] - ${require('chalk').redBright(`${err.stack}`)}`)
})
