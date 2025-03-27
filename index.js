const express = require("express")
const axios = require("axios")
require("dotenv").config()
const app = express()
const TOKEN = process.env.TOKEN

app.set("view engine", "pug")
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


///// ROUTES /////

// 1. Autos List
app.get("/", async (req, res) => {
    const url = `https://api.hubapi.com/crm/v3/objects/autos?properties=name,color,brand`

    const headers = {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
    }

    try {
        const response = await axios.get(url, { headers })
        const data = response.data.results
        res.render("home", { title: "Autos List", data })
    }
    catch (error) {
        console.error("Error getting Autos:", error.response?.data || error.message)
        res.status(500).send("Error getting Autos")
    }
})

// Start
app.listen(3000, () => {
    console.log("Listening on http://localhost:3000")
})