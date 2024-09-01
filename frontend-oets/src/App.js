import logo from './logo.svg';
import './App.css';
import RegisterForm from '../src/components/User/RegisterForm.js';
import LoginForm from './components/User/Login.js';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      {/* <LoginForm />
      <Navbar />
      <RegisterForm /> */}

      <Routes>
        <Route path="/home" element={<RegisterForm />} />
        <Route path="/" element={<LoginForm />} />
        {/* Add more routes here */}
      </Routes >

    </>

  );
}

export default App;
