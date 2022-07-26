/* eslint-disable no-underscore-dangle */
const taskRouter = require('express').Router()
const Task = require('../models/task')
const List = require('../models/list')

taskRouter
  .route('/')
  .get(async (req, res) => {
    const tasks = await Task.find({}).populate('list', 'name')
    res.status(200).json(tasks)
  })
  .post(async (req, res) => {
    const { body } = req
    let task = new Task({
      title: body.title,
      description: body.description,
      completed: body.completed,
      list: body.listId,
    })
    await task.save()

    const list = await List.findById(task.list)
    if (list === null) {
      return res.status(404).json({ error: 'list does not exist' })
    }

    list.tasks.push(task._id)
    await list.save()

    task = await task.populate('list', 'name')
    return res.status(201).json(task)
  })

taskRouter
  .route('/:id')
  .get(async (req, res) => {
    const task = await Task.findById(req.params.id).populate('list', 'name')
    if (task === null) return res.status(404).json({ error: 'not found' })

    return res.status(200).json(task)
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
