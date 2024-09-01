import logo from './logo.svg';
import './App.css';
import RegisterForm from '../src/components/User/RegisterForm.js';
import LoginForm from './components/User/Login.js';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar/Navbar.js';

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Navbar />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Add more routes here */}
      </Routes >

    </>

  );
}

export default App;
