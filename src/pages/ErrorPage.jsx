import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const ErrorPage = () => {
    const navigate = useNavigate(); // Hook to get the navigate function

    // Handle going back to homepage
    const handleGoHome = () => {
        navigate('/'); // Navigates to the homepage
    };

    return (
        <div className="text-center my-36 text-3xl">
            <div className='text-6xl'>
                We HaVE nOthing here  ❌ 404 
            </div>
            <button
                onClick={handleGoHome}
                className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Go to Homepage
            </button>
        </div>
    );
}

export default ErrorPage;
