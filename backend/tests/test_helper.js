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
    title: 'Do Laundry',
    description: 'remember to select pre-wash',
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

module.exports = { initialTasks, initialLists }
