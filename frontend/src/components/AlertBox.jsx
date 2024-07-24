import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetAlert1 } from '../redux/features/userSlice';
import { resetAlert2 } from '../redux/features/todoSlice';

const AlertBox = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("")
  const [type, setType] = useState("")
  const {alertType1, alertMessage1} = useSelector((state)=>state.user) 
  const {alertType2, alertMessage2} = useSelector((state)=>state.todos) 
  const dispatch = useDispatch()
  useEffect(()=>{
    console.log(alertMessage1,alertType1,alertMessage2,alertType2)
    if(alertMessage1 !== null){
        console.log('s')
        setMessage(alertMessage1)
        setType(alertType1)
        setVisible(true)
        dispatch(resetAlert1())
    }
    else if(alertMessage2 !== null){
        console.log('r')
        setMessage(alertMessage2)
        setType(alertType2)
        setVisible(true)
        dispatch(resetAlert2())
    }
  },[alertMessage1,alertMessage2])
useEffect(()=>{
    console.log(message)
},[message])
  useEffect(() => {
    if (visible) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 100 / 50, 100));
      }, 100);

      const timer = setTimeout(() => {
        setVisible(false);
        clearInterval(interval);
      }, 5000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [visible]);

  // Styling with only blue-900 and text-white
  const alertStyles = type ==="ok"?`bg-blue-900 text-white`:`bg-red-400 text-white`;

  return (
    visible && (
      <div className="fixed top-12 mt-8 left-1/2 transform -translate-x-1/2 w-72 p-4 rounded-lg  z-50">
        <div className={`flex flex-col justify-between p-2 rounded-lg ${alertStyles} transition-all duration-150 ease-in-out`}>
          <div className="flex justify-between items-center">
            <span className="font-semibold">{message}</span>
            <button
              onClick={() => setVisible(false)}
              className="ml-4 text-2xl font-semibold"
            >
              &times;
            </button>
          </div>
          <div className="relative w-full h-1 bg-blue-800">
            <div
              className="absolute top-0 left-0 bg-white h-full"
              style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
            ></div>
          </div>
        </div>
      </div>
    )
  );
};

export default AlertBox;
