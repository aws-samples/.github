const express = require("express")
const axios = require("axios")
require("dotenv").config()
const app = express()
const TOKEN = process.env.TOKEN


app.set("view engine", "pug")
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())