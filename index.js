require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const customizedCors = require('./cors')
const router = require('./routes')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

app.use(customizedCors)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', router)

const PORT = 5555

async function start() {
    try {
        app.set('port', process.env.PORT || PORT)

        // connect to mongoDB
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Mongo connection success.')
        // for correct work on hosting
        app.get('/', function (request, response) {
            response.sendFile(path.join(__dirname, '/static/index.html'))
        }).listen(app.get('port'), function () {
            console.log(
                'App is running, server is listening on port ',
                app.get('port')
            )
        })
    } catch (e) {
        console.log('Mongo connection error.')
        console.log(e.message)
        process.exit(1)
    }
}

start().then((r) => console.log('')) // start server
