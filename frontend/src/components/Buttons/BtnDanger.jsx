import React from 'react'

const BtnDanger = ({text,handleClick}) => {
  return (
    <button onClick={handleClick} type="submit" className="bg-red-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300">
            {text}
        </button>)
  
}

export default BtnDanger