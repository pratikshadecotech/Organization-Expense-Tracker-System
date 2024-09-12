import logo from './logo.svg';
import './App.css';
import RegisterForm from '../src/components/User/RegisterForm.js';
import LoginForm from './components/User/Login.js';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar/Navbar.js';
import Logout from './components/User/Logout.js';
import Expense from './components/Expense/Expense.js';
import Income from './components/Income/Income.js';
import Feedback from './components/Feedback/Feedback.js';
import HomePage from './components/HomePage/HomePage.js';

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/income" element={<Income />} />
        <Route path="/feedback" element={<Feedback />} />
        {/* Add more routes here */}
      </Routes >

    </>

  );
}

export default App;
