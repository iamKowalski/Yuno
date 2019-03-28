const { TranslateFunctions } = require('../utils')

module.exports = async function onGuildMemberAdd(member) {
    let guildDocument = member.guild && this.database && await this.database.guilds.get(member.guild.id, 'count countMessage countChannel')
    if (guildDocument.count) { 
        let channel = member.guild.channels.get(guildDocument.countChannel)
        if (!channel) return
        await channel.setTopic(guildDocument.countMessage.replace('{azul}', TranslateFunctions.azul(member.guild.memberCount)).replace('{laranja}', TranslateFunctions.laranja(member.guild.memberCount)).replace('{animado}', TranslateFunctions.animado(member.guild.memberCount)))
    }
}