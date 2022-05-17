const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 5000
const PNG_BASE64_STRING_START = `data:image/png;base64,`

app.use(cors())
app.use(express.json({limit: '50mb'}));

app.ws('/', (ws) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case "connection":
                connectionHandler(ws, msg)
                break
            case "draw":
                broadcastConnection(ws, msg)
                break
        }
    })
})

app.post('/image', (req, res) => {
    try {
        const data = req.body.img.replace(PNG_BASE64_STRING_START, '')
        fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.png`), data, 'base64')
        return res.status(200).json({message: "Loaded"})
    } catch (e) {
        return res.status(500).json('error')
    }
})
app.get('/image', (req, res) => {
    try {
        const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.png`))
        const data = PNG_BASE64_STRING_START + file.toString('base64')
        res.json(data)
    } catch (e) {
        return res.status(500).json('error')
    }
})

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}...`))

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}