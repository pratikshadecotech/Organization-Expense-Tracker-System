import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../Expense/Expense.css";
import Navbar from '../Navbar/Navbar.js';
import { Modal } from 'antd';

const Expense = ({ expense }) => {
    const [showModal, setShowModal] = useState(false)

    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {

                const response = await axios.get('http://localhost:8080/api/v1/expenses'); // Replace with your API endpoint
                setExpenses(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, []);

    return (
        <>

            <Navbar />
            <div>
                <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add New</button>
            </div>
            <div className="expenses-list">
                <div className="expense-item" style={{ marginBottom: '10px' }}>
                    <div className="expense-date">Date</div>
                    <div className="expense-description">Description</div>
                    <div className="expense-category">Category</div>
                    <div className="expense-amount">Amount</div>
                </div>
            </div>
            <div className="expenses-list">
                {expenses.length === 0 ? (
                    <p>No expenses found.</p>
                ) : (
                    expenses.getExpenses.map(expense => (

                        <div className="expense-item" key={expense.id} style={{ marginBottom: '10px' }}>
                            <div className="expense-date">{expense.date}</div>
                            <div className="expense-description">{expense.description}</div>
                            <div className="expense-category">{expense.category}</div>
                            <div className="expense-amount">${expense.total}</div>
                        </div>
                    )))}

            </div>

            <Modal title="Add Expenses" visible={showModal} onCancel={() => setShowModal(false)} footer={false}>
                <h1>hello</h1>
            </Modal>
        </>

    )
}

export default Expense