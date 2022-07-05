const listRouter = require('express').Router()
const List = require('../models/list')
const Task = require('../models/task')

listRouter
  .route('/')
  .get(async (req, res) => {
    let lists = await List.find({}).populate('tasks', 'completed')
    lists = lists.reduce((result, list) => {
      const remainingTasks = list.tasks.filter(task => !task.completed)
      const updatedList = {
        name: list.name,
        id: list.id,
        totalTasks: list.tasks.length,
        remainingTasks: remainingTasks.length,
      }
      result.push(updatedList)
      return result
    }, [])

    return res.status(200).json(lists)
  })
  .post(async (req, res) => {
    const newList = new List(req.body)
    await newList.save()

    return res.status(201).json(newList)
  })

listRouter
  .route('/:id')
  .get(async (req, res) => {
    const list = await List.findById(req.params.id).populate('tasks')

    if (list === null) {
      return res.status(404).end()
    }
    return res.status(200).json(list)
  })
  .put(async (req, res) => {
    const updatedList = await List.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true },
    ).select({ tasks: 0 })

    res.status(201).send(updatedList)
  })
  .delete(async (req, res) => {
    await Task.deleteMany({ list: req.params.id })
    await List.findByIdAndDelete(req.params.id)

    res.status(204).end()
  })

module.exports = listRouter
