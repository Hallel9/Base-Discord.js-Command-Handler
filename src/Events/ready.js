const client = require('../index')
const Discord = require('discord.js')
client.on('ready', () => {
    console.log(`${client.user.tag} is ready to go!`)
})

client.on('error', (err) => {
    console.log(`[CLIENT ERROR] - ${err}`)
})

process.on('uncaughtException', (err) => {
    const wc = new Discord.WebhookClient({url: 'https://discord.com/api/webhooks/911373651071336548/dOHG1iFx8OdBZ0hPWeTnYNOXytExmIDNCC_9JbguDtqF1Z19anAGqhudWVBRiI9NNsVo'})
    wc.send({
        embeds: [
            {
                author: {
                    name: `[UNCAUGHT EXCEPTION]`
                },
                description: `${err}`,
                color: 'NOT_QUITE_BLACK'
            }
        ]
    })
    console.log(`[UNCAUGHT EXCEPTION] - ${require('chalk').redBright(`${err.stack}`)}`)
})

process.on('unhandledRejection', (err) => {
    const wc = new Discord.WebhookClient({url: 'https://discord.com/api/webhooks/911373651071336548/dOHG1iFx8OdBZ0hPWeTnYNOXytExmIDNCC_9JbguDtqF1Z19anAGqhudWVBRiI9NNsVo'})
    wc.send({
        embeds: [
            {
                author: {
                    name: `[UNHANDLED REJECTION]`
                },
                description: `${err}`,
                color: 'NOT_QUITE_BLACK'
            }
        ]
    })
    console.log(`[UNHANDLED REJECTION] - ${require('chalk').redBright(`${err.stack}`)}`)
})
