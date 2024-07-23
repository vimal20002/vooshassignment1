import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    column: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    userId:{
            type: String,
            required: true
    }
});

export default mongoose.model('Todo', TodoSchema);
