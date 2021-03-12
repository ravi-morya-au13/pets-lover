const express = require("express");
const multer = require("multer")
const path = require("path");
const router = express.Router()
const mongoose = require("mongoose")
const petdata = require("../../models/adminlogin2")

router.post("/upload", async (req, res) => {
    try {
        const petdetails = new petdetails({
            petname:req.body.name,
            age:req.body.age,
            vaccinated:req.body.vaccinated,
            trained:req.body.trained,
            category:req.body.category,
            breeds:req.body.breeds,
            location:req.body.location,
            color:req.body.color,
            description:req.body.description,
            petprice:req.body.petprice
        })
        console.log(req.body.petname)
        // console.log(description)
        const created = await petDetail.save()
        res.send("sucessfuly added the pet")

    } catch (err) {
        res.send(err)
    }
})




module.exports = router
