// Navbar.jsx
import React, { useEffect, useState } from 'react';
import { FaTasks } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/features/userSlice';
const Navbar = () => {
    const {token, user} = useSelector((state)=>state.user) 
    const [isLoggedIn, setIsLoggedIn]=useState(false)
    const [imgUri, setImgUri]=useState("")
    const [fname, setFname]=useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(()=>{
        if(token)
            setIsLoggedIn(true)
        else
            setIsLoggedIn(false)
        if(user && user.image)
        {
            setImgUri(user?.image)
            setFname(user?.fname)
        }
        console.log(token,user)
    },[token,user])
    useEffect(()=>{
        if(localStorage.getItem("token"))
        {
            setIsLoggedIn(true)
        }
        const data = localStorage.getItem("user")
        const user = JSON.parse(data)
        setFname(user?.fname)
    },[])
    useEffect(()=>{
        console.log(isLoggedIn)
    },[isLoggedIn])
    const handleLogout =()=>{
        setIsLoggedIn(false)
        dispatch(logout())
        navigate('/login')
    }
  return (
    <nav className="bg-[#3FA2F6] text-white flex items-center justify-between p-4">
      {/* Left Side: Todo Icon */}
      <Link to='/'>
      <div className="flex items-center">
        <FaTasks className="text-2xl mr-2" />
        <span className="text-xl font-semibold">Todo App</span>
      </div>
      </Link>
      
      {/* Right Side: Login and Signup */}
      {isLoggedIn ? 
      <div className='flex gap-2'>
        <div onClick={handleLogout} className="px-4 py-2 rounded hover:bg-white hover:text-[#3FA2F6] transition">Logout</div>
        {
            imgUri !=="" ?
            <img src={imgUri} alt="User" className='inline-block rounded-full w-10 h-10'/>
            :
            <span className='px-4 py-2 inline-block rounded-full bg-white text-blue-600 font-bold font-lg'>{fname?.slice(0,1)?.toUpperCase()}</span>
        }
        </div>
      :<div className="flex items-center space-x-4">
        <Link to="/login" className="px-4 py-2 rounded hover:bg-white hover:text-[#3FA2F6] transition">Login</Link>
        <Link to="/signup" className="px-4 py-2 rounded hover:bg-white hover:text-[#3FA2F6] transition">Signup</Link>
      </div>}
    </nav>
  );
};

export default Navbar;
