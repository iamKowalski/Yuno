const { Command, TranslateFunctions } = require('../../utils')
const { RichEmbed } = require('discord.js')

module.exports = class Contador extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['count']
        this.category = 'sla'
    }

    async run(message, args) {
        const guildDocument = message.guild && this.client.database && await this.client.database.guilds.get(message.guild.id, 'count countChannel countMessage partner')
        if (args[0] === 'canal') {
            let channel = message.guild.channels.find(c => c.name === args.slice(1).join(' ')) || message.guild.channels.get(args[1]) || message.mentions.channels.first()
            if (!channel || channel.type === 'category') return message.channel.send('Coloque um canal válido!')

            guildDocument.countChannel = channel.id
            guildDocument.save().then(async () => {
                await message.channel.send(`Canal definido: ${channel}`)
            })
        } else if (args[0] === 'mensagem') {
            let mensagem = args.slice(1).join(' ')

            if (!mensagem) return message.channel.send(`Coloque qual será a mensagem do contador, lembre-se "{cor - tipo}" será o tipo/cor do contador...`)
            if ('{animado}'.includes(mensagem) && !guildDocument.partner) return message.channel.send('O contador animado é apenas para servidores premium!')

            guildDocument.countMessage = mensagem
            guildDocument.save().then(async () => {
                guildDocument.count = true
                guildDocument.save().then(async () => {
                    let defaultChannel = await message.guild.channels.get(guildDocument.countChannel)
                    if (!defaultChannel) return message.channel.send(`Este servidor não possui um canal definido no contador...\nUse: \`${message.prefix}contador canal #canal\` para definir um e use o comando novamente!`)
                    await message.channel.send(`Mensagem definida como \`${guildDocument.countMessage}\`\nContador ativado...`)
                    await defaultChannel.setTopic(guildDocument.countMessage.replace('{azul}', TranslateFunctions.azul(message.guild.memberCount)).replace('{laranja}', TranslateFunctions.laranja(message.guild.memberCount)).replace('{animado}', TranslateFunctions.animado(message.guild.memberCount)))
                })
            })
        } else if (args[0] === 'remover') {
            if (!guildDocument.count) return message.channel.send(`Este servidor não possui um contador ativado!`) 
            let lastChannel = message.guild.channels.get(guildDocument.countChannel)
            guildDocument.count = false
            guildDocument.countChannel = null
            guildDocument.countMessage = null

            guildDocument.save().then(async () => {
                await lastChannel.setTopic('')
                await message.channel.send(`O contador foi removido do canal ${lastChannel} e desativado`)
            })
        } else {
            let embed = new RichEmbed()

            embed.setAuthor(this.client.user.tag, this.client.user.displayAvatarURL)
            embed.setDescription(`Dúvidas de como usar o contador?\nAqui vai algumas dicas...`)
            embed.addField('Modos de usar',[
                `\`${message.prefix}contador canal #canal\` - Define o canal onde o contador será definido.`,
                `\`${message.prefix}contador mensagem <mensagem>\` - Define a mensagem que será exibida no contador.`,
                `\`${message.prefix}contador remover\` - Caso haja algum contador ligado/definido, ele será removido e o sistema desligado.`,
                `\n**Lembre-se se ver os \`Placeholders\` abaixo para não errar nada!**\n`
            ].join('\n'), false)
            embed.addField('Placeholders',[
                `**{azul}** - <:y0a:551095926329180170> - O contador será essa cor azul...\n_Linda não acha?_`,
                `**{laranja}** - <:y1:550814259634765851> - O contador será essa cor laranja...\n_Para dar aquele toque de beleza que falta em seu servidor!_`,
                `\n**Contador apenas para servidores premium(partners/parceiros)**`,
                `**{animado}** - <a:yuno2:550059663714942976> - O contado será essa cor/animação...\n_Ótimo para dar aquele toque de elegância ao seu servidor!_`
            ].join('\n'), false)

            message.channel.send(embed)
        }
    }
}