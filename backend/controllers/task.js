const taskRouter = require('express').Router()
const Task = require('../models/task')

taskRouter
  .route('/')
  .get(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json(tasks)
  })
  .post(async (req, res) => {
    const body = req.body
    const task = new Task({
      title: body.title,
      description: body.description,
      completed: body.completed || false,
    })

    await task.save()
    res.status(201).json(task)
  })

taskRouter
  .route('/:id')
  .get(async (req, res) => {
    const task = await Task.findById(req.params.id)

    res.status(200).json(task)
  })
  .put(async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    res.status(201).json(updatedTask)
  })
  .delete(async (req, res) => {
    await Task.findByIdAndDelete(req.params.id)
    res.status(204).end()
  })

module.exports = taskRouter
