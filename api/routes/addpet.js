const express = require("express");
const multer = require("multer")
const path = require("path");
const router = express.Router()
const mongoose = require("mongoose")
const Bookdata = require("../../models/adminlogin2")

router.post("/upload", async (req, res) => {
    try {
        const petdetails = new petdata({
            petname: req.body.petname,
            petage: req.body.petage,
            pettype:req.body.pettype,
            breed: req.body.breed,
            petdetails:rq.body.petdetails

        })
        console.log(req.body.petname)
        // console.log(petdetails)
        const created = await petdetails.save()
        res.send("sucessfuly added the pet in cart")

    } catch (err) {
        res.send(err)
    }
})




module.exports = router
