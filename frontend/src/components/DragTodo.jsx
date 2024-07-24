import React from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TodoCard from './TodoCard';
const DragTodo = ({onDragEnd, columns, openBox}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-16 w-full max-w-5xl justify-between">
      {Object.entries(columns).map(([columnId, column]) => (
        <div key={columnId} className="bg-blue-500 text-white p-4 rounded-lg flex-1">
          <h2 className="text-xl font-bold mb-4">{column.name}</h2>
          <Droppable droppableId={columnId}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-lg ${snapshot.isDraggingOver ? 'bg-blue-300' : 'bg-blue-500'}`}
              >
                {column.items.map((item, index) => {
                  return <Draggable key={item._id} draggableId={item._id} index={index}>
                    {(provided, snapshot) => (
                      <TodoCard openBox={openBox} provided={provided} snapshot={snapshot} item={item} />
                    )}
                  </Draggable>
})}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ))}
    </div>
  </DragDropContext>  )
}

export default DragTodo