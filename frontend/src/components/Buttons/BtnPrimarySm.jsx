import React from 'react'

const BtnPrimarySm = ({handleClick, text}) => {
  return (
<button onClick={handleClick} type="submit" className=" bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300">
            {text}
        </button>  
        )
}

export default BtnPrimarySm