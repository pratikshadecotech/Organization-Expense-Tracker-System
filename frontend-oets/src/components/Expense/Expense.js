import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../Expense/Expense.css";
import Navbar from '../Navbar/Navbar.js';
import Modal from '../Modal.js'; // Import the Modal component
import { useNavigate } from 'react-router-dom';

const Expense = ({ expense }) => {

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        date: '',
        category: '',
        total: ''
    });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //form handling
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Handle form submission logic here
        try {

            const requestData = new FormData();
            requestData.append("description", formData.description);
            requestData.append("date", formData.date);
            requestData.append("category", formData.category);
            requestData.append("total", formData.total);
            console.log(requestData);
            const response = await axios.post("http://localhost:8080/api/v1/add-expense", requestData, {
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            console.log('Success:', response.data);

            //clear form inputs
            setFormData({
                email: "",
                password: "",
            });
            closeModal();
            navigate('/expense');

            // Refresh the page (optional, based on your requirement)
            window.location.reload();
        } catch (error) {
            console.log(error);
        }

    };

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
                <button className="btn btn-primary" onClick={openModal}>Add Expense</button>

            </div>
            <div className="expenses-list">
                <div className="expense-item" style={{
                    marginBottom: '10px', color: '#fff',
                    backgroundColor: '#ffc107', textAlign: 'center'
                }}>
                    <div className="expense-date">Date</div>
                    <div className="expense-description">Description</div>
                    <div className="expense-category">Category</div>
                    <div className="expense-amount">Amount</div>
                    <div className="expense-amount">Action</div>

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
                            <div className="expense-amount">{expense.total}</div>
                            <div></div>
                        </div>
                    )))}

            </div>

            <div>


                <Modal isOpen={isModalOpen} onClose={closeModal} >
                    <h2>Add Expense</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Description</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Total</label>
                            <input
                                type="number"
                                name="total"
                                value={formData.total}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button className="btn btn-primary" type="submit" style={{ width: '100px', marginLeft: '170px' }}>Submit</button>
                    </form>
                </Modal>

            </div >
        </>

    )
}

export default Expense