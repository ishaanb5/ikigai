const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: {
      value: true,
      message: '{PATH} is required',
    },
    immutable: (doc) => doc.editable,
    unique: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
  editable: {
    type: Boolean,
    default: true,
    immutable: true,
  },

  /*
    will implement later:
    icon,
    color,
    folder,
    archived,
    hidden,
    */
})

listSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v

    return ret
  },
})

// handled unique list name here instead of express middleware for a custom error message
listSchema.post('save', (error, doc, next) => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('list name should be unique'))
  } else next()
})

listSchema.post('update', (error, doc, next) => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('list name should be unique'))
  } else next()
})

const List = mongoose.model('List', listSchema)

module.exports = List
