const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Product = require("../../models/pet")
const Admindata = require("../../models/admin");
const pet = require('../../models/pet');


router.get('/pet', (req, res, next) => {
    Product.find()
        .select("petage petbreed petprice _id")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        petname:doc.petname,
                        age:doc.age,
                        vaccinated:doc.vaccinated,
                        trained:doc.trained,
                        category:doc.category,
                        breeds:doc.breeds,
                        location:doc.location,
                        color:doc.color,
                        description:doc.description,
                        petprice:doc.petprice,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/pet/' + doc._id
                        }
                    }
                })
            };
            if (docs.length > 0) {
                res.status(200).json(response)
            } else {
                res.status(404).json({
                    message: "No pet in the list"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })


})
router.post('/pets', (req, res, next) => {
    const product = new pet({
        _id: new mongoose.Types.ObjectId,
        petname:req.body.name,
        age:req.body.age,
        vaccinated:req.body.vaccinated,
        trained:req.body.trained,
        category:req.body.category,
        breeds:req.body.breeds,
        location:req.body.location,
        color:req.body.color,
        description:req.body.description,
        petprice:req.bodypetprice
    })
    product.save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "ADDED PET SUCESSFULLLY",
                createdProduct: {
                    petname:result.name,
                    age:result.age,
                    vaccinated:result.vaccinated,
                    trained:result.trained,
                    category:result.category,
                    breeds:result.breeds,
                    location:result.location,
                    color:result.color,
                    description:result.description,
                    petprice:result.petprice,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/pet/' + result._id
                    }
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });

})
router.get('/pets/:petId', (req, res, next) => {
    const id = req.params.petId
    Product.findById(id)
        .select('petage petbreed petprice _id')
        .exec()
        .then(doc => {
            console.log("from database" + doc)
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        description: "get all the pets",
                        url: 'http://localhost:5000/pet'
                    }
                })
            } else {
                res.status(404).json({
                    message: 'No Valid entry found fo this id '
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
})
router.patch('/pet/:petId', (req, res, next) => {
    const id = req.params.petId
    const updateops = {};
    for (const ops of req.body) {
        updateops[ops.propName] = ops.value;
    }
    Product.findByIdAndUpdate({ _id: id }, { $set: updateops })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "PET UPDATED",
                request: {
                    type: 'GET',
                    url: "http://localhost:5000/pet/" + id

                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})
router.delete('/pet/:petId', (req, res, next) => {
    const id = req.params.petId
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "pet deleted",
                request: {
                    type: 'GET',
                    url: "http://localhost:5000/pet"
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})
module.exports = router;