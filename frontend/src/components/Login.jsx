import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { googleThunk, invokeAlert1, loginThunk } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import GoogleSignInButton from './ContinueGoogle';
import BtnPrimary from './Buttons/BtnPrimary';
import InputBox from './InputBox';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()
  //handles the input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  //handles from submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.email==="" || formData.password==="")
    {
        dispatch(invokeAlert1({message:"Please fill details to continue", type:"notok"}))
        return;
    }
    dispatch(loginThunk({formData, navigate, dispatch}))
  };
  const onSuccess=(response)=>{
    console.log(response)
    const formData = {
        token:response.credential
    }
    dispatch(googleThunk({formData,navigate,dispatch}))
  };
  const onFailure=(err)=>{
    dispatch(invokeAlert1({message:err.message, type:"notok"}))
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className='flex flex-col items-start'>
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">Login</h2>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border-2 border-blue-500">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          <InputBox handleChange={handleChange} label={"Email"} name={"email"} type={"email"} value={formData.email}/>
          </div>
          <div className="mb-4">
          <InputBox handleChange={handleChange} label={"Password"} name={"password"} type={"password"} value={formData.password}/>
          </div>
          <BtnPrimary  text={"Login"}/>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
        <div className="flex items-center justify-center mt-2">

        <GoogleSignInButton onFailure={onFailure} onSuccess={onSuccess}/>
        </div>
      </div>
      </div>
    </div>
  );
};

export default LoginForm;
