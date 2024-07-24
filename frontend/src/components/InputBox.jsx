import React from 'react'

const InputBox = ({label, type, name, value, handleChange}) => {
  return (
    <>
    <label className="block text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              placeholder={label}
              value={value}
              onChange={handleChange}
              className="w-64 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
    </>
  )
}

export default InputBox