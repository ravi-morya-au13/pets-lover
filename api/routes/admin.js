const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const AdminData = require("../../models/admin")
router.get("/admin", (req, res) => {
    res.render('adminlogin.hbs')

})
router.post("/admin", async (req, res) => {
    try {
        // console.log(req.body.uname)
        // console.log(req.body.psw)
        const username = req.body.uname
        const password = req.body.psw
        const user = await AdminData.findOne({ password: password })
        if (user) {
            res.render("adminlogin2.hbs")
        } else {
            res.send("Invalid Credentials")
        }
    } catch (err) {
        console.log(err)
    }


})


module.exports = router

