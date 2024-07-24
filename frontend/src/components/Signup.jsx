

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { googleThunk, invokeAlert1, registerThunk } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import GoogleSignInButton from './ContinueGoogle';
import BtnPrimary from './Buttons/BtnPrimary';
import InputBox from './InputBox';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmPassword: ''
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

//handles the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.email==="" || formData.password==="" || formData.confirmPassword==="")
    {
        dispatch(
            invokeAlert1({message:"Please Fill Stared Feilds !", type:"notok"})
        )
        return
    }
    if(formData.password !== formData.confirmPassword)
    {
        dispatch(
            invokeAlert1({message:"Password Did't Matched !", type:"notok"})
        )
        return
    }
    dispatch(registerThunk({formData,navigate, dispatch}))
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
        <div className="inline-flex flex-col items-start">       
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-2 mt-2">Sign Up</h2>
      <div className="mb-3 bg-white p-8 rounded-lg shadow-md w-full max-w-md border-2 border-blue-500">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <InputBox handleChange={handleChange} label={"First Name"} name={"fname"} type={"text"} value={formData.fname}/>
          </div>
          <div className="mb-4">
          <InputBox handleChange={handleChange} label={"Last Name"} name={"lname"} type={"text"} value={formData.lname}/>
          </div>
          <div className="mb-4">
          <InputBox handleChange={handleChange} label={"Email"} name={"email"} type={"email"} value={formData.email}/>
          </div>
          <div className="mb-4">
          <InputBox handleChange={handleChange} label={"Password"} name={"password"} type={"password"} value={formData.password}/>
          </div>
          <div className="mb-4">
          <InputBox handleChange={handleChange} label={"Confirm Password"} name={"confirmPassword"} type={"password"} value={formData.confirmPassword}/>
          </div>
          <BtnPrimary text={"SignUp"}/>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
        <div className='flex items-center justify-center mt-2'>
        <GoogleSignInButton onFailure={onFailure} onSuccess={onSuccess}/>
        </div>
      </div>
      </div>

    </div>
  );
};

export default SignupForm;
