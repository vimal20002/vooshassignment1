import express from 'express';
const router = express.Router();
import Todo from '../models/todoModel.js';

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.userId });
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new todo
router.post('/', async (req, res) => {
    console.log(req.user)
    const dt = new Date()
    const time = dt.toUTCString()
    console.log(time)
    const todo = new Todo({...req.body, userId:req.user.userId, time, column:"todo"});
    try {
        const newTodo = await todo.save();
        res.status(201).json({message:"Added"});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a single todo
router.get('/:id', getTodo, (req, res) => {
    res.status(200).json(req.todo);
});

// Update a todo
router.patch('/:id', getTodo, async (req, res) => {
    console.log(req.body)
    try {
    if (req.body.edit) {
        console.log('here')
        req.todo.title = req.body?.title;
        req.todo.description = req.body?.description;
        await req.todo.save();
        res.status(204).json({message:"Updated !"});
    }
    else if (req.body.status) {
        console.log('here1')
        req.todo.column = req.body.status;
        console.log(req.todo)
        await req.todo.save();
        res.status(204).json({message:"Updated !"});

    }
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a todo
router.delete('/:id', getTodo, async (req, res) => {
    try {
        console.log(req.todo)
        await Todo.deleteOne({ _id: req.todo._id }); // Use deleteOne
        res.status(200).json({ message: 'Deleted Todo' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get a single todo by ID
async function getTodo(req, res, next) {
    let todo;
    console.log(req.params.id)
    try {
        todo = await Todo.findOne({ _id: req.params.id, userId: req.user.userId });
        if (todo == null) {
            return res.status(404).json({ message: 'Cannot find todo' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    console.log(todo)
    req.todo = todo;
    next();
}

export default router;
