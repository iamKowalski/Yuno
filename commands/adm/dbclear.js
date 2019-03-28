const { Command } = require('../../utils')

module.exports = class Ping extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['pingpong', 'pong']
        this.category = 'bot'
        this.adminOnly = true
    }

    async run(message) {
        this.client.guilds.forEach(g => {
            this.client.database.guilds.remove(g.id).then(async () => {
                await message.channel.send(`${g.name} deletada....`)
            })
        })
        this.client.users.forEach(u => {
            this.client.database.users.remove(u.id).then(async () => {
                await message.channel.send(`${u.tag} deletado...`)
            })
        })
    }
}