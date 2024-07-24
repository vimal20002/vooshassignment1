import React from 'react'

const BtnSecondary= ({text, handleClick}) => {
    return (
        <button onClick={handleClick}  className="bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300">
            {text}
        </button>)
}

export default BtnSecondary