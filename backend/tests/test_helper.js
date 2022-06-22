const mongoose = require('mongoose')
const Task = require('../models/task')

const initialTasks = [
  {
    title: 'item 1',
    description: 'description about task 1',
    completed: false,
    list: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
  },
  {
    title: 'item 2',
    description: 'description about task 2',
    completed: false,
    list: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
  },
  {
    title: 'Water Plants',
    description: 'check if the top layer is dry before watering',
    completed: false,
    list: new mongoose.Types.ObjectId('507f191e810c19729de861ea'),
  },
]

const initialLists = [
  {
    name: 'Inbox',
    tasks: [],
    editable: false,
    _id: '507f191e810c19729de860ea',
  },
  {
    name: 'Chores',
    tasks: [],
    editable: false,
    _id: '507f191e810c19729de861ea',
  },
]

const tasksInDb = async () => {
  return await Task.find({})
}

module.exports = { initialTasks, initialLists, tasksInDb }
