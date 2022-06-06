const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Inbox',
    unique: true,
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],

  /*
    will implement later:
    icon,
    color,
    folder,
    archived,
    hidden,
    */
})

const List = mongoose.Model('List', listSchema)

module.exports = List
