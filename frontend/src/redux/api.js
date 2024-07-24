import axios from 'axios';

const API=axios.create({baseURL: 'http://localhost:7000'});

export const register=(formData)=>{
    return API.post('/auth/signup',formData);
}


export const login=(formData)=>{
    return API.post('/auth/login',formData)
}
export const continuwWithGoogleApi=(formData)=>{
    return API.post('/auth/google',formData)
}

export const getTodosApi=()=>{
    const token = localStorage?.getItem('token');  
    return API.get(`/todos`,{
        headers: {
            Authorization: token ? `${token}` : '',
            "Content-Type": 'application/json'
          },
          
    })
}

export const getTodoApi=(formData)=>{
    const token = localStorage?.getItem('token');  
    return API.get(`/todos/${formData?.todoId}`,{
        headers: {
            Authorization: token ? `${token}` : '',
            "Content-Type": 'application/json'
          },
          
    })
}



export const updateTodoApi=(formData)=>{
    const token = localStorage?.getItem('token');  
    console.log(token, formData)
    return API.patch(`/todos/${formData?.todoId}`,formData,{
        headers: {
            Authorization: token ? `${token}` : '',
            "Content-Type": 'application/json'
          },
          
    })
}

export const addTodoApi=(formData)=>{
    const token = localStorage?.getItem('token');  
    return API.post('/todos',formData,{
        headers: {
            Authorization: token ? `${token}` : '',
            "Content-Type": 'application/json'
          },
    })
}        

export const deleteTodoApi=(formData)=>{
    const token = localStorage?.getItem('token');  
    return API.delete(`/todos/${formData?.todoId}`,{
        headers: {
            Authorization: token ? `${token}` : '',
            "Content-Type": 'application/json'
          },
          
    })
}


