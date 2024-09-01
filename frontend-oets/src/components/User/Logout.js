import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem('authToken');

        // Redirect to login page
        navigate('/');
    };

    React.useEffect(() => {
        handleLogout();
    }, [navigate]);

    return (
        <div>Logging out...</div>
    )
}

export default Logout