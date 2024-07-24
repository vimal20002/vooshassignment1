import React, { useState, useRef, useEffect } from 'react';
import BtnPrimary from './Buttons/BtnPrimary';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoThunk, getAllTodosThunk, updateTodoThunk } from '../redux/features/todoSlice';
import { useNavigate } from 'react-router-dom';

const AddTodoPopup = ({ isOpen, onClose }) => {
    const {todo} = useSelector((state)=>(state.todos))
  const [formData, setFormData] = useState({
    title: todo?.title,
    description: todo?.description
  });

  const popupRef = useRef(null);
  const dispatch = useDispatch()

  useEffect(()=>{
    //on change of todo , sets the todo array
    setFormData({
        title: todo?.title,
        description: todo?.description
      });
  }, [todo])

  //handles the input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
const navigate = useNavigate()

// handles the submission of todo
  const handleSubmit = (e) => {
    e.preventDefault();
    if(todo)
    {
        const formData1 ={
            ...formData,
            todoId:todo._id,
            edit:true
        }
        dispatch(updateTodoThunk({formData:formData1, navigate, dispatch}))
        setTimeout(()=>{
            dispatch(getAllTodosThunk({dispatch}))
        },1000)
        onClose()
    }
    else
    {
    console.log('Form submitted:', formData);
    // Handle form submission logic here
    formData.column="todo";
    dispatch(addTodoThunk({formData, onClose, dispatch}))
    dispatch(getAllTodosThunk({dispatch}))
    }
  };

  //helps in removing the popups
  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-25">
      <div ref={popupRef} className="bg-white p-4 rounded-lg shadow-md w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">Add Todo</h2>
        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-64 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-64 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <BtnPrimary text={"Add"}/>
        </form>
      </div>
    </div>
  );
};

export default AddTodoPopup;
