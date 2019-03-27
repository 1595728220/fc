const express = require("express")
const bodyParser = require("body-parser")
let app = express()
app.listen(8081)
app.use(bodyParser.urlencoded({
    extended:false
}))
