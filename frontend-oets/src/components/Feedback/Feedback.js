import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../Expense/Expense.css";
import Navbar from '../Navbar/Navbar.js';
import Modal from '../Modal.js'; // Import the Modal component
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer.js';

const Feedback = ({ expense }) => {

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        feedback: '',

    });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        console.log(formData)
    };

    //form handling
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Handle form submission logic here
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            console.log('dfdfsd')
            console.log(user)
            const requestData = new FormData();
            requestData.append("feedback", formData.feedback);
            requestData.append("userid", user._id);

            console.log(requestData);
            const response = await axios.post("http://localhost:8080/api/v1/add-feedback", requestData, {
                headers: {
                    'Content-Type': 'application/json',

                },
            });
            console.log('Success:', response.data);

            //clear form inputs
            setFormData({
                feedback: "",
            });
            closeModal();
            navigate('/feedback');

            // Refresh the page (optional, based on your requirement)
            window.location.reload();
        } catch (error) {
            console.log(error);
        }

    };

    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {

                const response = await axios.get('http://localhost:8080/api/v1/feedbacks'); // Replace with your API endpoint
                setFeedbacks(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <>

            <Navbar />
            <div>
                <button className="btn btn-primary" onClick={openModal} style={{ marginLeft: '1141px ' }}>Add Feedback</button>

            </div>
            <div class="col-md-6" className="expenses-list">
                <div style={{ textAlign: 'center' }} className="expense-item" style={{
                    marginBottom: '10px', color: '#fff',
                    backgroundColor: '#CDDC39', textAlign: 'center', width: '50%'
                }}>
                    <div style={{ textAlign: 'center' }}>Feedback List</div>

                </div>
            </div>
            <div class="col-md-6" className="expenses-list">
                {feedbacks.length === 0 ? (
                    <p>No Feedbacks found.</p>
                ) : (
                    feedbacks.getFeedbacks.map(feedback => (

                        <div class="col-md-6" className="expense-item" key={feedback.id} style={{ marginBottom: '10px', width: '50%' }}>

                            <div className="">{feedback.feedback}</div>
                            <div className="">{feedback.user_id}</div>
                            <div></div>
                        </div>
                    )))}

            </div>

            <div>


                <Modal isOpen={isModalOpen} onClose={closeModal} >
                    <h2>Add Feedback</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Feedback</label>
                            <input
                                type="text"
                                name="feedback"
                                value={formData.feedback}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button className="btn btn-primary" type="submit" style={{ width: '100px', marginLeft: '170px' }}>Submit</button>
                    </form>
                </Modal>

            </div >

            <Footer />
        </>

    )
}

export default Feedback