const listRouter = require('express').Router()
const List = require('../models/list')
const Task = require('../models/task')

listRouter
  .route('/')
  .get(async (req, res) => {
    let lists = await List.find({}).populate('tasks', 'completed')
    lists = lists.reduce((result, list) => {
      const remainingTasks = list.tasks.filter((task) => !task.completed)
      const updatedList = {
        name: list.name,
        id: list.id,
        totalTasks: list.tasks.length,
        remainingTasks: remainingTasks.length,
        editable: list.editable,
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
    const listToBeUpdated = await List.findById(req.params.id)

    // including editable in the update for setting name as immutable in case editable is false
    const update = {
      ...req.body,
      editable: listToBeUpdated.editable,
    }

    const updatedList = await List.findByIdAndUpdate(req.params.id, update, {
      new: true,
    }).select({ tasks: 0 })

    if (updatedList === null) {
      return res.status(404).json({ error: 'not found' })
    }
    res.status(201).send(updatedList)
  })
  .delete(async (req, res) => {
    const listToBeDeleted = await List.findById(req.params.id)
    if (listToBeDeleted === null) {
      return res.status(404).json({ error: 'list not found' })
    }

    if (!listToBeDeleted.editable) {
      return res.status(405).json({ error: 'delete not allowed' })
    }

    await Task.deleteMany({ list: req.params.id })
    await List.findByIdAndDelete(req.params.id)

    res.status(204).end()
  })

module.exports = listRouter
