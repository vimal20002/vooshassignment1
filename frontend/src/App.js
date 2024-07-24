import './App.css';
import AlertBox from './components/AlertBox';
import Home from './components/Home';
import LoginForm from './components/Login';
import Navbar from './components/Navbar';
import SignupForm from './components/Signup';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <>
    <Navbar/>
    <AlertBox/>
    <Routes>
      <Route exact path='/signup' element={<SignupForm/>}/>
      <Route exact path='/login' element={<LoginForm/>}/>
      <Route exact path='/' element={<Home/>}/>
    </Routes>
    </>
  );
}

export default App;
