import {useState} from 'react'
import axios from 'axios'

function Register(){
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState("");


    async function handleSubmit(e){
        e.preventDefault();
        const data ={
            username : name,
            email : email,
            password : password,
        }
        const res = await axios.post("http://localhost:5000/register", data);
        console.log(res);
        if(res.data.status==='ok'){
            window.location.href='/login';
        }
        else{
            alert('Email already exists')
        }
    }

    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button>Submit</button>
        </form>
      </div>
    );
}

export default Register;