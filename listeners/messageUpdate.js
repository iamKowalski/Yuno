module.exports = async function onMessageUpdate(oldMessage, newMessage) {
    const guildDocument = oldMessage.guild && this.database && await this.database.guilds.get(oldMessage.guild.id, 'antInvite')

    if (guildDocument.antInvite) {
        if (newMessage.content.includes("https://discord.gg/") || newMessage.content.includes("discord.gg/")) {
            newMessage.delete()
            newMessage.channel.send('Anti-invite ativado, AQUI NÃO PORRA')
        }
    }
}