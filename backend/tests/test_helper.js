const List = require('../models/list')
const Task = require('../models/task')

const initialTasks = [
  {
    title: 'item 1',
    description: 'description about task 1',
    completed: false,
    list: '507f191e810c19729de860ea',
    _id: '507f191e810c19729de860eb',
  },
  {
    title: 'item 2',
    description: 'description about task 2',
    completed: true,
    list: '507f191e810c19729de860ea',
    _id: '507f191e810c19729de860ec',
  },
  {
    title: 'item 3',
    description: 'description about item 3',
    completed: false,
    list: '507f191e810c19729de860ea',
    _id: '507f191e810c19729de860ee',
  },
  {
    title: 'Water Plants',
    description: 'check if the top layer is dry before watering',
    completed: false,
    list: '507f191e810c19729de861ea',
    _id: '507f191e810c19729de860ed',
  },
]

const initialLists = [
  {
    name: 'Inbox',
    tasks: [
      '507f191e810c19729de860eb',
      '507f191e810c19729de860ec',
      '507f191e810c19729de860ee',
    ],
    editable: false,
    _id: '507f191e810c19729de860ea',
  },
  {
    name: 'Chores',
    tasks: ['507f191e810c19729de860ed'],
    editable: true,
    _id: '507f191e810c19729de861ea',
  },
]

const tasksInDb = async () => {
  const tasks = await Task.find({})
  return tasks.map((task) => task.toJSON())
}

const nonExistentId = () => {
  const tempTask = new Task({
    title: 'temp task',
    description: 'created to have an id of a task that does not exist in db',
  })

  return tempTask.id
}

const listsInDb = async () => {
  const lists = await List.find({})
  return lists.map((list) => list.toJSON())
}

module.exports = {
  initialTasks,
  initialLists,
  tasksInDb,
  nonExistentId,
  listsInDb,
}
