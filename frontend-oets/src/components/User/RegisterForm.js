import React, { useState, useEffect } from 'react';
import '../User/Register.css'
import Navbar from '../Navbar/Navbar.js';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Modal from '../Modal.js'; // Import the Modal component
import { set } from 'mongoose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Footer from '../Footer/Footer.js';


const RegistrationForm = () => {

    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [editable, setEditable] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        } else {
            setError('');
            // Handle successful form submission
            console.log('Form submitted successfully');
        }

        console.log('hello')
        // Handle form submission logic here
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            console.log(editable);
            if (editable) {
                await axios.post(
                    "http://localhost:8080/api/v1/update-user",
                    {
                        payload: { ...formData, userId: user._id },
                        transactionId: editable._id,
                    }
                );
                setLoading(false);
                setError("transection updated successfully");
            } else {

                await axios.post("http://localhost:8080/api/v1/register", formData, {
                    headers: {
                        'Content-Type': 'application/json',

                    },
                });
            }

            //clear form inputs
            setFormData({
                name: "",
                lastname: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            closeModal();
            navigate('/register');

            // Refresh the page (optional, based on your requirement)
            window.location.reload();
        } catch (error) {
            console.log(error);
        }

    };

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {

                const response = await axios.get('http://localhost:8080/api/v1/users'); // Replace with your API endpoint
                setUsers(response.data);
                console.log(response)
                return
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);


    const handleDelete = async (record) => {
        try {
            setLoading(true);
            await axios.post(
                "http://localhost:8080/api/v1/delete-user",
                { transactionId: record._id }
            );
            setLoading(true);
            setError("User deleted successfully");
            window.location.reload();

        } catch (error) {
            setLoading(false);
            setError("unable to delete");
        }
    };

    const fetchUserData = async (record) => {
        try {
            // Simulate an API call to fetch user data

            axios.post("http://localhost:8080/api/v1/user",
                { transactionId: record._id }
            )
                .then(res => setFormData(res.data.user))
                .catch(err => console.log(err))

            console.log(setFormData);
        } catch (err) {
            console.error('Failed to fetch user data', err);
            setError('Failed to fetch user data');
        }
    };



    return (
        <>
            <Navbar />
            <div>
                <button className="btn btn-primary" style={{ marginLeft: '1200px' }} onClick={openModal}>Register User</button>

            </div>

            <div className="users-list">
                <div className="user-item" style={{
                    marginBottom: '10px', color: '#fff',
                    backgroundColor: '#CDDC39', textAlign: 'center'
                }}>
                    <div className="expense-date">Name</div>
                    <div className="expense-description">Last Name</div>
                    <div className="expense-category">Email</div>
                    <div className="expense-category">Role</div>
                    <div className="expense-amount">Action</div>

                </div>
            </div>
            <div className="users-list">
                {users.length === 0 ? (
                    <p>No Users found.</p>
                ) : (
                    users.users.map(user => (

                        <div className="expense-item" key={user.id} style={{ marginBottom: '10px' }}>
                            <div className="expense-date">{user.name}</div>
                            <div className="expense-description">{user.lastname}</div>
                            <div className="expense-category">{user.email}</div>
                            <div className="expense-amount">{user.role}</div>
                            <div><span onClick={() => {
                                handleDelete(user);
                            }}> <FontAwesomeIcon icon={faTrash} />
                            </span> &nbsp;

                                <span onClick={() => {
                                    fetchUserData(user);
                                    setEditable(user);
                                    openModal(true);
                                }}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </span>

                            </div>

                        </div>
                    )))}

            </div>

            <div>

                <Modal isOpen={isModalOpen} onClose={closeModal} >
                    <div className=" ">
                        <form onSubmit={handleSubmit} initialValues={editable}>

                            <div style={{ textAlign: 'center', fontSize: "24px", marginBottom: "1px" }}>Register Form</div>
                            <div className="form-body form-body-register">
                                <div className="username">
                                    <label className="form__label" for="firstName">First Name </label>
                                    <input className="form__input" name="name" type="text" id="firstName" placeholder="First Name" value={formData.name}
                                        onChange={handleChange} />
                                </div>
                                <div className="lastname">
                                    <label className="form__label" for="lastName">Last Name </label>
                                    <input type="text" name="lastname" id="lastName" className="form__input" placeholder="LastName" value={formData.lastname}
                                        onChange={handleChange} />
                                </div>
                                <div className="email">
                                    <label className="form__label" for="email">Email </label>
                                    <input type="email" name="email" id="email" className="form__input" placeholder="Email" value={formData.email}
                                        onChange={handleChange} />
                                </div>
                                <div className="password">
                                    <label className="form__label" for="password">Password </label>
                                    <input className="form__input" name="password" type="password" id="password" placeholder="Password" value={formData.password}
                                        onChange={handleChange} />
                                </div>
                                <div className="confirm-password">
                                    <label className="form__label" for="confirmPassword">Confirm Password </label>
                                    <input className="form__input" name="confirmPassword" type="password" id="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword}
                                        onChange={handleChange} />
                                </div>
                            </div>

                            {error && <p style={{ color: 'red' }}>{error}</p>}

                            <div class="footer-btn" style={{ marginTop: "2px" }}>
                                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-dark btn-lg btn-block" type="submit">Submit</button>

                            </div>
                        </form>

                    </div >
                </Modal>
            </div>
            <Footer />

        </>
    )
}
export default RegistrationForm;
