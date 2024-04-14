const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status : String, 
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'Users' },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Tasks = mongoose.model('Tasks', TaskSchema);

module.exports = Tasks;