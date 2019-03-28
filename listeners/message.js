module.exports = async function onMessage(message) {
    if (message.author.bot) return

    const guildDocument = message.guild && this.database && await this.database.guilds.get(message.guild.id, 'prefix antInvite')
    const guildPrefix = (guildDocument && guildDocument.prefix) || process.env.PREFIX

    const botMention = message.guild ? message.guild.me.toString() : this.user.toString()
    const prefix = message.content.startsWith(botMention) ? `${botMention} ` : (message.content.startsWith(guildPrefix) ? guildPrefix : null)

    if (guildDocument.antInvite) {
        if (message.content.includes("https://discord.gg/") || message.content.includes("discord.gg/")) {
            message.delete()
            message.channel.send('Anti-invite ativado, AQUI NÃO PORRA')
        }
    }

    if (prefix) {
        const args = message.content.slice(prefix.length).trim().split(' ')
        const name = args.shift()
        const command = this.commands.find(command => command.name === name || command.aliases.includes(name))
        Object.defineProperties(message, {
            'prefix': { value: prefix },
            'command': { value: command }
        })
        if (command) {
            command.process(message, args)
        }
    }
}