const mongoose = require('mongoose')
const List = require('./list')

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
    required: true,
  },
  dueBy: {
    type: Date,
    default: null,
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
    required: true,
  },
})

taskSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

// eslint-disable-next-line func-names
taskSchema.pre('validate', async function () {
  if (!this.list) {
    this.list = await List.findOne({ name: 'Inbox' })
  }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
