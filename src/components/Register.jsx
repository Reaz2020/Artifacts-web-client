import { useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider"; // Assuming you have AuthProvider
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { updateProfile } from "firebase/auth"; // Make sure updateProfile is imported
import { auth } from '../firebase/firebase.config'; // Import the auth object
import { Link } from "react-router-dom";

const Register = () => {
    const { user, createUser, setUser } = useContext(AuthContext); // Assuming `createUser` and `setUser` are in context
    const [error, setError] = useState('');
    const [name, setName] = useState(''); // State for name
    const [photoURL, setPhotoURL] = useState(''); // State for photo URL
    const navigate = useNavigate();

    // Password validation function
    const validatePassword = (password) => {
        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(password); // Check for uppercase
        const hasLowerCase = /[a-z]/.test(password); // Check for lowercase
        const isLongEnough = password.length >= minLength;

        if (!hasUpperCase || !hasLowerCase || !isLongEnough) {
            return "Password must have an uppercase letter, a lowercase letter, and be at least 6 characters long.";
        }
        return null; // Return null if all conditions are met
    };

    // Handle form submission
    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // Validate password
        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError); // Set error message
            Swal.fire({
                title: 'Password Validation Failed!',
                text: passwordError,  // Show password validation error
                icon: 'error', // 'error' is the correct icon name
                confirmButtonText: 'Retry'
            });
            return;
        }

        try {
            // Call createUser function to create a new user
            const result = await createUser(email, password);

            // Update user profile if name or photo URL are provided
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: name || result.user.displayName, // Set provided name or Firebase name
                    photoURL: photoURL || result.user.photoURL,  // Set provided photo URL or Firebase photo URL
                });
            }

            // Optionally set the user in the context
            const userToSet = {
                email: result.user.email,
                displayName: name || result.user.displayName || 'New User',
                photoURL: photoURL || result.user.photoURL || 'https://example.com/default-photo.jpg',
            };
            setUser(userToSet);

            // Show success message
            Swal.fire({
                title: 'Registered successfully!',
                text: `Welcome, ${result.user.displayName || 'To our Atlas'}!`,
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Redirect to home page after successful registration
            navigate('/');

        } catch (error) {
            setError(error.message); // Set error state
            Swal.fire({
                title: 'Oops!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Retry'
            });
        }
    };

    return (
        <div className="p-8 bg-purple-400" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
                background: '#6b46c1',
                padding: '40px 30px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                width: '350px',
                height: '600px', // Increased height to accommodate more fields
                textAlign: 'center',
                color: '#fff'
            }}>
            <h2>
                 Already Registered? {' '}
                 <Link className="text-red-500" to="/login" >
                       Login
                  </Link>
              </h2>

                <form onSubmit={handleRegister}>
                    <label htmlFor="name">Name (Optional):</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-2 rounded-md text-black"
                        style={{
                            borderBottom: '2px solid #fff',
                            padding: '10px',
                            width: '100%',
                            marginBottom: '15px',
                        }}
                    />

                    <label htmlFor="photoURL">Photo URL (Optional):</label>
                    <input
                        type="text"
                        id="photoURL"
                        name="photoURL"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        className="border-2 rounded-md text-black"
                        style={{
                            borderBottom: '2px solid #fff',
                            padding: '10px',
                            width: '100%',
                            marginBottom: '15px',
                        }}
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="border-2 rounded-md text-black"
                        style={{
                            borderBottom: '2px solid #fff',
                            padding: '10px',
                            width: '100%',
                            marginBottom: '15px',
                        }}
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="border-2 rounded-md text-black"
                        style={{
                            borderBottom: '2px solid #fff',
                            padding: '10px',
                            width: '100%',
                            marginBottom: '15px',
                        }}
                    />

                    {error && (
                        <p style={{
                            color: 'red',
                            fontSize: '14px',
                            marginTop: '10px'
                        }}>
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            cursor: 'pointer',
                            background: '#4c1d95',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            width: '100%',
                            marginTop: '20px'
                        }}
                    >
                        Register
                    </button>
                </form>
            </div>
           



        </div>
    );
};

export default Register;
