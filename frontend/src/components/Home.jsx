import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getAllTodosThunk, updateTodoThunk } from '../redux/features/todoSlice';
import { useNavigate } from 'react-router-dom';
import BtnPrimary from './Buttons/BtnPrimary';
import AddTodoPopup from './AddTodoPopup';
import DragTodo from './DragTodo';
import { debounce } from 'lodash';


const template = {
  todo: {
    name: 'Todo',
    items: []
  },
  inProgress: {
    name: 'In Progress',
    items: []
  },
  done: {
    name: 'Done',
    items: []
  }
};

const Home = () => {
  const [columns, setColumns] = useState(template);
  const [selectedOption, setSelectedOption] = useState('select');
  const [isOpen, setIsOpen] = useState(false)
  const [todoList, setTodoList] =useState(0)

  const [cnt, setCnt] =useState(0)
  const [query, setQuery] = useState('');
  const {todos} = useSelector((state)=>(state.todos))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const closeBox = ()=>{
    setIsOpen(false)
  }
  const openBox = ()=>{
    setIsOpen(true)
  }
  const sortTodosByMostRecent = (todosList) => {
    return [...todosList].sort((a, b) => new Date(b.time) - new Date(a.time));
  };
  const sortTodosAlphabetically = (todosList) => {
    // Create a copy of the array before sorting
    return [...todosList].sort((a, b) => a.title.localeCompare(b.title));
  };
  
  const handleDropDown = (event) => {
    const type = event.target.value;
    setSelectedOption(type);
    console.log(type)
    if(type === "recent")
    {
        const sortedTodos = sortTodosByMostRecent(todoList);
        setTodoList(sortedTodos)
    }
    else if(type === "name")
    {
        const sortedTodos = sortTodosAlphabetically(todoList);
        setTodoList(sortedTodos)
        console.log(sortedTodos)
    }
    
  };
  useEffect(()=>{
    setTodoList(todos)
  },[todos])
  useEffect(()=>{
    if(todoList?.length)
    {
        template.todo.items = todoList.filter((item)=>{
            return item?.column === "todo";
        })
        template.inProgress.items = todoList.filter((item)=>{
           return  item?.column === "inprogress";
        })
        template.done.items = todoList.filter((item)=>{
            return item?.column === "done";
        })
        console.log(template)
        setColumns(template)
        setCnt(cnt+1)
    }
    console.log(todoList)
  },[todoList])
  useEffect(()=>{
    dispatch(getAllTodosThunk({dispatch}))
  },[])
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceColumn = columns[source.droppableId];
    const todoId = sourceColumn?.items[source?.index]?._id
    console.log(destination.droppableId,"hhhhh")
    const formData = {
        todoId,
        status:destination?.droppableId?.toLowerCase()
    }
    dispatch(updateTodoThunk({formData,navigate,dispatch}))
    if (source.droppableId !== destination.droppableId) {
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };


  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      const elem = document.getElementById(searchTerm);
      if(elem)
      {
        elem.style.transition="0.8s ease-in-out"
        elem.style.transform="scale(1.1)"
        setTimeout(()=>{

            elem.style.transform="scale(1)"
        },1000)

      }
    }, 300), // 300ms delay
    []
  );
  const handleChangeSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-start gap-4 justify-start p-4">
        {isOpen && <AddTodoPopup isOpen={isOpen} onClose={closeBox}/>}
        <BtnPrimary handleClick={openBox} text={"Add Todo"}/>
        <div className="w-full flex justify-between items-between p-3 bg-white rounded-lg">
            <div className='flex gap-4 items-center'>
                <label htmlFor="srch">Search</label>
                <input type="text" className='shadow-grey shadow-lg max-w-2xl rounded outline-none px-3 py-1' placeholder='Search...' value={query} onChange={(e)=>handleChangeSearch(e)}/>
            </div>
            <select 
        value={selectedOption} 
        onChange={handleDropDown} 
        className="px-4 py-2 border rounded-lg"
      >
        <option value="select">Select</option>
        <option value="recent">Recent</option>
        <option value="name">Name</option>
      </select>
            
        </div>
        <DragTodo columns={columns} onDragEnd={onDragEnd} openBox={openBox}/>
    </div>
  );
};

export default Home;
