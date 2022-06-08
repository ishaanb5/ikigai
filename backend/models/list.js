const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Inbox',
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

const List = mongoose.model('List', listSchema)

module.exports = List
