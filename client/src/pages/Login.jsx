import { useState } from 'react';
import axios from 'axios'


function Login(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    async function handleSubmit(e){
        e.preventDefault();
        const data = {
            email : email,
            password : password
        }
        const res = await axios.post("http://localhost:5000/login", data);
        console.log(res);
        if(res.data.status==='ok'){
            if (res.data.token) {
              localStorage.setItem("x-access-token", res.data.token);
              window.location.href='/user'
            }
        }
        else{
            alert(`${res.data.message}`)
        }
        setEmail('')
        setPassword('')
    }

    return (
      <div>
        <h1>Login</h1>
        <form className="login" onSubmit={handleSubmit}>
          Email :{" "}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          Password :{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button>Submit</button>
        </form>
      </div>
    );
}

export default Login