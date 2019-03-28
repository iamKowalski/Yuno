const { Command } = require('../../utils')

module.exports = class Ping extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['pingpong', 'pong']
        this.category = 'bot'
    }

    async run(message) {
        message.channel.send(`${parseInt(this.client.ping)} ms...`)
    }
}