const { Command } = require('../../utils')

module.exports = class AntInvite extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['pingpong', 'pong']
        this.category = 'bot'
    }

    async run(message) {
        const guildDocument = message.guild && this.client.database && await this.client.database.guilds.get(message.guild.id, 'antInvite')

        if (guildDocument.antInvite) {
            guildDocument.antInvite = false
            guildDocument.save().then(async () => {
                await message.channel.send('Anti-invite desativado')
            })
        } else {
            guildDocument.antInvite = true
            guildDocument.save().then(async () => {
                await message.channel.send('Anti-invite ativado')
            })
        }

    }
}