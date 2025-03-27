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
        res.render("home", { title: "Autos List | Integrating With HubSpot I Practicum", data })
    }
    catch (error) {
        console.error("Error getting Autos:", error.response?.data || error.message)
        res.status(500).send("Error getting Autos")
    }
})

// 2. Display Form
app.get("/update", (req, res) => {
    res.render("form", {
        title: "Update Custom Object Form | Integrating With HubSpot I Practicum",
    })
})

// 3. Create new custom object
app.post("/update", async (req, res) => {
    const { name, brand, color } = req.body

    const url = `https://api.hubapi.com/crm/v3/objects/autos`
    const headers = {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
    }

    const newRecord = {
        properties: {
            name,
            brand,
            color,
        },
    }

    try {
        await axios.post(url, newRecord, { headers })
        res.redirect("/")
    } catch (error) {
        console.error(
            "Error creating custom object:",
            error.response?.data || error.message
        )
        res.status(500).send("Error creating record")
    }
})

// Start
app.listen(3000, () => {
    console.log("Listening on http://localhost:3000")
})