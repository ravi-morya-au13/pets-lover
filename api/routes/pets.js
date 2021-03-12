const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Product = require("../../models/pets")
const Admindata = require("../../models/admin")


router.get('/pets', (req, res, next) => {
    Product.find()
        .select("petname petprice pettype _id")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        petname: doc.petname,
                        petprice: doc.petprice,
                        pettype: doc.pettype,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/pets/' + doc._id
                        }
                    }
                })
            };
            if (docs.length > 0) {
                res.status(200).json(response)
            } else {
                res.status(404).json({
                    message: "No pets in the list"
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
router.post('/products', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        bookname: req.body.bookname,
        booktype: req.body.booktype,
        bookprice: req.body.bookprice
    })
    pet.save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "Pet Added sucessfully",
                addedpet: {
                    petname: result.petname,
                    pettype: result.pettype,
                    petprice: result.petprice,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/pets/' + result._id
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
router.get('/pets/:petid', (req, res, next) => {
    const id = req.params.petid
    Product.findById(id)
        .select('petname petprice petprice _id')
        .exec()
        .then(doc => {
            console.log("from database" + doc)
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        description: "get all the pets",
                        url: 'http://localhost:5000/pets'
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
router.patch('/pets/:petId', (req, res, next) => {
    const id = req.params.pettId
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
                    url: "http://localhost:5000/pets/" + id

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
router.delete('/pets/:petId', (req, res, next) => {
    const id = req.params.petId
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "pet deleted",
                request: {
                    type: 'GET',
                    url: "http://localhost:5000/pets"
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