import { createContext,  useState,useEffect } from 'react';
import {  onAuthStateChanged,signOut,signInWithEmailAndPassword,createUserWithEmailAndPassword,
    signInWithPopup,GoogleAuthProvider } from "firebase/auth";

import { auth } from '../firebase/firebase.config';
import axios from "axios";

// Create Auth Context
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

 
//registering user 
const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }



// email password  sign in the user 
const emailPasswordSignIn = async (email, password) => {
          setLoading(true);
          return signInWithEmailAndPassword(auth, email, password);
       
     
    };
//google sign in 
function googleSignIn(){
        setLoading(true);
        return signInWithPopup(auth, provider)
      
      }
//observer 

useEffect(() => {

   
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {

    
        setUser(currentUser); 


        if(currentUser?.email){ 
            const user={email:currentUser?.email}  // i have to explicitly set this emial inside user b caz im cheking it in the back end 
            axios.post('http://localhost:1000/jwt',user,{withCredentials:true})
        .then(res=>{
            console.log(res.data); 
           // setLoading(false)
        })}
        else{ 
            axios.get(`${import.meta.env.VITE_CLIENT_PORT}/logout`,{},{withCredentials:true})
        .then(res=>{
            console.log(res.data);
           // setLoading(false)
        })}
        setLoading(false)
 
    });

  
    return () => unSubscribe();

  },[]); 

// useEffect(() => {
//     const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);  // Update the user state with the current Firebase user

//       try {
//         if (currentUser?.email) {
//           const response = await axios.post('http://localhost:1000/jwt',user, { withCredentials: true });
//           console.log(response.data); // Handle the response from the server (e.g., the JWT)
//         } else {
//           const response = await axios.post('http://localhost:1000/logout', {}, { withCredentials: true });
//           console.log(response.data); // Handle logout response
//         }
//       } catch (err) {
//         console.error('Error:', err);  // Handle any errors
//       } finally {
//         setLoading(false);  // Set loading to false once the requests are completed
//       }
//     });

//     // Cleanup function to unsubscribe from auth state changes when the component unmounts
//     return () => unSubscribe();
//   }, []);

//sign out 

function signOutUser(){
    setLoading(true)
    return  signOut(auth);
  }


    // Auth context value
    const authInfo = {
        createUser,
        user,
        loading,
       
        emailPasswordSignIn, 
        googleSignIn,signOutUser,
        setUser,
    
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
