/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.listen(3000)

app.use('/dist', express.static(path.resolve(__dirname, './dist')))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.get('/products', (req, res) => {
    res.json(products)
})

app.get('/photos/:name', (req, res) => {
    res.sendFile(path.resolve(__dirname, `./public/images/${req.params.name}`))
})