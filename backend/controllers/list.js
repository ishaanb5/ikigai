const listRouter = require('express').Router()
const List = require('../models/list')

listRouter
  .route('/')
  .get(async (req, res) => {
    const lists = await List.find({})
    return res.status(200).json(lists)
  })
  .post(async (req, res) => {
    const newList = new List({ name: req.body.name })
    await newList.save()

    return res.status(201).json(newList)
  })

// view a list
// view all lists
// create  a list
// delete a list
// update a list
module.exports = listRouter
