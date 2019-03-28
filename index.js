require('dotenv').config()

const Yuno = require('./Yuno')
const client = new Yuno()

client.login(process.env.TOKEN)
.then(() => {
    console.log('Online!')
})
.catch(err => {
    console.log(`Falha ao iniciar o bot :::: ${err}`)
})