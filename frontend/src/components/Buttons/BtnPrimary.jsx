import React from 'react'

const BtnPrimary = ({text, handleClick}) => {
    return (
        <button onClick={handleClick} type="submit" className="w-64 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            {text}
        </button>
        
    )
}

export default BtnPrimary
