import React, { useEffect, useState } from 'react'
import BtnDanger from './Buttons/BtnDanger'
import BtnSecondary from './Buttons/BtnSecondary'
import BtnPrimarySm from './Buttons/BtnPrimarySm'
import { useDispatch } from 'react-redux'
import { deleteTodoThunk, getAllTodosThunk, getTodoThunk, updateTodoThunk } from '../redux/features/todoSlice'
import TodoLarge from './TodoLarge'

const TodoCard = ({ provided, snapshot, item, openBox }) => {
    const [isDetails, setIsDetails]=useState(false)
    const dispatch = useDispatch()
    // useEffect(()=>{
        console.log(item,"fgdg")
    // },[item])
    const handleDelete=()=>{
        const formData ={
            todoId:item?._id
        }
        dispatch(deleteTodoThunk({formData, dispatch}))
        dispatch(getAllTodosThunk(dispatch))
    }
    const handleEdit=()=>{
        const formData ={
            todoId:item?._id
        }
        dispatch(getTodoThunk({formData}))
        openBox()
    }
    const handleView=()=>{
        setIsDetails(true)
    }
    return (
        <>
{        isDetails && <TodoLarge onClose={()=>{setIsDetails(false)}} task={item}/>
}        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            id={item?.title}
            className={`p-2 mb-2 bg-white flex flex-col justify-start items-start text-black rounded-lg ${snapshot.isDragging ? 'shadow-lg' : 'shadow'}`}
            >
            <h2 className='font-semibold text-xl'>
            {item?.title}
            </h2>
            <p className='text-lg'>{item?.description}</p>
            <p className='mt-5'>Created At : {item?.time}</p>
            <div className="flex justify-end items-end gap-2 mt-2">
                <BtnDanger handleClick={handleDelete} text={"Delete"}/>
                <BtnSecondary handleClick={handleEdit} text={"Edit"}/>
                <BtnPrimarySm handleClick={handleView} text={"View Details"}/>
            </div>
        </div>
            </>
    )
}

export default TodoCard