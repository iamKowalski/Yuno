const { Command } = require('../../utils')

module.exports = class Ping extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['pingpong', 'pong']
        this.category = 'bot'
        this.adminOnly = true
    }

    async run(message, args) {
        const guildDocument = await this.client.database.guilds.get(args[0], 'partner')

        if (guildDocument.partner) {
            guildDocument.partner = false
            guildDocument.save().then(async () => {
                await message.channel.send('Não é mais partner')
            })
        } else {
            guildDocument.partner = true
            guildDocument.save().then(async () => {
                await message.channel.send('Agora é partner')
            })
        }
    }
}