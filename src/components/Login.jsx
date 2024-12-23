import { useContext} from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const Login = () => {
    const { user, loading, emailPasswordSignIn, googleSignIn,signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
  
      // Determine redirection route after successful login
  const handleNavigate = () => {
    navigate(location?.state || "/");
  };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        emailPasswordSignIn(email, password)
            .then(result => {
                console.log('sign in', result.user.email);

                // const user={email:email}

                // axios.post('http://localhost:1000/jwt',user,{withCredentials:true})
                // .then(res=>{
                //     console.log(res.data)
                // })

                Swal.fire({
                    title: 'Signed in successfully!',
                    text: `Welcome, ${result.user?.displayName|| 'To our atlas'}!`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                

               handleNavigate();
            })
            .catch(error => {
                console.error(error);
            
                Swal.fire({
                    title: 'Error!',
                    text: error.message,  // Show Firebase error message
                    icon: 'error',  // 'error' is the correct icon name
                    confirmButtonText: 'Retry'
                });
            });
    };

// Handle Google Sign-In
const handleGoogleSignIn = () => {
    googleSignIn()
        .then(result => {
            // console.log('sign in', result.user.email);
            Swal.fire({
                title: 'Google Signed in successfully!',
                text: `Welcome, ${result.user.displayName}!`,
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Create a user object with the email from Google sign-in
            const user = { email: result.user.email };

            // Send the user details to the backend
            // axios.post('http://localhost:1000/jwt', user, { withCredentials: true })
            //     .then(res => {
            //         console.log(res.data); // Handle the response data from backend
            //     })
             

            // Handle navigation after successful Google sign-in
            handleNavigate();
        })
        .catch(error => {
            console.error("Google sign-in failed:", error); // Handle any errors during Google sign-in
        });
};


    return (
        <div className="border-4 p-8 gap-6 bg-purple-300" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', 
      
         
        }}>
            <div className="bg-purple-500 p-8" style={{
                
                padding: '40px 30px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                width: '350px',
                height: '500px',
                textAlign: 'center',
                color: '#fff'
            }}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input className="border-2 rounded-md text-black"
                        type="email"
                        id="email"
                        name="email"
                        required
                   
                        style={{
                         
                   
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
                       
                       
                            padding: '10px',
                            width: '100%',
                            marginBottom: '15px',
                       
                     
                 
                        }}
                    />

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
                        {user? 'logged in' : 'Login'}
                    </button>
                </form>

                {/* Google Sign-In Button */}
                <button
                    onClick={handleGoogleSignIn}
                    style={{
                        padding: '10px 20px',
                        cursor: 'pointer',
                        background: '#4285F4',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        width: '100%',
                        marginTop: '15px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    Sign in with Google
                </button>

                {user && (
                    <p style={{ marginTop: '20px', color: '#fff' }}>
                        Welcome, {user.email}!
                    </p>
                )}
                  <NavLink to="/register">
                <button>Register</button>
              </NavLink>
            </div>
           
            
        </div>
           );
}

export default Login;
