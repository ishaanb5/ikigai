const mongoose = require('mongoose')

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
    title: 'item 3',
    description: 'description about task 3',
    completed: false,
    list: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
  },
]

const initialLists = [
  {
    name: 'Inbox',
    tasks: [],
    editable: false,
    _id: '507f191e810c19729de860ea',
  },
]

module.exports = { initialTasks, initialLists }
