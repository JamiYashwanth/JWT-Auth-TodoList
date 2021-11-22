import './App.css';
import Login from './pages/Login';
import {Routes,Route} from 'react-router-dom';
import User from './pages/User';
import Register from './pages/Register';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
