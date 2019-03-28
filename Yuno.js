const { Client, Collection } = require('discord.js')
const Fs = require('fs')
const { MongoDB } = require('./database')

module.exports = class Yuno extends Client {
    constructor(options = {}) {
        super(options)

        this.commands = new Collection()
        this.initCommands('./commands')
        this.initListeners('./listeners')
        this.initSubCommands('./subcommands')
        this.initializeDatabase(MongoDB, { useNewUrlParser: true })
    }


    initCommands(path) {
        Fs.readdirSync(path)
            .forEach(file => {
                try {
                    let filePath = path + '/' + file
                    if (file.endsWith('.js')) {
                        const Command = require(filePath)
                        const commandName = file.replace(/.js/g, '').toLowerCase()
                        const command = new Command(commandName, this)
                        return this.commands.set(commandName, command)
                    } else if (Fs.lstatSync(filePath).isDirectory()) {
                        this.initCommands(filePath)
                    }
                } catch (error) {
                    console.error(error)
                }
            })
    }

    initSubCommands(path) {
        Fs.readdirSync(path)
            .forEach(file => {
                try {
                    let filePath = path + '/' + file
                    if (file.endsWith('.js')) {
                        const Command = require(filePath)
                        const commandName = file.replace(/.js/g, '').toLowerCase()
                        const command = new Command(commandName, this)
                        return this.commands.get(path.split('/').pop()).subcommands.push(command)
                    } else if (Fs.lstatSync(filePath).isDirectory()) {
                        this.initSubCommands(filePath)
                    }
                } catch (error) {
                    console.error(error)
                }
            })
    }

    initListeners(path) {
        Fs.readdirSync(path)
            .forEach(file => {
                try {
                    let filePath = path + '/' + file
                    if (file.endsWith('.js')) {
                        let Listener = require(filePath)
                        this.on(file.replace(/.js/g, ''), Listener)
                    }

                    let stats = Fs.lstatSync(filePath)
                    if (stats.isDirectory()) {
                        this.initListeners(filePath)
                    }
                } catch (error) {
                    console.error(error)
                }
            })
    }

    sendLoggerError(error) {
        console.log(error)
        let embed = new MessageEmbed()
            .setColor('RED')
            .setTitle(error.name)
            .setAuthor(this.user.username, this.user.displayAvatarURL())
            .addDescription(error.message)
            .addField('Arquivo', `${error.fileName} ${error.lineNumber}`)
        return this.channels.get(process.env.LOG_ERROR).send(embed)
    }

    initializeDatabase(DBWrapper, options = {}) {
        this.database = new DBWrapper(options)
        this.database.connect()
            .then(() => console.log('Database connected!'))
            .catch(e => {
                console.log(e.message)
                this.database = null
            })
    }
}