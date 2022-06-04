/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'No Title',
  },
  description: { type: String, default: '' },
  completed: {
    type: Boolean,
    default: false,
  },
  dueBy: {
    type: Date,
    default: null,
  },
})

const Task = mongoose.model('Task', taskSchema)

taskSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()

    delete ret._id
    delete ret.__v
    return ret
  },
})

module.exports = Task
