/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    default: 'No Title',
  },
  description: String,
  completed: Boolean,
})

const Task = mongoose.model('Task', taskSchema)

taskSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v

    return ret
  },
})

module.exports = Task
