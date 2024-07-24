import React, { useEffect } from 'react';
import BtnPrimarySm from './Buttons/BtnPrimarySm';

const TodoLarge = ({ task, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white p-6 rounded-lg shadow-lg  text-black">
        <h2 className="text-2xl font-bold mb-4">{task?.title}</h2>
        <p className="mb-4">{task?.description}</p>
        <p className="mb-4"><strong>Created at:</strong> {task?.time}</p>
        <div className='flex items-end justify-end'>

        <BtnPrimarySm handleClick={onClose} text={"Close"}/>
        </div>
      </div>
    </div>
  );
};

export default TodoLarge;
