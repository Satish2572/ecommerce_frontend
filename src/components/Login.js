import React,{useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const naviagte = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            naviagte("/");
        }
    });
    const handleLogin= async()=>{
        console.log(email,password);
        let result = await fetch("http://localhost:5000/login",{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type' : 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if(result.token){
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.token));
            naviagte('/')
        }
        else{
            alert("Please Enter Valid Credential!!");
        }
    }
    return (
        <div className='login'>
            <h1>Login Page</h1>
            <input type='email' className='inputBox' placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' className='inputBox' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={ handleLogin } className="appButtom" type="button"  >Login</button>
        </div>
    );
}

export default Login;