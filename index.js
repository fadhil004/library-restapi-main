const express = require('express');
const routes = require('./routers');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express()
const port = 3000

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/', routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})

module.exports = {app}

